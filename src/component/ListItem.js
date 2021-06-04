import { useState } from 'react';
import {
    ListItem as MuListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    List
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    ExpandLess,
    ExpandMore,
    MenuBookRounded
} from '@material-ui/icons'
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';

const cours = [
    'Cours 1',
    'Cours 2',
    'Cours 3',
    'Cours 4',
    'Cours 5',
    'Cours 6',
    'Cours 7',
    'Cours 8',
    'Cours 9',
    'Cours 10',
    'Cours 11',
    'Cours 12',
  ]

const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

const ListItem = ({ lable }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <MuListItem
                button
                key={lable}
                onClick={handleClick}
            >
                <ListItemIcon><MenuBookRounded /></ListItemIcon>
                <ListItemText primary={lable} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </MuListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        cours.map((text) => (
                            <MuListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <ListAltSharpIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </MuListItem>
                        ))
                    }
                </List>
            </Collapse>
        </>
    );
}

export default ListItem;