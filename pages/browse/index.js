import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BusinessType } from "@prisma/client";
import prisma from "../../db";
import styles from "../../styles/Browse.module.css";

const Map = dynamic(() => import("../../components/map"), { ssr: false });

export async function getStaticProps() {
  const restaurants = await prisma.user.findMany({
    where: {
      businessType: {
        equals: BusinessType.RESTAURANT,
      },
    },
  });
  const organizations = await prisma.user.findMany({
    where: {
      businessType: {
        equals: BusinessType.ORGANIZATION,
      },
    },
  });
  return {
    props: {
      initialRestaurants: JSON.parse(JSON.stringify(restaurants)),
      initialOrganizations: JSON.parse(JSON.stringify(organizations)),
    },
  };
}

function Browse({ initialRestaurants, initialOrganizations }) {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [toggleMap, setToggleMap] = useState(true);
  const [display, setDisplay] = useState("Restaurants");
  const [filteredResults, setFilteredResults] = useState(initialRestaurants);
  const [filteredOrganizations, setFilteredResultsO] = useState(initialOrganizations)

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

  function searchOrganizations(value) {
    if (value !== "") {
      const filteredOrganizations = organizations.filter((organization) => {
        return Object.values(organization)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setFilteredResultsO(filteredOrganizations);
    } else {
      setFilteredResultsO(organizations);
    }
  }

  function handleChange(e) {
    setDisplay(e.target.value)
  }

  return (
    <div className={styles.center}>
      <br></br>
      <div className="Browse">
        <h1 style={{ textAlign: "center" }}>Browse</h1>
        <br></br>
        <p>Location: New York, NY</p>
        <br></br>
      </div>
      <div className="browseButtons">
        <button
          id="mapId"
          type="button"
          name="Map"
          onClick={() => {
            setToggleMap(true);
          }}
        >
          Map
        </button>
        <button
          id="list"
          type="button"
          name="List"
          onClick={() => {
            setToggleMap(false);
          }}
        >
          List
        </button>
      </div>
      <br></br>
      <div style={{textAlign:"center"}}>
        <label htmlFor='uses'>Select:</label>
        <select value={display} onChange={handleChange}>
          <option value="Restaurants">Restaurants</option>
          <option value="Organizations">Organizations</option>
        </select>
      </div>
      <div>
      <br></br>

        {display === "Restaurants" ? (
          <div>
          {toggleMap ? <div><Map restaurants={restaurants}></Map> </div>
          : <div>
            <input className={styles.roundedInput} id="search" type="text" placeholder="Search by Restaurant" name="search" onChange={(e)=>searchRestaurant(e.target.value)} />
            <div>
              <br></br>
              {filterRestaurants(filteredResults)}
            </div>
            </div>
          }
        </div>
      ) : (
        <div>
          {toggleMap ? null : (
            <div>
            <input id="search" type="text" placeholder="Search by Organization" name="search" onChange={(e)=>searchOrganizations(e.target.value)} />
            <div>
                {filterOrganizations(filteredOrganizations)}
              {/* <ul>
                {organizations.map((organization) => (
                   <Link
                   href="/browse/nonProfitOrg/[id]"
                   as={`/browse/nonProfitOrg/${organization.id}`}
                   key={organization.id}
                   organization={organization.id}
                 >
                   <p key={organization.id}>{organization.businessName}</p>
                 </Link>
                ))}
              </ul> */}
              </div>
            </div>
          )}
        </div>
      )}

      </div>
    </div>

  );
}

function filterRestaurants(filteredResults) {
  const filter = filteredResults.map((restaurant) => (
    <div key={restaurant.id} className={styles.cardItem}>
    <Link
      href="/browse/restaurants/[id]"
      as={`/browse/restaurants/${restaurant.id}`}
      key={restaurant.id}
      restaurant={restaurant.id}
      state={{ restaurant: restaurant }}
    >
      <p key={restaurant.id}>{restaurant.businessName}</p>
    </Link>
    </div>
  ));
  return filter;
}

function filterOrganizations(filteredOrganizations) {
  const filter = filteredOrganizations.map((organization) => (
    <div key={organization.id} className={styles.cardItem}>
    <Link
      href="/browse/nonProfitOrg/[id]"
      as={`/browse/nonProfitOrg/${organization.id}`}
      key={organization.id}
      organization={organization.id}
    >
      <p key={organization.id}>{organization.businessName}</p>
    </Link>
    </div>
  ));
  return filter;
}


export default React.memo(Browse);
