import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField, Card, CardContent } from '@material-ui/core';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PedidoVenta.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';


function NuevoPedidoEncabezado() {
  const [listaClientes, setClientes] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentClienteString, setClienteString] = useState("Cliente");
  const [currentCliente, setCliente] = useState([])
  const [currentID, setID] = useState("RUC");
  const [cargado, setCargado] = useState(false);
  const api = axios.create();

  const componentDidMount = (e) => {
    if (!cargado) {
      api.get("https://localhost:44307/api/APICLIENTE").then(response => {
        setClientes(response.data);
        setCargado(true)
      });
    }
  }
  const toggleOpen = (e) => {
    setOpen(true);
  }

  const toggleClose = (e) => {
    setOpen(false);
  }

  const handleClose = (e) => {
    toggleClose();
  }

  const handleSubmit = (e) => {
    handleClose();
  }

  const setClientePorID = async (e) => {
    setCliente(e),
      console.log(currentCliente),
      setID(e.ruc),
      setClienteString(e.nombre)
  }

  componentDidMount();
  return (
    <Card className="container llenar">
      <CardContent className="row align-items-left">

        <div className="col-md-4 col-sm-12 add-margin">
          <div className="container align-items-left">
            <div className="row align-self-end">Fecha: {new Date().toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ''}</div>
            <div className="row align-self-end">Encargado: Dalila Castelnovo</div>
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
          <form className="container" onSubmit={handleSubmit}>
            <DialogTitle className="row" id='add-cliente-dialog'>Agregar Cliente Nuevo</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                className="row col-12"
                margin="dense"
                id="ruc-nuevo"
                label="RUC"
                type="text"
              ></TextField>
              <TextField
                autoFocus
                className="row col-12"
                margin="dense"
                id="nombre-nuevo"
                label="Nombre o Razon Social"
                type="text"
              ></TextField>
              <TextField
                className="row col-12"
                autoFocus
                margin="dense"
                id="telefono-nuevo"
                label="Telefono"
                type="text"
              ></TextField>
              <TextField
                className="row col-12"
                autoFocus
                margin="dense"
                id="correo-nuevo"
                label="Correo"
                type="text"
              ></TextField>
              <TextField
                className="row col-12"
                autoFocus
                margin="dense"
                id="direccion-nuevo"
                label="Direccion"
                type="text"
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
  )

}
export default NuevoPedidoEncabezado;