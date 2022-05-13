import React, { useState } from 'react'
import dynamic from "next/dynamic"
// import "../components/map.module.css"'
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient();

const Map = dynamic(() => import ("../components/map"), {ssr:false})

export async function getStaticProps() {
  const restaurants = await prisma.user.findMany();
  return {
    props: {
    initialRestaurants: JSON.parse(JSON.stringify(restaurants))
  }
}
}

function Browse({initialRestaurants}) {
  const [restaurants, setRestaurants] = useState(initialRestaurants)
  const [toggleList, setToggleList] = useState(true)

  return (
      <div>
        <div className="Browse">
          <h1>Browse</h1>
          <p>Location: </p>
        </div>
        <div className="browseButtons">
          <button id="list" type="button" name="List" onClick={()=> {setToggleList(true)}}>List</button>
          <button  id="mapId" type="button" name="Map" onClick={() => {setToggleList(false)}}>Map</button>
        </div>
        
        {toggleList ?
          <p>List of Restaurants</p> : <Map restaurants={restaurants}></Map>}
          {/* <div id="map">   
          <Map restaurants={restaurants}/> 
          </div> */}

      </div>
  )
}

export default React.memo(Browse)