import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';

const drawerWidth = 240;

const modules =[
  'Module 1',
  'Module 2',
  'Module 3',
  'Module 4',
  'Module 5',
  'Module 6',
  'Module 7',
  'Module 8',
  'Module 9',
  'Module 10',
  'Module 11',
  'Module 12',
]

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

function App({ window }) {
  const classes = useStyles();
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Séries 200
          </Typography>
          <Button color="inherit">Déconnecter</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
        {modules.map((text) => (
          <ListItem button key={text}>
            <ListItemIcon><ListAltSharpIcon /></ListItemIcon>
            <ListItemText primary={text} />
            {/* {open ? <ExpandLess /> : <ExpandMore />} */}
          </ListItem>
        ))}
      </List>
      </Drawer>
    </div>
  );
}

export default App;
