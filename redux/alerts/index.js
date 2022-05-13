const defaultId = "default-alert";

//ACTION TYPES
const ADD_ALERT = "ADD_ALERT";
const REMOVE_ALERT = "REMOVE_ALERT";
const CLEAR_ALERTS = "SET_ALERTS";

//ACTION CREATORS

export const clearAlerts = () => {
  return {
    type: SET_ALERTS,
    alerts: [],
  };
};

export const removeAlert = (id) => {
  console.log("inside remove alert in redux");
  return {
    type: REMOVE_ALERT,
    id,
  };
};

export const createAlert = (type, message, options) => {
  const alert = { ...options, type, message };
  alert.autoClose = alert.autoClose === undefined ? 5000 : alert.autoClose;
  alert.keepAfterRouteChange === undefined ? false : alert.keepAfterRouteChange;
  return {
    type: ADD_ALERT,
    alert,
  };
};

//REDUCER
export default function alertsReducer(alerts = [], action) {
  switch (action.type) {
    case ADD_ALERT:
      if (alerts.length) {
        action.alert.id = alerts[alerts.length - 1].id + 1;
        console.log(action.alert.id, "new id");
      } else if (alerts.length === 0) {
        action.alert.id = 1;
      }
      return [...alerts, action.alert];
    case REMOVE_ALERT:
      const newAlerts = alerts.filter((alert) => alert.id !== action.id);
      return newAlerts;
    case CLEAR_ALERTS:
      return alerts.filter((alert) => alert.keepAfterRouteChange);
    default:
      return alerts;
  }
}
