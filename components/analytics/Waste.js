import React, { useEffect, useRef, useState } from "react";
import Taucharts from "taucharts";
import "taucharts/dist/plugins/tooltip";

import styles from "../../styles/Analytics.module.css";
import { Card, CardContent } from "@mui/material";

const dummyDataYear = [
  { product: "Dairy", donations: 57 },
  { product: "Produce", donations: 201 },
  { product: "Canned Goods", donations: 256 },
  { product: "Pantry", donations: 62 },
  { product: "Beverages", donations: 230 },
  { product: "Bakery", donations: 117 },
  { product: "Meat", donations: 67 },
];

const dummyDataMonth = [
  { product: "Dairy", donations: 16 },
  { product: "Produce", donations: 38 },
  { product: "Canned Goods", donations: 22 },
  { product: "Pantry", donations: 2 },
  { product: "Beverages", donations: 16 },
  { product: "Bakery", donations: 12 },
  { product: "Meat", donations: 10 },
];

const config = {
  guide: {
    x: { label: "Product" },
    y: { label: "Donations" },
    padding: { b: 40, l: 0, t: 10, r: 10 },
    color: {
      brewer: {
        Dairy: "#00B1B0",
        Produce: "#E42256",
        ["Canned Goods"]: "#FEC84D",
        Pantry: "#FF8370",
        Beverages: "#22E4B0",
        Bakery: "#70ECFF",
        Meat: "#B10001",
      },
    },
  },
  data: dummyDataMonth,
  type: "bar",
  x: "product",
  y: "donations",
  color: "product",
  settings: {
    fitModel: "normal",
    animationSpeed: 1000,
  },
  plugins: [Taucharts.api.plugins.get("tooltip")()],
};

const chart = new Taucharts.Chart(config);

const Waste = () => {
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState("month");
  const [cardSelect, setCardSelect] = useState("month");

  const domRef = useRef();

  useEffect(() => {
    const data = time === "month" ? dummyDataMonth : dummyDataYear;
    chart.updateConfig({
      guide: {
        x: { label: "Product" },
        y: { label: "Donations" },
        padding: { b: 0, l: 0, t: 10, r: 10 },
        color: {
          brewer: {
            Dairy: "#00B1B0",
            Produce: "#E42256",
            ["Canned Goods"]: "#FEC84D",
            Pantry: "#FF8370",
            Beverages: "#22E4B0",
            Bakery: "#70ECFF",
            Meat: "#B10001",
          },
        },
      },
      data: data,
      type: "bar",
      x: "product",
      y: "donations",
      color: "product",
      settings: {
        fitModel: "normal",
        animationSpeed: 1000,
      },
      plugins: [Taucharts.api.plugins.get("tooltip")()],
    });
  }, [time]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      chart.renderTo(domRef.current);
    }
  }, [loading]);

  const handleCardSelect = (selection) => {
    if (selection) {
      setTime(selection);
      setCardSelect(selection);
    }
  };

  const mostDonated = (data) => {
    const donationsArr = data.map((dataObj) => dataObj.donations);
    const maxDonations = Math.max(...donationsArr);
    const mostDonatedObj = data[donationsArr.indexOf(maxDonations)];
    return mostDonatedObj;
  };

  return (
    <div className={styles.analyticsWrapper}>
      <div className={styles.chartWrapper} ref={domRef} />
      <div
        className={`flex justify-center gap-2 w-full mt-2 max-w-md items-center ${styles.cardWrapper}`}
      >
        <Card
          className={styles.optionsChild}
          onClick={() => handleCardSelect("day")}
          sx={{ backgroundColor: cardSelect === "day" ? "#ffe6ae" : "" }}
          elevation={cardSelect === "day" ? 5 : 1}
        >
          <CardContent
            sx={{
              pb: 1,
              pt: 2,
              pl: 1,
              pr: 1,
              "& .MuiCardContent-root:last-child": { padding: 0 },
            }}
            className="flex justify-center items-center"
          >
            <div className="text-center pb-0">
              <div className="font-bold">
                <div className="text-xl">
                  {mostDonated(dummyDataMonth).donations}
                </div>
                <div className="text-xs">
                  {mostDonated(dummyDataMonth).product}
                </div>
              </div>
              <div className="text-xs text-[11px]">donations (past month)</div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={styles.optionsChild}
          onClick={() => handleCardSelect("month")}
          sx={{
            backgroundColor: cardSelect === "month" ? "#ffe6ae" : "",
          }}
          elevation={cardSelect === "month" ? 5 : 1}
        >
          <CardContent
            sx={{
              pb: 1,
              pt: 2,
              pl: 1,
              pr: 1,
              "& .MuiCardContent-root:last-child": { padding: 0 },
            }}
          >
            <div className="text-center pb-0">
              <div className="font-bold">
                <div className="text-xl">
                  {mostDonated(dummyDataYear).donations}
                </div>
                <div className="text-[13px]">
                  {mostDonated(dummyDataYear).product}
                </div>
              </div>
              <div className="text-xs text-[11px]">donations (past year)</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Waste;
