import React, { Component } from 'react';
import api from '../../../services/api';

import { Form, Button } from 'react-bootstrap';

import {
	withRouter
} from 'react-router-dom';

class CreateDigitalizacao extends Component{

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

    async submitForm(e) {

        e.preventDefault();
        
        try {
            const { numero, ano, descricao, arquivo } = this.state;

            const formData = new FormData();

            formData.append("numero", numero);
            formData.append("ano", ano);
            formData.append("descricao", descricao);
            formData.append("arquivo", arquivo);
            
            const token = await localStorage.getItem('tokenC');

            api.setHeader('Authorization', `JWT ${token}`);

            const response = await api.post('/digitalizacao/', formData);
            
            const { data, ok } = response;

            if (ok) {
                console.log(data);
                this.props.history.push('/');
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    }

    render(){
        return (
            <div className="jumbotron my-5">
                <Form encType="multipart/form-data" onSubmit={this.submitForm}>
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
                            (event) => {console.log(event.target.files[0]); return this.setState({ arquivo: event.target.files[0] })}
                        } />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(CreateDigitalizacao);