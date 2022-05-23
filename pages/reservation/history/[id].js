/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import prisma from "../../../db"
import styles from "../../../styles/History.module.css"



export const getServerSideProps = async ({ params }) => {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    const restaurants = await prisma.user.findMany({
      where: {
        businessType: {
          equals: "RESTAURANT",
        },
      },
    });
  
    return {
      props: {
        initialReservation: JSON.parse(JSON.stringify(reservation)),
        restaurantList: JSON.parse(JSON.stringify(restaurants))
      },
    };
  };
const SingleReservation = ({initialReservation, restaurantList})  => {
    const [reservation, setSingleReservation] = useState(initialReservation)
    const cart = reservation.cart
    const restaurant = restaurantList.filter((restaurant) => {
      return restaurant.id === reservation.restaurantId
    })

  return (
    <div>
        <div style={{textAlign:"center"}}>
            <div>
            <h1 style={{fontSize:"25px"}}>Order#: {reservation.id}</h1>
            </div> 
            <br></br>
            <div>Order Date: {reservation.reserveTime}</div>
            <p>Orders from: {restaurant[0].businessName}</p>
            <p>Pickup Date: {reservation.pickupTime}</p>
            <br></br>
            <p>Items Reserved: </p>
        </div>
        <div className={styles.history}>
            <table className={styles.historyTable}>
            <tbody>
                <tr>
                <th id={styles.organizationName}>Items </th>
                <th id={styles.status}>Quantity</th>
                <th id={styles.status}>Measurement</th>
                </tr>
                    {mappedCart(cart)}
            </tbody>
            </table>
        </div> 
        <button
        type="button"
        style={{ border: "1px solid black" }}
        onClick={() => {
          router.push("/reservation/history");
        }}
      >
        Back
      </button>

    </div>
   
  )
}

export default SingleReservation

function mappedCart(cart) {
    const products = []
    for (let item in cart) {
        products.push(cart[item])
    }
    if (products.length === 0) {
        return null 
    } else {
        return products.map((product) => (
            <tr key={product.product.id}>
                <th id={styles.text}>{product.product.name}</th>
                <th id={styles.text}>{product.quantity}</th>
                <th id={styles.text}>{product.product.measurement}</th>
            </tr>
        ))
    }
}