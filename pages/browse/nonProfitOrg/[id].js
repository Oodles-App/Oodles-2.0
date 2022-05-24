/* eslint-disable @next/next/no-img-element */
import prisma from "../../../db";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import { Card, CardContent } from "@mui/material";
import { IoLocationOutline } from "react-icons/io5";
import styles from "../../../styles/OrgProfile.module.css";

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

  const [expandedBio, setExpandedBio] = useState(false);

  const formatAddress = (addressString) => {
    const lineBreak = addressString.indexOf(",");
    return {
      line1: addressString.slice(0, lineBreak),
      line2: addressString.slice(lineBreak + 1, addressString.length - 1),
    };
  };

  const formatBioPrev = (bioString) => {
    const prevBreak = bioString.indexOf(".");
    return {
      prev: bioString.slice(0, prevBreak + 1),
      isMore: bioString.slice(prevBreak + 1, bioString.length) !== "",
    };
  };

  const toggleBio = (current) => {
    setExpandedBio(!current);
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.bannerWrapper}>
        <img
          src={
            organizationInfo.imageUrl ||
            "https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png"
          }
          alt="Organization Banner"
          className={styles.bannerImg}
        />
      </div>
      <div className={`${styles.block}`}>
        <div
          className={`text-2xl text-center px-5 py-2 font-semibold ${styles.name}`}
        >
          {organizationInfo.businessName}
        </div>
      </div>
      <div className={`${styles.blueBlock}`}>
        <Card
          className={`${styles.card} pl-0`}
          elevation={10}
          sx={{
            pb: 2,
            pt: 2,
            pl: 1,
            pr: 2,
            "& .MuiCardContent-root:last-child": { padding: 0 },
          }}
        >
          <CardContent>
            <div className="flex justify-center gap-2">
              <div className="font-thin">
                <IoLocationOutline size={70} stroke-width={2} />
              </div>
              <div className="text-l font-semibold w-3/5">
                <p>{formatAddress(organizationInfo.address).line1}</p>
                <p>{formatAddress(organizationInfo.address).line2}</p>
                <p>{organizationInfo.contactNum}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`${styles.card}`}
          elevation={10}
          sx={{
            pb: 3,
            pt: 3,
            pl: 4,
            pr: 4,
            "& .MuiCardContent-root:last-child": { padding: 0 },
          }}
        >
          <CardContent className={styles.animateGrow}>
            <div className={`text-center text-s`}>
              {expandedBio ? (
                <div> {organizationInfo.biography}</div>
              ) : (
                <div>{formatBioPrev(organizationInfo.biography).prev}</div>
              )}
            </div>
            {formatBioPrev(organizationInfo.biography).isMore && (
              <a onClick={() => toggleBio(expandedBio)}>See More</a>
            )}
          </CardContent>
        </Card>
        {tags.map((tag) => (
          <p key={tag.id}>{tag.label}</p>
        ))}
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
    </div>
  );
};

export default Organization;
