from flask import request,jsonify, Blueprint
from .functions.asymmetric import AsymmetricEncryption
from .functions.encoding import Encoding
from .functions.hashing import Hashing
from .functions.cracking import Cracking
from .functions.symmetric import SymmetricEncryption

blueprint_menu = Blueprint('menu',__name__)

@blueprint_menu.route('/menu/codage/encoding', methods=['POST'])
def codageEncodingMenu():
    message = request.form["message"]
    output = Encoding.stringToBase64(message)
    return jsonify({ "output": output}), 200

@blueprint_menu.route('/menu/codage/decoding', methods=['POST'])
def codageDecodingMenu():
    message = request.form["message"]
    output = Encoding.base64ToString(message)
    return jsonify({ "output": output}), 200
        
@blueprint_menu.route('/menu/cracking', methods=['POST'])
def crackingMenu():
    hash = request.form["hash"]
    algo = int(request.form["algo"])
    dict = int(request.form["dictionnary"])
    output = Cracking.cracking(hash, algo,dict)
    return jsonify({ "output": output}), 200

@blueprint_menu.route('/menu/hashing', methods=['POST'])
def hashingMenu():
    message = request.form["message"]
    algo = int(request.form["algo"])
    output = Hashing.hashing(message, algo)
    return jsonify({ "output": output}), 200

@blueprint_menu.route('/menu/asymmetric/keygen', methods=['POST'])
def asymmetricKeygenMenu():
    algo = int(request.form["algo"])
    output = AsymmetricEncryption.keygen(algo)
    return jsonify(output), 200

@blueprint_menu.route('/menu/asymmetric/encrypting', methods=['POST'])
def asymmetricEncryptingMenu():
    print(request.form)
    message = request.form["message"]
    algo = int(request.form["algo"])
    if (algo == 1):
        publicKey = {
            'y': int(request.form["y"]),
            'g': int(request.form["g"]),
            "p" :int(request.form["p"])
        }
    else:
        publicKey =request.form["publicKey"]
    
    output = AsymmetricEncryption.encrypt(algo,publicKey,message)
    return jsonify({ "output": output}), 200

@blueprint_menu.route('/menu/asymmetric/decrypting', methods=['POST'])
def asymmetricDecryptingMenu():
    algo = int(request.form["algo"])
    if (algo == 1):
        privateKey = {
            'x': int(request.form["x"]),
            'p' :int(request.form["p"])
        }
        message = {
            'c1': int(request.form["c1"]),
            'c2': int(request.form["c2"]),
        }
    else:
        privateKey =request.form["privateKey"]
        message = request.form["message"]

    
    output = AsymmetricEncryption.decrypt(algo,message,privateKey)
    return jsonify({ "output": output}), 200

@blueprint_menu.route('/menu/symmetric/encrypting', methods=['POST'])
def symmetricEncryptingMenu():
    message = request.form["message"]
    algo = int(request.form["algo"])
    passphrase = request.form["passphrase"]
    output = SymmetricEncryption.encrypt(algo,passphrase,message)
    return jsonify(output), 200

@blueprint_menu.route('/menu/symmetric/decrypting', methods=['POST'])
def symmetricdecryptingMenu():
    input = {
        'cipheredMessage': request.form["cipheredMessage"],
        'iv': request.form['iv']
    }
    algo = int(request.form["algo"])
    passphrase = request.form["passphrase"]
    output = SymmetricEncryption.decrypt(algo,passphrase,input)
    return jsonify({ "output": output}), 200
 