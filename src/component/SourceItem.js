import React from "react";
import { Typography, Grid, Button, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import { MenuBookRounded } from "@mui/icons-material";
import { START } from "../constant/text";
import { isMobile } from "../utils/ui";

const useStyles = makeStyles((theme) => ({
  sourceTitle: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    fontSize: 18,
    maxWidth: 160,
    height: 30,
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
  }),
  sourceIcon: {
    color: "#fff",
    fontSize: 40,
  },
}));

export const SourceItem = ({
  toggleAlert,
  title,
  subTitle,
  available,
  url = "#",
}) => {
  const classes = useStyles({ available });
  const titleToDisplay =
    !isMobile() && title?.length && title?.length > 18
      ? `${title.substring(0, 14)}...`
      : title;

  return (
    <Grid item xs={12} md={6} lg={4}>
      <div
        className={classes.sourseItemContainer}
        onClick={available ? () => {} : toggleAlert ? toggleAlert : () => {}}
        disabled={available}
      >
        <div className={classes.sourceIconContainer}>
          <MenuBookRounded className={classes.sourceIcon} />
        </div>
        <Tooltip title={title} placement="top">
          <Typography variant="h2" className={classes.sourceTitle}>
            {titleToDisplay}
          </Typography>
        </Tooltip>
        {available ? (
          <Link to={available ? url : "#"} style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="primary">
              {START}
            </Button>
          </Link>
        ) : (
          <Typography variant="h2" className={classes.sourceStatusText}>
            {subTitle}
          </Typography>
        )}
      </div>
    </Grid>
  );
};
