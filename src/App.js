import React from "react";
import './App.css';
import StoreRegistration from './layouts/registration/storeRegistration'
import AddEditUser from './layouts/registration/addEditUser'
import AddEditProducts from './layouts/products/addEditProducts';
import DashboardStore from './layouts/dashboards/dashboardStore'
import DashboardSA from './layouts/dashboards/dashboardSA'
import Dashboard from './layouts/dashboards/dashboard'
import Login from './layouts/login/login';
import Home from './layouts/home/home';

import { Container, Row, Col } from 'react-bootstrap';

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
          <Row>
            <Col>
                <Switch>
                  <Route exact path ="/">
                    <Home/>
                  </Route>

                  <Route path ="/login">
                    <Login/>
                  </Route>

                  <Route path ="/storeRegistration">
                    <StoreRegistration/>
                  </Route>

                  <Route path ="/dashboardStore">
                    <DashboardStore/>
                  </Route>

                  <Route path ="/dashboardSA">
                    <DashboardSA/>
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
            </Col>
          </Row>
          
        </Container>
    </div>
  );
}

export default App;
