import React from "react";
import { CircularProgress } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  circularProgressContainer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 50,
  },
  toolbar: theme.mixins.toolbar,
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar} />
      <div className={classes.circularProgressContainer}>
        <CircularProgress />
      </div>
    </>
  );
};
export default Loading;
