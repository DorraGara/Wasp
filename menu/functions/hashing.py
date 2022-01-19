import hashlib

algorithms = {
    1: hashlib.md5,
    2: hashlib.sha1,
    3: hashlib.sha256,
}
class Hashing:
    @staticmethod
    def hashing(message, algo):
        return algorithms[algo](message.encode()).hexdigest()
