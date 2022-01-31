import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { useStore } from './store/Store';
import { setModules } from './store/reducer';
import Home from './routes/home';
import { MODULES_API } from './config/api';

const theme = createTheme();


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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/:moduleId/:courseId/:questionId">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
