/* eslint-disable @next/next/no-img-element */
import prisma from "../../../db";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Card, CardContent, Chip, Stack, Grid } from "@mui/material";
import { IoLocationOutline, IoArrowBackCircle } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";
import { RiMessage3Line } from "react-icons/ri";
import { AiOutlineMessage } from "react-icons/ai";
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

  const [view800, setView800] = useState(null);
  const [expandedBio, setExpandedBio] = useState(false);

  useEffect(() => {
    if (window !== undefined) {
      setView800(window.matchMedia("(min-width: 800px)"));
    }
  }, []);

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
    <div className={styles.bodyBgd}>
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
          <button
            className={styles.back}
            onClick={() => {
              router.push("/browse");
            }}
          >
            <IoArrowBackCircle size={46} className={styles.backButton} />
          </button>
        </div>
        <div className={`${styles.block}`}>
          <div
            className={`text-2xl text-center px-5 py-2 font-semibold ${styles.name}`}
          >
            {organizationInfo.businessName}
          </div>
        </div>
        <div className={`${styles.blueBlock} flex flex-col gap-5`}>
          <div
            className={`${styles.stack} flex flex-row gap-2 flex-wrap justify-center`}
          >
            {tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.label}
                className={`text-2xl`}
                sx={{
                  backgroundColor: "#c31442",
                  fontSize: 16,
                  color: "white",
                }}
              />
            ))}
          </div>
          {organizationInfo.biography && (
            <Card
              className={`${styles.card}`}
              elevation={10}
              sx={{
                pb: 2,
                pt: 2,
                pl: 3,
                pr: 3,
                mt: 0,
                mb: 0,
                "& .MuiCardContent-root:last-child": { padding: 0 },
              }}
            >
              <CardContent className={styles.animateGrow}>
                <div className={`text-center text-s`}>
                  {view800 ? (
                    <span>{organizationInfo.biography}</span>
                  ) : (
                    <span>
                      {expandedBio ? (
                        <div> {organizationInfo.biography}</div>
                      ) : (
                        <div>
                          {formatBioPrev(organizationInfo.biography).prev}
                        </div>
                      )}
                      {formatBioPrev(organizationInfo.biography).isMore && (
                        <div className="mt-1">
                          <button
                            onClick={() => toggleBio(expandedBio)}
                            className={`w-full text-right text-xs ${styles.seeMore}`}
                          >
                            {expandedBio ? "Show Less" : "Show More"}
                          </button>
                        </div>
                      )}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card
            className={`${styles.card} pl-0 ${styles.address}`}
            elevation={10}
            sx={{
              pb: 2,
              pt: 2,
              pl: 1,
              pr: 2,
              mt: 0,
              mb: 0,
              maxWidth: 400,
              "& .MuiCardContent-root:last-child": { padding: 0 },
            }}
          >
            <CardContent>
              <div className="flex justify-center gap-2">
                <div className="font-thin">
                  <IoLocationOutline size={70} strokeWidth={1} />
                </div>
                <div className="text-l font-semibold">
                  <p>{formatAddress(organizationInfo.address).line1}</p>
                  <p>{formatAddress(organizationInfo.address).line2}</p>
                  <p>{organizationInfo.contactNum}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <button
          type="button"
          onClick={() => {
            router.push("/liveChat");
          }}
          className={styles.liveChat}
        >
          {/* <RiMessage3Line size={50} /> */}
          <AiOutlineMessage className={styles.messageIcon} size={45} />
        </button>
      </div>
    </div>
  );
};

export default Organization;
