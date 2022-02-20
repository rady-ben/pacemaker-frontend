import { useState } from 'react';
import {
    ListItem as MuListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    List
} from '@mui/material';
import { useParams } from 'react-router';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from "react-router-dom";
import {
    ExpandLess,
    ExpandMore,
    MenuBookRounded
} from '@mui/icons-material'
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import { logEvent } from "firebase/analytics";
import { analytics } from '../index';
import { CLICK_COURSE_LINK } from '../constant/analyticsEvents';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listItemText: {
        color: props => (props.selected ? theme.palette.primary.dark : '#000'),
        '& span, & svg': {
            fontWeight: props => (props.selected ? theme.typography.fontWeightBold : null)
        }
    }
}));

const CustomItem = ({
    name,
    index,
    courseId,
    moduleId,
    toggleDrawer = null
}) => {
    const { moduleId: moduleIdUrl, courseId: courseIdUrl } = useParams();
    const selected = (JSON.stringify(moduleId)===moduleIdUrl && JSON.stringify(courseId)===courseIdUrl);
    const classes = useStyles({selected});

    const logClickCourseEvent = () => {
        logEvent(analytics, CLICK_COURSE_LINK);
        if (toggleDrawer){
            toggleDrawer(false);
        }
    }

    return (
        <Link 
            to={`/${moduleId}/${courseId}/1`}
            style={{textDecoration:"none"}}
            onClick={logClickCourseEvent}
        >
            <MuListItem
                button
                className={classes.nested}
            >
                <ListItemIcon>
                    <ListAltSharpIcon color={selected ? 'primary' : 'inherit'}/>
                </ListItemIcon>
                <ListItemText
                    primary={name}
                    className={classes.listItemText}
                />
            </MuListItem>
        </Link>
    );
}

const ListItem = ({item, toggleDrawer = null }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <MuListItem
                button
                key={item?.id}
                onClick={handleClick}
            >
                <ListItemIcon><MenuBookRounded /></ListItemIcon>
                <ListItemText primary={item?.name?.substring(5)} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </MuListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        item?.courses?.map((course, index) => (
                            <CustomItem 
                                name={course.name}
                                courseId={course.id}
                                index={index}
                                moduleId={item?.id}
                                key={index}
                                toggleDrawer={toggleDrawer}
                            />
                        ))
                    }
                </List>
            </Collapse>
        </>
    );
}

export default ListItem;