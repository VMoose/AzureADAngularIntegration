from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
import os

basedir = os.path.abspath(os.path.dirname(__file__))
class Config(object):
  SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret-key'
  SQL_SERVER = os.environ.get('SQL_SERVER') or 'vmalik.database.windows.net'
  SQL_DATABASE = os.environ.get('SQL_DATABASE') or 'data-azure'
  SQL_USER_NAME = os.environ.get('SQL_USER_NAME') or 'vmalik'
  SQL_PASSWORD = os.environ.get('SQL_PASSWORD') or 'VaRU@95mAL'
  SQLALCHEMY_DATABASE_URI = 'mssql+pyodbc://' + SQL_USER_NAME + '@' + SQL_SERVER + ':' + SQL_PASSWORD + '@' + SQL_SERVER + ':1433/' + SQL_DATABASE + '?driver=ODBC+Driver+17+for+SQL+Server'
  SQLALCHEMY_TRACK_MODIFICATIONS = False


app = Flask(__name__)
app.config.from_object(Config)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
db = SQLAlchemy()
db.init_app(app)
migrate = Migrate(app, db)


class Users(db.Model):
  __tablename__ = "Users"
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(64), index=True, unique=True)
  email = db.Column(db.String(128), unique=True)
  password_hash = db.Column(db.String(128))

  def __repr__(self):
    return '<User {}>'.format(self.username)

  def set_password(self, password):
    self.password_hash = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password_hash, password)

  def save_to_db(self):
    db.session.add(self)
    db.session.commit()

import API.webapi
