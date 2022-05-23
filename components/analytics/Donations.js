/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Taucharts from "taucharts";
import "taucharts/dist/plugins/tooltip";

import styles from "../../styles/Analytics.module.css";
import { Card, CardContent } from "@mui/material";

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
    donations: 2,
  },
  {
    day: "Wednesday",
    donations: 4,
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

const brewerObjCreator = () => {
  const colorGenWeek = (donations) => {
    if (donations < 5) {
      return "rgba(0, 177, 177, 0.3)";
    }
    if (donations < 10) {
      return "rgba(0, 177, 177, 0.7)";
    }
    if (donations >= 10) {
      return "rgba(0, 177, 177)";
    }
  };
  const colorGenMonth = (donations) => {
    if (donations < 15) {
      return "rgba(0, 177, 177, 0.3)";
    }
    if (donations < 25) {
      return "rgba(0, 177, 177, 0.7)";
    }
    if (donations >= 25) {
      return "rgba(0, 177, 177)";
    }
  };
  const brewerObj = {};
  dummyDataMonths.map((monthObj) => {
    const monthStr = monthObj.month;

    brewerObj[monthStr] = colorGenMonth(monthObj.donations);
  });
  dummyDataWeek.map((weekObj) => {
    const weekStr = weekObj.day;
    brewerObj[weekStr] = colorGenWeek(weekObj.donations);
  });
  console.log(brewerObj, "brewerObj");
  return brewerObj;
};

const config = {
  guide: {
    x: { label: `Time` },
    y: { label: "Donations" },
    padding: { b: 40, l: 40, t: 10, r: 10 },
    color: {
      brewer: brewerObjCreator(),
    },
  },
  data: dummyDataWeek,
  type: "bar",
  x: "day",
  y: "donations",
  color: "day",
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
  const [cardSelect, setCardSelect] = useState("day");
  const domRef = useRef();

  const totalDonations = (data) => {
    let total = 0;
    data.map((dataObj) => {
      total += dataObj.donations;
    });
    return total;
  };

  useEffect(() => {
    const data = time === "day" ? dummyDataWeek : dummyDataMonths;
    chart.updateConfig({
      guide: {
        x: { label: `Time` },
        y: { label: "Effort in points" },
        padding: { b: 40, l: 40, t: 10, r: 10 },
        color: {
          brewer: brewerObjCreator(),
        },
      },
      data: data,
      type: "bar",
      x: time,
      y: "donations",
      color: time,
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

  return (
    <div className={styles.analyticsWrapper}>
      <div className={styles.chartWrapper} ref={domRef}></div>
      <div className="flex justify-center gap-2.5 w-full mt-2 max-w-md">
        <Card
          className={styles.optionsChild}
          onClick={() => handleCardSelect("day")}
          sx={{ backgroundColor: cardSelect === "day" ? "#ffe6ae" : "" }}
          elevation={cardSelect === "day" ? 5 : 1}
        >
          <CardContent>
            <div className="text-center">
              <span className="text-2xl font-bold">
                {totalDonations(dummyDataWeek)}
              </span>{" "}
              donations
              <div className="text-xs">
                past <strong>seven days</strong>
              </div>
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
          <CardContent>
            <div className="text-center">
              <span className="text-2xl font-bold">
                {totalDonations(dummyDataMonths)}{" "}
              </span>
              donations
              <div className="text-xs">
                past <strong>six months</strong>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Donations;
