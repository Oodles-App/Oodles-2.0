import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ChartLoading from "../../components/analytics/ChartLoading";

// const getChart = () =>
//   import("../../components/analytics/TestChart", { ssr: false });

const getChart = () => import("../../components/analytics/Donations");

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [Chart, setChart] = useState(null);
  const [time, setTime] = useState("day");

  useEffect(() => {
    if (window !== undefined) {
      setChart(dynamic(getChart));
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <ChartLoading />;
  }

  return (
    <div>
      <Chart />
    </div>
  );
};

export default Analytics;
