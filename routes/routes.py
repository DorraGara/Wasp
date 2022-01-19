from flask import Flask, render_template, session, redirect, request
from app import app
from functools import wraps

# Decorators
def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return f(*args, **kwargs)
    else:
      return redirect('/')
  
  return wrap

@app.route('/')
def home():
  return render_template('home.html')

@app.route('/dashboard')
@login_required
def dashboard():
  return render_template('Menus/mainMenu.html')

@app.route('/registerScreen')
def registerScreen():
  return render_template('register.html')

@app.route('/loginScreen')
def loginScreen():
  return render_template('home.html')

# Menus
@app.route('/dashboard/codage')
def codageMenuScreen():
  return render_template('Menus/codageMenu.html')

@app.route('/dashboard/hashing')
def hashingMenuScreen():
  return render_template('Menus/hashingMenu.html')

@app.route('/dashboard/cracking')
def crackingAlgoMenuScreen():
  return render_template('Menus/crackingMenuAlgo.html')

@app.route('/dashboard/codage/encoding')
def encodingScreen():
  return render_template('Functions/Encoding/encoding.html')

@app.route('/dashboard/codage/decoding')
def decodingScreen():
  return render_template('Functions/Encoding/decoding.html')

@app.route('/dashboard/hashing/algorithm')
def hashingScreen():
  algo = request.args.get('algo')
  return render_template('Functions/hashing.html', algo = algo)

@app.route('/dashboard/cracking/algorithm')
def crackingDictionnaryMenuScreen():
  algo = request.args.get('algo')
  return render_template('Menus/crackingMenuWordlist.html', algo = algo)

@app.route('/dashboard/cracking/dictionnary')
def crackingScreen():
  algo = request.args.get('algo')
  dict = request.args.get('dictionnary')
  print(dict)
  return render_template('Functions/cracking.html', algo=algo, dictionnary =dict)

@app.route('/dashboard/symmetric')
def symmetricAlgoMenuScreen():
  return render_template('Menus/symmetricEncryptionAlgoMenu.html')

@app.route('/dashboard/symmetric/algorithm')
def symmetricEndecMenuScreen():
  algo = request.args.get('algo')
  return render_template('Menus/symmetricEncryptionMenu.html', algo = algo)

@app.route('/dashboard/symmetric/encryption')
def symmetricEncryptionMenuScreen():
  algo = request.args.get('algo')
  return render_template('Functions/symmetricEncryption/encrypting.html', algo = algo)

@app.route('/dashboard/symmetric/decryption')
def symmetricDecryptionMenuScreen():
  algo = request.args.get('algo')
  return render_template('Functions/symmetricEncryption/decrypting.html', algo = algo)

@app.route('/dashboard/asymmetric')
def asymmetricAlgoMenuScreen():
  return render_template('Menus/asymmetricEncryptionAlgoMenu.html')

@app.route('/dashboard/asymmetric/algorithm')
def asymmetricEndecMenuScreen():
  algo = request.args.get('algo')
  return render_template('Menus/asymmetricEncryptionMenu.html', algo = algo)

@app.route('/dashboard/asymmetric/encryption')
def asymmetricEncryptionMenuScreen():
  algo = request.args.get('algo')
  return render_template('Functions/asymmetricEncryption/encrypting.html', algo = algo)

@app.route('/dashboard/asymmetric/decryption')
def asymmetricDecryptionMenuScreen():
  algo = request.args.get('algo')
  return render_template('Functions/asymmetricEncryption/decrypting.html', algo = algo)

@app.route('/dashboard/asymmetric/keygen')
def asymmetricKeygenMenuScreen():
  algo = request.args.get('algo')
  return render_template('Functions/asymmetricEncryption/generatingKeys.html', algo = algo)

# Chatroom
@app.route('/dashboard/chatroom')
def chatroomScreen():
  return render_template('chatroom.html')

@app.route('/dashboard/chatroom/privateChat')
def privateChatScreen():
  user = request.args.get('user')
  return render_template('privateChat.html', user = user)
