import React, {Component} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
import Tasks from './components/tasks/Tasks';
import Auth from './components/auth/Auth';
import CreateTask from './components/tasks/create_task/CreateTask';

library.add(faCheckCircle, faTrashAlt);

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      token: '', 
      isLoading: true
    };

    this.getToken = this.getToken.bind(this);
  }

  async getToken(){
    const token = await localStorage.getItem('token');
    this.setState({ token });
  }

  async componentDidMount(){

    if (window.location.pathname !== '/login'){
      if(await localStorage.getItem('token') === ''){
        window.location.assign('/login');
      }
    }
    this.setState({isLoading:false});
  }

  render(){

    if(this.state.isLoading){
      return <div>loading</div>
    }

    return (
      <>
        <Header />
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
                  <Auth />
                </Route>
                <Route path="/novo">
                  <CreateTask />
                </Route>
                <Route path="/">
                  <Tasks />
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
