import React, {useState} from 'react'
import Link from 'next/link'

export default function Restaurants(props)  {
  const [restaurants, setRestaurants] = useState(props.restaurants)
  return (
    <div> 
      {listRestaurants(restaurants)}
    </div>

  )
}

function listRestaurants(restaurants) {
  if (restaurants.length === 0) {
    return "No Restaurants"
  } else {
    return (
      <div>
        {restaurants.map((restaurant) => (
          <Link href="/browse/restaurants/[id]" as={`/browse/restaurants/${restaurant.id}`}key={restaurant.id} restaurant={restaurant.id} state={{restaurant:restaurant}}>
           <p key={restaurant.id}>{restaurant.businessName}</p>
          </Link> 
        )
        )}
      </div>
    )
  }
}