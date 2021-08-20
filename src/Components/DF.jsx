import '../css/PedidoVenta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { FormControl, Select, MenuItem, Chip, Input, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import ReactToPrint from "react-to-print";
import { LocationSearchingOutlined, SubtitlesTwoTone } from '@material-ui/icons';

class DatosFacturacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pedido: this.props.pedido,
            id: this.props.pedido.VENTAId,
            estado: "PENDIENTE",
            productosDev: [],
            items: [],
            concepto: "",
            monto: 0,
            razon: "",
            condicion: "CONTADO",
            noEsCredito: true,
            cuotas: 0,
            metodo: "",
            nroFact: "",
            opencred: false,
            openFact: false,
            openCanc: false,

            listoMetodo: false,
            listoCuotas: false,
            listoFact: false,
            enable: false,

            escredito: false
        }
        this.refPagare = React.createRef();
        this.refFact = React.createRef();
        this.refNC = React.createRef();
    }

    emitirNotaCredito = async (e) => {
        return new Promise(resolve => {
            var axios = require('axios');
            var monto = this.state.monto + 0;
            var iv = Math.round(monto / 11);
            var razon = this.state.razon + "";
            var concepto = this.state.concepto + "";
            var nfa = 0;
            var encargado = this.props.pedido.ENCARGADOId.ENCARGADOId + 0;
            var venta = this.props.pedido.VENTAId + 0;
            var lista = this.state.productosDev;
            let urlF = "https://localhost:44307/api/APIFACTURAs";
            axios.get(urlF)
                .then(response => {
                    console.log(response);
                    var data = JSON.stringify({
                        "FACTURAId": {
                            "FACTURAId": response.data.find(val => val.VENTAId.VENTAId === venta).FACTURAId
                        },
                        "ENCARGADOId": {
                            "encargadoNum": encargado
                        },
                        "concepto": concepto,
                        "razon": razon,
                        "monto": monto,
                        "iva": iv
                    });

                    var config = {
                        method: 'post',
                        url: 'https://localhost:44307/api/APINOTAS_DE_CREDITO',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };

                    axios(config)
                        .then(function (response) {
                            console.log(response);
                            lista.forEach((elem) => {
                                var pid = 0;
                                var sub = 0;
                                var x = response.data;
                                axios.get('https://localhost:44307/api/apiproductoes')
                                    .then(function (response) {
                                        pid = response.data.find((e) => e.nombre === elem).PRODUCTOId;
                                        sub = response.data.find((e) => e.nombre === elem).precio;
                                        var detalle = JSON.stringify({
                                            "NOTAS_DE_CREDITOId": {
                                                "NOTAS_DE_CREDITOId": x.NOTAS_DE_CREDITOId
                                            },
                                            "PRODUCTOId": {
                                                "numPRODUCTO": pid
                                            },
                                            "cantidad": 1,
                                            "subtotal": sub
                                        });
                                        var con = {
                                            method: 'post',
                                            url: 'https://localhost:44307/api/APIDETALLES_NOTAS_DE_CREDITO',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            data: detalle
                                        }
                                        axios(con)
                                            .then(function (response) { console.log(response) })
                                            .catch(function (error) { console.log(error) });
                                    })
                                    .catch(function (error) { console.log(error) });
                            })
                        })
                        .catch(function (error) { console.log(error); });
                    this.setState({ openCred: false })
                }).catch(error => console.log(error));
        })
    }

    emitirFactura = async (e) => {
    return new Promise(resolve => {
        var p = this.props.pedido;
        var res = 0;
        var axios = require('axios');
        let v = "PAGADO";
        var metodo = this.state.metodo + "";
        var saldo = 0;
        const fechas = [
            "2021-09-20 00:00:00.000",
            "2021-10-20 00:00:00.000",
            "2021-11-20 00:00:00.000",
            "2021-12-20 00:00:00.000",
            "2022-01-20 00:00:00.000",
            "2022-02-20 00:00:00.000",
            "2022-03-20 00:00:00.000",
            "2022-04-20 00:00:00.000",
            "2022-05-20 00:00:00.000",
            "2022-06-20 00:00:00.000",
            "2022-07-20 00:00:00.000",
            "2022-08-20 00:00:00.000",
            "2022-09-20 00:00:00.000"
        ]

        if (this.state.condicion === "CREDITO") {
            saldo = p.total;
            v = "PENDIENTE";
            this.setState({ escredito: true })
        }
        let nroFact = this.state.nroFact + "";
        let condicion = this.state.condicion + "";
        let cuotas = this.state.cuotas + 0;

        /*Generar factura*/
        var data = JSON.stringify({
            "condicion": condicion,
            "ENCARGADOId": {
                "encargadoNum": p.ENCARGADOId.ENCARGADOId
            },
            "CLIENTEId": {
                "credito": p.CLIENTEId.CLIENTEId
            },
            "VENTAId": {
                "numVenta": p.VENTAId
            },
            "estado": v,
            "total": p.total,
            "iva": p.iva,
            "saldo": saldo,
            "factNum": nroFact
        });

        var config = {
            method: 'post',
            url: 'https://localhost:44307/api/apifacturas',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response);
                res = response.data.FACTURAId
                /*Generar pago credito*/

                if (condicion === "CREDITO") {
                    /*Factura Credigo: n pagos*/
                    for (let i = 0; i < cuotas; i++) {
                        var pagoNuevo = JSON.stringify({
                            "CLIENTEId": {
                                "credito": p.CLIENTEId.CLIENTEId
                            },
                            "VENTAId": {
                                "numVenta": p.VENTAId
                            },
                            "numPago": 0,
                            "FACTURAId": {
                                "FACTURAId": res
                            },
                            "total": p.total,
                            "fechaVenc": fechas[i],
                            "estado": "PENDIENTE"
                        })
                        var configPago = {
                            method: 'post',
                            url: 'https://localhost:44307/api/APIPAGOs',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: pagoNuevo
                        };
                        axios(configPago)
                            .then(function (response) {
                                console.log(response.data.PAGOSId);
                                var pagoDetalleNuevo = JSON.stringify({
                                    "FACTURAId": res,
                                    "FORMAS_DE_PAGOId": {
                                        "numFDP": metodo
                                    },
                                    "TARJETAId": {
                                        "numTarjeta": 9
                                    },
                                    "BANCOId": {
                                        "BANCOId": 1
                                    },
                                    "monto": 0,
                                    "vuelto": 0,
                                    "PAGOSId": {
                                        "numPago": response.data.PAGOSId
                                    },
                                    "numero": i + 1
                                })
                                var configdet = {
                                    method: 'post',
                                    url: 'https://localhost:44307/api/APIDETALLES_DE_PAGO',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: pagoDetalleNuevo
                                };
                                axios(configdet)
                                    .then(function (response) {
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }

                } else {
                    /*Factur Contado: 1 pago*/
                    var pagoNuevo = JSON.stringify({
                        "CLIENTEId": {
                            "credito": p.CLIENTEId.CLIENTEId
                        },
                        "VENTAId": {
                            "numVenta": p.VENTAId
                        },
                        numPago: 0,
                        "FACTURAId": {
                            "FACTURAId": res
                        },
                        "total": p.total,
                        "fechaVenc": fechas[0],
                        "estado": "PAGADO"
                    })
                    console.log(pagoNuevo);
                    var configPago1 = {
                        method: 'post',
                        url: 'https://localhost:44307/api/APIPAGOs',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: pagoNuevo
                    };
                    axios(configPago1)
                        .then(function (response) {
                            var pagoDetalleNuevo = JSON.stringify({
                                "FACTURAId": res,
                                "FORMAS_DE_PAGOId": {
                                    "numFDP": metodo
                                },
                                "TARJETAId": {
                                    "numTarjeta": 9
                                },
                                "BANCOId": {
                                    "BANCOId": 1
                                },
                                "monto": 0,
                                "vuelto": 0,
                                "PAGOSId": {
                                    "numPago": response.data.PAGOSId
                                },
                                "numero": 1
                            })
                            var configdet1 = {
                                method: 'post',
                                url: 'https://localhost:44307/api/APIDETALLES_DE_PAGO',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: pagoDetalleNuevo
                            };
                            axios(configdet1)
                                .then(function (response) {
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            })
            .catch(function (error) {
                console.log(error);
            });


        /*Marcar como facturado*/
        let id = this.props.pedido.VENTAId
        let urlF = "https://localhost:44307/api/APIVENTAs/" + id;
        axios.put(urlF, {
            "VENTAId": id,
            "estado": "FACTURADO",
            "total": p.total,
            "iva": p.iva
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        this.setState({ openFact: false })

    })}

    cancelarPedido = async (e) => {
        return new Promise(resolve => {
        var axios = require('axios');
        var id = this.props.pedido.VENTAId;
        let url = "https://localhost:44307/api/APIVENTAs/" + id;
        axios.put(url, {
            "VENTAId": id,
            "estado": "CANCELADO"
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    })}

    changeCond = (e) => {
        this.setState({ condicion: e });
        if (e === "CREDITO") {
            this.setState({ noEsCredito: false });
        } else this.setState({ noEsCredito: true });
    }

    handleCuotCahnge = (e) => {
        if (this.state.noEsCredito) this.setState({ listoCuotas: false });
        if (e > 0) this.setState({ listoCuotas: true });
        else this.setState({ listoCuotas: false });
        this.setState({ cuotas: e });
        if (this.state.listoCuotas === true && this.state.listoFact === true) this.setState({ enable: true });
        else this.setState({ enable: false });
    }

    handleMetChange = (e) => {
        this.setState({ metodo: e, listoMetodo: true })
        if (this.state.listoMetodo === true && this.state.listoFact === true) this.setState({ enable: true });
        else this.setState({ enable: false });
    }


    ponerNroFact = (e) => {
        if (e === "") this.setState({ listoFact: false });
        else this.setState({ nroFact: e, listoFact: true });
        if ((this.state.listoFact === true && this.state.listoMetodo === true) || (this.state.listoFact === true && this.state.listoCuotas === true)) this.setState({ enable: true });
        else this.setState({ enable: false });
    }

    handleOpenCred = (e) => {
        this.setItems();
        this.setState({ opencred: true });
    }

    render() {
        if (this.props.pedido.estado === null) {
            return (
                <div></div>
            )
        } else if (this.props.pedido.estado === "CANCELADO") {
            return (
                <div>
                    <h5 className="titulo take-padding-bottom">Pedido Cancelado</h5>
                </div>
            )
        } else if (this.props.pedido.estado === "FACTURADO") {
            return (
                <div>
                    <h5 className="titulo take-padding-bottom">Pedido Facturado</h5>
                    <Button onMouseDown={(e) => this.setState({ openCred: true })} variant="contained" color="primary">Emitir nota de credito</Button>

                    <Dialog
                        open={this.state.openCred}
                        onClose={(e) => this.setState({ openCred: false })}>
                        <form className="row" onSubmit={(e) => this.emitirNotaCredito()}>
                            <DialogTitle className="col-12" id='add-cliente-dialog' onClose={(e) => this.setState({ openCred: false })}>Nota de Credito</DialogTitle>
                            <DialogContent>
                                <TextField className="col-12" id="standard-disabled" value={this.props.pedido.total.toLocaleString()} label="Total" disabled={true} />
                                <FormControl className="col-12">
                                    <InputLabel id="demo-mutiple-chip-label">Productos</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-chip-label"
                                        id="demo-mutiple-chip"
                                        multiple
                                        value={this.state.productosDev}
                                        onChange={(e) => this.setState({ productosDev: e.target.value })}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </div>
                                        )}>
                                        {this.props.pedido.detalles.map(
                                            (pedido, i) => {
                                                return (
                                                    <MenuItem value={pedido.nombre}>
                                                        {pedido.nombre} : {pedido.precio.toLocaleString()}
                                                    </MenuItem>
                                                )
                                            }
                                        )}
                                    </Select>
                                </FormControl>
                                <FormControl className="col-12">
                                    <InputLabel id="demo-simple-select-disabled-label">Concepto</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-disabled-label"
                                        id="demo-simple-select-disabled"
                                        value={this.state.concepto}
                                        onChange={(e) => this.setState({ concepto: e.target.value })}
                                    >
                                        <MenuItem value={"DEVOLUCION"}>Devolucion</MenuItem>
                                        <MenuItem value={"PRODUCTO DAÑADO"}>Producto dañado</MenuItem>
                                        <MenuItem value={"PRODUCTO EQUIVOCADO"}>Producto equivocado</MenuItem>
                                        <MenuItem value={"PROMOCION O DESCUENTO"}>Promocion o descuento</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className="col-12">
                                    <InputLabel id="demo-simple-select-label" value={this.state.monto}>Monto</InputLabel>
                                    <Input type="number" onChange={(e) => this.setState({ monto: e.target.value })}></Input>
                                </FormControl>
                                <FormControl className="col-12">
                                    <InputLabel id="demo-simple-select-label" value={this.state.razon}>Descripcion</InputLabel>
                                    <Input onChange={(e) => this.setState({ razon: e.target.value })}></Input>
                                </FormControl>
                            </DialogContent>
                            <DialogActions className="row col-12">
                                <div>
                                    <Button className="col-6" type="submit" variant="contained" color="primary">Imprimir Nota de Credito</Button>
                                </div>
                            </DialogActions>
                        </form>
                    </Dialog>

                </div>
            )
        } else {
            return (
                <div>
                    <h5 className="titulo take-padding-bottom">Pedido pendiente de facturacion</h5>
                    <Button onMouseDown={(e) => this.setState({ openFact: true })} variant="contained" color="primary">Emitir Factura</Button>
                    <Button onMouseDown={(e) => this.setState({ openCanc: true })} variant="contained" color="secondary">Cancelar pedido</Button>


                    <Dialog
                        open={this.state.openCanc}
                        onClose={(e) => this.setState({ openCanc: false })}>
                        <form onSubmit={(e) => this.setState({ openCanc: false })}>
                            <DialogTitle className="row" id='add-cliente-dialog' onClose={(e) => this.setState({ openCanc: false })}>
                                Esta Seguro que desea cancelar el Pedido?</DialogTitle>
                            <DialogActions className="row col-12">
                                <div className="container">
                                    <Button className="col-6" onClick={(e) => this.cancelarPedido()} type="submit" variant="contained" color="primary">Si</Button>
                                    <Button className="col-6" onClick={(e) => this.setState({ openCanc: false })} variant="contained" color="secondary">No</Button>
                                </div>
                            </DialogActions>
                        </form>
                    </Dialog>

                    <Dialog
                        open={this.state.openFact}
                        onClose={(e) => this.setState({ openFact: false })}>
                        <form className="row" onSubmit={(e) => this.emitirFactura()}>
                            <DialogTitle onClose={(e) => this.setState({ openFact: false })} className="col-12" id='add-cliente-dialog'>
                                Opciones de Facturacion
                            </DialogTitle>
                            <DialogContent>
                                <FormControl className="col-12">
                                    <InputLabel id="demo-simple-select-label">Condicion</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.condicion}
                                        onChange={(e) => this.changeCond(e.target.value)}>
                                        <MenuItem value={"CONTADO"}>Contado</MenuItem>
                                        <MenuItem value={"CREDITO"}>Credito</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className="col-12" disabled={this.state.noEsCredito}>
                                    <InputLabel id="demo-simple-select-disabled-label">Cantidad de Cuotas</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-disabled-label"
                                        id="demo-simple-select-disabled"
                                        value={this.state.cuotas}
                                        onChange={(e) => this.handleCuotCahnge(e.target.value)}
                                    >
                                        <MenuItem value={3}>3 Cuotas</MenuItem>
                                        <MenuItem value={6}>6 Cuotas</MenuItem>
                                        <MenuItem value={9}>9 Cuotas</MenuItem>
                                        <MenuItem value={12}>12 Cuotas</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className="col-12" disabled={!this.state.noEsCredito}>
                                    <InputLabel id="demo-simple-select-disabled-label">Metodo de Pago</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-disabled-label"
                                        id="demo-simple-select-disabled"
                                        value={this.state.metodo}
                                        onChange={(e) => this.handleMetChange(e.target.value)}
                                    >
                                        <MenuItem value={"TARJETA"}>Debito/Credito</MenuItem>
                                        <MenuItem value={"CHEQUE"}>Cheque</MenuItem>
                                        <MenuItem value={"EFECTIVO"}>Efectivo</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className="col-12">
                                    <TextField className="col-12" id="standard-disabled" value={this.props.pedido.total} label="Total" disabled={true} />
                                    <TextField className="col-12" onChange={(e) => this.ponerNroFact(e.target.value)} id="standard" label="Nro Factura" />
                                </FormControl>
                            </DialogContent>
                            <DialogActions className="row col-12">
                                <div>
                                    <ReactToPrint
                                        trigger={() => <Button className="col-6" disabled={!this.state.enable} type="submit" variant="contained" color="primary">Emitir Factura</Button>}
                                        content={() => this.refFact}
                                    />
                                </div>
                            </DialogActions>
                        </form>
                    </Dialog>

                    <div className="row display-none" ref={this.refPagare}>
                        <div id="containe">

                            <div className="row">
                                <div className="col-md-4">
                                    <h4>Proyecto Sistemas de Gestion</h4>
                                </div>
                                <div className="col-md-4 offset-md-4">
                                    <h5>Fecha: </h5>
                                </div>
                            </div>
                            <div className="row">
                                <div >----------------------------------------------------------------------</div>

                                <div className="col-md-4 offset-md-4">
                                    <h5> En esta ciudad a la orden de:</h5>
                                </div>
                                <div className="col-md-4 offset-md-4">
                                    <h5> Con CI Nro.: </h5>
                                </div>
                                <div className="col-md-4 offset-md-4">
                                    <h5> :</h5>
                                </div>
                                <h5> En concepto de pago de articulos informaticos</h5>
                                <div>.......................</div>
                                <h5>Firma </h5>


                            </div>
                        </div>
                    </div>

                    <div className="row display-none" ref={this.refFact}>
                        <div className="row"  >
                            <div className="row">
                                <div className="col-md-4">
                                    <h4>Proyecto Sistemas de Gestion</h4>
                                </div>
                                <div className="col-md-4 offset-md-4">
                                    <h5>Fecha:</h5>
                                    <div><h5>Factura Nro.: </h5></div>
                                </div>

                                <div className="col-md-4 offset-md-4">
                                    <h5>Factura Nro.: </h5>
                                </div>
                            </div>

                            <div className="row">
                                <div>----------------------------------------------------------------------</div>
                                <div className="col-md-4 offset-md-4">
                                    <h5> Nombre o Razon Social:</h5>
                                </div>
                                <div className="col-md-4 offset-md-4">
                                    <h5>RUC o CI:</h5>
                                </div>

                                <h5> Condicion de la venta: Venta de articulos informaticos</h5>
                                <div>----------------------------------------------------------------------</div>
                                <div> </div>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
    }
} export default DatosFacturacion