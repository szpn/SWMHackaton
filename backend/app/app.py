from flask import Flask
from app.routes import api
from app.handlers import db

app = Flask(__name__)
app.config.from_object('app.config.Config')


db.init_app(app)

app.register_blueprint(api)

with app.app_context():
    db.create_all()