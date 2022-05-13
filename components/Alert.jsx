import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Alert.module.css";

import { useDispatch } from "react-redux";
import { clearAlerts, removeAlert } from "../redux/alerts";
import { useSelector } from "react-redux";

export { Alert };

const Alert = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const alerts = useSelector((state) => state.alerts);

  useEffect(() => {
    alerts.map((alert) => {
      if (alert.autoClose) {
        setTimeout(() => fadeAlert(alert.id), alert.autoClose);
      }
    });
    const clearAlertsOnRouteChange = () => {
      setTimeout(() => clearAlerts(), 1000);
    };
    router.events.on("routeChangeStart", clearAlertsOnRouteChange);

    // clean up function that runs when the component unmounts
    return () => {
      // unsubscribe to avoid memory leaks
      router.events.off("routeChangeStart", clearAlertsOnRouteChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerts]);

  function fadeAlert(id) {
    alerts.map((alert) => {
      if (alert.id === id) {
        alert.fade = true;
      }
    });

    // remove alert after faded out
    setTimeout(() => {
      dispatch(removeAlert(alert));
    }, 3000);
  }

  function cssClasses(alert) {
    if (!alert) return;

    //TODO: create color code styles for different alert types
    const alertTypeClass = {
      ["success"]: styles.alertSuccess,
      ["error"]: styles.alertDanger,
      ["info"]: styles.alertInfo,
      ["warning"]: styles.alertWarning,
    };

    const classes = [
      styles.alert,
      styles.alertDismissible,
      alertTypeClass[alert.type],
    ];

    if (alert.fade) {
      console.log("pushing fade styles", styles.fade);
      classes.push(styles.fade);
    }

    console.log(classes);
    return classes.join(" ");
  }

  if (!alerts.length) return null;

  return (
    <div className="container">
      <div className="m1">
        {alerts.map((alert, index) => (
          <div key={index} className={cssClasses(alert)}>
            <a className="close" onClick={() => fadeAlert(alert.id)}>
              &times;
            </a>
            <span>{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
