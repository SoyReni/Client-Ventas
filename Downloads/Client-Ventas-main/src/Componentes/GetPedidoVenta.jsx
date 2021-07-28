import React from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

function GetPedidoVenta ({isLoged}) {

    if (!true) {
        return(
            <Redirect to={{ pathname:"/login", state: {isLoged: false}}}/>
        )
    } else {
        return (
            <div>
                <Button className="btn btn-primary btn-lg" color="primary">Pedidos de Venta </Button>
                <Button className="btn btn-primary btn-lg" color="primary">Informe </Button>
                <Button className="btn btn-primary btn-lg" color="primary">Cuenta Corriente </Button>
            </div>
        );
    }
}
export default GetPedidoVenta;