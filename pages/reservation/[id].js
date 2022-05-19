import React from 'react'
import prisma from "../../db";
import { useState } from "react";


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

export default function Reservation({initialProducts}) {
  const [products, setProducts] = useState({initialProducts})
  console.log(products)
  


  return (
    <div>
      <h1>Make Reservation</h1>

    </div>
  )
}
