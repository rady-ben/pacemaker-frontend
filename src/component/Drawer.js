import { 
    Drawer as MuDrawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import { DRAWER_WIDTH } from '../constant/ui';


const useStyles = makeStyles((theme) => ({
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    toolbar: theme.mixins.toolbar,
  }));

const Drawer = ({ listItems }) => {
    const classes = useStyles();
    return (
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
                    <ListItem button key={text}>
                        <ListItemIcon><ListAltSharpIcon /></ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </MuDrawer>
    );
}

export default Drawer;