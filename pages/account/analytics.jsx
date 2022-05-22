import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ChartLoading from "../../components/analytics/ChartLoading";
import { Tabs, Tab, TabPanel, Box } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const chartsTheme = createTheme({
  palette: {
    primary: {
      light: "#0fffff",
      main: "#00B1B0",
      dark: "#00bdbd",
    },
    secondary: {
      light: "#ffa799",
      main: "#FF8370",
      dark: "#ff725c",
    },
  },
});

const getDonations = () => import("../../components/analytics/Donations");
const getProducts = () => import("../../components/analytics/Waste");

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("donations");
  const [Chart, setChart] = useState(null);

  useEffect(() => {
    if (window !== undefined) {
      setChart(dynamic(getDonations));
      setLoading(false);
    }
  }, []);

  const handleChange = (e, value) => {
    if (value === "products") {
      setChart(dynamic(getProducts));
      setValue("products");
    } else if (value === "donations") {
      setChart(dynamic(getDonations));
      setValue("donations");
    }
  };

  if (loading) {
    return <ChartLoading />;
  }

  return (
    <div>
      <ThemeProvider theme={chartsTheme}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            variant="fullWidth"
            onChange={handleChange}
            indicatorColor="primary"
          >
            <Tab label="Donations" value="donations" />
            <Tab label="Products" value="products" />
          </Tabs>
        </Box>
        <Chart />
      </ThemeProvider>
    </div>
  );
};

export default Analytics;
