import React, {useState} from 'react';
import { Navbar, Form, Button, } from 'reactstrap';
import GetPedidoVenta from './GetPedidoVenta';
import Detalles from './Detalles';
import Informe from './Informe';
import PedidoVenta from './PedidoVenta';
import PantallaPedido from './PantallaPedido';
import VerPedido from './VerPedido';
import { Redirect } from 'react-router-dom';
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom';


function Navegacion({ isLoged }) {
    const [loged, setLoged] = useState(isLoged); 

    /*const Unlog = (e) => {
        this.setState({
            isLoged : false
        })
        localStorage.setItem('token', 'false'); 
    } */

    

    if (true) {
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
                    </div>
                    <Form inline>
                        <Button color="primary">Cerrar Sesion</Button>
                    </Form>
                </Navbar>

                <Switch>
                    <Route path="/Informe" component={Informe} />
                    <Route path="/PantallaPedido" component={PantallaPedido}/>
                    <Route path="/verPedido" component={VerPedido}/>
                    <Route path="/" component={PedidoVenta} />
                </Switch>
            </BrowserRouter>
        );

    } else {
        return (
            <Redirect to={{ pathname: "/login", state: { isLoged: false } }} />
        )
    }
}
export default Navegacion;