/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Taucharts from "taucharts";
import "taucharts/dist/plugins/tooltip";

import styles from "../../styles/Analytics.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// PAST YEAR  or n months: aggregate quantity of donations by month
const dummyDataMonths = [
  { month: "December", donations: 14 },
  {
    month: "January",
    donations: 10,
  },
  { month: "February", donations: 23 },
  { month: "March", donations: 12 },
  { month: "April", donations: 32 },
  { month: "May", donations: 45 },
];

// PAST WEEK aggregate quantity by day (etc.)
const dummyDataWeek = [
  {
    day: "Tuesday",
    donations: 5,
  },
  {
    day: "Wednesday",
    donations: 5,
  },
  {
    day: "Thursday",
    donations: 10,
  },
  {
    day: "Friday",
    donations: 7,
  },
  {
    day: "Saturday",
    donations: 0,
  },
  {
    day: "Sunday",
    donations: 0,
  },
  {
    day: "Monday",
    donations: 5,
  },
];

const config = {
  guide: {
    x: { label: `Time (Mo.)` },
    y: { label: "Effort in points" },
    padding: { b: 40, l: 40, t: 10, r: 10 },
  },
  data: dummyDataWeek,
  type: "bar",
  x: "day",
  y: "donations",
  size: "donations",
  //   color: "team",
  //   size: "count",
  settings: {
    fitModel: "normal",
    animationSpeed: 1000,
  },
  plugins: [Taucharts.api.plugins.get("tooltip")()],
};

const chart = new Taucharts.Chart(config);

const Donations = () => {
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState("day");
  const domRef = useRef();

  useEffect(() => {
    console.log(time, "time");
    const data = time === "day" ? dummyDataWeek : dummyDataMonths;
    console.log(data, "data");
    chart.updateConfig({
      guide: {
        x: { label: `Time (Mo.)` },
        y: { label: "Effort in points" },
        padding: { b: 40, l: 40, t: 10, r: 10 },
      },
      data: data,
      type: "bar",
      x: time,
      y: "donations",
      size: "donations",
      //   color: "team",
      //   size: "count",
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

  const handleChange = (e, selection) => {
    if (selection) {
      setTime(selection);
    }
  };

  return (
    <div>
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

export default Donations;
