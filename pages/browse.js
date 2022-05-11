import React from 'react'
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 40.712776,
  lng: -74.005974
};

function Browse() {
  return (
      <div>
          <h1>Browse</h1>
          <p>Location: </p>
          <button type="button" name="List">List</button>
          <button type="button" name="Map">Map</button>
          <div id="map"> 
    
          </div>
          <p>Restaurant Info</p>

      </div>
  )
}

export default React.memo(Browse)