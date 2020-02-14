import React, { Component } from 'react';
import api from '../../services/api';
import { token_expiration_ms } from '../../constants/constants';

import { Form, Button } from 'react-bootstrap';

import {
	withRouter
} from 'react-router-dom';

class Auth extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(e) {

        try{
            e.preventDefault();

            const { startTimer } = this.props;

            const { username, password } = this.state;
            const { username_update, password_update } = this.state;
            const { username_create, password_create } = this.state;

            await this.authenticateAndStore('tokenR', {username: username, password: password});
            await this.authenticateAndStore('tokenC', {username: username_create, password: password_create});
            await this.authenticateAndStore('tokenU', {username: username_update, password: password_update});
            
            
            const expiration = new Date();
            
            await localStorage.setItem("expiration_time", (expiration.getTime() + token_expiration_ms));
            
            startTimer(token_expiration_ms / 1000);
            
            this.props.history.push('/');

        }catch(err){
            console.log(err);
        }
    }

    async authenticateAndStore(token_name, user){
        try {
            const response = await api.post('/token/', {
                username: user.username,
                password: user.password,
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
            alert(problem, data);

            throw err;
        }
    }

    render(){
        return (
            <div>
                <div className="jumbotron my-5">
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Username </Form.Label>
                            <Form.Control type="text" placeholder="Username "  onChange={
                                (event) => this.setState({ username: event.target.value })
                            } value={this.state.username} />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password "onChange={
                                (event) => this.setState({ password: event.target.value })
                            } value={this.state.password} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
                <div>
                    <p>username_read: 'usuario_visualizacao'</p>
                    <p>password_read: 'Visualizador1234'</p>
                    <p>username_update: 'usuario_atualizacao'</p>
                    <p>password_update: 'Atualizacao1234'</p>
                    <p>username_create: 'usuario_insercao'</p>
                    <p>password_create: 'Insercao1234'</p>
                </div>
            </div>
        );
    }
}

export default withRouter(Auth);