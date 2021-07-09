import React, { useState } from 'react';
import './PedidoVenta.css';
import axios from 'axios';
import { Table, TableContainer, TableCell, TableRow, TableHead, TextField, Card, CardContent } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import MaterialTable, { MTableToolbar } from 'material-table'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
import "react-datepicker/dist/react-datepicker.css";


import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function PantallaPedido({ isLoged }) {

  const [listaProducto, setListaProducto] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const api = axios.create();
  const [cargadoClientes, setCargadoClientes] = useState(false);
  const [stock, setStock] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [cantidad, setCant] = useState(1);
  const [actual, setActual] = useState('');
  const [productoID, setPID] = useState(0);
  const [inputP, setIP] = useState({ min: 0, max: 10 });
  const [listaClientes, setClientes] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentClienteString, setClienteString] = useState("Cliente");
  const [currentCliente, setCliente] = useState([])
  const [currentID, setID] = useState("RUC");
  const [cargado, setCargado] = useState(false);
  const [idCliente, setClienteID] = useState([]);
  const [idVenta, setVenta] =useState(0); 
  //cliente nuevo
  const [nuevoRuc, setNRuc] = useState("");
  const [nuevoNombre, setNNombre] = useState("");
  const [nuevoTel, setNTel] = useState("");
  const [nuevoCorr, setNCorr] = useState("");
  const [nuevoDir, setNDir] = useState("");

  const clientesDidMount = async (e) => {
    if (!cargadoClientes) {
      api.get("https://localhost:44307/api/APICLIENTE").then(response => {
        setClientes(response.data);
        setCargadoClientes(true)
      });
    }
  };

  const toggleOpen = (e) => {
    setOpen(true);
  };

  const toggleClose = (e) => {
    setOpen(false);
  };

  const handleClose = (e) => {
    toggleClose();
  };

  const handleSubmit = (e) => {
    var axios = require('axios');
      var data = JSON.stringify({
        "ruc":nuevoRuc,
        "nombre": nuevoNombre,
        "telefono": nuevoTel,
        "correo": nuevoCorr,
        "direccion": nuevoDir
      });

      var config = {
        method: 'post',
        url: 'https://localhost:44307/api/apicliente',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      toggleClose(); 
  };

  const setNuevoRuc = (e) => {
    setNRuc(e + " ");
  }

  const setNuevoNombre = (e) => {
    setNNombre(e + " ");
  }

  const setNuevoTel = (e) => {
    setNTel(e + " ");
  }

  const setNuevoCorreo = (e) => {
    setNCorr(e + " ");
  }

  const setNuevoDir = (e) => {
    setNCorr(e + " ");
  }


  const setClientePorID = async (e) => {
    setCliente(e),
      setID(e.ruc),
      setClienteString(e.nombre),
      setClienteID(e.CLIENTEId)
  };

  const location = {
    pathname: '/verPedido',
    state: {
      carro: carrito,
      total: total,
      iva: iva,
      cliente: currentCliente,
      idcliente: idCliente
    }
  };

  const stockDidMount = async (e) => {
    if (!cargado) {
      api.get("https://localhost:44307/api/apistock").then(response => {
        setListaProducto(response.data);
        setCargado(true)
      });
    }
  };

  const sumarTotal = async (e) => {
    let nuevoTotal = total + subTotal;
    let nuevoIva = Math.round((total + subTotal) / 11);
    setTotal(nuevoTotal);
    setIva(nuevoIva);
  };

  const addItem = async (e) => {
    var item = {
      producto: actual,
      cantidad: cantidad,
      precio: precio,
      total: subTotal,
      faturado: false,
      id: productoID
    }
    sumarTotal(subTotal);
    var nuevo = [...carrito];
    nuevo.push(item);
    setCarrito(nuevo);
    console.log(carrito);
  };

  const setDatos = async (e) => {
    setPrecio(e.PRODUCTOId.precio);
    setStock(e.cantidad);
    setActual(e.PRODUCTOId.nombre);
    setPID(e.PRODUCTOId.PRODUCTOId);
    var IP = { min: 0, max: e.cantidad };
    setIP(IP);
  };

  const calcularSubtotal = async (event) => {
    setCant(event);
    setSubtotal(event * precio);
  };

  const columns = [
    { align: 'left', title: 'Producto', field: 'producto' },
    { align: 'left', title: 'Cantidad', field: 'cantidad' },
    { align: 'left', title: 'Precio unitario', field: 'precio' },
    { align: 'left', title: 'Total', field: 'total' }
  ];

  const guardarPedido = async (e) => {
    var axios = require('axios');
    var data = JSON.stringify({
      "estado": "PENDIENTE",
      "total": total,
      "iva": iva,
      "CLIENTEId": {
        "credito": idCliente
      },
      "ENCARGADOId": {
        "ENCARGADOId": 1
      },
      "fecha": "2021-09-01"
    });

    var config = {
      method: 'post',
      url: 'https://localhost:44307/api/apiventas',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log("Id respuesta: ",response.data.VENTAId);
        guardarCarrito(response.data.VENTAId);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const guardarCarrito = async (e) => {
    carrito.map((elem) => {
      var axios = require('axios');
      var data = JSON.stringify({
        "PRODUCTOId": {
          "precio": elem.id 
        },
        "VENTAId": {
          "iva": e
        },
        "cantidad":elem.cantidad, 
        "precio":elem.precio,
        "subtotal":elem.total
      });

      var config = {
        method: 'post',
        url: 'https://localhost:44307/api/apiventas_detalles',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  if (!true) {
    return (
      <Redirect to={{ pathname: "/login", state: { isLoged: false } }} />
    )
  } else {
    clientesDidMount();
    stockDidMount();
    return (
      <Container className='pedido text-center tabla'>
        <Card className="container llenar">
          <CardContent className="row align-items-left">

            <div className="col-md-4 col-sm-12 add-margin">
              <div className="container align-items-left">
                <div className="row align-self-end">Fecha: {new Date().toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ''}</div>
                <div className="row align-self-end">Encargado: Sebastian Caballero</div>
              </div>
            </div>

            <div className="container row col-md-8 col-sm-12">
              <div className="col-md-6 col-sm-12 align-items-left add-margin">
                <Autocomplete
                  id="ruc-AC"
                  noOptionsText={
                    <Button onMouseDown={toggleOpen} > Agregar nuevo cliente</Button>
                  }
                  options={listaClientes}
                  currentID={currentID}
                  onChange={(ev, val) => { setClientePorID(val) }}
                  getOptionLabel={(option) => option.ruc + " "}
                  renderInput={(params) => <TextField {...params} label="RUC" variant="outlined" />}
                />
              </div>
              <div className="col-md-6 col-sm-12 align-items-left add-margin">
                <label className="border" >{currentClienteString}</label>
              </div>
            </div>

            <Dialog
              open={open}
              onClose={handleClose}>
              <form className="container" onSubmit={(e) => handleSubmit()}>
                <DialogTitle className="row" id='add-cliente-dialog'>Agregar Cliente Nuevo</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    required={true}
                    className="row col-12"
                    margin="dense"
                    id="ruc-nuevo"
                    label="RUC"
                    type="text"
                    onChange={(ev, val) => { setNuevoRuc(ev.target.value) }}
                  ></TextField>
                  <TextField
                    autoFocus
                    required={true}
                    className="row col-12"
                    margin="dense"
                    id="nombre-nuevo"
                    label="Nombre o Razon Social"
                    type="text"
                    onChange={(ev, val) => { setNuevoNombre(ev.target.value) }}
                  ></TextField>
                  <TextField
                    className="row col-12"
                    autoFocus
                    margin="dense"
                    id="telefono-nuevo"
                    label="Telefono"
                    type="text"
                    onChange={(ev, val) => { setNuevoTel(ev.target.value) }}
                  ></TextField>
                  <TextField
                    className="row col-12"
                    autoFocus
                    margin="dense"
                    id="correo-nuevo"
                    label="Correo"
                    type="text"
                    onChange={(ev, val) => { setNuevoCorreo(ev.tartet.value) }}
                  ></TextField>
                  <TextField
                    className="row col-12"
                    autoFocus
                    margin="dense"
                    id="direccion-nuevo"
                    label="Direccion"
                    type="text"
                    onChange={(ev, val) => { setNuevoDir(ev.target.value) }}
                  ></TextField>
                </DialogContent>
                <DialogActions className="row col-12">
                  <div className="container">
                    <Button className="col-6" onClick={handleClose} color="primary">Cancelar</Button>
                    <Button className="col-6" type="submit" color="primary">Agregar</Button>
                  </div>
                </DialogActions>
              </form>
            </Dialog>
          </CardContent>
        </Card>
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
                tooltip: 'Eliminar'
              })]}
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
            <Link onClick={(e) => guardarPedido()} className="col-12 btn btn-success boton-aceptar"
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