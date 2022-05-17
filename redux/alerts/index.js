//ACTION TYPES
const ADD_ALERT = "ADD_ALERT";
const REMOVE_ALERT = "REMOVE_ALERT";
const SET_ALERTS = "SET_ALERTS";

//ACTION CREATORS

export const removeAlert = (id) => {
  return {
    type: REMOVE_ALERT,
    id,
  };
};

export const setAlerts = (alerts) => {
  return {
    type: SET_ALERTS,
    alerts,
  };
};

export const createAlert = (alert) => {
  alert.autoClose = alert.autoClose === undefined ? 5000 : alert.autoClose;
  alert.keepAfterRouteChange =
    alert.keepAfterRouteChange === undefined
      ? false
      : alert.keepAfterRouteChange;
  return {
    type: ADD_ALERT,
    alert,
  };
};

//REDUCER
export default function alertsReducer(alerts = [], action) {
  switch (action.type) {
    case ADD_ALERT:
      const existingMessages = alerts.map((alert) => alert.message);
      if (existingMessages.includes(action.alert.message)) {
        return alerts;
      }
      return [...alerts, action.alert];
    case REMOVE_ALERT:
      return alerts.filter((alert) => alert.id !== action.id);
    case SET_ALERTS:
      return action.alerts;
    default:
      return alerts;
  }
}
