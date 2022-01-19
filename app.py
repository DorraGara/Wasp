from flask import Flask, render_template, session, redirect, request
from flask_socketio import SocketIO, emit
import pymongo
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
app.secret_key = b'\xcc^\x91\xea\x17-\xd0W\x03\xa7\xf8J0\xac8\xc5'

# Database
def get_database():
  client = pymongo.MongoClient(os.getenv('MONGO_URI'))
  try:
    print('connected to db')
  except Exception:
    print("Unable to connect to the db.")
  return client['wasp']

db = get_database()  


# Routes
from user import routes
from routes import routes
