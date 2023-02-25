import React, { useState } from "react";
import {
  ListItem as MuListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Tooltip,
} from "@mui/material";
import { useParams } from "react-router";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore, MenuBookRounded } from "@mui/icons-material";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import ListAltSharpIcon from "@mui/icons-material/ListAltSharp";
import { logEvent } from "firebase/analytics";
import { analytics } from "../index";
import { CLICK_COURSE_LINK } from "../constant/analyticsEvents";
import { ellipsisString } from "../utils/stringManipulation";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(3),
  },
  listItemText: {
    color: (props) => (props.granted ? "#000" : theme.palette.grey[600]),
  },
  listSubItemText: {
    color: (props) => (props.selected ? theme.palette.primary.dark : "#000"),
    fontWeight: (props) =>
      props.selected ? theme.typography.fontWeightBold : null,
    marginLeft: -20,
  },
  disabledIcon: {
    color: theme.palette.grey[600],
    height: 26,
    width: 26,
  },
}));

const CustomItem = ({
  name,
  index,
  courseId,
  moduleId,
  toggleDrawer = null,
}) => {
  const {
    moduleId: moduleIdUrl,
    courseId: courseIdUrl,
    sourceId,
  } = useParams();
  const selected =
    JSON.stringify(moduleId) === moduleIdUrl &&
    JSON.stringify(courseId) === courseIdUrl;
  const classes = useStyles({ selected });

  const logClickCourseEvent = () => {
    logEvent(analytics, CLICK_COURSE_LINK);
    if (toggleDrawer) {
      toggleDrawer(false);
    }
  };

  return (
    <Link
      to={`/workspace/${sourceId}/${moduleId}/${courseId}/1`}
      style={{ textDecoration: "none" }}
      onClick={logClickCourseEvent}
    >
      <MuListItem button className={classes.nested}>
        <ListItemIcon>
          <ListAltSharpIcon color={selected ? "primary" : "inherit"} />
        </ListItemIcon>
        <Tooltip title={name} placement="top">
          <ListItemText
            primary={ellipsisString(name)}
            className={classes.listSubItemText}
          />
        </Tooltip>
      </MuListItem>
    </Link>
  );
};

const ListItem = ({ item, toggleDrawer = null, toggleAlert = null }) => {
  const [open, setOpen] = useState(false);

  const granted = item?.courses?.length && item?.courses?.length > 0;

  const classes = useStyles({ granted });

  const handleClick = () => {
    if (granted) {
      setOpen(!open);
    } else {
      if (toggleAlert) {
        toggleAlert();
      }
    }
  };

  return (
    <>
      <MuListItem button key={item?.id} onClick={handleClick}>
        <ListItemIcon>
          <MenuBookRounded />
        </ListItemIcon>
        <ListItemText primary={item?.name} className={classes.listItemText} />

        {granted ? (
          open ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : (
          <DoDisturbIcon className={classes.disabledIcon} />
        )}
      </MuListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item?.courses?.map((course, index) => (
            <CustomItem
              name={course.title}
              courseId={course.id}
              index={index}
              moduleId={item?.id}
              key={index}
              toggleDrawer={toggleDrawer}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default ListItem;
