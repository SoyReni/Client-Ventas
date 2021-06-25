import React, { useState } from 'react';
import './PedidoVenta.css';
import axios from 'axios';
import { Table, TableContainer, TableCell, TableRow, TableHead, TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import MaterialTable, { MTableToolbar } from 'material-table'
import IconButton from '@material-ui/core/IconButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'reactstrap';
import NuevoPedidoEncabezado from './NuevoPedidoEncabezado';
import { Redirect } from 'react-router-dom';

function PantallaPedido({ isLoged }) {
  const [listaProducto, setListaProducto] = useState([]);
  const [carrito, addItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [iva, setIva] = useState(0); 
  
  const componentDidMount = (e) => {
    axios.get("https://localhost:44307/api/APISTOCK").then(response => {
      console.log(response.data);
      setListaProducto(response.data);
    });
  }

  const sumarTotal = (val) => {
    let nuevo = total; 
    nuevo = total + val; 
    setTotal(nuevo); 
  }

  const calcularIva = (e) => {
    let nuevo = total / 11;
    setIva(nuevo);  
  }

  const columns = [
    { align: 'left', title: 'Prodcuto', field: '', type: 'numeric' },
    { align: 'left', title: 'Cantidad', field: '' },
    { align: 'left', title: 'Precio', field: '' },
    { align: 'left', title: 'Total', field: '' },
    { align: 'left', title: 'Acciones', field: '' }
  ]

  if (!true) {
    console.log('Hola');
    return (
      <Redirect to={{ pathname: "/login", state: { isLoged: false } }} />
    )
  } else {
    componentDidMount;
    return (
      <Container className='pedido text-center tabla'>
        <NuevoPedidoEncabezado />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><TextField label="Producto"></TextField></TableCell>
              <TableCell><TextField label="Cantidad"></TextField></TableCell>
              <TableCell><label>Stock: 100</label></TableCell>
              <TableCell><label>Precio u.:20.000</label></TableCell>
              <TableCell><label>Subtotal.: 100.000</label></TableCell>
              <TableCell><IconButton><AddBoxIcon color="primary" fontSize="large"></AddBoxIcon></IconButton></TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <TableContainer bordered hover responsive>
          <Table bordered hover responsive>
            <MaterialTable columns={columns}
              data={carrito}
              align='left'
              actions={[ rowData => ({ icon: Delete, tooltip: 'Eliminar' })]}
              options={{
                actionsColumnIndex: -1,
                showTitle: false,
                paging: false,
                search: false,
                filtering: false,
                headerStyle: {
                  backgroundColor: '#0d6efd',
                  color: '#FFF'
                }
              }}
              localization={{
                emptyDataSourceMessage: <h1 style={{ marginTop: '6%', position: 'absolute', top: '16%', marginLeft: '-70px', textAlign: 'center' }}>No hay elelementos en la lista</h1>
              }}
              components={{
                Toolbar: (props) => (
                  <div
                    style={{
                      height: "0px",
                    }}
                  >
                    <MTableToolbar {...props} />
                  </div>
                ),
              }}
            />
          </Table>
        </TableContainer>
        <div classname="container text-right resumen">
          <div className="row"><div className="col-7"></div><label className="col-5 resumen-label">Total: 110.000</label></div>
          <div className="row"><div className="col-7"></div><label className="col-5 resumen-label">IVA: 11.000</label></div>
          <div className="center">
            <Button className="btn btn-primary boton-aceptar">Aceptar </Button>
          </div>
        </div>
      </Container>
    )
  }
}
export default PantallaPedido;