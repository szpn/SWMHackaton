from flask import Blueprint, abort, jsonify, request
from app.models import *
from app.handlers import db

api = Blueprint('api', __name__, template_folder='templates')


@api.route('/')
def is_alive():
    return "OK"


@api.route('/place/', methods=['GET'])
@api.route('/place/<int:place_id>/', methods=['GET'])
def get_place(place_id=None):
    if place_id is None:
        places = MapPlace.query.all()
        serialized_places = [place.serialize_short() for place in places]
        return jsonify(serialized_places), 200

    place = MapPlace.query.get(place_id).serialize_detailed()
    if place:
        return jsonify(place), 200
    return jsonify({"error": "id is invalid"}), 404

@api.route('/add_place/', methods=['POST'])
def add_place():
    data = request.json
    name = data.get('name', None)
    description_short = data.get('description_short', None)
    description_long = data.get('description_long', None)
    location_lat = data.get('location_lat', None)
    location_lon = data.get('location_lon', None)
    address = data.get('address', None)
    contact_phone = data.get('contact_phone', None)
    contact_link = data.get('contact_link', None)


    new_place = MapPlace(name, location_lat, location_lon, address, description_short, description_long, contact_phone, contact_link)
    db.session.add(new_place)
    db.session.commit()

    return jsonify({"msg": "place added"}), 200




