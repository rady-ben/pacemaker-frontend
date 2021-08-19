import { 
    Drawer as MuDrawer,
    Divider,
    List,
} from '@material-ui/core';
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../constant/ui';
import ListItem from './ListItem';



const useStyles = makeStyles((theme) => ({
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    toolbar: theme.mixins.toolbar,
  }));

const Drawer = ({ listItems }) => {
    const classes = useStyles();
    return (
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
                    {listItems.map((text) => (
                        <ListItem lable={text} />
                    ))}
                </List>
            </MuDrawer>
        </Hidden>
    );
}

export default Drawer;