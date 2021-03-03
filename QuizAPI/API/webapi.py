import json
from API import app, Users
from flask import request


@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('UserName')
    password = request.form.get('Password')
    person = Users.query.filter_by(username=username).first_or_404()
    if person is None or not person.check_password(password=password):
        return json.dumps(False)
    else:
        return json.dumps({'username': person.username})


@app.route('/signup', methods=['POST'])
def signup():
    user = Users()
    user.username = request.form.get('UserName')
    password = request.form.get('Password')
    user.email = request.form.get('Email')
    person = Users.query.filter_by(username=user.username)
    print(password)
    if person is not None:
        user.set_password(password=password)
        user.save_to_db()
        return json.dumps(True)
    else:
        return json.dumps(False)
