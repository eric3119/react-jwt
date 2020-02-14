import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ListDigitalizacao from './list/ListDigitalizacao';

import {
    Link
} from "react-router-dom";

import api from '../../services/api';

class Digitalizacoes extends Component {

    constructor(props){
        super(props);

        this.state = {
            digitalizacoes: []
        };

        this.loadObjects = this.loadObjects.bind(this);
    }

    async loadObjects() {
        try {
            const token = await localStorage.getItem('tokenR');

            api.setHeader('Authorization', `JWT ${token}`);
            
            const response = await api.get('/digitalizacao/');
            const { data, ok, problem } = response;
            
            if (ok) {
                console.log(data);
                console.log(this.state.digitalizacoes);
                this.setState({
                    digitalizacoes: data,
                });
            } else {
                console.log(problem, data);
            }
        } catch (err) {
            const { data, problem } = err;
            
            console.log(problem, data);
        }
    }

    componentDidMount(){
        this.loadObjects();
    }

    render() {
        return (
            <div>
                <div>
                    <h6><strong>Lista</strong></h6>
                    <hr />
                    <Link to="/novo" className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} />
                    </Link>
                </div>
                <ListDigitalizacao digitalizacoes={this.state.digitalizacoes}/>
            </div>
        );
    }
}

export default Digitalizacoes;