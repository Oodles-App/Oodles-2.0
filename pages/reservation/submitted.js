import React from 'react'
import { useRouter } from 'next/router';
import styles from "../../styles/Submitted.module.css";

export default function SubmittedForm() {
    const router = useRouter();
    return (
    <div className={styles.bodyBgd} >
      <div style={{textAlign:"center"}} className={styles.blueBlock}>
        <h1>Your Reservation has been confirmed!</h1>
        <br></br>
        <button type="button" style={{border:"1px solid black", paddingLeft:"2rem", paddingRight:"2rem", borderRadius:"10px", backgroundColor:"white"}} onClick={() => {router.push("/browse")}}>Back to Browse</button>
      </div>
    </div>
  )
}