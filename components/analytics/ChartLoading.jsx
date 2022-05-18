import { CircularProgress } from "@mui/material";
import styles from "../../styles/Analytics.module.css";

const ChartLoading = () => {
  return (
    <div className={styles.chartLoadingWrapper}>
      <div>
        <CircularProgress />
      </div>
    </div>
  );
};

export default ChartLoading;
