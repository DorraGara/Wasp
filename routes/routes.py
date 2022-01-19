from flask import Flask, render_template, session, redirect, request
from app import app


@app.route('/')
def home():
  return render_template('home.html')
