import React, { useState, useRef, useEffect } from 'react'
import dynamic from "next/dynamic"
import Link from 'next/link'

import {PrismaClient} from '@prisma/client'
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
  const [filteredResults, setFilteredResults] = useState(initialRestaurants)

  function searchRestaurant(value) {
    if(value !== "") {
      const filteredRestaurants = restaurants.filter((restaurant) => {
        return Object.values(restaurant).join('').toLowerCase().includes(value.toLowerCase())
      })
      setFilteredResults(filteredRestaurants)
    } else {
      setFilteredResults(restaurants)
    }
  }
  
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
        <br></br>
        <div>
          {toggleMap ? <div><Map restaurants={restaurants}></Map> </div>
          : <div>
            <input id="search" type="text" placeholder="Search by Restaurant" name="search" onChange={(e)=>searchRestaurant(e.target.value)} />
            <div>
              <br></br>
              {filterRestaurants(filteredResults)}
            </div>
            </div>
           }
        </div>
        </div>
  )
}

function filterRestaurants(filteredResults) {
  const filter = filteredResults.map((restaurant) => (
    <Link href="/browse/restaurants/[id]" as={`/browse/restaurants/${restaurant.id}`}key={restaurant.id} restaurant={restaurant.id} state={{restaurant:restaurant}}>
    <p key={restaurant.id}>{restaurant.businessName}</p>
    </Link> 
  ))
  return filter
}

export default React.memo(Browse)