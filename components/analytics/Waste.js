import React, { useEffect, useRef, useState } from "react";
import Taucharts from "taucharts";
import "taucharts/dist/plugins/tooltip";

import styles from "../../styles/Analytics.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const dummyData = [
  { product: "Dairy", year: 57, month: 16 },
  { product: "Produce", year: 301, month: 38 },
  { product: "Canned Goods", year: 256, month: 22 },
  { product: "Pantry", year: 62, month: 2 },
  { product: "Beverages", year: 256, month: 16 },
  { product: "Bakery", year: 117, month: 12 },
  { product: "Meat", year: 67, month: 10 },
];

const config = {
  guide: {
    x: { label: "Product" },
    y: { label: "Donations" },
    padding: { b: 40, l: 40, t: 10, r: 10 },
  },
  data: dummyData,
  type: "bar",
  x: "product",
  y: "month",
  settings: {
    fitModel: "normal",
    animationSpeed: 1000,
  },
  plugins: [Taucharts.api.plugins.get("tooltip")()],
};

const Waste = () => {
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState("month");
  const domRef = useRef();

  useEffect(() => {
    chart.updateConfig({
      guide: {
        x: { label: "Product" },
        y: { label: "Donations" },
        padding: { b: 40, l: 40, t: 10, r: 10 },
      },
      data: data,
      type: "bar",
      x: time,
      y: "donations",
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

  return (
    <div className={styles.analyticsWrapper}>
      <div className={styles.chartWrapper} ref={domRef}></div>
      <div className={styles.chartOptions}>
        <ToggleButtonGroup
          value={time}
          onChange={handleChange}
          exclusive
          size="small"
        >
          <ToggleButton value="day">Last Week</ToggleButton>
          <ToggleButton value="month">Last 6 Months</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default Waste;
