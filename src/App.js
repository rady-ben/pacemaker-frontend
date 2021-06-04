import {
Paper, 
Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Header from './component/Header';
import Drawer from './component/Drawer';
import { DRAWER_WIDTH } from './constant/ui';


const modules = [
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
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(4) + DRAWER_WIDTH,
    marginRight: theme.spacing(4),
    padding: theme.spacing(2)
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Drawer listItems={modules} />

      <Paper className={classes.container}>
        <p>
          dddddddd
        </p>
        <p>
          dddddddd
        </p>
        <p>
          dddddddd
        </p>
        <p>
          dddddddd
        </p>
        <p>
          dddddddd
        </p>
        <p>
          dddddddd
        </p>
        <p>
          dddddddd
        </p>
        
      </Paper>
    </div>
  );
}

export default App;
