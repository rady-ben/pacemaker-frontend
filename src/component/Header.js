import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import clsx from "clsx";
import { Link } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from 'prop-types'; // Import PropTypes
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { HOME } from "../constant/text";
import { DRAWER_WIDTH } from "../constant/ui";
import BasicMenu from "./menu";

const useStyles = makeStyles((theme) => ({
  contentShift: {
    [theme.breakpoints.up("md")]: {
      marginLeft: DRAWER_WIDTH,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 1,
    cursor: "pointer",
  },
  title: {
    textAlign: "left",
  },
  disconnectButton: {
    color: theme.palette.primary.contrastText,
  },
}));

const Header = ({ drawerOpen, toggleDrawer, title }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const innerToggleDrawer = () => {
    toggleDrawer(!drawerOpen);
  };

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={innerToggleDrawer}
          size="large"
        >
          <MenuIcon />
        </IconButton>

        <div
          className={clsx(classes.titleContainer, {
            [classes.contentShift]: drawerOpen,
          })}
          onClick={handleClick}
        >
          <Typography id="basic-button" variant="h6">
            {title}
          </Typography>
          <ArrowDropDownIcon />
        </div>

        <BasicMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <Button className={classes.disconnectButton}>{HOME}</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};


Header.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Header;
