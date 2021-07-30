import React, { useState } from 'react';
import './PedidoVenta.css';
import MaterialTable from 'material-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import DatosFacturacion from './DatosFacturacion'

function VerPedido() {
  const api = axios.create();
  const [pedido, setPedido] = useState([]);
  const [cargado, setCargado] = useState(false);


  const obtenerPedido = (e) => {
    if ((parseInt(sessionStorage.getItem("pedido")) >= 0) && (sessionStorage.getItem("pedido") != null) && !cargado) {
      let url = "https://localhost:44307/api/APIVENTAs/" + parseInt(sessionStorage.getItem("pedido"));
      api.get(url)
        .then(response => {
          setPedido(response.data[0]);
        }).catch(error => console.log(error));
      setCargado(true);
    }
  }

  const columns = [
    { align: 'left', title: 'Producto', field: 'nombre' },
    { align: 'left', title: 'Cantidad', field: 'numPRODUCTO' },
    { align: 'left', title: 'Precio unitario', field: 'precio' },
    { align: 'left', title: 'Total', field: 'numPRODUCTO' }
  ]

  if (!true) {
    return (
      <Redirect to={{ pathname: "/login" }} />
    )
  } else if (sessionStorage.getItem("pedido") === null) {
    return (
      <Redirect to={{ pathname: "/PantallaPedido" }} />
    )
  } else {
    obtenerPedido();
    return (
      <div className='text-center tabla informacion'>
        <div className="row">
          <h5 className="titulo take-padding-bottom col-12">Detalles del pedido</h5>
          <div className="col-md-6 col-sm-12 take-padding add-padding">
            <div className="container align-items-left">
              <div className="row align-self-end">Fecha de pedido: {pedido.fecha}</div>
              <div className="row align-self-end">Encargado: {pedido.nombreEncargado}</div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 take-padding add-padding">
            <div className="container align-items-left">
              <div className="row align-self-end">Cliente: {pedido.nombreCliente}</div>
              <div className="row align-self-end">RUC: {pedido.ruc}</div>
            </div>
          </div>
        </div>
        <MaterialTable
          className="add-padding add-margin"
          columns={columns}
          data={pedido.detalles}
          align='left'
          options={{
            showTitle: false,
            paging: false,
            search: false,
            filtering: false,
            headerStyle: {
              backgroundColor: '#B8B8B8',
              color: '#FFF'
            },
            toolbar: false,
          }}
          localization={{
            emptyDataSourceMessage: <h1 style={{ marginTop: '6%', position: 'absolute', top: '16%', marginLeft: '-70px', textAlign: 'center' }}>No hay elelementos en la lista</h1>
          }}
        />
        <div className="row">
          <div className="col-6"><DatosFacturacion estado={pedido.estado}></DatosFacturacion></div>
          <div className="col-6 text-right resumen">
            <div className="row add-padding take-padding-bottom"><label className="col-12 resumen-label">Total: {pedido.total}</label></div>
            <div className="row"><label className="col-12 resumen-label">IVA: {pedido.iva}</label></div>
          </div>
        </div>
      </div>
    )
  }
}
export default VerPedido;