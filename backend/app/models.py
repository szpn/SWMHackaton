from datetime import datetime
from app.handlers import db

class MapPlace(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    location_lon = db.Column(db.Float(24))
    location_lat = db.Column(db.Float(24))
    address = db.Column(db.String(40))
    short_description = db.Column(db.String(100))
    long_desciption = db.Column(db.String(300), nullable=True)
    contact_phone = db.Column(db.String(20), nullable=True)
    contact_link = db.Column(db.String(50), nullable=True)


    place_type_id = db.Column(db.Integer, db.ForeignKey('map_place_type.id'))

    place_type = db.relationship("MapPlaceType", back_populates="places")
    place_reviews = db.relationship("MapPlaceReview", back_populates="place")


    def __init__(self, name, lat, lon, address, s_desc, l_desc, phone, link, type_id):
        self.name = name
        self.location_lon = lon
        self.location_lat = lat
        self.address = address
        self.short_description = s_desc
        self.long_desciption = l_desc
        self.contact_phone = phone
        self.contact_link = link
        self.place_type_id = type_id


    def serialize_short(self):
        return{
            'id' : self.id,
            'name': self.name,
            'short_description': self.short_description,
            'location_lon': self.location_lon,
            'location_lat': self.location_lat,
            'address': self.address,
            'type_name': self.place_type.name if self.place_type else None
        }

    def serialize_detailed(self):
        avg_rating = db.session.query(db.func.avg(MapPlaceReview.stars_recieved)).filter_by(place_id=self.id).scalar()
        #avg_rating = round(avg_rating, 2)
        return{
            'id' : self.id,
            'name': self.name,
            'short_description': self.short_description,
            'location_lon': self.location_lon,
            'location_lat': self.location_lat,
            'address': self.address,
            'long_description': self.long_desciption,
            'contact_phone': self.contact_phone,
            'contact_link': self.contact_link,
            'type_name': self.place_type.name if self.place_type else None,
            'average_rating': avg_rating
        }


class MapPlaceType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40))

    places = db.relationship("MapPlace", back_populates="place_type")

    def __init__(self, name):
        self.name = name
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }

class MapPlaceReview(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.Integer, db.ForeignKey('map_place.id'), nullable=False)
    stars_recieved = db.Column(db.Integer)
    place = db.relationship("MapPlace", back_populates="place_reviews")
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)



    def __init__(self, place_id, stars_recieved):
        self.place_id = place_id
        self.stars_recieved = stars_recieved

