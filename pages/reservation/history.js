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

  console.log("reservation", reservations)
 
  // //converts initial reservations into array.
  // const reservationsArray = reservations.reservationsInfo
  // //filters reservations by current user's id.
  // setUsersReservations(reservationsArray.filter((reservation) => {
  //     return reservation.userId === user.id
  //   }))

  // console.log("filteredReservations", usersReservations)



  

  return (
    <div>
      {/* {findUsersReservations(reservations, user)} */}
      <h1>History</h1>

      <div className={styles.history}>
        <table className={styles.historyTable}>
          <tbody>
            <tr>
              <th id={styles.organizationName}>Organization's Name </th>
              <th id={styles.status}>Age</th>
              <th id={styles.status}>Gender</th>
            </tr>
            <tr>
              <td id={styles.text}>Anom</td>
              <td id={styles.text}>19 </td>
              <td id={styles.text}>Male</td>
            </tr>
    
          </tbody>
        </table>
      </div>
        
      {/*  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      //       <div style={{border:"1px solid black", padding: "5px"}}>Name of the organization/Restaurant</div>
      //       <div style={{border:"1px solid black", padding: "5px"}}>Status</div>
      //       <div style={{border:"1px solid black", padding: "5px"}}>Date</div>
             
      //   </div>
      //   <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      //     <p style={{border:"1px solid black", padding: "5px"}}>organization name</p>
      //     <p style={{border:"1px solid black", padding: "5px"}}>organization status</p>
      //     <p style={{border:"1px solid black", padding: "5px"}}>organization date</p>
      //   </div> */}

       
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

