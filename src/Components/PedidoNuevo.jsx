
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/PedidoVenta.css';
import axios from 'axios';
import React, { Component } from 'react';

import { TextField, Card, CardContent } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import MaterialTable from 'material-table'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import { Autocomplete } from '@material-ui/lab';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Divider } from '@material-ui/core';

class VerPedido extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encargado: JSON.parse(sessionStorage.getItem("Encargado")),
            clientes: [],
            cliente: {
                nombre: "",
                id: -1,
                ruc: ""
            },
            clienteNuevo: {
                ruc: "",
                nombre: "",
                telefono: "",
                correo: "",
                direccion: ""
            },
            productos: [],
            pActual: {
                precio: 0,
                stock: 0,
                actual: "",
                pid: -1,
                ip: {
                    min: 0,
                    max: 0
                }
            },
            pSeleccionado: {
                cant: 0,
                subtotal: 0
            },
            cargado: false,
            api: axios.create(),
            open: false,
            total: 0,
            iva: 0,
            subtotal: 0,
            carrito: []
        }
        this.getDatos();
    }

    getDatos = (e) => {
        if (!this.state.cargado) {
            this.state.api.get("https://localhost:44307/api/APICLIENTE")
                .then(response => { this.setState({ clientes: response.data }); })
                .catch(error => console.log(error));
            this.state.api.get("https://localhost:44307/api/apistock")
                .then(response => { this.setState({ productos: response.data.filter(prod => prod.cantidad != 0) }); })
                .catch(error => console.log(error));
            this.setState({ cargado: true })
        }
    }

    addCliente = (e) => {
        var axios = require('axios');
        var data = JSON.stringify({
            "ruc": this.state.clienteNuevo.ruc,
            "nombre": this.state.clienteNuevo.nombre,
            "telefono": this.state.clienteNuevo.telefono,
            "correo": this.state.clienteNuevo.correo,
            "direccion": this.state.clienteNuevo.direccion,
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
            .then(function (response) { console.log(response) })
            .catch(function (error) { console.log(error); });
        this.setState({ open: false })

    }

    calcularSubtotal = (e) => {
        let sub = e * this.state.pActual.precio
        this.setState({
            pSeleccionado: {
                cant: e,
                subtotal: sub
            },
        })
    }

    addItem = (e) => {
        if (this.state.pActual.nombre === "") {
            alert("Seleccione un producto");
        }
        else if (this.state.pSeleccionado.cant === 0) {
            alert("La cantidad de producto debe ser mayor a 0")
        } else {
            var item = {
                producto: this.state.pActual.actual,
                cantidad: this.state.pSeleccionado.cant,
                precio: this.state.pActual.precio,
                total: this.state.pSeleccionado.subtotal,
                facturado: false,
                id: this.state.pActual.pid
            }
            console.log(item);
            var t = this.state.total + item.total;
            var i = Math.round(t / 11);
            var s= t - i; 
            this.setState({
                total: t,
                iva: i,
                subtotal: s 
            });
            var nuevo = [...this.state.carrito];
            nuevo.push(item);
            this.setState({ carrito: nuevo });
        }

    }

    handleDelete = (e) => {
        this.state.carrito.forEach(elem => {
            if((elem.producto + elem.cantidad) === (e.producto + e.cantidad)){
                var t = this.state.total - elem.total; 
                var i = (t/11);
                var s = t - i;  
                this.setState({
                    total: t,
                    iva: i, 
                    subtotal: s 
                })
            }
        })
        this.setState({
            carrito: this.state.carrito.filter(elem =>
                ((elem.producto + elem.cantidad) != e.producto + e.cantidad))
        }
        )
    }

    guardarPedido = (e) => {
        if (this.state.cliente.id === -1) { alert("Los campos de RUC y Cliente no pueden estar vacios") }
        else if (this.state.carrito.length === 0) { alert("No ha seleccionado ningun producto") }
        else {
            var axios = require('axios');
            var data = JSON.stringify({
                "estado": "PENDIENTE",
                "total": this.state.total,
                "iva": this.state.iva,
                "CLIENTEId": {
                    "credito": this.state.cliente.id
                },
                "ENCARGADOId": {
                    "encargadoNum": this.state.encargado.ENCARGADOId
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
            var carrito = this.state.carrito; 
            const { history } = this.props;
            axios(config)
                .then(function (response) {
                    carrito.map((elem) => {
                        var axios = require('axios');
                        var data = JSON.stringify({
                            "PRODUCTOId": {
                                "numPRODUCTO": elem.id
                            },
                            "VENTAId": {
                                "iva": response.data.VENTAId
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
                    });
                    history.push({
                        pathname: "/VerPedido", // re-route to this path
                        state: { id: response.data.VENTAId } // your row data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {

        return (
            <div className='pedido text-center tabla'>
                <Card className="llenar">
                    <CardContent className="row align-items-left">

                        <div className="col-md-4 col-sm-12 add-margin add-padding">
                            <div className="align-items-left">
                                <div className="row align-self-end">Fecha: {new Date().toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ''}</div>
                                <div className="row align-self-end">Encargado: {this.state.encargado.nombre}</div>
                            </div>
                        </div>

                        <div className="row col-md-8 col-sm-12 add-padding">
                            <div className="col-md-6 col-sm-12 align-items-left add-margin padre">
                                <Autocomplete
                                    className="hijo"
                                    id="ruc-AC"
                                    noOptionsText={
                                        <Button onMouseDown={(e, v) => this.setState({ open: true })} > Agregar nuevo cliente</Button>
                                    }
                                    options={this.state.clientes}
                                    onChange={(ev, val) => {
                                        this.setState({
                                            cliente: {
                                                nombre: val.nombre,
                                                id: val.CLIENTEId,
                                                ruc: val.ruc
                                            }
                                        })
                                    }}
                                    getOptionLabel={(option) => option.ruc + " "}
                                    renderInput={(params) => <TextField {...params} label="RUC" variant="outlined" />}
                                />
                            </div>
                            <div className="col-md-6 col-sm-12 align-items-left add-margin padre">
                                <label className="border hijo" >{this.state.cliente.nombre}</label>
                            </div>
                        </div>
                        <Dialog open={this.state.open}>
                            <form onSubmit={(e) => this.addCliente()}>
                                <DialogTitle className="row" id='add-cliente-dialog'>Agregar Cliente Nuevo</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        required={true}
                                        className="row col-12"
                                        margin="dense"
                                        id="ruc-nuevo"
                                        label="RUC"
                                        type="number"
                                        onChange={(ev, val) => {
                                            this.setState({
                                                clienteNuevo: {
                                                    ruc: ev.target.value,
                                                    nombre: this.state.clienteNuevo.nombre,
                                                    telefono: this.state.clienteNuevo.telefono,
                                                    correo: this.state.clienteNuevo.correo,
                                                    direccion: this.state.clienteNuevo.direccion
                                                }
                                            })
                                        }}
                                    ></TextField>
                                    <TextField
                                        autoFocus
                                        required={true}
                                        className="row col-12"
                                        margin="dense"
                                        id="nombre-nuevo"
                                        label="Nombre o Razon Social"
                                        type="text"
                                        onChange={(ev, val) => {
                                            this.setState({
                                                clienteNuevo: {
                                                    ruc: this.state.clienteNuevo.ruc,
                                                    nombre: ev.target.value,
                                                    telefono: this.state.clienteNuevo.telefono,
                                                    correo: this.state.clienteNuevo.correo,
                                                    direccion: this.state.clienteNuevo.direccion
                                                }
                                            })
                                        }}
                                    ></TextField>
                                    <TextField
                                        className="row col-12"
                                        autoFocus
                                        margin="dense"
                                        id="telefono-nuevo"
                                        label="Telefono"
                                        type="text"
                                        onChange={(ev, val) => {
                                            this.setState({
                                                clienteNuevo: {
                                                    ruc: this.state.clienteNuevo.ruc,
                                                    nombre: this.state.clienteNuevo.nombre,
                                                    telefono: ev.target.value,
                                                    correo: this.state.clienteNuevo.correo,
                                                    direccion: this.state.clienteNuevo.direccion
                                                }
                                            })
                                        }}
                                    ></TextField>
                                    <TextField
                                        className="row col-12"
                                        autoFocus
                                        margin="dense"
                                        id="correo-nuevo"
                                        label="Correo"
                                        type="text"
                                        onChange={(ev, val) => {
                                            this.setState({
                                                clienteNuevo: {
                                                    ruc: this.state.clienteNuevo.ruc,
                                                    nombre: this.state.clienteNuevo.nombre,
                                                    telefono: this.state.clienteNuevo.telefono,
                                                    correo: ev.target.value,
                                                    direccion: this.state.clienteNuevo.direccion
                                                }
                                            })
                                        }}
                                    ></TextField>
                                    <TextField
                                        className="row col-12"
                                        autoFocus
                                        margin="dense"
                                        id="direccion-nuevo"
                                        label="Direccion"
                                        type="text"
                                        onChange={(ev, val) => {
                                            this.setState({
                                                clienteNuevo: {
                                                    ruc: this.state.clienteNuevo.ruc,
                                                    nombre: this.state.clienteNuevo.nombre,
                                                    telefono: this.state.clienteNuevo.telefono,
                                                    correo: this.state.clienteNuevo.correo,
                                                    direccion: ev.target.value
                                                }
                                            })
                                        }}
                                    ></TextField>
                                </DialogContent>
                                <DialogActions className="row col-12">
                                    <div className="container">
                                        <Button className="col-6" onClick={(e, v) => this.setState({ open: false })} color="primary">Cancelar</Button>
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
                        options={this.state.productos}
                        onChange={(e, valor) => {
                            this.setState({
                                pActual: {
                                    precio: valor.PRODUCTOId.precio,
                                    stock: valor.cantidad,
                                    actual: valor.PRODUCTOId.nombre,
                                    pid: valor.PRODUCTOId.PRODUCTOId,
                                    ip: {
                                        min: 0,
                                        max: valor.cantidad
                                    }
                                },
                            })
                        }}
                        getOptionLabel={(option) => option.PRODUCTOId.nombre + " "}
                        renderInput={(params) => <TextField {...params} label="Producto" variant="outlined" />}
                    />
                    <TextField
                        className="col-md-1 col-sm-12 cant"
                        type='number'
                        label="Cantidad"
                        inputProps={this.state.pActual.ip}
                        aria-invalid={true}
                        onChange={(e, v) => this.calcularSubtotal(e.target.value)}
                        variant="outlined"
                    ></TextField>
                    <div className="padre row col-md-7 col-sd-12 add-padding">
                        <label className="col-md-3 col-sm-6 hijo">Stock: {this.state.pActual.stock}</label>
                        <label className="col-md-3 col-sm-6 hijo">Precio: PYG {this.state.pActual.precio.toLocaleString()}</label>
                        <label className="col-md-4 col-sm-9 hijo">Subtotal: PYG {this.state.pSeleccionado.subtotal.toLocaleString()}</label>
                        <IconButton className="col-md-1 col-sm-3 hijo text-align-right" onClick={(e) => this.addItem()}>
                            <AddBoxIcon className="addbutton" fontSize="large"></AddBoxIcon></IconButton>
                    </div>
                </div>
                <MaterialTable
                    className="add-margin"
                    columns={[
                        { align: 'left', title: 'Producto', field: 'producto' },
                        { align: 'left', title: 'Cantidad', field: 'cantidad' },
                        { align: 'left', title: 'Precio unitario', field: 'precio', type: "currency", 
                        currencySetting:{ currencyCode:'PYG', minimumFractionDigits:0, maximumFractionDigits:0}},
                        { align: 'left', title: 'Total', field: 'total',type: "currency", 
                        currencySetting:{ currencyCode:'PYG', minimumFractionDigits:0, maximumFractionDigits:0}}
                    ]}
                    data={this.state.carrito}
                    align='left'
                    title='Acciones'
                    actions={[rowData => ({
                        icon: Delete,
                        tooltip: 'Eliminar',
                        onClick: (event, v) => this.handleDelete(v)
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
                    <div className="row"><label className="col-12 resumen-label">Subtotal: PYG {this.state.subtotal.toLocaleString()}</label></div>
                    <div className="row"><label className="col-12 resumen-label">IVA: PYG {this.state.iva.toLocaleString()}</label></div>
                    <Divider light={false} variant="middle" />
                    <div className="row"><label className="col-12 resumen-label">Total: PYG {this.state.total.toLocaleString()}</label></div>
                    <div className="row">
                        <button color="success" onClick={(e, v) => this.guardarPedido()} className="col-12 guardar btn-success boton-aceptar">
                            Guardar Pedido
                        </button>
                    </div>
                </div>
            </div>
        )
    }
} export default VerPedido
