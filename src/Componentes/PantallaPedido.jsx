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
import { Container} from 'reactstrap';
import NuevoPedidoEncabezado from './NuevoPedidoEncabezado';
import {Redirect, Link} from 'react-router-dom';


function PantallaPedido({ isLoged }) {

  const [listaProducto, setListaProducto] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const api = axios.create();
  const [cargado, setCargado] = useState(false);
  const [stock, setStock] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [cantidad, setCant] = useState(1);
  const [actual, setActual] = useState('');
  const [inputP, setIP] = useState({ min: 0, max: 10 });

  const location = {
    pathname: '/verPedido',
    state: { 
      carro: carrito,
      total: total,
      iva: iva}
  }

  const componentDidMount = (e) => {
    if (!cargado) {
      api.get("https://localhost:44307/api/apistock").then(response => {
        setListaProducto(response.data);
        console.log(listaProducto);
        setCargado(true)
      });
    }
  }

  const sumarTotal = async (e) => {
    let nuevoTotal = total + subTotal;
    let nuevoIva = Math.round((total + subTotal) / 11);
    setTotal(nuevoTotal);
    setIva(nuevoIva);
  }

  const addItem = async (e) => {
    var item = {
      producto: actual,
      cantidad: cantidad,
      precio: precio,
      total: subTotal,
    }
    sumarTotal(subTotal);
    var nuevo = [...carrito];
    nuevo.push(item);
    console.log(carrito);
    setCarrito(nuevo);
    console.log(carrito);
  }

  const setDatos = (e) => {
    console.log(e);
    setPrecio(e.PRODUCTOId.precio);
    setStock(e.cantidad);
    setActual(e.PRODUCTOId.nombre);
    var IP = { min: 0, max: e.cantidad };
    setIP(IP);
  }

  const calcularSubtotal = async (event) => {
    console.log(event);
    setCant(event);
    setSubtotal(event * precio);
  };

  const columns = [
    { align: 'left', title: 'Producto', field: 'producto' },
    { align: 'left', title: 'Cantidad', field: 'cantidad' },
    { align: 'left', title: 'Precio unitario', field: 'precio' },
    { align: 'left', title: 'Total', field: 'total' }
  ]

  if (!true) {
    return (
      <Redirect to={{ pathname: "/login", state: { isLoged: false } }} />
    )
  } else {
    componentDidMount();
    return (
      <Container className='pedido text-center tabla'>
        <NuevoPedidoEncabezado />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Autocomplete
                  id="Producto"
                  noOptionsText={
                    <Typography> No se encuentra ese producto</Typography>
                  }
                  options={listaProducto}
                  onChange={(e, valor) => {
                    setDatos(valor)
                  }}
                  getOptionLabel={(option) => option.PRODUCTOId.nombre + " "}
                  renderInput={(params) => <TextField {...params} label="Producto" />}
                />
              </TableCell>
              <TableCell>
                <TextField
                  type='number'
                  label="Cantidad"
                  inputProps={inputP}
                  aria-invalid={true}
                  onChange={(e, v) => { calcularSubtotal(e.target.value) }}
                ></TextField>
              </TableCell>
              <TableCell><label>{stock}</label></TableCell>
              <TableCell><label>Precio u.:{precio}</label></TableCell>
              <TableCell><label>Subtotal.: {subTotal}</label></TableCell>
              <TableCell><IconButton onClick={(e) => addItem()}><AddBoxIcon className="addbutton" fontSize="large"></AddBoxIcon></IconButton></TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <TableContainer>
          <Table>
            <MaterialTable
              columns={columns}
              data={carrito}
              align='left'
              title='Acciones'
              actions={[rowData => ({ 
                  icon: Delete, 
                  tooltip: 'Eliminar' })]}
              options={{
                actionsColumnIndex: -1,
                showTitle: false,
                paging: false,
                search: false,
                filtering: false,
                toolbar: false,
                headerStyle: {
                  backgroundColor: '#B8B8B8',
                  color: '#FFF'
                }
              }}
              localization={{
                emptyDataSourceMessage: <h1 style={{ marginTop: '6%', position: 'absolute', top: '16%', marginLeft: '-70px', textAlign: 'center' }}>No hay elelementos en la lista</h1>
              }}
            />
          </Table>
        </TableContainer>
        <div className="container text-right resumen">
          <div className="row"><label className="col-12 resumen-label">Total: {total}</label></div>
          <div className="row"><label className="col-12 resumen-label">IVA: {iva}</label></div>
          <div className="row">
            <Link className="col-12 btn btn-success boton-aceptar"
              to={location}>
              Guardar
            </Link>
          </div>
        </div>
      </Container>
    )
  }
}
export default PantallaPedido;