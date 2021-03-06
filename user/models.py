from flask import Flask, jsonify, request, session, render_template
from passlib.hash import pbkdf2_sha256
from app import db
import uuid

class User:
  def start_session(self, user):
    del user['password']
    session['logged_in'] = True
    session['user'] = user
    session['activated'] = False
    return jsonify(user), 200

  def signup(self):
    print(request.form)
    # Create the user object
    user = {
      "_id": uuid.uuid4().hex,
      "name": request.form.get('name'),
      "email": request.form.get('email'),
      "password": request.form.get('password')
    }

    # Encrypt the password
    user['password'] = pbkdf2_sha256.encrypt(str(user['password']))

    # Check for existing email address
    if db.users.find_one({ "email": user['email'] }):
      return jsonify({ "error": "Email address already in use" }), 400

    if db.users.insert_one(user):
      return self.start_session(user)
    return jsonify({ "error": "Signup failed" }), 500
  
  def signout(self):
    session.clear()
    return render_template('home.html')
  
  def login(self):

    user = db.users.find_one({
      "email": request.form.get('email')
    })

    if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
      return self.start_session(user)
      #return codeVerifMail.sendEmail(user)
    
    return jsonify({ "error": "Invalid login credentials" }), 401

  def verifCode(self,code):
    user = session["user"]
    codedb = db.codes.find_one({ "email": user["email"] })
    if (codedb["code"] == code):
      session["activated"] = True
      return jsonify(user),200
    else:
      return jsonify({ "error": "Invalid code" }), 401

