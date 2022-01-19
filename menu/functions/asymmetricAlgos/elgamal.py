import Crypto.Util.number as number
class Elgamal:
    @staticmethod
    def generateKeys():
        p = number.getPrime(16)
        while True:
            g = number.getRandomRange(3, p+1) 
            print(g)
            #check if (g^i != 1 mod p) for 0 < i < p-1
            for i in range(1, p-1):
                if (pow(g, i, p) == 1):
                    break
            break
        #private key
        x = number.getRandomRange(2, p-1)
        #public key
        y = pow(g, x, p)
        keys = {
            'x':x,
            'y':y,
            'p':p,
            'g':g
        }
        print(keys)
        return keys

    @staticmethod
    def encrypt(message,key):
        g = key['g']
        p = key['p']
        y = key['y']
        r = number.getRandomRange(2, p-1)
        #cipher text
        c1 = pow(g, r, p)
        c2 = (ord(message) * pow(y, r, p)) % p
        encMessage = {
            'c1':c1,
            'c2':c2
        }
        return encMessage

    @staticmethod
    def decrypt(encMessage,key):
        x = key['x']
        p = key['p']
        c1 = encMessage['c1']
        c2 = encMessage['c2']
        decMessage = (c2 * pow(c1, p-1-x, p)) % p
        decMessage = chr(decMessage)
        return decMessage
