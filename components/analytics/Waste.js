import React, { useEffect, useRef, useState } from "react";
import Taucharts from "taucharts";
import "taucharts/dist/plugins/tooltip";

import styles from "../../styles/Analytics.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const dummyDataYear = [
  { product: "Dairy", donations: 57 },
  { product: "Produce", donations: 301 },
  { product: "Canned Goods", donations: 256 },
  { product: "Pantry", donations: 62 },
  { product: "Beverages", donations: 256 },
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
    padding: { b: 40, l: 60, t: 10, r: 10 },
  },
  data: dummyDataMonth,
  type: "horizontalBar",
  x: "donations",
  y: "product",
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
  const domRef = useRef();

  useEffect(() => {
    const data = time === "month" ? dummyDataMonth : dummyDataYear;
    chart.updateConfig({
      guide: {
        x: { label: "Product" },
        y: { label: "Donations" },
        padding: { b: 40, l: 60, t: 10, r: 10 },
      },
      data: data,
      type: "horizontalBar",
      x: "donations",
      y: "product",
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

  const handleSelect = (e, selection) => {
    if (selection) {
      setTime(selection);
    }
  };

  return (
    <div className={styles.analyticsWrapper}>
      <div className={styles.chartWrapper} ref={domRef}></div>
      <div className={styles.chartOptions}>
        <ToggleButtonGroup
          value={time}
          onChange={handleSelect}
          exclusive
          size="small"
          className="mt-4"
        >
          <ToggleButton value="month">This Month</ToggleButton>
          <ToggleButton value="year">This YEAR</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default Waste;
