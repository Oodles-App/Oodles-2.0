/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Taucharts from "taucharts";
import styles from "../../styles/Analytics.module.css";
import "taucharts/dist/plugins/tooltip";

const defData = [
  { team: "d", cycleTime: 1, effort: 1, count: 1, priority: "low" },
  {
    team: "d",
    cycleTime: 2,
    effort: 2,
    count: 5,
    priority: "low",
  },
  { team: "d", cycleTime: 3, effort: 3, count: 8, priority: "medium" },
  {
    team: "d",
    cycleTime: 4,
    effort: 4,
    count: 3,
    priority: "high",
  },
  { team: "l", cycleTime: 2, effort: 1, count: 1, priority: "low" },
  {
    team: "l",
    cycleTime: 3,
    effort: 2,
    count: 5,
    priority: "low",
  },
  { team: "l", cycleTime: 4, effort: 3, count: 8, priority: "medium" },
  {
    team: "l",
    cycleTime: 5,
    effort: 4,
    count: 3,
    priority: "high",
  },
  { team: "k", cycleTime: 2, effort: 4, count: 1, priority: "low" },
  {
    team: "k",
    cycleTime: 3,
    effort: 5,
    count: 5,
    priority: "low",
  },
  { team: "k", cycleTime: 4, effort: 6, count: 8, priority: "medium" },
  {
    team: "k",
    cycleTime: 5,
    effort: 8,
    count: 3,
    priority: "high",
  },
];

const chart = new Taucharts.Chart({
  guide: {
    x: { label: "Cycle Time in days" },
    y: { label: "Effort in points" },
    padding: { b: 40, l: 40, t: 10, r: 10 },
    color: {
      brewer: ["#B22222", "#228B22", "#1E90FF"],
    },
  },
  data: defData,
  type: "scatterplot",
  x: "cycleTime",
  y: "effort",
  color: "team",
  size: "count",
  settings: {
    fitModel: "normal",
  },
  plugins: [Taucharts.api.plugins.get("tooltip")()],
});

const TestChart = () => {
  const [loading, setLoading] = useState(true);
  const domRef = useRef();

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
    <div>
      <div ref={domRef} className={styles.chartWrapper} />
    </div>
  );
};

export default TestChart;
