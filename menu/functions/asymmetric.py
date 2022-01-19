import imp
from .asymmetricAlgos.elgamal import Elgamal
from .asymmetricAlgos.rsaCipher import Rsa


algorithms = {
    1: Elgamal,
    2: Rsa,
}

class AsymmetricEncryption:
    @staticmethod
    def keygen(algo):
        keys = algorithms[algo].generateKeys()
        return keys

    @staticmethod
    def keygenPEM(algo):
        keys = algorithms[algo].generateKeysPEM()
        return keys
         

    @staticmethod
    def encrypt(algo,key,message):
       encMessage = algorithms[algo].encrypt(message,key)
       return encMessage
    
    @staticmethod
    def decrypt(algo,message,key):
        decMessage = algorithms[algo].decrypt(message,key)
        return decMessage
