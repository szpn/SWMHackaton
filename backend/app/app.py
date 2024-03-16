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
    #db.drop_all()
    db.create_all()
    # map_type_1 = MapPlaceType("Kawiarnia")
    # db.session.add(map_type_1)
    # map_type_2 = MapPlaceType("Muzeum")
    # db.session.add(map_type_2)
    # map_place_1 = MapPlace("Test", 50.3232, 22.72234, "Kolorowa 44", "Smaczne jedzenie", "Smaczne jedzenie, mila obsluga i ladne wnetrze", "1233333123", "http://stoluwka.pl", 1)
    # db.session.add(map_place_1)
    #Rating1 = MapPlaceReview(1, 3)
    db.session.commit()