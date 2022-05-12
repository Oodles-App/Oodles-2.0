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

  return (
      <div>
          <h1>Browse</h1>
          <p>Location: </p>
          <button type="button" name="List">List</button>
          <button type="button" name="Map">Map</button>
          <div id="map">   
            <Map restaurants={restaurants}/> 
          </div>
          <p>Restaurant Info</p>

      </div>
  )
}

export default React.memo(Browse)