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
  
    return {
      props: {
        initialReservation: JSON.parse(JSON.stringify(reservation)),
      },
    };
  };
const SingleReservation = ({initialReservation})  => {
    const [reservation, setSingleReservation] = useState(initialReservation)
    const cart = reservation.cart
  return (
    <div>
        {/* add order number to reservations to display on reservation. */}        <div>Order#: **let's create one with random number**</div>
        <div>Order Date: {reservation.reserveTime}</div>
        {/* no user underneath reservation */}
        <p>Orders from: **Missing restaurant owner**</p>
        <p>Pickup Date: {reservation.pickupTime}</p>
        <p>Items Reservered: </p>
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