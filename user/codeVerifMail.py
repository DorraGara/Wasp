from flask import request,jsonify
from flask_mail import Mail, Message
from app import app
from app import db
import uuid
import os
from dotenv import load_dotenv
load_dotenv()

# Mail
# os.getenv('MONGO_URI')
app.config.update(
	DEBUG=True,
	#EMAIL SETTINGS
	MAIL_SERVER='smtp.gmail.com',
	MAIL_PORT=465,
	MAIL_USE_SSL=True,
	MAIL_USERNAME =  os.getenv('EMAIL'),
	MAIL_PASSWORD = os.getenv('PASSWORD')
	)

mail = Mail(app)

def sendEmail(email):
    # email = user["email"]
    msg = Message('Login verification code', sender = 'dora.gara1998@gmail.com', recipients = [email])
    verifCode = uuid.uuid4().hex
    msg.body = verifCode
    mail.send(msg)
    code = {
        "email": email,
        "code": verifCode
        }
    if db.codes.find_one({ "email": email }):
        db.codes.update_one({ "email": email},{"$set": { 'code': verifCode }})
    else:
        db.codes.insert_one(code)
    return jsonify({ "user": "user"}), 200
