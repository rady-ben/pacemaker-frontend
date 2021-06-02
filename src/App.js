import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';
import Header from './component/Header';


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
  return (
    <div className="App">
      <Header />
      <Drawer
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
          </ListItem>
        ))}
      </List>
      </Drawer>
    </div>
  );
}

export default App;
