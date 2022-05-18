import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import prisma from "../../db";

const Map = dynamic(() => import("../../components/map"), { ssr: false });

export async function getStaticProps() {
  const restaurants = await prisma.user.findMany({
    where: {
      businessType: {
        equals: "RESTAURANT",
      },
    },
  });
  const organizations = await prisma.user.findMany({
    where:{ 
      businessType: {
        equals: 'organization'
      }
    }
  });
  return {
    props: {
      initialRestaurants: JSON.parse(JSON.stringify(restaurants)),
      initialOrganizations: JSON.parse(JSON.stringify(organizations))
    }
  }
}

function Browse({initialRestaurants, initialOrganizations}) {
  const [restaurants, setRestaurants] = useState(initialRestaurants)
  const [organizations, setOrganizations] = useState(initialOrganizations)
  const [toggleMap, setToggleMap] = useState(true)
  const [filteredResults, setFilteredResults] = useState(initialRestaurants)
  const [display, setDisplay] = useState("Restaurants")
  const user = useSelector((state) => state.user); 
  console.log(organizations)


  function searchRestaurant(value) {
    if (value !== "") {
      const filteredRestaurants = restaurants.filter((restaurant) => {
        return Object.values(restaurant)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setFilteredResults(filteredRestaurants);
    } else {
      setFilteredResults(restaurants);
    }
  }
  function handleChange(e) {
    setDisplay(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  
  return (
    <div>
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
          <form action="#" style={{textAlign:"center"}} onSubmit={handleSubmit}>
                  <label htmlFor='uses'>Select:</label>
                  <select value={display} onChange={handleChange}>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Organizations">Organizations</option>
                  </select>
          <input type="submit"/>
          </form>
      <br></br>
      {display === "Restaurants" ? (
        //restaurants 
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
      ) : (
        <p>Sorry, no organizations to show yet</p>      
        //organizations
        
        // <div>
        //   {toggleMap ? <div><Map organizations={organizations}></Map> </div>
        //   : <div>
        //     <input id="search" type="text" placeholder="Search by Organization" name="search" />
        //     <div>
        //       {/* search bar for organization doesn't work yet */}
        //       <br></br>
        //       {/* organizations not showing up */}
        //       <div>
        //         {organizations.map((organization) => {
        //             <Link href="/browse/nonProfitOrg/[id]" as={`/browse/nonProfitOrg/${organization.id}`} key={organization.id} organization={organization.id}>
        //             <p key={organization.id}>{organization.businessName}</p>
        //             </Link> 
        //         })
        //         }
        //       </div>
        //     </div>
        //     </div>
        //     }
        // </div>
    
      )}
      
      </div>
    </div>
    
  )
}

function filterRestaurants(filteredResults) {
  const filter = filteredResults.map((restaurant) => (
    <Link
      href="/browse/restaurants/[id]"
      as={`/browse/restaurants/${restaurant.id}`}
      key={restaurant.id}
      restaurant={restaurant.id}
      state={{ restaurant: restaurant }}
    >
      <p key={restaurant.id}>{restaurant.businessName}</p>
    </Link>
  ));
  return filter;
}

export default React.memo(Browse);
