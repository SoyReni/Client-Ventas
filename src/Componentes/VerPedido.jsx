import React, { useState } from 'react';
import './PedidoVenta.css';
import axios from 'axios';
import { Table, TableContainer, TableCell, TableRow, TableHead, TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import MaterialTable, { MTableToolbar } from 'material-table'
import { Autocomplete } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

function VerPedido({ isLoged, pedido }) {
  const [datos, setDatos] = useState({
    encargado: 'Dalila Castelnovo',
    fecha: '12/12/21',
    cliente: 'Ada Melgarejo',
    ruc: '515678-3'
  });
  const [carrito, setCarrito] = useState([]); 
  

  if (!true) {
    return (
      <Redirect to={{ pathname: "/login", state: { isLoged: false } }} />
    )
  } else {
    return (
      <Container className='text-center'>
        <div className="row align-items-left">
          <div className="col-md-6 col-sm-12 add-margin">
            <div className="container align-items-left">
              <div className="row align-self-end">Fecha de pedido: {datos.fecha}</div>
              <div className="row align-self-end">Encargado: {datos.encargado}</div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 add-margin">
            <div className="container align-items-left">
              <div className="row align-self-end">Cliente: {datos.nombre}</div>
              <div className="row align-self-end">ruc: {datos.ruc}</div>
            </div>
          </div>
        </div>


      </Container>
    )
  }
}
export default VerPedido;