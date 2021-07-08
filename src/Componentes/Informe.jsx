import React from 'react';
import { NavItem, Nav, Navbar, Form, Button, Dropdown } from 'reactstrap';
import GetPedidoVenta from './GetPedidoVenta';
import FacturaEmitida from './FacturaEmitida';
import PagoRealizado from './PagoRealizado';
import PagoPendiente from './PagoPendiente';
import './Informe.css';
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom';


function Informe() {
  return (
    //color ligth se usa para sarle fondo claros y color="dark" para darle fondo oscuro
    //md es la capaciddiad que tendra el navbar al colapsarse con el elemento dentro
    //ms = middle o meo 
    <BrowserRouter>
      <Dropdown>
        <Button className="mainmenubtn">Informe: </Button>
        <div className="dropdown-child">
          <a href="#"> <Link to="/Informe/FacturaEmitida" > Facturas Emitidas</Link> </a>
          <a href="#"> <Link to="/Informe/PagoRealizado">Pagos Realizados</Link></a>
          <a href="#"><Link to="/Informe/PagoPendiente" > Pagos Pendientes </Link> </a>
        </div></Dropdown>
      <Switch>
        <Route path="/Informe/PagoRealizado">
          <PagoRealizado />|
        </Route>
        <Route path="/Informe/PagoPendiente">
          <PagoPendiente />
        </Route>
        <Route path="/Informe">
          <FacturaEmitida />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Informe;