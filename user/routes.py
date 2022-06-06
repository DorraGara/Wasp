from flask import Blueprint, jsonify, request, session, render_template
from user.models import User
from . import codeVerifMail

blueprint_user = Blueprint('user', __name__)


@blueprint_user.route('/user/signup', methods=['POST'])
def signup():
  return User().signup()

@blueprint_user.route('/user/signout')
def signout():
  return User().signout()

@blueprint_user.route('/user/login', methods=['POST'])
def login():
  return User().login()

@blueprint_user.route('/user/sendEmail', methods=['POST'])
def sendEmail():
  email = request.form["email"]
  return codeVerifMail.sendEmail(email)
  
@blueprint_user.route('/user/verifCode', methods=['POST'])
def verifCode():
  code = request.form["code"]
  return User().verifCode(code)