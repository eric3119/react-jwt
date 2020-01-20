import React, { Component } from 'react';
import { Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class List extends Component {
  render() {
    return (
      <div>
          <Table responsive>
            <tbody>
              {this.props.tasks.map((task, index) => {
                return <tr key={task.id}>
                        <td className="col-md-2">{task.numero}</td>
                        <td className="col-md-2">{task.ano}</td>
                        <td className="col-md-2">{task.descricao}</td>
                        <td className="col-md-2">{task.arquivo}</td>
                        <td className="col-md-2"><a href="#">editar</a></td>
                        <td className="col-md-2"><a href="#">deletar</a></td>
                    </tr>;
              })}
            </tbody>
          </Table>
      </div>
    );
  }
}
   
   export default List;