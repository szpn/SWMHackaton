from app.handlers import db

class MapPlace(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(200))
    location_lon = db.Column(db.Float(24))
    location_lat = db.Column(db.Float(24))
    address = db.Column(db.String(40))

    def __init__(self, name, description, lon, lat, address):
        self.name = name
        self.description = description
        self.location_lon = lon
        self.location_lat = lat
        self.address = address


    def serialize(self):
        return{
            'id' : self.id,
            'name': self.name,
            'description': self.description,
            'location_lon': self.location_lon,
            'location_lat': self.location_lat,
            'address': self.address
        }
