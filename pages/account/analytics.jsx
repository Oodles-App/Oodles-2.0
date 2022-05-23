import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ChartLoading from "../../components/analytics/ChartLoading";
import { Tabs, Tab, TabPanel, Box } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const chartsTheme = createTheme({
  palette: {
    primary: {
      light: "#0fffff",
      main: "#E42256",
      dark: "#00bdbd",
    },
    secondary: {
      light: "#E42256",
      main: "#E42256",
      dark: "#E42256",
    },
  },
});

const getDonations = () => import("../../components/analytics/Donations");
const getProducts = () => import("../../components/analytics/Waste");

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("donations");
  const [Chart, setChart] = useState(null);
  const [view700, setView700] = useState(null);

  console.log(view700, "view");

  useEffect(() => {
    if (window !== undefined) {
      setChart(dynamic(getDonations));
      setLoading(false);
      setView700(window.matchMedia("(min-width: 700px)"));
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
            variant={view700.matches ? "standard" : "fullWidth"}
            centered={view700.matches}
            onChange={handleChange}
            indicatorColor="secondary"
            // sx={{
            //   backgroundColor: "rgba(0, 177, 177, 0.4)",
            // }}
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
