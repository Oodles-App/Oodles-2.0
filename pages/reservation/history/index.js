/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import prisma from "../../../db";
import styles from "../../../styles/History.module.css"
import Link from 'next/link';

export const getServerSideProps = async () => {
    const reservations = await prisma.reservation.findMany();
    const restaurants = await prisma.user.findMany({
      where: {
        businessType: {
          equals: "restaurant",
        },
      },
    });
    
    return {
      props: {
        reservationsInfo: JSON.parse(JSON.stringify(reservations)),
        restaurantList: JSON.parse(JSON.stringify(restaurants))
      },
    };
  };


export default function History ({reservationsInfo, restaurantList}){
  const initialReservationList = useState({reservationsInfo})
  const user = useSelector((state) => state.user); 
  const reservations = initialReservationList[0].reservationsInfo
  const usersReservation = reservations.filter((reservation) => {
    return reservation.organizationId === user.id
  })

  const findRestaurant = (id) =>  {
    const restaurant = restaurantList.filter((restaurant) => {
      return restaurant.id === id
    })
    return restaurant[0]
  }

  return (
    <div>
      <h1 style={{textAlign:"center", fontSize:"40px"}}>History</h1>
      {usersReservation.length === 0 ? (<div>
        <br></br> <p style={{textAlign:"center"}}>No History Available.</p>
        </div>) 
      :(
      <div className={styles.history}>
        <table className={styles.historyTable}>
          <tbody>
            <tr>
              <th id={styles.organizationName}>Organization's Name </th>
              <th id={styles.status}>Status</th>
              <th id={styles.status}>Date</th>
            </tr>

            {usersReservation.length === 0 ? null : 
              usersReservation.map((reservation) => (
                <Link key={reservation.id} href="/reservation/history/[id]" as={`/reservation/history/${reservation.id}`} >
                <tr key={reservation.id}>
                  <th id={styles.text}>{findRestaurant(reservation.restaurantId).businessName}</th>
                  <th id={styles.text}>{reservation.status}</th>
                  <th id={styles.text}>{reservation.pickupTime}</th>
                </tr>
                </Link>
              ) )
            }
          </tbody>
        </table>
      </div> )}
    </div>
  )
}

