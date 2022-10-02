import React from "react";
import { Typography, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import { MenuBookRounded } from "@mui/icons-material";
import { useStore } from "../store/Store";

const useStyles = makeStyles((theme) => ({
  sourceTitle: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  sourceStatusText: {
    color: theme.palette.grey.A400,
    fontSize: 20,
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  sourseItemContainer: {
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#151719",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.5,
    },
  },
  sourceIconContainer: {
    height: 100,
    width: 100,
    borderRadius: 80,
    backgroundColor: theme.palette.primary.dark,
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sourceIcon: {
    color: "#fff",
    fontSize: 40,
  },
}));

export const SourceItem = ({ toggleAlert, title, available }) => {
  const classes = useStyles();
  const [globalState] = useStore();

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Link
        to={
          available
            ? `/${globalState?.modules[0]?.id}/${globalState?.modules[0]?.courses[0]?.id}/1`
            : "#"
        }
        style={{ textDecoration: "none" }}
      >
        <div
          className={classes.sourseItemContainer}
          onClick={available ? () => {} : toggleAlert}
          disabled={available}
        >
          <div className={classes.sourceIconContainer}>
            <MenuBookRounded className={classes.sourceIcon} />
          </div>
          <Typography variant="h2" className={classes.sourceTitle}>
            {title}
          </Typography>
          <Typography variant="h2" className={classes.sourceStatusText}>
            {available ? "Source disponible" : "En cours de traitement"}
          </Typography>
        </div>
      </Link>
    </Grid>
  );
};
