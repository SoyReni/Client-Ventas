import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardText, CardSubtitle, CardTitle, CardBody, CardImg, Col, Card } from 'reactstrap';


class Deposito extends React.Component {
    render() {
        return (
                    <CardBody>
                        <CardTitle>{this.props.titulo}</CardTitle>
                        <CardSubtitle><b>Valor:</b><b>{this.props.precio}</b> </CardSubtitle>
                        <CardText>
                            {this.props.descripcion}
                        </CardText>
                        

                    </CardBody>
             
        );
    }
}

export default Deposito;