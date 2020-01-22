import React, { Component } from 'react';
import api from '../../../services/api';

import { Form, Button } from 'react-bootstrap';

export default class UpdateDigitalizacao extends Component{

    constructor(props){
        super(props);

        this.state = {
            numero: '',
            ano: '',
            descricao: '',
            arquivo: '',
            arquivoModificado: false,
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
                    arquivo: data['arquivo'] 
                });
            } else {
                console.log(problem, data);
            }
        } catch (err) {
            const { data, problem } = err;
            
            console.log(problem, data);
        }
    }

    async submitForm() {
        
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
            
            const { data, ok, problem } = response;

            if (ok) {
                console.log(data);
                window.location.assign('/');
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
                <Form encType="multipart/form-data">
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
                            atual: {this.state.arquivoModificado? this.state.arquivo.name : this.state.arquivo}
                        </div>
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
