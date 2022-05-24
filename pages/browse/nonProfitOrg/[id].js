import prisma from "../../../db";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ params }) => {
  const organization = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: {
      tags: true,
    },
  });

  return {
    props: {
      organizationInfo: JSON.parse(JSON.stringify(organization)),
    },
  };
};

const Organization = ({ organizationInfo }) => {
  const router = useRouter();
  const tags = organizationInfo.tags;
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
        <h1>{organizationInfo.businessName}</h1>
        <p>{organizationInfo.address}</p>
        <p>{organizationInfo.contactNum}</p>
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
        onClick={() => {
          router.push("/liveChat");
        }}
      >
        Live Chat
      </button>
    </div>
  );
};

export default Organization;
