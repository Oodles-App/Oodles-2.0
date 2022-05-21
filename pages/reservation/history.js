/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import prisma from "../../db";
import styles from "../../styles/History.module.css"

export const getServerSideProps = async () => {
    const reservations = await prisma.reservation.findMany();
    
    return {
      props: {
        reservationsInfo: JSON.parse(JSON.stringify(reservations))
      },
    };
  };


export default function History ({reservationsInfo}){
  const initialReservationList = useState({reservationsInfo})
  // const [usersReservations, setUsersReservations] = useState([])
  const user = useSelector((state) => state.user); 
  // console.log("users", user)
  const reservations = initialReservationList[0].reservationsInfo
  const usersReservation = reservations.filter((reservation) => {
    return reservation.userId === user.id
  })

  return (
    <div>
      <h1 style={{textAlign:"center", fontSize:"40px"}}>History</h1>
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
                //create links to these reservations to allow users to see what they reserved and other reserved infos
                <tr key={reservation.id}>
                  <th id={styles.text}>organization's name is missing in reservation</th>
                  <th id={styles.text}>{reservation.status}</th>
                  <th id={styles.text}>{reservation.pickupTime}</th>
                </tr>
              ) )
            }
          </tbody>
        </table>
      </div> 
    </div>
  )
}

