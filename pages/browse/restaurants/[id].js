import prisma from "../../../db";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Card, CardContent, Chip, Stack, Grid } from "@mui/material";
import { IoLocationOutline, IoArrowBackCircle } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";
import { RiMessage3Line } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
import styles from "../../../styles/ResProfile.module.css";

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

  return (
    <div className={styles.bodyBgd}>
      <div className={styles.profileWrapper}>
        <div className={styles.bannerWrapper}>
          <img
            src={"https://www.sandiegorestaurantweek.com/wp-content/uploads/2022/02/SDRW_Press_WebGraphic-1030x465.jpeg"}
            alt="Food Banner"
            width="50%"
            height="50%"
            className={styles.bannerImg}
          />
          <button
            type="button"
            className={styles.back}
            onClick={() => {
            router.push("/browse");
          }}
      >
      <IoArrowBackCircle size={46} className={styles.backButton} />
      </button>
      </div>
      <div className={`${styles.block}`}>
        <div className={`text-2xl text-center px-5 py-2 font-semibold ${styles.name}`}>
        {restaurant.businessName}
        </div>
      </div>
      <div className="flex flex-col gap-5 p-5">
        <h3 className="text-lg">{restaurant.address}</h3>
        <h3 className="text-lg">{restaurant.contactNum}</h3>
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
      </div>
      <br></br>

      <div style={{display:"flex", justifyContent:"center"}}>
        <Link href={"/reservation/[id]"} as={`/reservation/${restaurant.id}`}>
            <button type="button"
            className="bg-white hover:bg-gray-100 text-lg text-gray-800 font-semibold m-2 py-4 px-8 border border-gray-400 rounded shadow">
              Reserve
            </button>
        </Link>
      </div>

      
      <button
        className={styles.liveChat}
        type="button"
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
        <AiOutlineMessage className={styles.messageIcon} size={45} />
      </button>
    </div>
  );
};

export default Restaurant;
