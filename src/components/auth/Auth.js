import React, { Component } from 'react';
import api from '../../services/api';

import { Form, Button } from 'react-bootstrap';

export default class Auth extends Component{

    constructor(props){
        super(props);

        this.state = {
            username_read: '',
            password_read: '',
            username_update: '',
            password_update: '',
            username_create: '',
            password_create: ''
        };

        this.saveToken = this.saveToken.bind(this);
    }

    async saveToken() {
        const { username_read, password_read } = this.state;
        const { username_update, password_update } = this.state;
        const { username_create, password_create } = this.state;

        await this.authenticateAndStore('tokenR', {username: username_read, password: password_read});
        await this.authenticateAndStore('tokenC', {username: username_create, password: password_create});
        await this.authenticateAndStore('tokenU', {username: username_update, password: password_update});

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
            console.log(problem, data);
        }
    }

    render(){
        return (
            <div className="jumbotron my-5">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username Read</Form.Label>
                        <Form.Control type="text" placeholder="Username Read"  onChange={
                            (event) => this.setState({ username_read: event.target.value })
                        } />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password Read"onChange={
                            (event) => this.setState({ password_read: event.target.value })
                        } />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username Update</Form.Label>
                        <Form.Control type="text" placeholder="Username Update"  onChange={
                            (event) => this.setState({ username_update: event.target.value })
                        } />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password Update"onChange={
                            (event) => this.setState({ password_update: event.target.value })
                        } />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username Create</Form.Label>
                        <Form.Control type="text" placeholder="Username Create"  onChange={
                            (event) => this.setState({ username_create: event.target.value })
                        } />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password Create"onChange={
                            (event) => this.setState({ password_create: event.target.value })
                        } />
                    </Form.Group>
                    <Button variant="primary" onClick={this.saveToken}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
