import React from 'react'
import { MapContainer, TileLayer, Popup, Marker, useMap, useLeaflet} from 'react-leaflet';
// import "leaflet/dist/leaflset.css"
import { useEffect } from 'react';
import L from "leaflet";

export default function Map() {

  return (
    <div id="map" >
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} >
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          accessToken='pk.eyJ1IjoiYnVzdWh0ODMiLCJhIjoiY2wzMXE5NmdvMjIzMjNsbXV2bmdocXduMiJ9.xgMMsvbz_5VqqpadcYpmzg'
      />
      <Marker position={[51.505, -0.09]}>
          <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
      </Marker>
      </MapContainer>
    </div>
    
  )
}