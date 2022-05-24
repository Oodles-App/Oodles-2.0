import prisma from "../../../db";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

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

const Restaurant = ({ restaurantInfo, initialProducts }) => {
  const user = useSelector((state) => state.user);
  const [restaurant, setRestaurants] = useState(restaurantInfo);
  const [products, setProducts] = useState(initialProducts)
  const router = useRouter();
  console.log(products[0])

  return (
    <div>
      <div>
        <Image
          src="/restaurant.png"
          alt="Food Banner"
          width="50%"
          height="50%"
          style={{ justifyItems: "center" }}
        />
        <h1>{restaurant.businessName}</h1>
        <p>{restaurant.address}</p>
        <p>{restaurant.contactNum}</p>
        <div>
          <p>{restaurant.biography}</p>
          <br></br>
          {products.length !== 0 ? (
            <p>Products: </p>
          ): "Sorry, no products available at the moment"
          }
          <ul>
              { products ? products.map((product) => (
                  <li key={product.id}>{product.name}</li>
              )) : null
            }
          </ul>
        </div>
      </div>
      <br></br>
      <button
        type="button"
        style={{ border: "1px solid black" }}
        onClick={() => {
          router.push("/browse");
        }}
      >
        Back
      </button>
      <div></div>

      <Link href={"/reservation/[id]"} as={`/reservation/${restaurant.id}`}>
          <button type="button" style={{border:"1px solid black"}}>
            Reserve
          </button>
      </Link>

      <button
        type="button"
        style={{ border: "1px solid black" }}
        onClick={async (e) => {
          e.preventDefault();
          try {
            const res = await fetch("../../api/liveChat/createChannel", {
              body: JSON.stringify({
                orgId: user.id,
                restaurantId: restaurant.id,
              }),
              method: "POST",
            });
            const { chatChannel } = await res.json();
            router.push(`/liveChat/${chatChannel.name}`);
          } catch (error) {
            console.log("error in creating new live chat channel", error);
          }
        }}
      >
        Live Chat
      </button>
    </div>
  );
};

export default Restaurant;
