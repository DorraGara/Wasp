from pathlib import Path
from .hashing import Hashing

dictionnary = {
    1: open(Path(__file__).absolute().parent / "dictionnaries/shortDictionnary.txt", "rb"),
    2: open(Path(__file__).absolute().parent / "dictionnaries/realhuman_phill.txt", "rb"),

}
class Cracking:
    @staticmethod
    def cracking(hash, algo, dic):
        for i in dictionnary[dic].readlines():
            i = str(i, 'utf-8').rstrip("\n")
            word_hash = Hashing.hashing(message=i, algo=algo)
            if word_hash == hash:
                return i
        return None
