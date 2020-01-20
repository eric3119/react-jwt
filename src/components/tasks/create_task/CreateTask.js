import React, { Component } from 'react';
import api from '../../../services/api';

import { Form, Button } from 'react-bootstrap';

export default class Auth extends Component{

    constructor(props){
        super(props);

        this.state = {
            numero: '',
            ano: '',
            descricao: '',
            arquivo: ''
        };

        this.submitForm = this.submitForm.bind(this);
    }

    async submitForm() {
        
        try {
            const { numero, ano, descricao, arquivo } = this.state;
            
            const token = await localStorage.getItem('token');

            api.setHeader('Authorization', `JWT ${token}`);

            const response = await api.post('/digitalizacao/', {
                numero,
                ano,
                descricao,
                arquivo
            });
            
            console.log(response);
            const { data, ok, problem } = response;

            if (ok) {
                console.log(data);
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
                <Form enctype="multipart/form-data">
                    <Form.Group controlId="formBasicNumero">
                        <Form.Label>Numero</Form.Label>
                        <Form.Control type="text" placeholder="Numero"  onChange={
                            (event) => this.setState({ numero: event.target.value })
                        } />
                    </Form.Group>
                    <Form.Group controlId="formBasicAno">
                        <Form.Label>Ano</Form.Label>
                        <Form.Control type="text" placeholder="Ano"  onChange={
                            (event) => this.setState({ ano: event.target.value })
                        } />
                    </Form.Group>
                    <Form.Group controlId="formBasicDescricao">
                        <Form.Label>Descricao</Form.Label>
                        <Form.Control type="text" placeholder="Descricao"  onChange={
                            (event) => this.setState({ descricao: event.target.value })
                        } />
                    </Form.Group>
                    <Form.Group controlId="formBasicArquivo">
                        <Form.Label>Arquivo</Form.Label>
                        <Form.Control type="file" placeholder="Arquivo"  onChange={
                            (event) => this.setState({ arquivo: event.target.files[0] })
                        } />
                    </Form.Group>
                    
                    <Button variant="primary" onClick={this.submitForm}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}
