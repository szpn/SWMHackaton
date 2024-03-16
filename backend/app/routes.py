from flask import Blueprint, abort, jsonify, request


api = Blueprint('api', __name__, template_folder='templates')


@api.route('/')
def is_alive():
    return "OK"


