/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, IconButton, Slide } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import { setAlerts } from "../redux/alerts";

import { useRouter } from "next/router";

const Alerts = () => {
  const alerts = useSelector((state) => state.alerts);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(undefined);
  const dispatch = useDispatch();

  console.log(alertMessage, "alert message");

  useEffect(() => {
    if (alerts.length && !alertMessage) {
      setAlertMessage({ ...alerts[0] });
      dispatch(setAlerts(alerts.slice(1)));
      setOpen(true);
    } else if (alerts.length && alertMessage && open) {
      setOpen(false);
    }
  }, [alerts, alertMessage, open]);

  useEffect(() => {
    const clearAlertsOnRouteChange = () => {
      if (alertMessage && alertMessage.keepAfterRouteChange !== true) {
        setOpen(false);
      }
    };
    router.events.on("routeChangeStart", clearAlertsOnRouteChange);

    return () => {
      router.events.off("routeChangeStart", clearAlertsOnRouteChange);
    };
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    console.log("handling exit");
    setAlertMessage(undefined);
  };

  return (
    <div>
      <Snackbar
        key={alertMessage ? alertMessage.key : undefined}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
        TransitionComponent={Slide}
        message={alertMessage ? alertMessage.message : undefined}
        // action={<div>hi, action</div>}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={handleClose}
          >
            <AiOutlineClose />
          </IconButton>
        }
      />
    </div>
  );
};

export { Alerts };
