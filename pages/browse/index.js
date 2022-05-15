import React, { useState, useRef } from 'react'
import dynamic from "next/dynamic"
import {PrismaClient} from '@prisma/client'
import Restaurants from './restaurants';
const prisma = new PrismaClient();


const Map = dynamic(() => import ("../../components/map"), {ssr:false})

export async function getStaticProps() {
  const restaurants = await prisma.user.findMany({
    where: {
      businessType: {
        equals: 'RESTAURANT'
      }
    }
  });
  return {
    props: {
      initialRestaurants: JSON.parse(JSON.stringify(restaurants))
    }
  }
}

function Browse({initialRestaurants}) {
  const [restaurants, setRestaurants] = useState(initialRestaurants)
  const [toggleMap, setToggleMap] = useState(true)
  const [search, setSearch] = useState("")

  return (
      <div>
        <br></br>
        <div className="Browse">
          <h1 style={{"textAlign":"center"}}>Browse</h1>
          <br></br>
          <p>Location: New York, NY</p>
          <br></br>
        </div>
        <div className="browseButtons">
          <button id="mapId" type="button" name="Map" onClick={()=> {setToggleMap(true)}}>Map</button>
          <button  id="list" type="button" name="List" onClick={() => {setToggleMap(false)}}>List</button>
        </div>
      {/* Search Bar */}
      <br></br>
      <input id="search" type="text" placeholder="Search by Restaurant" name="search" onChange={e => setSearch(e.target.value)} />


      {/* maps will be used more for closer distance */}
          {toggleMap ? <div><br></br><Map restaurants={restaurants}></Map> </div>
          : (<div className="restaurants">
            <br></br>
            <ul>
              {/* 
              filter searchbar by restaurants.
              filter tags with a dropdown bar
               */}
              <Restaurants restaurants={restaurants}/>
            </ul>

          </div>) }
  
      </div>
  )
}

export default React.memo(Browse)