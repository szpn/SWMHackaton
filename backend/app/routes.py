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


@api.route('/type/', methods=['GET'])
def get_types():
    types = MapPlaceType.query.all()
    serialized_types =[type.serialize() for type in types]
    return jsonify(serialized_types), 200

@api.route('/add_rating/', methods=['POST'])
def add_rating():
    data = request.json
    place_id = data.get('place_id', None)
    rating = data.get('rating', None)
    new_rating = MapPlaceReview(place_id, rating)
    db.session.add(new_rating)
    db.session.commit()

    return jsonify({"msg": "review added"}), 200

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
    type_id = data.get('type_id', None)


    new_place = MapPlace(name, location_lat, location_lon, address, description_short, description_long, contact_phone, contact_link, type_id)
    db.session.add(new_place)
    db.session.commit()

    return jsonify({"msg": "place added"}), 200




