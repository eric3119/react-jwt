import React, { Component } from 'react';
import api from '../../services/api';

import { Form, Button } from 'react-bootstrap';

export default class Auth extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.authenticate = this.authenticate.bind(this);
    }

    async authenticate() {
        const { username, password } = this.state;

        try {
            const response = await api.post('/token/', {
                username: username,
                password: password,
            });
            
            console.log(response);
            const { data, problem } = response;

            if (data['token']) {
                console.log(data);
                await localStorage.setItem('token', data['token']);
                window.location.assign('/');
            } else {
                console.log(problem, data);
            }
        } catch (err) {
            const { data, problem } = err;
            console.log(problem, data);
        }
    }

    render(){
        return (
            <div className="jumbotron my-5">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username"  onChange={
                            (event) => this.setState({ username: event.target.value })
                        } />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"onChange={
                            (event) => this.setState({ password: event.target.value })
                        } />
                    </Form.Group>
                    <Button variant="primary" onClick={this.authenticate}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
