import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import makeStyles from "@mui/styles/makeStyles";
import { SERIES_200, BANC_ORAN, DIAGEST } from "../constant/text";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import clsx from "clsx";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "#000",
  },
  item: {
    backgroundColor: "#fff",
    color: "#000",
  },
  selectitem: {
    backgroundColor: "#2684FF",
    color: "#fff",
  },
});

export default function BasicMenu({ anchorEl, open, handleClose }) {
  const { sourceId } = useParams();
  const classes = useStyles();
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to={`/workspace/1/1/1/1`} className={classes.link}>
          <MenuItem
            className={clsx(classes.item, {
              [classes.selectitem]: sourceId === "1",
            })}
            onClick={handleClose}
          >
            {SERIES_200}
          </MenuItem>
        </Link>
        <Link to={`/workspace/2/1/1/1`} className={classes.link}>
          <MenuItem
            className={clsx(classes.item, {
              [classes.selectitem]: sourceId === "2",
            })}
            onClick={handleClose}
          >
            {BANC_ORAN}
          </MenuItem>
        </Link>
        <Link to={`/workspace/3/1/1/1`} className={classes.link}>
          <MenuItem
            className={clsx(classes.item, {
              [classes.selectitem]: sourceId === "3",
            })}
            onClick={handleClose}
          >
            {DIAGEST}
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
