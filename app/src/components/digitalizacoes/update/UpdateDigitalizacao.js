import React, { Component } from 'react';
import api from '../../../services/api';

import { Form, Button } from 'react-bootstrap';

import {
	withRouter
} from 'react-router-dom';

class UpdateDigitalizacao extends Component{

    constructor(props){
        super(props);

        this.state = {
            numero: '',
            ano: '',
            descricao: '',
            arquivo_original: '',
            arquivo_modificado: null,
        };

        this.submitForm = this.submitForm.bind(this);
        this.loadDigitalizacao = this.loadDigitalizacao.bind(this);
    }

    async componentDidMount(){
        await this.loadDigitalizacao();
    }

    async loadDigitalizacao(){
        const { _id } = this.props.match.params;

        try {
            const token = await localStorage.getItem('tokenR');

            api.setHeader('Authorization', `JWT ${token}`);
            
            const response = await api.get(`/digitalizacao/${ _id }/`);
            const { data, ok, problem } = response;
            
            if (ok) {
                
                this.setState({
                    numero: data['numero'],
                    ano: data['ano'],
                    descricao: data['descricao'],
                    arquivo_original: data['arquivo'] 
                });
            } else {
                console.log(problem, data);
            }
        } catch (err) {
            const { data, problem } = err;
            
            console.log(problem, data);
        }
    }

    async submitForm(e) {

        e.preventDefault();
        
        try {
            const { _id } = this.props.match.params;
            const { numero, ano, descricao, arquivo_modificado } = this.state;

            const formData = new FormData();

            formData.append("numero", numero);
            formData.append("ano", ano);
            formData.append("descricao", descricao);
            
            if(arquivo_modificado){
                formData.append("arquivo", arquivo_modificado);
            }
            
            const token = await localStorage.getItem('tokenU');

            api.setHeader('Authorization', `JWT ${token}`);

            const response = await api.put(`/digitalizacao/${_id}/`, formData);
            
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
                        } value={this.state.numero} />
                    </Form.Group>
                    <Form.Group controlId="formBasicAno">
                        <Form.Label>Ano</Form.Label>
                        <Form.Control type="text" placeholder="Ano"  onChange={
                            (event) => this.setState({ ano: event.target.value })
                        } value={this.state.ano} />
                    </Form.Group>
                    <Form.Group controlId="formBasicDescricao">
                        <Form.Label>Descricao</Form.Label>
                        <Form.Control type="text" placeholder="Descricao"  onChange={
                            (event) => this.setState({ descricao: event.target.value })
                        } value={this.state.descricao} />
                    </Form.Group>
                    <Form.Group controlId="formBasicArquivo">
                        <Form.Label>Arquivo</Form.Label>
                        <div>
                            atual: {this.state.arquivo_modificado? this.state.arquivo_modificado.name : this.state.arquivo_original }
                        </div>
                        <Form.Control type="file" placeholder="Arquivo"  onChange={
                            (event) => this.setState({ arquivo_modificado: event.target.files[0] })
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

export default withRouter(UpdateDigitalizacao);