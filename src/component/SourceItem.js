import React from "react";
import { Typography, Grid, Button, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import { MenuBookRounded } from "@mui/icons-material";
import PropTypes from 'prop-types'; // Import PropTypes

import { START } from "../constant/text";
import { ellipsisString } from "../utils/stringManipulation";
import { ELLIPS_LENGTH } from "../constant/ui";
import { isMobile } from "../utils/ui";

const useStyles = makeStyles((theme) => ({
  sourceTitle: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    fontSize: 18,
    maxWidth: 160,
    marginBottom: 15,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      maxWidth: 250,
      height: "auto",
    },
  },
  sourceStatusText: {
    color: theme.palette.grey.A400,
    fontSize: 20,
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  sourseItemContainer: (props) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#151719",
    opacity: props.available ? 1 : 0.5,
    cursor: props.available ? "default" : "not-allowed",
  }),
  sourceIconContainer: () => ({
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

export const SourceItem = ({ title, subTitle, available, url = "#" }) => {
  const classes = useStyles({ available });
  const titleToDisplay = ellipsisString(title);
  return (
    <Grid item xs={6} md={6} lg={4}>
      <div className={classes.sourseItemContainer}>
        <div className={classes.sourceIconContainer}>
          <MenuBookRounded className={classes.sourceIcon} />
        </div>
        {title.length > ELLIPS_LENGTH && !isMobile() ? (
          <Tooltip title={title} placement="top">
            <Typography variant="h2" className={classes.sourceTitle}>
              {titleToDisplay}
            </Typography>
          </Tooltip>
        ) : (
          <Typography variant="h2" className={classes.sourceTitle}>
            {titleToDisplay}
          </Typography>
        )}
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

SourceItem.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,                 
  available: PropTypes.bool.isRequired,       
  url: PropTypes.string                    
};

SourceItem.defaultProps = {
  url: "#",                                   
  subTitle: "",                               
};