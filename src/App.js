import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import React from 'react';
import { client, darkModeVar, isLoggedInVar } from './apollo';
import Login from './screens/Login';
import Home from './screens/Home';
import NotFound from './screens/NotFound';
import { darkTheme, GlobalStyles, lightTheme } from './styles';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import routes from './routes';
import DarkModeBtn from './components/DarkModeBtn';
import SignUp from './screens/SignUp';
import { HelmetProvider } from 'react-helmet-async';


function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)
  const darkMode = useReactiveVar(darkModeVar)
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Header />
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route path={routes.LOGIN}><Login /></Route>
              <Route path={routes.SIGNUP}><SignUp /></Route>
              <Route><NotFound /></Route>
            </Switch>
            <DarkModeBtn />
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
