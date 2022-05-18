import prisma from "../../../db";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = async({params}) => {
        const restaurant = await prisma.user.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })
        const products = await prisma.product.findMany({
            where: {
                userId: parseInt(params.id)
            }
        })
        return {
            props: {
                restaurantInfo: JSON.parse(JSON.stringify(restaurant)),
                productsList: JSON.parse(JSON.stringify(products))
            },
        }
   
}

const Restaurant = ({restaurantInfo, productsList}) => {
    const [restaurant, setRestaurants] = useState(restaurantInfo)
    const [products, setProducts] = useState(productsList)
    const router = useRouter();

    return (
      <div>
          <div>
              <Image src="/restaurant.png" alt="Food Banner" width="50%" height="50%" style={{justifyItems:'center'}}/>
              <h1>{restaurant.businessName}</h1>
              <p>{restaurant.address}</p>
              <p>{restaurant.contactNum}</p>
              <div>
                  <p>Bio:</p>
              </div>
              <div>
                  <p>Products</p>
                  {products.map((product) => (
                      <div key={product.id}>
                          <p>{product.name}</p>
                      </div>
                  ))}
              </div>

          </div>
          <Link href={{pathname: `/reservation/${restaurant.id}`}} style={{border:"1px solid black"}}>Reserve</Link>
          <button type="button" style={{border:"1px solid black"}} onClick={() => {router.push("/browse")}}>Back</button>
      <button
        type="button"
        style={{ border: "1px solid black" }}
        onClick={() => {
          router.push("/liveChat");
        }}
      >
        Live Chat
      </button>
    </div>
  );
};



export default Restaurant;


