import pytest
import random
import string
import json
from werkzeug.datastructures import ImmutableMultiDict
from app import create_app , register_blueprints

@pytest.fixture
def client():
    app , db,  socketio = create_app()
    app = register_blueprints(app)
    app.config['TESTING'] = True
    with app.app_context():
        with app.test_client() as client:
            yield client

def test_home(client):
    #Given
    expected_status_code = 200
    expected_page_title = b'Log In'
    #when
    response = client.get('/')
    #then
    assert response.status_code == expected_status_code
    assert expected_page_title in response.data
    

def test_register(client):
    #Given
    expected_status_code = 200
    name = ''.join(random.choice(string.ascii_letters) for x in range(6))
    email = name+'@outlook.com'
    password = "ValidPassword@123"
    mimetype = 'application/x-www-form-urlencoded'
    headers = {
        'Content-Type': mimetype,
    }
    payload = ImmutableMultiDict([('name',name),("email",email),("password",password)])
    #When
    response = client.post('/user/signup', data=payload, headers=headers)
    #Then
    assert response.status_code == expected_status_code
    user = json.loads(response.data)
    assert user["name"] == name 
    assert user["email"] == email
