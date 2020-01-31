import React, {Component} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Nav, Navbar, Container } from 'react-bootstrap';
import Digitalizacoes from './components/digitalizacoes/Digitalizacoes';
import Auth from './components/auth/Auth';
import CreateDigitalizacao from './components/digitalizacoes/create/CreateDigitalizacao';
import UpdateDigitalizacao from './components/digitalizacoes/update/UpdateDigitalizacao';


import Clock from './components/clock/Clock';
import RefreshToken from './components/refresh_token/refresh_token';

library.add(faCheckCircle, faTrashAlt);

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      count: 0,
    };
  }

  render(){
    const {count} = this.state;

    return (
      <>
        <Router>
          <Nav variant="tabs" defaultActiveKey="/home">
            <Navbar.Brand>
              JWT Test
            </Navbar.Brand>
            <Nav.Item>
              <Nav.Link>
                <Link to="/">Home</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Clock time={count}/>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Container>
              <Switch>
                <Route path="/login">
                  <Auth startTimer={ (value) => { this.handleRestart(value) } } />
                </Route>
                <Route path="/novo">
                  <CreateDigitalizacao />
                </Route>
                <Route path="/update/:_id/" component={UpdateDigitalizacao} />
                <Route path="/">
                  {/* <RefreshToken/> */}
                  <Digitalizacoes />
                </Route>
              </Switch>
            </Container>
        </Router>
      </>
    );
  }
}
