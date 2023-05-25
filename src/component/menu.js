import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SERIES_200, BANC_ORAN, DIAGEST } from "../constant/text";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

export default function BasicMenu({ anchorEl, open, handleClose }) {
  const { sourceId } = useParams();
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
        <Link
          to={`/workspace/1/1/1/1`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <MenuItem onClick={handleClose} selected={sourceId === "1"}>
            {SERIES_200}
          </MenuItem>
        </Link>
        <Link
          to={`/workspace/2/1/1/1`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <MenuItem onClick={handleClose} selected={sourceId === "2"}>
            {BANC_ORAN}
          </MenuItem>
        </Link>
        <Link
          to={`/workspace/3/1/1/1`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <MenuItem onClick={handleClose} selected={sourceId === "3"}>
            {DIAGEST}
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
