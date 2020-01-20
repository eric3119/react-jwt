import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import List from './list/List';

import api from '../../services/api';

class Tasks extends Component {

    constructor(props){
        super(props);

        this.state = {
            tasks: []
        };

        this.loadObjects = this.loadObjects.bind(this);
    }

    async loadObjects() {
        try {
            const token = await localStorage.getItem('token');

            api.setHeader('Authorization', `JWT ${token}`);
            
            const response = await api.get('/digitalizacao/');
            const { data, ok, problem } = response;
            
            if (ok) {
                console.log(data);
                this.setState({
                    tasks: data,
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
                    <a href="/novo" className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} />
                    </a>
                </div>
                <List tasks={this.state.tasks}/>
            </div>
        );
    }
}

export default Tasks;