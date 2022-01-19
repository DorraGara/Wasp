from Crypto.Cipher import AES
from Crypto.Cipher import DES
from .padding import pad,unpad
from Crypto.Protocol.KDF import PBKDF2
from .encoding import Encoding
from dotenv import load_dotenv
import os


algorithms = {
    1: DES,
    2: AES,
}
load_dotenv()
SALT = bytes(os.getenv('SALT'),"utf-8")

class SymmetricEncryption:
    @staticmethod
    def encrypt(algo,passphrase,message):
        keySize = algo * 8
        key = PBKDF2(passphrase.encode("utf8"), SALT, keySize, count=1000000)
        blockSize =algorithms[algo].block_size
        message = (pad(message, blockSize)).encode()
        iv = os.urandom(blockSize)
        cipherConfig = algorithms[algo].new(key, algorithms[algo].MODE_CBC, iv)
        cipheredBytes = cipherConfig.encrypt(message)
        iv = Encoding.b64enURL(iv)
        cipheredMessage = Encoding.b64enURL(cipheredBytes)
        output = {
            'iv':iv,
            'cipheredMessage':cipheredMessage
        }
        return output
    
    @staticmethod
    def decrypt(algo,passphrase,input):
        keySize = algo * 8
        key = PBKDF2(passphrase.encode("utf8"), SALT, keySize, count=1000000)
        iv = Encoding.b64deURL(input['iv'])
        cipheredMessage = Encoding.b64deURL(input['cipheredMessage'])  
        cipherConfig = algorithms[algo].new(key, algorithms[algo].MODE_CBC,iv)
        decrypted = unpad(cipherConfig.decrypt(cipheredMessage).decode())
        return decrypted
