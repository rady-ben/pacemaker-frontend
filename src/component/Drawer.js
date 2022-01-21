import {
    Drawer as MuDrawer,
    Divider,
    List,
    Hidden,
    IconButton
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constant/ui';
import ListItem from './ListItem';

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
    const innerToggleDrawer = () => {
        toggleDrawer(!drawerOpen)
    }
    return (
        <>
            <Hidden
                smDown
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
                        <IconButton onClick={innerToggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
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