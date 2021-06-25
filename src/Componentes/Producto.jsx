import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, CardText, CardSubtitle, CardTitle, CardBody, CardImg, Col, Card } from 'reactstrap';


class Producto extends React.Component {
    render() {
        return (
                <Card className="Card" body outline color="primary">
                    <option>
                        {this.props.titulo}
                    </option>
                </Card>

        );
    }
}

export default Producto;
