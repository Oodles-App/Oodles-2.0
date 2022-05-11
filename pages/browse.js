import React from 'react'
import dynamic from "next/dynamic"

const Map = dynamic(() => import ("../components/map"), {ssr:false})

function Browse() {

  return (
      <div>
          <h1>Browse</h1>
          <p>Location: </p>
          <button type="button" name="List">List</button>
          <button type="button" name="Map">Map</button>
          <div id="map">   
            <Map/> 
          </div>
  
       
          <p>Restaurant Info</p>

      </div>
  )
}

export default React.memo(Browse)