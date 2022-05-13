const defaultId = "default-alert";

//ACTION TYPES
const ADD_ALERT = "ADD_ALERT";
const REMOVE_ALERT = "REMOVE_ALERT";

//ACTION CREATORS

export const removeAlert = (id) => {
  console.log(id, "remove alert id");
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
      const existingMessages = alerts.map((alert) => alert.message);
      if (existingMessages.includes(action.alert.message)) {
        return alerts;
      }
      return [...alerts, action.alert];
    case REMOVE_ALERT:
      return alerts.filter((alert) => alert.id !== action.id);
    default:
      return alerts;
  }
}
