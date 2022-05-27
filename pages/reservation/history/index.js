/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import prisma from "../../../db";
import styles from "../../../styles/History.module.css";
import Link from "next/link";

import {
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Table,
} from "@mui/material";

export const getServerSideProps = async () => {
  const reservations = await prisma.reservation.findMany();
  const restaurants = await prisma.user.findMany({
    where: {
      businessType: {
        equals: "restaurant",
      },
    },
  });
  const allOrganizations = await prisma.user.findMany({
    where: {
      businessType: {
        equals: "organization",
      },
    },
  });

  return {
    props: {
      reservations: JSON.parse(JSON.stringify(reservations)),
      restaurantList: JSON.parse(JSON.stringify(restaurants)),
      organizations: JSON.parse(JSON.stringify(allOrganizations)),
    },
  };
};

export default function History({ reservations, restaurantList }) {
  const user = useSelector((state) => state.user);
  const [view700, setView700] = useState(null);

  const filterBy =
    user.businessType === "restaurant" ? "restaurantId" : "organizationId";

  const usersReservation = reservations.filter((reservation) => {
    return reservation[filterBy] === user.id;
  });

  useEffect(() => {
    if (window !== undefined) {
      setView700(window.matchMedia("(min-width: 700px)"));
    }
  }, []);

  const findRestaurant = (id) => {
    const restaurant = restaurantList.filter((restaurant) => {
      return restaurant.id === id;
    });
    return restaurant[0];
  };

  const statusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "#FFEDC4";
      case "ACTIVE":
        return "#F6B8C9";
      case "COMPLETED":
        return "#ADE6E6";
      default:
        return "";
    }
  };

  return (
    <div className={styles.historyWrapper}>
      <h1
        style={{ textAlign: "center" }}
        className="text-3xl w-full mb-2 font-bold text-white"
      >
        Reservation History
      </h1>
      <hr className="mb-4 border-1 w-3/5 mx-auto" />
      <TableContainer component={Paper} elevation={5}>
        <Table>
          <TableHead sx={{ backgroundColor: "#ffb4a9" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{ padding: view700 && view700.matches ? "16px" : "10px" }}
              >
                <span className="text-l font-semibold">Name</span>
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: view700 && view700.matches ? "16px" : "10px" }}
              >
                <span className="text-l font-semibold">Date</span>
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: view700 && view700.matches ? "16px" : "10px" }}
              >
                <span className="text-l font-semibold">Status</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersReservation.length === 0 ? (
              <p style={{ textAlign: "center" }}>No History Available.</p>
            ) : (
              <>
                {usersReservation.map((res) => (
                  <Link
                    key={res.id}
                    href="/reservation/history/[id]"
                    as={`/reservation/history/${res.id}`}
                  >
                    <TableRow
                      hover
                      key={res.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell
                        align="center"
                        component="th"
                        scope="row"
                        sx={{
                          padding: view700 && view700.matches ? "16px" : "10px",
                        }}
                      >
                        {findRestaurant(res.restaurantId).businessName}
                      </TableCell>
                      <TableCell align="center" sx={{ padding: "10px" }}>
                        <span
                          className="text-{7px}"
                          sx={{
                            padding:
                              view700 && view700.matches ? "16px" : "10px",
                          }}
                        >
                          {res.pickupTime}
                        </span>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          padding: view700 && view700.matches ? "16px" : "10px",
                          backgroundColor: statusColor(res.status),
                        }}
                      >
                        {res.status}
                      </TableCell>
                    </TableRow>
                  </Link>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
