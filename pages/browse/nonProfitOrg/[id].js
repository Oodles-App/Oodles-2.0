import prisma from "../../../db";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export const getServerSideProps = async ({ params }) => {
  const organization = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  const tags = await prisma.tag.findMany({
    include: {
      users: true,
    },
  });
  return {
    props: {
      organizationInfo: JSON.parse(JSON.stringify(organization)),
      tags: JSON.parse(JSON.stringify(tags)).filter((tag) =>
        tag.users.some((user) => user.id === +params.id)
      ),
    },
  };
};

const Organization = ({ organizationInfo, tags }) => {
  const user = useSelector((state) => state.user);
  const [organization, setOrganizations] = useState(organizationInfo);
  const router = useRouter();
  return (
    <div>
      <div>
        <Image
          src="/organization.png"
          alt="Food Banner"
          width="50%"
          height="50%"
          style={{ justifyItems: "center" }}
        />
        <h1>{organization.businessName}</h1>
        <p>{organization.address}</p>
        <p>{organization.contactNum}</p>
        <div>
          <p>Bio:</p>
        </div>
        {tags.map((tag) => (
          <p key={tag.id}>{tag.label}</p>
        ))}
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
      <button
        type="button"
        style={{ border: "1px solid black" }}
        onClick={async (e) => {
          e.preventDefault();
          try {
            const res = await fetch("../../api/liveChat/createChannel", {
              body: JSON.stringify({
                orgId: organization.id,
                restaurantId: user.id,
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

export default Organization;
