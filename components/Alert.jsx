import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Alert.module.css";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeAlert } from "../redux/alerts";

export { Alert };

const Alert = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const alerts = useSelector((state) => state.alerts);
  const [fadeAlerts, setfadeAlerts] = useState([]);
  const [routeChanged, setRouteChanged] = useState(false);

  useEffect(() => {
    const newestAlert = alerts[alerts.length - 1] || undefined;

    if (newestAlert && newestAlert.autoClose) {
      setTimeout(() => fadeAlert(newestAlert.id), newestAlert.autoClose);
    }

    const clearAlertsOnRouteChange = () => {
      setRouteChanged(true);
      const alertsToFade = alerts.filter(
        (alert) => !alert.keepAfterRouteChange
      );
      alertsToFade.map((alert) => fadeAlert(alert.id)).then;
    };
    router.events.on("routeChangeStart", clearAlertsOnRouteChange);

    return () => {
      setRouteChanged(false);
      router.events.off("routeChangeStart", clearAlertsOnRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alerts]);

  function fadeAlert(id) {
    setfadeAlerts([...fadeAlerts, id]);

    setTimeout(() => {
      dispatch(removeAlert(id));
      if (routeChanged) {
        setfadeAlerts([]);
      } else {
        setfadeAlerts(fadeAlerts.filter((fadeId) => fadeId !== id));
      }
    }, 700);
  }

  function cssClasses(alert) {
    if (!alert) return;

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

    if (fadeAlerts.includes(alert.id)) {
      classes.push(styles.fade);
    }

    return classes.join(" ");
  }

  if (!alerts.length) return null;

  return (
    <div className={styles.alertContainer}>
      <div className={styles.m1}>
        {alerts.map((alert, index) => (
          <div key={index} className={cssClasses(alert)}>
            <a className={styles.close} onClick={() => fadeAlert(alert.id)}>
              &times;
            </a>
            <span>{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
