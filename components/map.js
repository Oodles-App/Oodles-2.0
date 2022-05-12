import React from 'react'
import { MapContainer, TileLayer, Popup, Marker, useMap, useLeaflet} from 'react-leaflet';
import { useState } from 'react';


export default function Map(props) {
  const [restaurants, setRestaurants] = useState(props.restaurants)
  // console.log("props here", restaurants)

  return (
    <div id="map" >
      <MapContainer center={[40.735360, -73.989970]} zoom={11} scrollWheelZoom={false} >
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          accessToken='pk.eyJ1IjoiYnVzdWh0ODMiLCJhIjoiY2wzMXE5NmdvMjIzMjNsbXV2bmdocXduMiJ9.xgMMsvbz_5VqqpadcYpmzg'
      />
      <Markers data={restaurants}/>
      </MapContainer>
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
          </Popup>
        </Marker>
      );
    })
  );
}