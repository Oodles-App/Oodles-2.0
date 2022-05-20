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
  const [reservations, setReservations] = useState({reservationsInfo})
  const [usersReservations, setUsersReservations] = useState([])
  const user = useSelector((state) => state.user); 
  console.log("updated here", usersReservations)

  function findUsersReservations(reservations) {
    //got into reservation array 
    const reservationsArray = reservations.reservationsInfo
      const usersReservations = reservationsArray.filter((reservation) => {
        return reservation.userId === user.id
      })
      setUsersReservations(usersReservations)
  }

  

  return (
    <div>
      {/* {findUsersReservations(reservations, user)} */}
      <h1>History</h1>
{/* 
      <div className="history" style={styles.history}>
        <table className="historyTable">
          <tbody>
            <tr>
              <th id="organizationName">Name</th>
              <th id="status">Age</th>
              <th id="date">Gender</th>
            </tr>
            <tr>
              <td id="organizationName">Anom</td>
              <td id="status">19 </td>
              <td id="date">Male</td>
            </tr>
            <tr>
              <td id="organizationName">Megha</td>
              <td id="status">19</td>
              <td id="date">Female</td>
            </tr>
            <tr>
              <td id="organizationName">Subham</td>
              <td id="status">25</td>
              <td id="date">Male</td>
            </tr>
          </tbody>
        </table>
      </div> */}
        
        {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div style={{border:"1px solid black", padding: "5px"}}>Name of the organization/Restaurant</div>
            <div style={{border:"1px solid black", padding: "5px"}}>Status</div>
            <div style={{border:"1px solid black", padding: "5px"}}>Date</div>
             
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          <p style={{border:"1px solid black", padding: "5px"}}>organization name</p>
          <p style={{border:"1px solid black", padding: "5px"}}>organization status</p>
          <p style={{border:"1px solid black", padding: "5px"}}>organization date</p>
        </div> */}

       
    </div>
  )
}

// function findUsersReservations(reservations) {
//   //got into reservation array 
//   const reservationsArray = reservations.reservationsInfo
//   //filter reservations by userId
//   if (reservationsArray.length === 0) {
//     setUsersReservations([])
//   } else {
//     const usersReservations = reservationsArray.filter((reservation) => {
//       return reservation.userId === user.id
//     })
//     setUsersReservations(usersReservations)
//   }

// }

