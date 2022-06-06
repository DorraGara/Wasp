from unittest import TestCase, main
from menu.functions.hashing import Hashing
class TestApp(TestCase):
    def test_hashing(self):
        string = "hashtest"
        #md5
        hashed_md5 = Hashing.hashing(string,1)
        assert hashed_md5 == "493852786270b68e182d6eb939b1f802"
        #sha128
        hashed_sha128 = Hashing.hashing(string,2)
        assert hashed_sha128 == "09ead097096895457e676d5c776ac455b4593dd0"
        #sha-256
        hashed_sha256 = Hashing.hashing(string,3)
        assert hashed_sha256 == "9e7cbc1380adfc1ed117071a6fab6401ea025ba1969eaa173e42c7c637027a9c"      


if __name__ == '__main__':
    main()