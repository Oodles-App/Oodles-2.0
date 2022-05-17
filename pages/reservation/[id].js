import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import DatePicker from 'sassy-datepicker';

// export default async function makeReservation(req, res) {
//   const prisma = new PrismaClient({log: ["query"]})
//   try {
//     //const reservationObj = JSON.parse(req.body);
//     const { reservation: reservationData } = req.body;
//     const reservation = await prisma.reservation.create({
//       data: {
//         pickupTime: Number(reservationData.pickupTime),
//         status: "ACTIVE",
//         userId: Number(reservationData.userId)
//       }
//     });
//     res.status(201);
//     res.json({reservation});
//   } catch(error) {
//     console.log(error);
//     res.status(500);
//     res.json({error: "Unable to save reservation to database"})
//   } finally {
//     await prisma.$disconnect()
//   }

// }

import React, {useState} from 'react'

export const getServerSideProps = async({params}) => {
  const products = await prisma.product.findMany({
      where: {
          userId: parseInt(params.id)
      }
  })
  return {
      props: {
          productsList: JSON.parse(JSON.stringify(products))
      },
  }

}

export default function Reservation ({productsList}) {
  const [products, setProducts] = useState(productsList)
  const [date, setDate] = useState(new Date())  
  const [visible, setVisible] = useState(false);

  
  const togglePicker = () => setVisible((v) => !v);
  const handleDateSelect = (newDate) => {
    setDate(newDate);
    setVisible(false);
  };

 
  return (
    <div>   
      <div style={{textAlign:"center"}}>Make a Reservation!</div>
      <br></br>
      <p>Products:</p>
      <br></br>
      <div>
        {/* Tried to use this method: https://www.w3schools.com/html/tryit.asp?filename=tryhtml_lists_description */}
        {products.length !== 0 ? products.map((product) => (
              <div key={product.id}>
                <div key={product.id} >
                    <li>{product.name}</li>
                    <>
                      <label id="quantity-input" htmlFor="quantity">
                        Quantity:
                        <input
                          type="number"
                          id="quantity"
                          value={0}
                          onChange={()=>{}}
                          style={{width:"20px"}}
                        />
                      </label>
                    </>    
                </div>
              </div>

          )) 
          : (<p>No products available. Check again tomorrow!</p>)
        }
        {products.length === 0 ? null : (
          <div>
              <button
              // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_round_buttons
              style={{borderRadius:"8px",backgroundColor:"#04AA6D",color: "white", padding:"5px", textAlign:"center"}}
              onClick={togglePicker}
              type="button"
              >
                <p>Choose Date:</p>
              </button>
              <p className="inline">{date.toDateString()}</p>
              {visible ? (
                <DatePicker
                  selected={date}
                  onChange={handleDateSelect}
                  minDate={new Date(2021, 10, 16)}
                />
              ) : null}
          </div>
        // <div>
        // <div>Available Days:</div>
        // {/* <DatePicker 
        // // https://kiarash-z.github.io/react-modern-calendar-datepicker/docs/core-concepts
        //   value={selectedDay} 
        //   onChange={setSelectedDay}
        //   inputPlaceholder="Select a day"
        //   /> */}
        //   <DatePicker value={selectedDay} onChange={setSelectedDay} />

            
        // </div>) 
        )}
        
      </div>
      </div>
  )
    
}
