import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FacturaEmitida from './FacturaEmitida';
import PagoRealizado from './PagoRealizado';
import PagoPendiente from './PagoPendiente';
import './Informe.css';
import './PedidoVenta.css'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Container, Label } from 'reactstrap';
import { Select, MenuItem, Card } from '@material-ui/core';


function Informe() {
  const [opcion, setOpcion] = useState();
  return (
    //color ligth se usa para sarle fondo claros y color="dark" para darle fondo oscuro
    //md es la capaciddiad que tendra el navbar al colapsarse con el elemento dentro
    //ms = middle o meo 

    <BrowserRouter>
      <Container >
        <Card style={{ backgroundColor: "#ffff" }} >

          <div className="col-md-6 col-sm-12">
            <div className="align-items-left">
              <Label aria-controls="simple-menu" className="row align-self-end"> <h5>  Informes</h5></Label>

              <Select
                className="row align-self-end"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ width: 150 }}
                value={opcion}
                onChange={(e) => setOpcion(e.target.value)}
              >
                <MenuItem value={"Factura Emitidas"}> <Link to="/FacturaEmitida" className="tituloL"> Factura Emitidas</Link></MenuItem>
                <MenuItem value={"Pagos Realizados"}> <Link to="/PagoRealizado" className="tituloL"> Pagos Realizados</Link></MenuItem>
                <MenuItem value={"Pago Pendientes"}> <Link to="/PagoPendiente" className="tituloL">Pagos Pendientes</Link></MenuItem>
              </Select>
            </div>
          </div>

        </Card>
      </Container>
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