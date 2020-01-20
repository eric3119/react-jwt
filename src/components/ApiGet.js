import React, { Component } from 'react';
import api from '../services/api';
import RefreshToken from '../components/RefreshToken';

export default class ApiGet extends Component{

    constructor(props){
        super(props);

        this.state = {
            numero: '',
            ano: '',
            descricao: '',
            arquivo: '',
        }

        this.postObject = this.postObject.bind(this);
    }

    async getObject() {
        try {
            const token = await localStorage.getItem('token');

            api.setHeader('Authorization', `JWT ${token}`);
            
            const response = await api.get('/digitalizacao/');
            const { data, ok, problem } = response;
            
            if (ok) {
                console.log(data);
            } else {
                console.log(problem, data['detail']);
            }
        } catch (err) {
            const { data, problem } = err;
            
            console.log(problem, data['detail']);

            if(data['detail'] === 'Signature expired'){
                await RefreshToken();
            }
        }
    }

    async postObject() {
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
            } else {
                console.log(problem, data['detail']);
            }
        } catch (err) {
            
            console.log(err);
        }
    }

    render(){
        return (
            <div>
                <input type="button" value="/GET" onClick={this.getObject} />
                <br />
                <input type="text" placeholder="numero" onChange={
                    (event) => this.setState({ numero: event.target.value })
                } />
                <input type="text" placeholder="ano" onChange={
                    (event) => this.setState({ ano: event.target.value })
                } />
                <input type="text" placeholder="descricao" onChange={
                    (event) => this.setState({ descricao: event.target.value })
                } />
                <input type="file" placeholder="arquivo" onChange={
                    (event) => this.setState({ arquivo: event.target.value })
                } />
                <input type="button" value="submit" onClick={this.postObject} />
            </div>
        );
    }
}
