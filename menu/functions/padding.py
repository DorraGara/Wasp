def pad(message, block_length):
    return message + chr(block_length - len(message) % block_length) * (block_length - len(message) % block_length)


def unpad(cipher_text):
    return cipher_text[:-ord(cipher_text[-1])]