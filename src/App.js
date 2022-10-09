import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import { useStore } from "./store/Store";
import { setModules } from "./store/reducer";
import { MODULES_API } from "./config/api";
import Home from "./routes/home";
import Welcome from "./routes/Welcome";
import ModulesList from "./routes/ModulesList";
import CoursesList from "./routes/CoursesList";
const theme = createTheme();

function App() {
  const [, dispatch] = useStore();
  useEffect(() => {
    fetch(MODULES_API)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setModules(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            {/* <Route path="/:moduleId/:courseId/:questionId">
              <Home />
            </Route> */}
            <Route path="/:serieId/modules">
              <ModulesList />
            </Route>
            <Route path="/:serieId/:moduleId/:moduleName">
              <CoursesList />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
