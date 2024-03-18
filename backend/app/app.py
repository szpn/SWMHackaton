from flask import Flask
from app.routes import api
from app.handlers import db
from app.models import *

from flask_cors import CORS

app = Flask(__name__)
app.config.from_object('app.config.Config')


db.init_app(app)
CORS(app)


app.register_blueprint(api)

with app.app_context():
    db.create_all()