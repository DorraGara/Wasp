from flask import Blueprint, render_template, session, redirect, request
from functools import wraps

blueprint_routes = Blueprint('routes', __name__)

# Decorators
def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      if 'activated' in session:
        return f(*args, **kwargs)
      else:
        return redirect('/')
    else:
      return redirect('/')
  
  return wrap

@blueprint_routes.route('/')
def home():
  return render_template('home.html')

@blueprint_routes.route('/dashboard')
@login_required
def dashboard():
  return render_template('Menus/mainMenu.html')

@blueprint_routes.route('/registerScreen')
def registerScreen():
  return render_template('register.html')

@blueprint_routes.route('/loginScreen')
def loginScreen():
  return render_template('home.html')

# Menus
@blueprint_routes.route('/dashboard/codage')
@login_required
def codageMenuScreen():
  return render_template('Menus/codageMenu.html')

@blueprint_routes.route('/dashboard/hashing')
@login_required
def hashingMenuScreen():
  return render_template('Menus/hashingMenu.html')

@blueprint_routes.route('/dashboard/cracking')
@login_required
def crackingAlgoMenuScreen():
  return render_template('Menus/crackingMenuAlgo.html')

@blueprint_routes.route('/dashboard/codage/encoding')
@login_required
def encodingScreen():
  return render_template('Functions/Encoding/encoding.html')

@blueprint_routes.route('/dashboard/codage/decoding')
@login_required
def decodingScreen():
  return render_template('Functions/Encoding/decoding.html')

@blueprint_routes.route('/dashboard/hashing/algorithm')
@login_required
def hashingScreen():
  algo = request.args.get('algo')
  return render_template('Functions/hashing.html', algo = algo)

@blueprint_routes.route('/dashboard/cracking/algorithm')
@login_required
def crackingDictionnaryMenuScreen():
  algo = request.args.get('algo')
  return render_template('Menus/crackingMenuWordlist.html', algo = algo)

@blueprint_routes.route('/dashboard/cracking/dictionnary')
@login_required
def crackingScreen():
  algo = request.args.get('algo')
  dict = request.args.get('dictionnary')
  print(dict)
  return render_template('Functions/cracking.html', algo=algo, dictionnary =dict)

@blueprint_routes.route('/dashboard/symmetric')
@login_required
def symmetricAlgoMenuScreen():
  return render_template('Menus/symmetricEncryptionAlgoMenu.html')

@blueprint_routes.route('/dashboard/symmetric/algorithm')
@login_required
def symmetricEndecMenuScreen():
  algo = request.args.get('algo')
  return render_template('Menus/symmetricEncryptionMenu.html', algo = algo)

@blueprint_routes.route('/dashboard/symmetric/encryption')
@login_required
def symmetricEncryptionMenuScreen():
  algo = request.args.get('algo')
  return render_template('Functions/symmetricEncryption/encrypting.html', algo = algo)

@blueprint_routes.route('/dashboard/symmetric/decryption')
@login_required
def symmetricDecryptionMenuScreen():
  algo = request.args.get('algo')
  return render_template('Functions/symmetricEncryption/decrypting.html', algo = algo)

@blueprint_routes.route('/dashboard/asymmetric')
@login_required
def asymmetricAlgoMenuScreen():
  return render_template('Menus/asymmetricEncryptionAlgoMenu.html')

@blueprint_routes.route('/dashboard/asymmetric/algorithm')
@login_required
def asymmetricEndecMenuScreen():
  algo = request.args.get('algo')
  return render_template('Menus/asymmetricEncryptionMenu.html', algo = algo)

@blueprint_routes.route('/dashboard/asymmetric/encryption')
@login_required
def asymmetricEncryptionMenuScreen():
  algo = request.args.get('algo')
  return render_template('Functions/asymmetricEncryption/encrypting.html', algo = algo)

@blueprint_routes.route('/dashboard/asymmetric/decryption')
@login_required
def asymmetricDecryptionMenuScreen():
  algo = request.args.get('algo')
  return render_template('Functions/asymmetricEncryption/decrypting.html', algo = algo)

@blueprint_routes.route('/dashboard/asymmetric/keygen')
@login_required
def asymmetricKeygenMenuScreen():
  algo = request.args.get('algo')
  return render_template('Functions/asymmetricEncryption/generatingKeys.html', algo = algo)

# Chatroom
@blueprint_routes.route('/dashboard/chatroom')
@login_required
def chatroomScreen():
  return render_template('chatroom.html')

@blueprint_routes.route('/dashboard/chatroom/privateChat')
@login_required
def privateChatScreen():
  user = request.args.get('user')
  return render_template('privateChat.html', user = user)
