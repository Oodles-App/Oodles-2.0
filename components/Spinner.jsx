import styles from "../styles/Spinner.module.css";

export { Spinner };

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <span className={styles.spinnerBorder} />
      {/* <span className="spinner-border spinner-border-lg align-center"></span> */}
    </div>
  );
}
