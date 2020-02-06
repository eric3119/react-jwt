import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// import Header from './components/header/Header';
import Digitalizacoes from './components/digitalizacoes/Digitalizacoes';
import Auth from './components/auth/Auth';
import RefreshToken from './components/refresh_token/RefreshToken';
import CreateDigitalizacao from './components/digitalizacoes/create/CreateDigitalizacao';
import UpdateDigitalizacao from './components/digitalizacoes/update/UpdateDigitalizacao';
import Clock from './components/clock/Clock';

import { token_expiration_ms } from './constants/constants';

import { Nav, Navbar, Container } from 'react-bootstrap';

library.add(faCheckCircle, faTrashAlt);

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      count: 0,
      running: false,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount(prevProps, prevState){

    if(prevState){
      if(this.state.running !== prevState.running){
        if(this.state.running) {
          this.handleStart();
        }
      }
    }else{
      this.handleStart();
    }

    if (window.location.pathname !== '/login'){
      if(await localStorage.getItem('token') === ''){
        window.location.assign('/login');
      }
    }
    this.setState({isLoading:false});
  }

  async handleStart() {
  
    const remaining_time = parseInt((localStorage.expiration_time - new Date().getTime()) / 1000);
    await this.setState({ count: remaining_time >= 0 ? remaining_time : 0 })
    
    this.timer = setInterval(async () => {
      const newCount = this.state.count - 1;

      if(newCount <= 60 && newCount >= 10){
        
        this.handleStop();

        if(await window.confirm("refresh token")){
          try {
            await RefreshToken();
            await this.handleRestart(token_expiration_ms / 1000);            
          } catch (error) {
            window.location.assign('/login');
            alert(error);
          }
        }else{
          this.handleFullStop();
        }
        
      }else{
        // else if(window.location.pathname !== "/login"){
        //   window.location.assign("/login");
        // }
        
        this.setState(
          {count: newCount >= 0 ? newCount : 0}
        );
      }

    }, 1000);
  }
  
  handleStop() {
    if(this.timer) {
      clearInterval(this.timer);
      this.setState(
        {running:false}
      );
    }
  }

  handleFullStop(){
    this.handleStop();
    this.handleReset();
    localStorage.setItem("expiration_time", 0);
    localStorage.setItem("tokenC", "");
    localStorage.setItem("tokenR", "");
    localStorage.setItem("tokenU", "");
  }
  
  handleReset() {
    this.setState(
      {count: 0}
    );
  }

  handleCountdown(seconds) {
    this.setState({
      count: seconds,
      running: true
    })
  }
  
  async handleRestart(seconds){
    await this.handleStop();
    await this.handleReset();
    await this.handleCountdown(seconds);
    await this.handleStart();
  }

  render(){

    if(this.state.isLoading){
      return <div>loading</div>
    }

    const {count} = this.state;

    return (
      <Router>
        <Nav variant="tabs" defaultActiveKey="/home">
          <Navbar.Brand>
            JWT Test
          </Navbar.Brand>
          <Nav.Item>
            <Nav.Link href="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/login">
              Login
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
              <Digitalizacoes />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}
