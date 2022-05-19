import React from 'react'
import prisma from "../../db";
import { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from 'sassy-datepicker';
import { useRouter } from "next/router";

export const getServerSideProps = async ({ params }) => {
  const restaurant = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  const products = await prisma.product.findMany({
      where : {
          userId: parseInt(params.id),
      }
  })
  return {
    props: {
      restaurantInfo: JSON.parse(JSON.stringify(restaurant)),
      initialProducts: JSON.parse(JSON.stringify(products))
    },
  };
};

export default function Reservation ({initialProducts}) {
const [products, setProducts] = useState(initialProducts)
const [date, setDate] = useState(new Date())  
const [visible, setVisible] = useState(false);
const [cart, setCart] = useState({})
const [value, setValue] = useState(0)
const user = useSelector((state) => state.user); 
const router = useRouter();

const togglePicker = () => setVisible((v) => !v);
const handleDateSelect = (newDate) => {
  setDate(newDate);
  setVisible(false);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  try {
    fetch('../api/reservation/addReservation', {
      body: JSON.stringify({
        reservation: {
          pickupTime: date.toDateString(),
          userId: user.id,
          user: user.id,
          cart
        }
      }),
      method: 'POST'
    })
  } catch (error) {
    console.log("error in creating new product", error);
  }
}
const handleValue = (event, product) => {
  const quantity = parseInt(event.target.value)
  // console.log(typeof product.amount)


  setValue(quantity)

  if (quantity <= product.amount) {
    if (cart[product.name]) {
      cart[product.name].quantity = quantity
    } else {
      cart[product.name] = {product, quantity}
    }
    console.log("cart", cart)
  } else {
    console.log("Too much")
  }
}


return (
  <div>   
    <div style={{textAlign:"center"}}>Make a Reservation!</div>
    <br></br>
    <p>Products:</p>
    <br></br>
    <form onSubmit={handleFormSubmit}>
        <p>Products:</p>
        <br></br>
        <div>
          {/* Tried to use this method: https://www.w3schools.com/html/tryit.asp?filename=tryhtml_lists_description */}
          {products.length !== 0 ? products.map((product) => (
                <div key={product.id}>
                  <div key={product.id} >
                      <li>{product.name}</li>
                      <p>Inventory: {product.amount}</p>
                      <>
                        <label id="quantity-input" htmlFor="quantity">
                          Quantity:
                          <input
                            type="string"
                            id="quantity"
                            value={product.value}
                            min={0}
                            max={product.amount}
                            onChange={(event) => handleValue(event, product)}
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
              )}
            <button type="button" style={{border:"1px solid black"}} onClick={() => {router.push("/reservation/submitted")}}>Reserve</button>

            </div>
            </form>
          </div>
      )
}