import Image from "next/image";
import { useRouter } from "next/router";

const Home = (props) => {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center">
      <div className="w-full sm:w-1/2 text-center sm:px-6">
        <h1 className="text-3xl text-gray-900 font-semibold">
          Generosity is a Way of Life
        </h1>
        <h3 className="text-2xl text-gray-500 font-medium">
          Join Oodles and Start Giving
        </h3>
        <div className="mt-6 text-xl leading-9">
          Oodles is an application that brings restaurants and non-profit
          organizations together with the common goal of eliminating food waste.
          Restaurant owners can use our application to donate specified food
          products to non-profit organizations seeking food donations.
          Non-profit organizations in search of specific donations can join our application to find and
          contact local restaurants offering those food items.
        </div>
      </div>

      <div className="w-full sm:w-1/2">
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
  );
};

export default Home;
