import React, { useState } from 'react';
import axios from 'axios';
import './PedidoVenta.css';
import MaterialTable from 'material-table'
import { Visibility } from '@material-ui/icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Link, useLocation } from 'react-router-dom';

function PedidoVenta() {
  const [listaVenta, setListaVenta] = useState([])
  const api = axios.create();
  const [cargado, setCargado] = useState(false);
  const log = useState(sessionStorage.getItem("token"));
  const encargado = useState(JSON.parse(sessionStorage.getItem("Encargado")));
  const loc = useLocation();
  const data = loc.state;

  const componentDidMount = (e) => {
    if (!cargado) {
      api.get("https://localhost:44307/api/APIVENTAs").then(response => {
        setListaVenta(response.data),
          setCargado(true)
      });
    }
  }

  const locationB = {
    pathname: '/VerPedido'
  }
  const location = useState(locationB);
  const definirLocation = (e) => {
    sessionStorage.setItem("pedido", e.VENTAId);
    console.log(sessionStorage.getItem("pedido"))
  }

  const columns = [
    { align: 'left', title: 'ID', field: 'VENTAId', type: 'numeric', width: 10 },
    { align: 'left', title: 'Fecha de emision', field: 'fecha', width: 100 },
    { align: 'left', title: 'Encargado', field: 'ENCARGADOId.nombre', width: 100 },
    { align: 'left', title: 'Cliente', field: 'CLIENTEId.nombre', width: 100 },
    {
      align: 'left', title: 'Estado', field: 'estado',
      lookup: { "PENDIENTE": 'Pendiente', "FACTURADO": 'Facturado', "CANCELADO": 'Cancelado' }, width: 100,
      render: rowData => {
        return (
          rowData.estado === "PENDIENTE" ? <p style={{ background: "#FFC300", color: "#ffffff" }}>{rowData.estado}</p> :
            rowData.estado === "FACTURADO" ? <p style={{ background: "#3BFF00", color: "#ffffff" }}>{rowData.estado}</p> :
              <p style={{ background: "#FF5733", color: "#ffffff" }}>{rowData.estado}</p>
        )
      }
    }
  ]

  if (log === null) {
    return (
      <Redirect to={{ pathname: "/login" }} />
    )
  } else {
    componentDidMount();
    return (
      <div className='tabla'>
        <div className="row">
          <h5 className="titulo col-md-6 col-sm-12">Bienvenido {encargado[0].nombre}</h5>
          <div className="card-body col-md-6 col-sm-12">
            <div className="center">
              <Link className="btn btn-success boton-aceptar" to='/PantallaPedido'><h5>Nuevo Pedido +</h5></Link>
            </div>
          </div>
        </div>
        <MaterialTable
          title='Lista de pedidos'
          columns={columns}
          data={listaVenta}
          localization={{
            header: { actions: 'Ver Pedido' },
            body: { cemptyDataSourceMessage: 'No hay elementos en la lista' },
            pagination: { labelRowsSelect: 'Elementos' },
            toolbar: { searchTooltip: 'Buscar', searchPlaceholder: 'Buscar' }
          }}
          actions={[{
            icon: Visibility,
            tooltip: 'Ver Pedido',
            onClick: (e, v) => definirLocation(v)
          }]}
          components={{
            Action: props => (
              <Link
                onClick={(event) => props.action.onClick(event, props.data)}
                className="btn btn-success boton-aceptar"
                to={{
                  pathname: '/VerPedido'
                }}>
                Ver
              </Link>
            ),
          }}
          options={{
            actionsColumnIndex: -1,
            showTitle: true,
            search: true,
            filtering: true,
            headerStyle: {
              backgroundColor: '#B8B8B8',
              color: '#FFF'
            }
          }}
        />
      </div>
    );
  }
}

export default PedidoVenta;