import { useState } from 'react';
import {
    ListItem as MuListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    List
} from '@material-ui/core';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import {
    ExpandLess,
    ExpandMore,
    MenuBookRounded
} from '@material-ui/icons'
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';

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
    updateSelectedItem,
    courseId,
    moduleId
}) => {
    const { moduleId: moduleIdUrl, courseId: courseIdUrl } = useParams();
    const selected = (JSON.stringify(moduleId)===moduleIdUrl && JSON.stringify(courseId)===courseIdUrl);
    const classes = useStyles({selected});

    return (
        <Link to={`/${moduleId}/${courseId}`}  style={{textDecoration:"none"}}>
            <MuListItem
                button
                className={classes.nested}
                onClick={() => {
                    updateSelectedItem(index)
                }}
            >
                <ListItemIcon>
                    <ListAltSharpIcon color={selected ? 'primary' : 'default'} />
                </ListItemIcon>
                <ListItemText
                    primary={name}
                    className={classes.listItemText}
                />
            </MuListItem>
        </Link>
    );
}

const ListItem = ({item}) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(0);

    const updateSelectedItem = (index) => {
        setSelectedItem(index)
    }

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
                <ListItemText primary={item?.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </MuListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        item?.courses?.map((course, index) => (
                            <CustomItem 
                                name={course.name}
                                courseId={course.id}
                                selected={selectedItem===index}
                                index={index}
                                updateSelectedItem={updateSelectedItem}
                                moduleId={item?.id}
                            />
                        ))
                    }
                </List>
            </Collapse>
        </>
    );
}

export default ListItem;