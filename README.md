# Wasp
User based flask app chatroom with an end to end encrypted private chat (RSA) along with some cryptography functions (base64 encoding, hashing, cracking, symmetric and asymmetric encryption)

to run this project:
python -m flask run

## Testing:
Unit test:
python -m coverage run .\testing\unit_testing.py
<img src="/testing/unit_testing_result.PNG" alt="unit_test"/>

Integration test:
python -m pytest .\testing\integration_testing.py
<img src="/testing/integration_testing_result.PNG" alt="integration_test"/>

End to end test:
node ./node_modules/cypress/bin/cypress open
<img src="/testing/end2end/cypress/screenshots/browser.PNG" alt="e2e_test"/>
For more end to end screenshots, check the screenshots folder under /testing/end2end/screenshots.

UAT:
<a href="https://github.com/DorraGara/Wasp/blob/main/testing/UAT.pdf">UAT pdf</a>

