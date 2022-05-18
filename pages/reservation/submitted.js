import React from 'react'

export default function SubmittedForm() {
  return (
    <div style={{textAlign:"center"}}>
        <h1>Your Reservation has been confirmed!</h1>
        <button type="button" style={{border:"1px solid black"}} onClick={() => {router.push("/browse")}}>Back</button>
    </div>
  )
}
