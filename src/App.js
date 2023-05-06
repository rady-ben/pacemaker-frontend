import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import Home from "./routes/home";
import Welcome from "./routes/Welcome";
import ModulesList from "./routes/ModulesList";
import CoursesList from "./routes/CoursesList";
import ScrollToTop from "./ScrollToTop";

const theme = createTheme();

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route path="/workspace/:sourceId/:moduleId/:courseId/:questionId">
              <Home />
            </Route>
            <Route path="/:sourceId/modules">
              <ModulesList />
            </Route>
            <Route path="/:sourceId/:moduleId/:moduleName">
              <CoursesList />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
