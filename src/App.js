import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useStore } from './store/Store';
import { setModules } from './store/reducer';
import Home from './routes/home';
import { MODULES_API } from './config/api';


function App() {
  const [ ,dispatch] = useStore();
  useEffect(() => {
    fetch(MODULES_API)
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
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/:moduleId/:courseId">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
