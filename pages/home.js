import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import styles from "../styles/LandingPage.module.css";

const Home = (props) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-wrap items-center bg-[#FF8370] py-16">
        <div className="w-full sm:w-1/2 text-center sm:px-6">
          <h1 className="text-3xl text-[#404040] font-semibold drop-shadow-lg">
            Generosity is a Way of Life
          </h1>
          <h3 className="text-2xl text-[#FFFFFF] font-medium">
            Join Oodles and Start Giving
          </h3>
          <div className="mt-6 text-xl mx-8 py-8 text-[#404040] font-acumin font-medium">
            Oodles is an application bringing restaurants and non-profit
            organizations together with the common goal of eliminating food
            waste. Restaurant owners can use our application to donate specified
            food products to non-profit organizations seeking food donations.
            While non-profit organizations in search of donations can use our
            application to find and contact local restaurants offering food
            items.
          </div>
        </div>

        <div className="w-full sm:w-1/2 pr-10">
          <Image
            src="/oodlesHero.png"
            alt="Oodles Landing Page Image"
            width="100%"
            height="100%"
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </div>

      <div className="mx-auto py-32 bg-[#00B1B0]">
        <header className="text-center">
          <h1 className="text-5xl text-[#404040] font-bold whitespace-pre-line leading-hero drop-shadow-lg">
            Our Mission
          </h1>
          <h3 className="text-2xl text-[#FFFFFF] font-medium">
            What is Life Without Purpose
          </h3>
          <div className="text-xl mt-4 mb-16 mx-16 text-[#404040] font-acumin font-medium">
            Oodles means abundance, and at Oodles we realize there is an
            abundance of food that is discarded every year by U.S. restaurants.
            In fact, U.S. restaurants account for a staggering 22 to 33 billion
            pounds of food waste anually. By connecting restaurant owners with
            non-profit organizations requesting food donations, Oodles seeks to
            significantly decrease food waste with the greater purpose of making
            donations available to individuals in food insecure households
            across the country. At Oodles, no food should go to waste.
          </div>

          <Link href="/account/register">
            <Button variant="contained" sx={{ backgroundColor: "#E42256" }}>
              Register
            </Button>
          </Link>
        </header>
      </div>

      <div className="flex flex-wrap items-center flex-row-reverse items-center bg-[#FF8370] py-16">
        <div className="w-full sm:w-1/2 text-center sm:px-6">
          <h1 className="text-3xl text-[#404040] font-semibold drop-shadow-lg">
            Let us Eliminate this Excess Waste
          </h1>
          <h3 className="text-2xl text-[#FFFFFF] font-medium">Together</h3>
          <div className="mt-6 text-xl mx-8 py-8 text-[#404040] font-acumin font-medium">
            We could do more with this abundance. At Oodles we want to help
            restaurants redirect this wasted excess of food to organizations
            that could provide it to those in need.{" "}
            <Link href="/account/register">Join us</Link> and we will help you
            do your part.
          </div>
        </div>

        <div className="w-full h-full sm:w-1/2">
          <div className={styles.landingSvg} />
        </div>
      </div>
    </>
  );
};

export default Home;
