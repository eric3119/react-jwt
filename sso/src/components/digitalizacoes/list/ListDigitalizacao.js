import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
// import api from '../../../services/api';

import {
  Link
} from "react-router-dom";

class ListDigitalizacao extends Component {

  async deleteDigitalizacao(id){
    // try {
    //   const token = await localStorage.getItem('tokenD');

    //   api.setHeader('Authorization', `JWT ${token}`);

    //   const response = await api.delete(`/digitalizacao/${id}/`);

    //   const { data, ok } = response;

    //   if (ok) {
    //       console.log(data);
    //       window.location.reload();
    //   } else {
    //       console.log(response);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  render() {
    return (
      <div>
          <Table responsive>
            <tbody>
              {this.props.digitalizacoes.map((digitalizacao, index) => {
                return <tr key={digitalizacao.id}>
                        <td className="col-md-2">{digitalizacao.numero}</td>
                        <td className="col-md-2">{digitalizacao.ano}</td>
                        <td className="col-md-2">{digitalizacao.descricao}</td>
                        <td className="col-md-2">{digitalizacao.arquivo}</td>
                        <td className="col-md-2">
                          <Link to={`update/${digitalizacao.id}/`}  className="btn btn-primary">
                            editar
                          </Link>
                        </td>
                        <td className="col-md-2">
                          <button onClick={() => this.deleteDigitalizacao(digitalizacao.id)} className="btn btn-primary">deletar</button>
                        </td>
                    </tr>;
              })}
            </tbody>
          </Table>
      </div>
    );
  }
}
   
   export default ListDigitalizacao;