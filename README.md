# Wasp
User based flask app chatroom with an end to end encrypted private chat (RSA) along with some cryptography functions (base64 encoding, hashing, cracking, symmetric and asymmetric encryption)

to run this project:
python -m flask run

## Testing:
Unit test:
python -m coverage run .\testing\unit_testing.py

Integration test:
python -m pytest .\testing\integration_testing.py

End to end test:
node ./node_modules/cypress/bin/cypress open

