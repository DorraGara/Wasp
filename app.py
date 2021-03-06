from flask import Flask, session, request
from flask_socketio import SocketIO, emit
import pymongo
import os
from dotenv import load_dotenv
load_dotenv()

def create_app():
  app = Flask(__name__)
  app.secret_key = os.getenv('APP_SECRET').encode()

  # Database
  def get_database():
    client = pymongo.MongoClient(os.getenv('MONGO_URI'))
    try:
      print('connected to db')
    except Exception:
      print("Unable to connect to the db.")
    return client['wasp']

  db = get_database()  
  # Socket IO
  socketio = SocketIO(app, cors_allowed_origins='*')
  users = {}
  usersKeys = {}

  @app.route('/orginate')
  def orginate():
      socketio.emit('server orginated', 'Something happened on the server!')
      return '<h1>Sent!</h1>'

  @socketio.on('messageChatroom')
  def handleMessage(msg):
    data = session['user']['name'] + ': ' + msg
    socketio.emit('messageChatroom', data)

  # init user list
  @socketio.on('addUser')
  def addUser(publicKeyPEM):
      username = session['user']['name']
      if username not in users:
        socketio.emit('addedUser', username, include_self=False)
      users[username] = request.sid
      usersKeys[username] = publicKeyPEM
      socketio.emit('initUserList', users, room=request.sid)

  @socketio.on('signout')
  def signout():
    username = session['user']['name']
    del users[username]
    del usersKeys[username]
    socketio.emit('deletedUser', username)

  @socketio.on('privateMessageRequest')
  def privateMessageRequest(toUser):
    username = session['user']['name']
    toUsersid = users[toUser]
    emit('privateRequest', username, room=toUsersid)

  @socketio.on('acceptMessageRequest')
  def acceptMessageRequest(toUser):
    username = session['user']['name']
    toUsersid = users[toUser]
    emit('openPrivateChat', username, room=toUsersid)

  @socketio.on('exchangePublicKey')
  def exchangePublicKey(toUser):
    username = session['user']['name']
    toUsersid = users[toUser]
    dataSend = {
      'fromUser':username,
      'publicKey':usersKeys[username]
    }
    emit('exchangePublicKey',dataSend,room=toUsersid)

  @socketio.on('messagePrivate')
  def handleMessagePrivate(data):
    msg = data["message"]
    toUser = data["user"]
    toUsersid = users[toUser]
    fromUser =  session['user']['name']
    dataSend = {
      'fromUser':fromUser,
      'message':msg
    }
    socketio.emit('messagePrivate', dataSend, room=toUsersid)

  @socketio.on('userExit')
  def userExitPrivateChat(toUser):
    toUsersid = users[toUser]
    fromUser =  session['user']['name']
    socketio.emit('userExitPrivateChat', fromUser, room=toUsersid)
  
  return app , db, socketio
def register_blueprints(app):
  from user.routes import blueprint_user
  app.register_blueprint(blueprint_user)

  from menu.routes import blueprint_menu
  app.register_blueprint(blueprint_menu)

  from routes.routes import blueprint_routes
  app.register_blueprint(blueprint_routes)
  return app

app, db, socketio = create_app()
app = register_blueprints(app)

if __name__ == "__main__":
  app.run()
  socketio.run(app)