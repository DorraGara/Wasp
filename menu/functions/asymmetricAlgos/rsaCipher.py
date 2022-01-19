# from cryptography.hazmat.primitives.asymmetric import rsa
# from cryptography.hazmat.primitives import serialization
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from ..encoding import Encoding
from ..padding import pad,unpad

import binascii


class Rsa:
    @staticmethod
    def generateKeys():
        keySize = 1024
        keyPair = RSA.generate(keySize)
        publicKey = keyPair.publickey()
        publicKeyPEM = publicKey.exportKey()
        privateKeyPEM = keyPair.exportKey()
        keys = {
            'public':Encoding.b64enURL(publicKeyPEM),
            'private':Encoding.b64enURL((pad(privateKeyPEM.decode(),16).encode()))
        }
        return keys
    @staticmethod
    def generateKeysPEM():
        keySize = 1024
        keyPair = RSA.generate(keySize)
        publicKey = keyPair.publickey()
        publicKeyPEM = publicKey.exportKey()
        privateKeyPEM = keyPair.exportKey()
        keys = {
            'public':publicKeyPEM.decode(),
            'private':privateKeyPEM.decode()
        }
        return keys
    @staticmethod
    def encrypt(message, publicKeyPEM):
        publicKey = RSA.importKey(Encoding.b64deURL(publicKeyPEM))
        encryptor = PKCS1_OAEP.new(publicKey)
        encMessageBytes = encryptor.encrypt(message.encode())
        encMessage = binascii.hexlify(encMessageBytes).decode()
        return encMessage
    @staticmethod
    def decrypt(encMessage, keyPairPEM):
        keyPair = RSA.importKey(unpad((Encoding.b64deURL(keyPairPEM)).decode()))
        decryptor = PKCS1_OAEP.new(keyPair)
        encMessage = binascii.unhexlify(encMessage)
        decMessage = (decryptor.decrypt(encMessage)).decode()
        return decMessage