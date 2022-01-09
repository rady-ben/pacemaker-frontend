import {
    Drawer as MuDrawer,
    Divider,
    List,
    Hidden
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constant/ui';
import ListItem from './ListItem';



const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: DRAWER_WIDTH,
    },
    toolbar: theme.mixins.toolbar,
}));

const Drawer = ({ listItems, drawerOpen, toggleDrawer }) => {
    const classes = useStyles();
    const innerToggleDrawer = () => {
        toggleDrawer(!drawerOpen)
    }
    return (
        <>
            <Hidden
                smDown
            >
                <MuDrawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        {listItems.map((item, index) => (
                            <ListItem 
                                item={item}
                                key={index}
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
                            />
                        ))}
                    </List>
                </MuDrawer>
            </Hidden>
        </>
    );
}

export default Drawer;