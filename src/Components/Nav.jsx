import React, { useState } from 'react';
import { Navbar } from 'reactstrap';
import Home from '../Components/Home'; 
import VerPedido from '../Components/VerPedido'; 
import PedidoNuevo from '../Components/PedidoNuevo'
import Informe from '../Components/Informe';
import Inicio from '../Components/Inicio'
import CuentaCorriente from '../Components/CuentaCorriente';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/inicio.css'
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
                        <Link to="/Home" className="btn btn-primary">
                            Ventas
                        </Link>
                        <Link to="/Nuevo" className="btn btn-primary">
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
                    <Route path="/Nuevo"
                        component={PedidoNuevo} />
                    <Route path="/verPedido"
                        component={VerPedido} />
                    <Route path="/Login"
                        component={Inicio} />
                    <Route path="/CuentaCorriente"
                        component={CuentaCorriente} />
                    <Route path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Navegacion;