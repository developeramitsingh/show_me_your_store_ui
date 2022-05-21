import React from "react";
import './App.css';
import StoreRegistration from './layouts/registration/storeRegistration'
import AddEditUser from './layouts/registration/addEditUser'
import DashboardStore from './layouts/dashboards/dashboardStore'
import DashboardSA from './layouts/dashboards/dashboardSA'
import Login from './layouts/login/login';
import Home from './layouts/home/home';

import { Container, Row, Col } from 'react-bootstrap';

import { BrowserRouter as Router, Switch,
  Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
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

                  <Route path="/addEditUser">
                    <AddEditUser/>
                  </Route>
                </Switch>
            </Col>
          </Row>
          
        </Container>
      </Router>
    </div>
  );
}

export default App;
