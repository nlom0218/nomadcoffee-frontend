import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import React from 'react';
import { client, darkModeVar } from './apollo';
import Login from './screens/Login';
import Home from './screens/Home';
import NotFound from './screens/NotFound';
import { darkTheme, GlobalStyles, lightTheme } from './styles';
import { ThemeProvider } from 'styled-components';
import routes from './routes';
import SignUp from './screens/SignUp';
import { HelmetProvider } from 'react-helmet-async';
import Profile from './screens/Profile';
import CreateShop from './screens/CreateShop';
import ShopDetail from './screens/ShopDetail';
import EditShop from './screens/EditShop';


function App() {
  const darkMode = useReactiveVar(darkModeVar)
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route exact path="/"><Home /></Route>
              <Route path={routes.LOGIN}><Login /></Route>
              <Route path={routes.SIGNUP}><SignUp /></Route>
              <Route path={routes.ADD}><CreateShop /></Route>
              <Route exact path={routes.USER}><Profile /></Route>
              <Route exact path={routes.SHOP_DETATIL}><ShopDetail /></Route>
              <Route path={routes.SHOP_EDIT}><EditShop /></Route>
              <Route path={"/notFound/404"}><NotFound /></Route>
              <Route><NotFound /></Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
