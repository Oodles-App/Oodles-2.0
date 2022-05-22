/* eslint-disable react/no-unescaped-entities */
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

export default function Reservation ({initialProducts, restaurantInfo}) {
const [products, setProducts] = useState(initialProducts)
const [restaurant] = useState(restaurantInfo)
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

const handleFormSubmit = (e, restaurant) => {
  e.preventDefault();
  try {
    fetch('../api/reservation/addReservation', {
      body: JSON.stringify({
        reservation: {
          pickupTime: date.toDateString(),
          organizationId: user.id,
          restaurantId: restaurant.id,
          cart
        }
      }),
      method: 'POST'
    })
    router.push("/reservation/submitted")
  } catch (error) {
    console.log("error in creating new product", error);
  }
}

const handleValue = (event, productInfo) => {
  const quantity = parseInt(event.target.value)
  const product = productInfo 
  
    // if (quantity <= product.amount) {
    //   if (cart[product.name]) {
    //     cart[product.name].quantity = quantity
    //   } else {
    //     cart[product.name] = {product, quantity}
    //   }
    //   console.log("cart", cart)
    // } else {
    //   alert(`Exceeded amount from current Inventory. Please change your quantity.`)
    // }
  



  try {
    fetch('../api/products/updateProduct', {
      body:JSON.stringify({
        product: {
          product,
          quantity,
        }
      }),
      method:'PUT'
    })
    if (quantity <= product.amount) {
      if (cart[product.name]) {
        cart[product.name].quantity = quantity
      } else {
        cart[product.name] = {product, quantity}

      }
      console.log("cart", cart)
    } else {
      alert(`Exceeded amount from current Inventory. Please change your quantity.`)
    }

  } catch (err) {
    console.log("error in updating product in reservation", err)
  }


}

// const handleValue = (event, product) => {
//   // change cart to {} if using this way.
//   const quantity = parseInt(event.target.value)
//   console.log(typeof product.amount)

//   setValue(quantity)

//   if (quantity <= product.amount) {
//     if (cart[product.name]) {
//       cart[product.name].quantity = quantity
//     } else {
//       cart[product.name] = {product, quantity}
//     }
//     console.log("cart", cart)
//   } else {
//     alert(`Exceeded amount from current Inventory. Please change your quantity.`)
//   }
// }

// function handleChange(event, product) {
//   const quantity = parseInt(event.target.value) 
//   console.log(product)
//   console.log(cart) 

//   if (quantity <= product.amount) {
//     if (cart[product.name]) {
//       cart[product.name].quantity = quantity 
//     } else {

//     }
//   }

  

// }

return (
  <div>   
    <div style={{textAlign:"center"}}>Make a Reservation!</div>
    <h3>{restaurant.businessName}'s Products:</h3>
        <br></br>
      <p>Please input the quantity in order for your reservation to proceed.</p>
      <br></br>
    <form onSubmit={(event) => handleFormSubmit(event, restaurant)}> 
          {/* Tried to use this method: https://www.w3schools.com/html/tryit.asp?filename=tryhtml_lists_description */}
          <div>
          {products.length !== 0 ? products.map((product) => (
                  <div key={product.id} >
                      <li style={{listStyleType:"circle", display:"list-items"}}>{product.name}</li>
                      <p>Inventory: {product.amount}</p>
                      <>
                      <div>
              
                          <label id="quantity-input" htmlFor="quantity">
                            Quantity:
                            <input
                              type="number"
                              id="quantity"
                              min={0}
                              max={product.amount}
                              value={product.value}
                              onChange={(event) => handleValue(event, product)}
                            />
                          </label>
           
                        </div>
                        {/* <label id="quantity-input" htmlFor="quantity">
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
                        </label> */}
                      </>    
                  </div>
                )) 
                : (<p>No products available. Check again tomorrow!</p>)
              }
          </div>
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


            <button type="submit" style={{border:"1px solid black"}}> Reserve</button>
    </form>
  </div>
      )
}
