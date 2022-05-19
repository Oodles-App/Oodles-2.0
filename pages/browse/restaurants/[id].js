import prisma from "../../../db";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ params }) => {
  const restaurant = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  console.log(restaurant);
  return {
    props: {
      restaurantInfo: JSON.parse(JSON.stringify(restaurant)),
    },
  };
};

const Restaurant = ({ restaurantInfo }) => {
  const [restaurant, setRestaurants] = useState(restaurantInfo);
  const router = useRouter();

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
          <p>Bio:</p>
        </div>
      </div>
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
      <Link href={{pathname: `/reservation/${restaurant.id}`}} style={{border:"1px solid black"}}>Reserve</Link>

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
