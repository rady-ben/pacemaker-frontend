import React from "react";
import { Typography, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import { MenuBookRounded } from "@mui/icons-material";
import { useStore } from "../store/Store";
import { SOURCE_AVAILABLE, BEING_PROCESSED } from "../constant/text";

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
  sourseItemContainer: (props) => ({
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#151719",
    cursor: "pointer",
    opacity: props.available ? 1 : 0.5,
  }),
  sourceIconContainer: (props) => ({
    height: 100,
    width: 100,
    borderRadius: 80,
    backgroundColor: theme.palette.primary.dark,
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: props.available
        ? theme.palette.success.light
        : theme.palette.primary.dark,
    },
  }),
  sourceIcon: {
    color: "#fff",
    fontSize: 40,
  },
}));

export const SourceItem = ({ toggleAlert, title, available }) => {
  const classes = useStyles({ available });
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
            {available ? SOURCE_AVAILABLE : BEING_PROCESSED}
          </Typography>
        </div>
      </Link>
    </Grid>
  );
};
