import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './component/Header';
import Drawer from './component/Drawer';
import Question from './component/Question/Question';



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


function App() {
  const [drawerOpen, toggleDrawer] = useState(false);

  useEffect(() => {
    fetch('http://serie200-api.herokuapp.com/v1.0/module/')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error)=>{
      console.log(error);
    });

  }, [])

  return (
    <div>
      <Header
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <Drawer
        listItems={modules}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <Question />
    </div>
  );
}

export default App;
