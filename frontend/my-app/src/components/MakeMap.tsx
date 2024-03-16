import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import {ReactNode, useEffect, useState} from "react";


export default function MakeMap(){
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetch('http://192.168.123.92:5000/place/')
            .then(response => response.json())
            .then(data => setPlaces(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return(
        <>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                  crossOrigin=""/>
            <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
                    integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
                    crossOrigin=""></script>
            <MapContainer center={[50.06143, 19.9365]} zoom={15} scrollWheelZoom={true}
                          style={{width: "100%", height: "900px"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                {places.map(place => (
                    <Marker position={[place['location_lat'], place['location_lon']]} key={place['id']}>
                        <Popup>
                            {place['name']} {/* You can customize the content of the popup */}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer></>
    )
}