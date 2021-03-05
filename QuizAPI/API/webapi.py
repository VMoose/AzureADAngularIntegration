import json
from API import app, Users
from flask import request

isLogin = False
userName = ""


@app.route('/login', methods=['POST'])
def login():
    username = request.get_json().get('UserName')
    password = request.get_json().get('Password')
    person = Users.query.filter_by(username=username).first_or_404()
    if person is None or not person.check_password(password=password):
        return json.dumps(False)
    else:
        global isLogin, userName
        isLogin = True
        userName = person.username
        return json.dumps({'UserName': person.username})


@app.route('/signup', methods=['POST'])
def signup():
    user = Users()
    user.username = request.get_json().get('UserName')
    password = request.get_json().get('Password')
    user.email = request.get_json().get('Email')
    person = Users.query.filter_by(username=user.username).first()
    if person is None:
        user.set_password(password=password)
        user.save_to_db()
        return json.dumps(True)
    else:
        return json.dumps(False)


@app.route('/getAccount', methods=['GET'])
def account():
    return json.dumps((isLogin, userName))


@app.route('/logout', methods=['GET'])
def logout():
    global isLogin, userName
    isLogin = False
    userName = ""
    return json.dumps(True)
