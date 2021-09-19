import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './component/Header';
import Drawer from './component/Drawer';
import Question from './component/Question/Question';
import { useStore } from './store/Store';
import { setModules } from './store/reducer';

function App() {
  const [drawerOpen, toggleDrawer] = useState(false);
  const [globalState ,dispatch] = useStore();
  useEffect(() => {
    fetch('http://serie200-api.herokuapp.com/v1.0/module/')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dispatch(setModules(data))
    })
    .catch((error)=>{
      console.log(error);
    });
  }, [])

  return (
    <Router>
      <Route path="/:moduleId/:courseId">
        <div>
          <Header
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
          />
          <Drawer
            listItems={globalState.modules}
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
          />
          <Question />
        </div>
      </Route>
    </Router>
  );
}

export default App;
