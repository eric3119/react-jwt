import React, {Component} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import api from './services/api';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap'

import Header from './components/header/Header';
import Digitalizacoes from './components/digitalizacoes/Digitalizacoes';
import Auth from './components/auth/Auth';
import CreateDigitalizacao from './components/digitalizacoes/create/CreateDigitalizacao';
import UpdateDigitalizacao from './components/digitalizacoes/update/UpdateDigitalizacao';

library.add(faCheckCircle, faTrashAlt);

class Clock extends React.Component {
  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ':' + seconds;
  }
  render () {
    const {time} = this.props;
    return (
      <div className="displayedTime">
        <h1>{this.format(time)}</h1>
      </div>
    )
  }
}


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
    
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      if(newCount <= 60){
        this.refreshToken();
      }
      this.setState(
        {count: newCount >= 0 ? newCount : 0}
      );
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

  async refreshToken(){

    const tokenC = await localStorage.getItem('tokenC');
    const tokenR = await localStorage.getItem('tokenR');
    const tokenU = await localStorage.getItem('tokenU');

    await this.refreshAndStore('tokenC', tokenC);
    await this.refreshAndStore('tokenR', tokenR);
    await this.refreshAndStore('tokenU', tokenU);

    this.handleRestart(600);
  }

  async refreshAndStore(token_name, token){
    try {
        const response = await api.post('/refresh-token/', {
            token
        });
        
        console.log(response);
        const { data, problem } = response;

        if (data['token']) {
            console.log(data);
            await localStorage.setItem(token_name, data['token']);
        } else {
            console.log(problem, data);
        }
    } catch (err) {
        const { data, problem } = err;
        console.log(problem, data);
    }
}

  render(){

    if(this.state.isLoading){
      return <div>loading</div>
    }

    const {count} = this.state;

    return (
      <>
        <Header />
        <Clock time={count}/>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>

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
          </div>
        </Router>
        <div style={{fontSize: 18}}>
          JWT user para Visualização <br />
          usuario: usuario_visualizacao<br />
          senha: Visualizador1234<br /><br />

          JWT user para Atualização<br />
          usuario: usuario_atualizacao<br />
          senha: Atualizacao1234<br /><br />

          JWT user para Cadastro<br />
          usuario: usuario_insercao<br />
          senha: Insercao1234<br />
        </div>      
      </>
    );
  }
}
