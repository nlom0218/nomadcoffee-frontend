import { useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import React from 'react';
import { darkModeVar, isLoggedInVar } from './apollo';
import Login from './screens/Login';
import Home from './screens/Home';
import NotFound from './screens/NotFound';
import { darkTheme, GlobalStyles, ligthTheme } from './styles';
import { ThemeProvider } from 'styled-components';


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const darkMode = useReactiveVar(darkModeVar)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route><NotFound /></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
