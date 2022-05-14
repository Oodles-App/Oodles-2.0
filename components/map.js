import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Popup, Marker, useMap, useLeaflet} from 'react-leaflet';
import { useState, useRef} from 'react';




export default function Map(props) {
  const [restaurants, setRestaurants] = useState(props.restaurants)
  const [display, setDisplay] = useState("")
  const [defaultCenter, setDefaultCenter] = useState([40.735360, -73.989970])
  const defaultZoom = 11.5

  return (
    <div>
      {/* <button type="button" style={{border: "1px solid black"}} onClick={()=> {toggle? setToggle(false): setToggle(true)}}>Toggle Live location</button> */}
      <div id="map">
        <MapContainer center={defaultCenter} zoom={defaultZoom} scrollWheelZoom={false} >
          {/* connect an locate me icon to location Marker with "flyto" property */}
          {/* bug in LocationMarker. Will persist to go to current location even if I press on markers */}
        <LocationMarker />

        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            accessToken='pk.eyJ1IjoiYnVzdWh0ODMiLCJhIjoiY2wzMXE5NmdvMjIzMjNsbXV2bmdocXduMiJ9.xgMMsvbz_5VqqpadcYpmzg'
        />
        
          <Markers data={restaurants}/>
        </MapContainer>
      </div>
      <div className="leaflet-controlpanel">

      </div>
      <div id="Restaurant Info">
          <p>Restaurant</p>

      </div>
    </div>
  )
}

function Markers( {data} ) {
  const map = useMap();
  return (
    data.length > 0 &&
    data.map((restaurant) => {
      return (
        <Marker
          eventHandlers={{
            click: () => {
              map.setView(
                [
                  restaurant.lat,
                  restaurant.lng
                ],
                14
              );
              map.flyTo([restaurant.lat, restaurant.lng], 14, {
                animate: true,
                duration: 2 // in seconds
              })
            }
          }}
          key={restaurant.id}
          position={{
            lat: restaurant.lat,
            lng: restaurant.lng
          }}
        >
          <Popup>
            <span>{restaurant.businessName}</span>
            <br></br>
            <span>More Information here</span>
          </Popup>
        </Marker>
      );
    })
  );
}


function LocationMarker(props) {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      {/* <Popup>
        You are here. <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup> */}
    </Marker>
  );
}
