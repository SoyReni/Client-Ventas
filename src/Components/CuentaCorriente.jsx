import React, { useState } from 'react';
//import '../css/TablaInforme.css';
import { Table, TableContainer, TableCell, TableBody, TableRow, TableHead } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {listaVenta} from '../listaVenta.json';
import Detalles from '../Components/Detalles';
import '../css/PedidoVenta.css';
import axios from 'axios';

function CuentaCorriente() {

  const [listaVenta, setListaVenta] = useState([]);
  const [cargado, setCargado] = useState(false); 
  const api = axios.create();

  const ventaDimount = (e) => {
    if (!cargado) {
      api.get("https://localhost:44307/api/APIFACTURAS").then(response => {
        setListaVenta(response.data.filter(fact => fact.condicion === "CREDITO"));
        setCargado(true)
      }).catch(error => console.log(error));
    }
  }
  
  ventaDimount();

  const arregloPedido = listaVenta.map(
    (listaVenta, i) => {
      return (
        <TableRow key={i}>
          <TableCell>{listaVenta.FACTURAId} </TableCell>
          <TableCell>{listaVenta.factNum} </TableCell>
          <TableCell>{listaVenta.CLIENTEId.nombre} </TableCell>
          <TableCell>{listaVenta.VENTAId.fecha} </TableCell>
          <TableCell><Detalles lista={listaVenta}/></TableCell>

        </TableRow>
      )
    }
  )
  return (
    <div className="tabla">
      <TableContainer>

        <Table className="table table-striped">

          <TableHead>
            <TableRow className=" encabezado navegacion">
              <TableCell>ID</TableCell>
              <TableCell>Factura</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha Emision</TableCell>
              <TableCell>Acciones</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>

            {arregloPedido}

          </TableBody>
        </Table>
      </TableContainer>

      <div className="center">



      </div>
    </div>
  )
}

export default CuentaCorriente;