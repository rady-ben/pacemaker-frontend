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
];

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listItemText: {
        color: props => (props.selected ? theme.palette.primary.dark : '#000'),
    }
}));

const CustomItem = ({
    text,
    selected,
    index,
    updateSelectedItem,
}) => {
    const classes = useStyles({selected});
    return (
    <MuListItem
        button
        className={classes.nested}
        onClick={() => {
            updateSelectedItem(index)
        }}
    >
        <ListItemIcon>
            <ListAltSharpIcon color={selected? 'primary': 'default'} />
        </ListItemIcon>
        <ListItemText
            primary={text}
            className={classes.listItemText}
        />
    </MuListItem>
    );
}

const ListItem = ({ lable }) => {
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
                        cours.map((text, index) => (
                            <CustomItem 
                                text={text}
                                selected={selectedItem===index}
                                index={index}
                                updateSelectedItem={updateSelectedItem}
                            />
                        ))
                    }
                </List>
            </Collapse>
        </>
    );
}

export default ListItem;