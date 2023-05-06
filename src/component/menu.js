import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SERIES_200, BANC_01, DIAGEST } from "../constant/text";
import { Link } from "react-router-dom";

export default function BasicMenu({ anchorEl, open, handleClose }) {
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
        <Link to={`/workspace/1/1/1/1`} style={{ textDecoration: "none" }}>
          <MenuItem onClick={handleClose}>{SERIES_200}</MenuItem>
        </Link>
        <Link to={`/workspace/2/1/1/1`} style={{ textDecoration: "none" }}>
          <MenuItem onClick={handleClose}>{BANC_01}</MenuItem>
        </Link>
        <Link to={`/workspace/3/1/1/1`} style={{ textDecoration: "none" }}>
          <MenuItem onClick={handleClose}>{DIAGEST}</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
