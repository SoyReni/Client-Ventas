import React, { useState } from 'react';
import axios from 'axios';
import './PedidoVenta.css';
import MaterialTable, { MTableToolbar } from 'material-table'
import Typography from '@material-ui/core/Typography'
import { Edit, Delete, Check, SaveAlt, Visibility, RemoveShoppingCartRounded } from '@material-ui/icons'
import { Select, MenuItem } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Row } from 'reactstrap';
import { Redirect, useHistory, Link, useLocation } from 'react-router-dom';

function PedidoVenta({ isLoged }) {
  const [listaVenta, setListaVenta] = useState([])
  const api = axios.create();
  const [cargado, setCargado] = useState(false);
  const [selected, setSelected] = useState([]);
  const [year, setYear] = useState();



  const componentDidMount = (e) => {
    if (!cargado) {
      api.get("https://localhost:44307/api/APIVENTAs").then(response => {
        setListaVenta(response.data),
          console.log(listaVenta);
        setCargado(true),
          console.log(true)
      });
    }
  }

  const history = useHistory();
  const verPedido = (e) => {
    setSelected(e);
    console.log(e);
    console.log(selected);
    history.push({
      pathname: '/PedidoDetalles',
      appState: {
        isLoged: true,
        pedido: selected
      }
    });
  }

  const [location, setLocation] = useState([]); 
  const definirLocation = async (e) =>{
    var locationN = {
      pathname: '/verPedido',
      state: {
        carro: [],
        total: e.VENTAId.total,
        iva: e.VENTAId.iva, 
        cliente: e.CLIENTEId
      }
    };   
    setLocation(locationN);  
    console.log(location);  
  }
  
  const columns = [
    { align: 'left', title: 'ID', field: 'VENTAId', type: 'numeric', width: 10 },
    { align: 'left', title: 'Fecha de emision', field: 'fecha', width: 100 },
    { align: 'left', title: 'Encargado', field: 'ENCARGADOId.nombre', width: 100 },
    { align: 'left', title: 'Cliente', field: 'CLIENTEId.nombre', width: 100 },
    { align: 'left', title: 'Estado', field: 'estado', width: 100}
  ]

  if (!true) {
    return (
      <Redirect to={{ pathname: "/login", state: { isLoged: false } }} />
    )
  } else {
    componentDidMount();
    return (
      <div className='tabla'>


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
                to={location}
                onClick={(event) => props.action.onClick(event, props.data)}
                color="primary"
                variant="contained"
                size="small"
              >
                Ver
              </Link>
            ),
          }}
          options={{
            actionsColumnIndex: -1,
            showTitle: true,
            search: true,
            filtering: false,
            headerStyle: {
              backgroundColor: '#B8B8B8',
              color: '#FFF'
            }
          }}
        />
        <div className="card-body">
          <div className="center">
            <Link className="btn btn-success boton-aceptar" to='/PantallaPedido'>Nuevo Pedido</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PedidoVenta;