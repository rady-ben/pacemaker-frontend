import { useState } from 'react';
import {
    Drawer as MuDrawer,
    Divider,
    List,
    Hidden,
    IconButton
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import makeStyles from '@mui/styles/makeStyles';
import { DRAWER_WIDTH } from '../constant/ui';
import ListItem from './ListItem';
import CustomModal from './Modal';
import { ALERT_UNAVAILABLE_MODULE } from '../constant/text';


const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: DRAWER_WIDTH,
    },
    toolbar: theme.mixins.toolbar,
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
}));

const Drawer = ({ listItems, drawerOpen, toggleDrawer }) => {
    const classes = useStyles();
    const [showAlert, setShowAlert] = useState(false)
    const innerToggleDrawer = () => {
        toggleDrawer(!drawerOpen)
    }

    const toggleAlert = () => {
        setShowAlert(!showAlert)
    }

    return <>
        <Hidden
            mdDown
        >
            <MuDrawer
                variant="persistent"
                open={drawerOpen}
                anchor="left"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={innerToggleDrawer} size="large">
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {listItems.map((item, index) => (
                        <ListItem 
                            item={item}
                            key={index}
                            toggleAlert={toggleAlert}
                        />
                    ))}
                </List>
            </MuDrawer>
        </Hidden>
        <Hidden
            mdUp
        >
            <MuDrawer
                variant="temporary"
                classes={{
                    paper: classes.drawerPaper,
                }}
                open={drawerOpen}
                onClose={innerToggleDrawer}
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {listItems.map((item, index) => (
                        <ListItem 
                            item={item}
                            key={index}
                            toggleDrawer={toggleDrawer}
                            toggleAlert={toggleAlert}
                        />
                    ))}
                </List>
            </MuDrawer>
        </Hidden>
        <CustomModal
            showSynthesis={showAlert}
            toggleModal={toggleAlert}
            modalContent={ALERT_UNAVAILABLE_MODULE}
        />
    </>;
}

export default Drawer;