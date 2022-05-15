import React, { useState, useRef } from 'react'
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
  const [toggleMap, setToggleMap] = useState(true)
  const [search, setSearch] = useState("")
  console.log(typeof restaurants)
  console.log(restaurants[0])

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
              {/* Lists will be searched more by tags and restaurant names */}
              {/* {search ? restaurants.filter((restaurant) => restaurant.businessName.toLowerCase().includes(search.toLowerCase()) )
              : restaurants.map((restaurant) => {
                return (
                  <div key ={restaurant.id} >
                    {/* when restaurant clicks, it will have a dropdown menu listing products tags and a link directly to the restaurant.*/}
                    {/* <li style={{textAlign:"center"}}> {restaurant.businessName}</li>
                  </div>
             
                )
              })} */}
              {/* {restaurants.filter((restaurant) => restaurant.businessName === search) } */}
              {restaurants && restaurants.map((restaurant) => {
                return (
                  <div key ={restaurant.id} >
                    {/*{when restaurant clicks, it will have a dropdown menu listing products tags and a link directly to the restaurant.*/}
                  <li style={{textAlign:"center"}}> {restaurant.businessName}</li>
                  </div>
             
                )
              })}
            </ul>

          </div>) }
  
      </div>
  )
}

export default React.memo(Browse)