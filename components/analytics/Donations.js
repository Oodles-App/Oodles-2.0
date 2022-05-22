/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Taucharts from "taucharts";
import "taucharts/dist/plugins/tooltip";

import styles from "../../styles/Analytics.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// const colorGenMonths = (donations) => {
//   switch (donations) {
//     case donations < 10:
//       return "low";
//     case donations < 20:
//       return "med";
//     case donations < 30:
//       return "high";
//     case donations >= 30:
//       return "highest";
//     default:
//       return "none";
//   }
// };

// PAST YEAR  or n months: aggregate quantity of donations by month
// const dummyDataMonths = [
//   { month: "December", donations: 14, value: colorGenMonths(this.donations) },
//   {
//     month: "January",
//     donations: 10,
//     value: colorGenMonths(this.donations),
//   },
//   { month: "February", donations: 23, value: colorGenMonths(this.donations) },
//   { month: "March", donations: 12, value: colorGenMonths(this.donations) },
//   { month: "April", donations: 32, value: colorGenMonths(this.donations) },
//   { month: "May", donations: 45, value: colorGenMonths(this.donations) },
// ];

const dummyDataMonths = [
  { month: "December", donations: 14 },
  {
    month: "January",
    donations: 10,
    value: colorGenMonths(this.donations),
  },
  { month: "February", donations: 23 },
  { month: "March", donations: 12 },
  { month: "April", donations: 32 },
  { month: "May", donations: 45 },
];

console.log(dummyDataMonths);

// PAST WEEK aggregate quantity by day (etc.)
// const dummyDataWeek = [
//   {
//     day: "Tuesday",
//     donations: 5,
//     value: colorGenMonths(this.donations),
//   },
//   {
//     day: "Wednesday",
//     donations: 5,
//     value: colorGenMonths(this.donations),
//   },
//   {
//     day: "Thursday",
//     donations: 10,
//     value: colorGenMonths(this.donations),
//   },
//   {
//     day: "Friday",
//     donations: 7,
//     value: colorGenMonths(this.donations),
//   },
//   {
//     day: "Saturday",
//     donations: 0,
//     value: colorGenMonths(this.donations),
//   },
//   {
//     day: "Sunday",
//     donations: 0,
//     value: colorGenMonths(this.donations),
//   },
//   {
//     day: "Monday",
//     donations: 5,
//     value: colorGenMonths(this.donations),
//   },
// ];

const config = {
  guide: {
    x: { label: `Time (Mo.)` },
    y: { label: "Donations" },
    padding: { b: 40, l: 40, t: 10, r: 10 },
    // color: {
    //   brewer: {
    //     low: "rgba(228, 33, 85, 0.41)",
    //     med: "rgba(228, 33, 85, 0.6)",
    //     high: "rgba(228, 33, 85, 0.8)",
    //     highest: "#e42155",
    //   },
    // },
  },
  data: dummyDataMonths,
  type: "bar",
  x: "month",
  y: "donations",
  // color: "value",
  settings: {
    fitModel: "normal",
    animationSpeed: 1000,
  },
  plugins: [Taucharts.api.plugins.get("tooltip")()],
};

const chart = new Taucharts.Chart(config);

const Donations = () => {
  const [loading, setLoading] = useState(true);
  // const [time, setTime] = useState("day");
  const domRef = useRef();

  useEffect(() => {
    console.log("inside use effect");
    const data = dummyDataMonths;
    // const data = time === "day" ? dummyDataWeek : dummyDataMonths;
    chart.updateConfig({
      guide: {
        x: { label: `Time` },
        y: { label: "Donations" },
        padding: { b: 40, l: 40, t: 10, r: 10 },
        color: {
          brewer: {
            low: "rgba(228, 33, 85, 0.41)",
            med: "rgba(228, 33, 85, 0.6)",
            high: "rgba(228, 33, 85, 0.8)",
            highest: "#e42155",
          },
        },
      },
      data: dummyDataMonths,
      type: "bar",
      x: "month",
      y: "donations",
      color: "value",
      settings: {
        fitModel: "normal",
        animationSpeed: 1000,
      },
      plugins: [Taucharts.api.plugins.get("tooltip")()],
    });
  }, [time]);

  useEffect(() => {
    console.log("inside first useEffect");
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

export default Donations;
