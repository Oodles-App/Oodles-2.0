import React from 'react'
import { useRouter } from 'next/router';


export default function SubmittedForm() {
    const router = useRouter();
    return (
    <div style={{textAlign:"center"}}>
        <h1>Your Reservation has been confirmed!</h1>
        <button type="button" style={{border:"1px solid black"}} onClick={() => {router.push("/browse")}}>Back to Browse</button>
    </div>
  )
}
