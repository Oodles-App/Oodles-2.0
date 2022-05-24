import React, { useEffect, useRef, useState } from "react";
import Taucharts from "taucharts";
import styles from "../../styles/Analytics.module.css";
import "taucharts/dist/plugins/tooltip";
import ChartLoading from "./ChartLoading";

const data = [
  {
    [" "]: "Food Insecurity",
    percent: 10,
  },
  {
    [" "]: "Food Waste",
    percent: 40,
  },
];

const config = {
  guide: {
    y: { min: 0, max: 100, nice: false },
    padding: { b: 40, l: 40, t: 0, r: 10 },
  },
  data: data,
  type: "bar",
  x: " ",
  y: "percent",
  settings: {
    fitModel: "entire-view",
    animationSpeed: 1000,
  },
  plugins: [Taucharts.api.plugins.get("tooltip")()],
};

const chart = new Taucharts.Chart(config);

const LandingVisual = () => {
  const [loading, setLoading] = useState(true);
  const domRef = useRef();

  console.log(loading, "loading");

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

  if (loading) {
    return <ChartLoading />;
  }

  return (
    <>
      <div className="text-center text-bold text-2xl">
        Food Insecurity vs. Food Waste
      </div>
      <div className={`${styles.analyticsWrapper} ${styles.landingWrapper}`}>
        <div ref={domRef} className={styles.chartWrapper}></div>
      </div>
    </>
  );
};

export default LandingVisual;
