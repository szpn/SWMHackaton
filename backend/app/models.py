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



    def __init__(self, name, lat, lon, address, s_desc, l_desc, phone, link):
        self.name = name
        self.location_lon = lon
        self.location_lat = lat
        self.address = address
        self.short_description = s_desc
        self.long_desciption = l_desc
        self.contact_phone = phone
        self.contact_link = link


    def serialize_short(self):
        return{
            'id' : self.id,
            'name': self.name,
            'short_description': self.short_description,
            'location_lon': self.location_lon,
            'location_lat': self.location_lat,
            'address': self.address
        }

    def serialize_detailed(self):
        return{
            'id' : self.id,
            'name': self.name,
            'short_description': self.short_description,
            'location_lon': self.location_lon,
            'location_lat': self.location_lat,
            'address': self.address,
            'long_description': self.long_desciption,
            'contact_phone': self.contact_phone,
            'contact_link': self.contact_link
        }
