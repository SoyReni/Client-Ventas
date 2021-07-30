import React, { useState} from 'react';
import axios from 'axios';
import { TextField, Card, CardContent } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import MaterialTable from 'material-table'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Link } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
import "react-datepicker/dist/react-datepicker.css";
import './PedidoVenta.css';


import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function PantallaPedido() {

  const [listaProducto, setListaProducto] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const api = axios.create();
  const [cargadoClientes, setCargadoClientes] = useState(false);
  const [stock, setStock] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [cantidad, setCant] = useState(0);
  const [actual, setActual] = useState('');
  const [productoID, setPID] = useState(0);
  const [inputP, setIP] = useState({ min: 0, max: 10 });
  const [listaClientes, setClientes] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentClienteString, setClienteString] = useState("Cliente");
  const [cargado, setCargado] = useState(false);
  const [idCliente, setClienteID] = useState(null);

  const log = useState(sessionStorage.getItem("token"));
  const encargado = useState(JSON.parse(sessionStorage.getItem("Encargado")));

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
      "ruc": nuevoRuc,
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
    setNDir(e + " ");
  }


  const setClientePorID = async (e) => {
    setClienteString(e.nombre);
    setClienteID(e.CLIENTEId)
  };

  const locationB = {
    pathname: '/VerPedido'
  }

  const [location, setlocation] = useState(locationB);

  const stockDidMount = async (e) => {
    if (!cargado) {
      api.get("https://localhost:44307/api/apistock").then(response => {
        setListaProducto(response.data.filter(prod => prod.cantidad != 0));
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
    if (actual.length === 0) {
      alert("Seleccione un producto");
      sessionStorage.removeItem("pedido");
    } else if (cantidad === 0) {
      alert("La cantidad debe ser mayor a 0");
      sessionStorage.removeItem("pedido");
    } else {
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
    }
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

  const guardarPedido = (e) => {
    if (idCliente == null) {
      alert("Los campos de RUC y Cliente no pueden estar vacios");
      sessionStorage.removeItem("pedido");
    } else if (carrito.length === 0) {
      alert("No ha seleccionado ningun producto");
      sessionStorage.removeItem("pedido");
    } else {
      var axios = require('axios');
      var data = JSON.stringify({
        "estado": "PENDIENTE",
        "total": total,
        "iva": iva,
        "CLIENTEId": {
          "credito": idCliente
        },
        "ENCARGADOId": {
          "encargadoNum": encargado[0].ENCARGADOId
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
          sessionStorage.removeItem("pedido")
          guardarCarrito(response.data.VENTAId);
          sessionStorage.setItem("pedido", response.data.VENTAId);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const guardarCarrito = (e) => {
    carrito.map((elem) => {
      var axios = require('axios');
      var data = JSON.stringify({
        "PRODUCTOId": {
          "numPRODUCTO": elem.id
        },
        "VENTAId": {
          "iva": e
        },
        "cantidad": elem.cantidad,
        "precio": elem.precio,
        "subtotal": elem.total
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
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  const handleDelete = (e) => {
    setCarrito(carrito.filter(elem => ((elem.producto != e.producto) && (elem.cantidad != e.cantidad))))
  }

  if (log === null) {
    return (
      <Redirect to={{ pathname: "/login" }} />
    )
  } else {
    clientesDidMount();
    stockDidMount();
    return (
      <div className='pedido text-center tabla'>
        <Card className="llenar">
          <CardContent className="row align-items-left">

            <div className="col-md-4 col-sm-12 add-margin add-padding">
              <div className="align-items-left">
                <div className="row align-self-end">Fecha: {new Date().toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ''}</div>
                <div className="row align-self-end">Encargado: {encargado.nombre}</div>
              </div>
            </div>

            <div className="row col-md-8 col-sm-12 add-padding">
              <div className="col-md-6 col-sm-12 align-items-left add-margin padre">
                <Autocomplete
                  className="hijo"
                  id="ruc-AC"
                  noOptionsText={
                    <Button onMouseDown={toggleOpen} > Agregar nuevo cliente</Button>
                  }
                  options={listaClientes}
                  onChange={(ev, val) => { setClientePorID(val) }}
                  getOptionLabel={(option) => option.ruc + " "}
                  renderInput={(params) => <TextField {...params} label="RUC" variant="outlined" />}
                />
              </div>
              <div className="col-md-6 col-sm-12 align-items-left add-margin padre">
                <label className="border hijo" >{currentClienteString}</label>
              </div>
            </div>

            <Dialog
              open={open}
              onClose={handleClose}>
              <form onSubmit={(e) => handleSubmit()}>
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
        <div className="row add-margin add-padding">
          <Autocomplete
            className="col-md-4 col-sm-12 add-padding"
            id="Producto"
            noOptionsText={<Typography> No se encuentra ese producto</Typography>}
            options={listaProducto}
            onChange={(e, valor) => { setDatos(valor) }}
            getOptionLabel={(option) => option.PRODUCTOId.nombre + " "}
            renderInput={(params) => <TextField {...params} label="Producto" variant="outlined"/>}
          />
          <TextField
            className="col-md-1 col-sm-12 cant"
            type='number'
            label="Cantidad"
            inputProps={inputP}
            aria-invalid={true}
            onChange={(e, v) => { calcularSubtotal(e.target.value) }}
            variant="outlined" 
          ></TextField>
          <div className="padre row col-md-7 col-sd-12 add-padding">
            <label className="col-md-3 col-sm-6 hijo">Stock: {stock}</label>
            <label className="col-md-3 col-sm-6 hijo">Precio u.:{precio}</label>
            <label className="col-md-4 col-sm-9 hijo">Subtotal.: {subTotal}</label>
            <IconButton className="col-md-1 col-sm-3 hijo text-align-right" onClick={(e) => addItem()}>
              <AddBoxIcon className="addbutton" fontSize="large"></AddBoxIcon></IconButton>
          </div>
        </div>
        <MaterialTable
          className="add-margin"
          columns={columns}
          data={carrito}
          align='left'
          title='Acciones'
          actions={[rowData => ({
            icon: Delete,
            tooltip: 'Eliminar',
            onClick: (event, v) => handleDelete(v)
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
        <div className="text-right resumen">
          <div className="row"><label className="col-12 resumen-label">Total: {total}</label></div>
          <div className="row"><label className="col-12 resumen-label">IVA: {iva}</label></div>
          <div className="row">
            <Link
              onClick={(e) => guardarPedido()} 
              className="col-12 btn btn-success boton-aceptar"
              to={location}>
              Guardar
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default PantallaPedido;