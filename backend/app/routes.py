from flask import Blueprint, abort, jsonify, request
from app.models import *
from app.handlers import db

api = Blueprint('api', __name__, template_folder='templates')


@api.route('/')
def is_alive():
    return "OK"


@api.route('/place/', methods=['GET'])
@api.route('/place/<int:product_id>/', methods=['GET'])
def get_place(place_id=None):
    if place_id is None:
        places = MapPlace.query.all()
        serialized_places = [place.serialize() for place in places]
        return jsonify(serialized_places), 200

    place = MapPlace.query.get(place_id)
    if place:
        return jsonify(place), 200
    return jsonify({"error": "id is invalid"}), 404

@api.route('/add_place/', methods=['POST'])
def add_place():
    data = request.get_json()
    print(data)
    name = data['name']
    description = data['description']
    location_lat = data['lat']
    location_lon = data['lon']
    address = data['address']

    new_place = MapPlace(name, description, location_lat, location_lon, address)
    db.session.add(new_place)
    db.session.commit()




