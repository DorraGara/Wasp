import base64
class Encoding:
    @staticmethod
    def stringToBase64(string):
        return base64.b64encode(string.encode()).decode()
    @staticmethod
    def base64ToString(base):
        return base64.b64decode(base).decode()
    @staticmethod
    def b64enURL(bytes):
        return base64.urlsafe_b64encode(bytes).decode()
    @staticmethod
    def b64deURL(base):
        return base64.urlsafe_b64decode(base)
    