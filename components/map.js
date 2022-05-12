import React from 'react'
import { MapContainer, TileLayer, Popup, Marker, useMap, useLeaflet} from 'react-leaflet';
// import "leaflet/dist/leaflset.css"
import { useEffect } from 'react';
import L from "leaflet";



export default function Map(props) {
  const restaurants = props
  console.log("props here", restaurants)

  return (
    <div id="map" >
      <MapContainer center={[40.712776, -74.005974]} zoom={13} scrollWheelZoom={false} >
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          accessToken='pk.eyJ1IjoiYnVzdWh0ODMiLCJhIjoiY2wzMXE5NmdvMjIzMjNsbXV2bmdocXduMiJ9.xgMMsvbz_5VqqpadcYpmzg'
      />
      {/* <Marker position={[restaurants[0].lat, restaurants[0].lng]}>
          <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
      </Marker> */}
      {/* <Markers data={restaurants}/> */}
      </MapContainer>
    </div>
    
  )
}

//fakeData//
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
                  restaurant.x,
                  restaurant.y
                ],
                14
              );
              map.flyTo([restaurant.x, restaurant.y], 14, {
                animate: true,
                duration: 2 // in seconds
              })
            }
          }}
          key={restaurant.name}
          position={{
            lat: restaurant.x,
            lng: restaurant.y
          }}
        >
          <Popup>
            <span>{restaurant.name}</span>
          </Popup>
        </Marker>
      );
    })
  );
}