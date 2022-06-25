import React from "react";
import './App.css';
import AddEditStore from './layouts/stores/addEditStore';
import AddEditUser from './layouts/registration/addEditUser';
import AddEditProducts from './layouts/products/addEditProducts';
import DashboardStore from './layouts/dashboards/dashboardStore'
import DashboardSA from './layouts/dashboards/dashboardSA';
import Dashboard from './layouts/dashboards/dashboard';
import StoresList from './layouts/stores/storesList';
import Login from './layouts/login/login';
import Home from './layouts/home/home';

import { Container } from 'react-bootstrap';

import { useHistory, Switch,
  Route } from 'react-router-dom';
import { historyState } from "./constants/globals";

function App() {
  const history = useHistory()
  console.info(history);

  historyState.history = history;

  return (
    <div className="App">
        <Container>
          <Switch>
            <Route exact path ="/">
              <Home/>
            </Route>

            <Route path ="/login">
              <Login/>
            </Route>

            <Route path ="/addEditStore">
              <AddEditStore/>
            </Route>

            <Route path ="/dashboardStore">
              <DashboardStore/>
            </Route>

            <Route path ="/dashboardSA">
              <DashboardSA/>
            </Route>

            <Route path ="/StoresList">
              <StoresList/>
            </Route>

            <Route path ="/dashboard">
              <Dashboard/>
            </Route>

            <Route path="/addEditUser">
              <AddEditUser/>
            </Route>

            <Route path="/addEditProduct">
              <AddEditProducts/>
            </Route>
          </Switch>
        </Container>
    </div>
  );
}

export default App;
