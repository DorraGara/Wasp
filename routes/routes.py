from flask import Flask, render_template, session, redirect, request
from app import app
from functools import wraps

# Decorators
def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return f(*args, **kwargs)
    else:
      return redirect('/')
  
  return wrap

@app.route('/')
def home():
  return render_template('home.html')

@app.route('/dashboard')
@login_required
def dashboard():
  return render_template('Menus/mainMenu.html')

@app.route('/registerScreen')
def registerScreen():
  return render_template('register.html')

@app.route('/loginScreen')
def loginScreen():
  return render_template('home.html')
