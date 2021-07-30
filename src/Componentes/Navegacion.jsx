import React, { useState } from 'react';
import { Navbar } from 'reactstrap';
import CuentaCorriente from './CuentaCorriente';
import Informe from './Informe';
import PedidoVenta from './PedidoVenta';
import PantallaPedido from './PantallaPedido';
import VerPedido from './VerPedido';
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import { Redirect } from 'react-router-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function Navegacion() {
    const [log, setLog] = useState(sessionStorage.getItem("token"));

    const unlog = (e) => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("Encargado");
        setLog(null);
    }

    if (log === null) {
        return (
            <Redirect to={{ pathname: "/login"}} />
        )
    } else {
        return (
            <BrowserRouter>
                <Navbar color="primary" variant="dark" >
                    <div className="btn-group">
                        <Link to="/PedidoVenta" className="btn btn-primary">
                            Ventas
                        </Link>
                        <Link to="/PantallaPedido" className="btn btn-primary">
                            Pedido Nuevo
                        </Link>
                        <Link to="/Informe" className="btn btn-primary">
                            Informes
                        </Link>
                        <Link to="/CuentaCorriente" className="btn btn-primary">
                            Cuenta Corriente
                        </Link>
                    </div>
                    <Link onClick={(e) => unlog()} className="btn btn-primary right"
                        to={{pathname: '/Login'}}>
                        Cerrar Sesion
                    </Link>
                </Navbar>

                <Switch>
                    <Route path="/Informe"
                        component={Informe} />
                    <Route path="/PantallaPedido"
                        component={PantallaPedido} />
                    <Route path="/verPedido"
                        component={VerPedido} />
                    <Route path="/Login"
                        component={Login} />
                    <Route path="/CuentaCorriente"
                        component={CuentaCorriente} />
                    <Route path="/" component={PedidoVenta} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Navegacion;