import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacturaEmitida from './FacturaEmitida';
import PagoRealizado from './PagoRealizado';
import PagoPendiente from './PagoPendiente';
import './Informe.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';


function Informe() {
  return (
    //color ligth se usa para sarle fondo claros y color="dark" para darle fondo oscuro
    //md es la capaciddiad que tendra el navbar al colapsarse con el elemento dentro
    //ms = middle o meo 
    <BrowserRouter>
    <div className="container">
      <div className="row"> 
          <Link className="btn btn-success boton-aceptar col-3" to="/PagoRealizado">Pagos Realizados</Link>
          <Link className="btn btn-success boton-aceptar col-3" to="/PagoPendiente"> Pagos Pendientes </Link>
          <Link className="btn btn-success boton-aceptar col-3" to="/" > Facturas Emitidas</Link>
      </div>
    </div>
      <Switch>
        <Route path="/PagoRealizado">
          <PagoRealizado />|
        </Route>
        <Route path="/PagoPendiente">
          <PagoPendiente />
        </Route>
        <Route path="/">
          <FacturaEmitida />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Informe;