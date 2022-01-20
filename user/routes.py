from flask import Flask, jsonify, request, session, render_template
from app import app
from user.models import User
from . import codeVerifMail


@app.route('/user/signup', methods=['POST'])
def signup():
  return User().signup()

@app.route('/user/signout')
def signout():
  return User().signout()

@app.route('/user/login', methods=['POST'])
def login():
  return User().login()

@app.route('/user/sendEmail', methods=['POST'])
def sendEmail():
  email = request.form["email"]
  return codeVerifMail.sendEmail(email)
  
@app.route('/user/verifCode', methods=['POST'])
def verifCode():
  code = request.form["code"]
  return User().verifCode(code)