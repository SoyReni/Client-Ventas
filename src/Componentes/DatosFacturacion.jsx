import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PedidoVenta.css';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { FormControl, Select, MenuItem, Chip, Input, TextField, Paper } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import {useReactToPrint} from 'react-to-print'

function DatosFacturacion() {
    const api = axios.create();
    const [estado, setEstado] = useState("PAGADO");
    const [cargado, setCargado] = useState(false);
    const [open, setOpen] = useState(false);
    const [fact, setFact] = useState(false);
    const [openCred, setOpenCred] = useState(false);
    const [cargadoFact, setCargadoFact] = useState(false);
    const [condicion, setCond] = useState("");
    const [metodo, setMet] = useState("");
    const [esCredito, setEsCred] = useState(false);
    const [cuotas, setCuotas] = useState(0);
    const [pedido, setPedido] = useState([]);
    const [items, setItems] = useState([]);
    const [productosDev, setDev] = useState([]);
    const [concepto, setCon] = useState("");
    const [esEfectivo, setEsEfect] = useState(false);
    const [vuelto, setVuelto] = useState(0);
    const [condSelected, setSelected] = useState(false);
    const [estadoFact, setEstadoFact] = useState("PAGADO")
    const [saldo, setSaldo] = useState(0);
    const [monto, setMonto] = useState(0);
    const [met, setMetodo] = useState(1);
    const [ready, setReady] = useState(false);
    const [nroFact, setNroFAct] = useState("");
    const [nfa, setnfa] = useState(0);
    const encargado = useState(JSON.parse(sessionStorage.getItem("Encargado")));
    const [razon, setRazon] = useState("");
    const [printfecha, seprintfecha] = useState(new Date().toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + '')
    const [printnombre, setprintnombre] = useState("");
    //factura
    const [printcontado, setContado] = useState("X");
    const [printcredito, setCred] = useState("");
    const [imprimirdetalles, setimprimirdet] = useState([]);

    const toggleOpen = (e) => {
        setOpen(true);
    };

    const toggleClose = (e) => {
        setOpen(false);
    };

    const handleClose = (e) => {
        toggleClose();
    };
    const toggleOpenCred = (e) => {
        setOpenCred(true);
    };

    const toggleCloseCred = (e) => {
        setOpenCred(false);
    };
    const handleCloseCred = (e) => {
        toggleCloseCred();
    };

    const toggleOpenFact = (e) => {
        setFact(true);
    };

    const toggleCloseFact = (e) => {
        setFact(false);
    };

    const handleCloseFact = (e) => {
        toggleCloseFact();
    };

    const obtenerPedido = async (e) => {
        if ((parseInt(sessionStorage.getItem("pedido")) >= 0) && (sessionStorage.getItem("pedido") != null) && !cargado) {
            let url = "https://localhost:44307/api/APIVENTAs/" + parseInt(sessionStorage.getItem("pedido"));
            api.get(url)
                .then(response => {
                    setEstado(response.data[0].estado);
                    setPedido(response.data[0]);
                    setprintnombre(response.data[0].CLIENTEId.nombre)
                    getFactura(response.data[0].VENTAId);
                    setItems(response.data[0].detalles.map(
                        (pedido, i) => {
                            return (
                                <MenuItem value={pedido.nombre}>{pedido.nombre}: cant({pedido.cantidad}) </MenuItem>
                            )
                        }
                    ));
                    setimprimirdet(response.data[0].detalles.map(
                        (pedido, i) => {

                            return (
                                <div className="row col-12">
                                    <div className="col-2">{pedido.cantidad}</div>
                                    <div className="row col-10">
                                        <div className="col-6">{pedido.nombre}</div>
                                        <div className="row col-6">
                                            <div className="col-3">{pedido.precio}</div>
                                            <div className="col-3">0</div>
                                            <div className="col-3">0</div>
                                            <div className="col-3">{pedido.total}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    ))

                }).catch(error => console.log(error));
            setCargado(true);
        }
    }

    const getFactura = async (e) => {
        if ((parseInt(sessionStorage.getItem("pedido")) >= 0) && (sessionStorage.getItem("pedido") != null) && !cargadoFact) {
            let url = "https://localhost:44307/api/APIFACTURAs";
            api.get(url)
                .then(response => {
                    setnfa(response.data.find(val => val.VENTAId.VENTAId === e).FACTURAId);
                }).catch(error => console.log(error));
            setCargadoFact(true);
        }
    }

    const emitirNotaCredito = (e) => {
        var axios = require('axios');
        var iv = Math.round(monto / 11);
        var data = JSON.stringify({
            "FACTURAId": {
                "saldo": nfa
            },
            "ENCARGADOId": {
                "encargadoNum": encargado[0].ENCARGADOId
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
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleCondChange = (e) => {
        setCond(e.target.value);
        if (e.target.value === "CREDITO") {
            setSaldo(0);
            setEstadoFact("PAGADO");
            setEsCred(true)
            setContado("")
            setCred("X")
        }
        else if (e.target.value === "CONTADO") {
            setSaldo(pedido.total);
            setEstadoFact("PENDIENTE");
            setEsCred(false)
            setContado("X")
            setCred("")
        }
        setSelected(true);
    };

    const handleMetChange = (e) => {
        setMet(e.target.value);
        if (e.target.value === "EFECTIVO") { setMetodo(1), setReady(false) };
        if (e.target.value === "TARJETA") { setMetodo(2), setReady(true) };
        if (e.target.value === "CHEQUE") { setMetodo(3), setReady(true) };
        if (e.target.value === "EFECTIVO") { setEsEfect(true) }
        else { setEsEfect(false) }
    }

    const handleCuotChange = (e) => {
        setCuotas(e.target.value);
        setReady(true);
    }
    const handleSubmit = (e) => {
        var axios = require('axios');
        /*
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
          });*/
        toggleClose();
    };

    const fechas = [
        "2021-08-30 00:00:00.000",
        "2021-09-30 00:00:00.000",
        "2021-10-30 00:00:00.000",
        "2021-11-30 00:00:00.000",
        "2021-12-30 00:00:00.000",
        "2022-01-30 00:00:00.000",
        "2022-02-28 00:00:00.000",
        "2022-03-30 00:00:00.000",
        "2022-04-30 00:00:00.000",
        "2022-05-30 00:00:00.000",
        "2022-06-30 00:00:00.000",
        "2022-07-30 00:00:00.000",
        "2022-08-30 00:00:00.000"
    ]

    const generarPagoCredito = (e) => {
        var axios = require('axios');
        if (condicion === "CREDITO") {
            for (let i = 0; i < cuotas; i++) {
                var pagoNuevo = JSON.stringify({
                    "CLIENTEId": {
                        "credito": pedido.CLIENTEId.CLIENTEId
                    },
                    "VENTAId": {
                        "numVenta": pedido.VENTAId
                    },
                    numPago: 0,
                    "FACTURAId": {
                        "FACTURAId": e
                    },
                    "total": pedido.total,
                    "fechaVenc": fechas[i],
                    "estado": "PENDIENTE"
                })
                console.log(pagoNuevo);
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
                            "FACTURAId": e,
                            "FORMAS_DE_PAGOId": {
                                "numFDP": met
                            },
                            "TARJETAId": {
                                "numTarjeta": 9
                            },
                            "BANCOId": {
                                "BANCOId": 1
                            },
                            "monto": monto,
                            "vuelto": vuelto,
                            "PAGOSId": {
                                "numPago": response.data.PAGOSId
                            },
                            "numero": i + 1
                        })
                        console.log(pagoDetalleNuevo);
                        var config = {
                            method: 'post',
                            url: 'https://localhost:44307/api/APIDETALLES_DE_PAGO',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: pagoDetalleNuevo
                        };
                        axios(config)
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
            var pagoNuevo = JSON.stringify({
                "CLIENTEId": {
                    "credito": pedido.CLIENTEId.CLIENTEId
                },
                "VENTAId": {
                    "numVenta": pedido.VENTAId
                },
                numPago: 0,
                "FACTURAId": {
                    "FACTURAId": e
                },
                "total": pedido.total,
                "fechaVenc": fechas[0],
                "estado": "PAGADO"
            })
            console.log(pagoNuevo);
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
                        "FACTURAId": e,
                        "FORMAS_DE_PAGOId": {
                            "numFDP": met
                        },
                        "TARJETAId": {
                            "numTarjeta": 9
                        },
                        "BANCOId": {
                            "BANCOId": 1
                        },
                        "monto": monto,
                        "vuelto": vuelto,
                        "PAGOSId": {
                            "numPago": response.data.PAGOSId
                        },
                        "numero": 1
                    })
                    console.log(pagoDetalleNuevo);
                    var config = {
                        method: 'post',
                        url: 'https://localhost:44307/api/APIDETALLES_DE_PAGO',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: pagoDetalleNuevo
                    };
                    axios(config)
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
    }

    const pasarAFacturado = (e) => {
        var axios = require('axios');
        let url = "https://localhost:44307/api/APIVENTAs/" + parseInt(sessionStorage.getItem("pedido"));
        let p = parseInt(sessionStorage.getItem("pedido"));
        axios.put(url, {
            "VENTAId": p,
            "estado": "FACTURADO",
            "total": pedido.total,
            "iva": pedido.iva
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleSubmitFact = async (e) => {
        var axios = require('axios');
        let v = "PAGADO";
        if (condicion === "CREDITO") { v = "PENDIENTE" }
        var data = JSON.stringify({
            "condicion": condicion,
            "ENCARGADOId": {
                "encargadoNum": pedido.ENCARGADOId.ENCARGADOId
            },
            "CLIENTEId": {
                "credito": pedido.CLIENTEId.CLIENTEId
            },
            "VENTAId": {
                "numVenta": pedido.VENTAId
            },
            "estado": v,
            "total": pedido.total,
            "iva": pedido.iva,
            "saldo": saldo,
            "factNum": nroFact
        });
        console.log(data);

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
                console.log(response.data.FACTURAId);
                generarPagoCredito(response.data.FACTURAId);
                printFactura(); 
            })
            .catch(function (error) {
                console.log(error);
            });
        pasarAFacturado();
        handleCloseFact();
    }

    const handleProdChange = (e) => {
        setDev(e.target.value);
    };

    const handleCChange = (e) => {
        setCon(e.target.value)
    }

    const calcularVuelto = (e) => {
        console.log(pedido.total);
        let vNuevo = parseInt(e.target.value) - parseInt(pedido.total);
        setMonto(e.target.value);
        setVuelto(vNuevo);
        setReady(true);
    }

    const ponerNroFact = (e) => {
        setNroFAct(e.target.value);
    }

    const cancelarPedido = (e) => {
        var axios = require('axios');
        let url = "https://localhost:44307/api/APIVENTAs/" + parseInt(sessionStorage.getItem("pedido"));
        let p = parseInt(sessionStorage.getItem("pedido"));
        axios.put(url, {
            "VENTAId": p,
            "estado": "CANCELADO"
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleMontoChange = (e) => {
        setMonto(e.target.value);
    }

    const handleRazonChange = (e) => {
        setRazon(e.target.value);
    }

    const printFactura = (e) =>{
        var contenido = document.getElementById("factura-imprimir").innerHTML; 
        var a = window.open('', '', 'height=500, width=500');
            a.document.write('<html>');
            a.document.write('<body > <h1>Div contents are <br>');
            a.document.write(contenido);
            a.document.write('</body></html>');
            a.document.close();
            a.print();
    }

    obtenerPedido();
    if (estado === null) {
        return (
            <div></div>
        )
    } else if (estado === "CANCELADO") {
        return (
            <div>
                <h5 className="titulo take-padding-bottom">Pedido Cancelado</h5>
            </div>
        )
    } else if (estado === "FACTURADO") {
        return (
            <div>
                <h5 className="titulo take-padding-bottom">Pedido Facturado</h5>
                <Button onMouseDown={toggleOpenCred} variant="contained" color="primary">Emitir nota de credito</Button>

                <Dialog
                    open={openCred}
                    onClose={handleCloseFact}>
                    <form className="row" onSubmit={emitirNotaCredito}>
                        <DialogTitle className="col-12" id='add-cliente-dialog'>Nota de Credito</DialogTitle>
                        <DialogContent>
                            <TextField className="col-12" disabled id="standard-disabled" value={pedido.total} label="Total" disabled={true} />
                            <FormControl className="col-12">
                                <InputLabel id="demo-mutiple-chip-label">Productos</InputLabel>
                                <Select
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"
                                    multiple
                                    value={productosDev}
                                    onChange={handleProdChange}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={(selected) => (
                                        <div>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </div>
                                    )}>
                                    {items}
                                </Select>
                            </FormControl>
                            <FormControl className="col-12">
                                <InputLabel id="demo-simple-select-disabled-label">Concepto</InputLabel>
                                <Select
                                    labelId="demo-simple-select-disabled-label"
                                    id="demo-simple-select-disabled"
                                    value={concepto}
                                    onChange={(e) => handleCChange(e)}
                                >
                                    <MenuItem value={"Devolucion"}>Devolucion</MenuItem>
                                    <MenuItem value={"Producto dañando"}>Producto dañado</MenuItem>
                                    <MenuItem value={"Producto equivocado"}>Producto equivocado</MenuItem>
                                    <MenuItem value={"Promocion o descuento"}>Promocion o descuento</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="col-12">
                                <InputLabel id="demo-simple-select-label" value={monto}>Monto</InputLabel>
                                <Input type="number" onChange={(e) => handleMontoChange(e)}></Input>
                            </FormControl>
                            <FormControl className="col-12">
                                <InputLabel id="demo-simple-select-label" value={razon}>Descripcion</InputLabel>
                                <Input onChange={(e) => handleRazonChange(e)}></Input>
                            </FormControl>
                        </DialogContent>
                        <DialogActions className="row col-12">
                            <div>
                                <Button className="col-6" type="submit" variant="contained" color="primary">Imprimir Nota de Credito</Button>
                                <Button className="col-6" onClick={handleCloseCred} variant="contained" color="secondary">Volver</Button>
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
                <Button onMouseDown={toggleOpenFact} variant="contained" color="primary">Emitir Factura</Button>
                <Button onMouseDown={toggleOpen} variant="contained" color="secondary">Cancelar pedido</Button>


                <Dialog
                    open={open}
                    onClose={handleClose}>
                    <form onSubmit={(e) => handleSubmit()}>
                        <DialogTitle className="row" id='add-cliente-dialog'>Esta Seguro que desea cancelar el Pedido?</DialogTitle>
                        <DialogActions className="row col-12">
                            <div className="container">
                                <Button className="col-6" onClick={cancelarPedido} type="submit" variant="contained" color="primary">Si</Button>
                                <Button className="col-6" onClick={handleClose} variant="contained" color="secondary">No</Button>
                            </div>
                        </DialogActions>
                    </form>
                </Dialog>

                <Dialog
                    open={fact}
                    onClose={handleCloseFact}>
                    <form className="row" onSubmit={(e) => handleSubmitFact()}>
                        <DialogTitle className="col-12" id='add-cliente-dialog'>Opciones de Facturacion</DialogTitle>
                        <DialogContent>
                            <FormControl className="col-12">
                                <InputLabel id="demo-simple-select-label">Condicion</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={condicion}
                                    onChange={handleCondChange}>
                                    <MenuItem value={"CONTADO"}>Contado</MenuItem>
                                    <MenuItem value={"CREDITO"}>Credito</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="col-12" disabled={!esCredito}>
                                <InputLabel id="demo-simple-select-disabled-label">Cantidad de Cuotas</InputLabel>
                                <Select
                                    labelId="demo-simple-select-disabled-label"
                                    id="demo-simple-select-disabled"
                                    value={cuotas}
                                    onChange={(e) => handleCuotChange(e)}
                                >
                                    <MenuItem value={3}>3 Cuotas</MenuItem>
                                    <MenuItem value={6}>6 Cuotas</MenuItem>
                                    <MenuItem value={9}>9 Cuotas</MenuItem>
                                    <MenuItem value={12}>12 Cuotas</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="col-12" disabled={esCredito}>
                                <InputLabel id="demo-simple-select-disabled-label">Metodo de Pago</InputLabel>
                                <Select
                                    labelId="demo-simple-select-disabled-label"
                                    id="demo-simple-select-disabled"
                                    value={metodo}
                                    onChange={handleMetChange}
                                >
                                    <MenuItem value={"TARJETA"}>Debito/Credito</MenuItem>
                                    <MenuItem value={"CHEQUE"}>Cheque</MenuItem>
                                    <MenuItem value={"EFECTIVO"}>Efectivo</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className="col-12">
                                <TextField className="col-12" onChange={(e) => calcularVuelto(e)} id="standard-disabled" label="Monto" disabled={!esEfectivo} />
                                <div className="row">
                                    <TextField className="col-6" disabled id="standard-disabled" value={pedido.total} label="Total" disabled={true} />
                                    <TextField className="col-6" disabled id="standard-disabled" value={vuelto} label="Vuelto" disabled={true} />
                                </div>
                                <TextField className="col-12" onChange={(e) => ponerNroFact(e)} id="standard" label="Nro Factura" />
                            </FormControl>
                        </DialogContent>
                        <DialogActions className="row col-12">
                            <div>
                                <Button className="col-6" disabled={!ready} type="submit" variant="contained" color="primary">Emitir Factura</Button>
                                <Button className="col-6" onClick={handleCloseFact} variant="contained" color="secondary">Volver</Button>
                            </div>
                        </DialogActions>
                    </form>
                </Dialog>

                <div id="factura-imprimir" className="row display-none">
                    <div className="col-12"></div>
                    <div className="col-12"></div>
                    <div className="col-6"></div>
                    <div className="row col-6">
                        <div className="col-1">{printcontado}</div>
                        <div className="col-3"></div>
                        <div className="col-1">{printcredito}</div>
                        <div className="col-7"></div>
                    </div>
                    <div className="col-12">
                        <div className="col-4"></div>
                        <div className="col-9">{printfecha}</div>
                    </div>
                    <div className="col-12">
                        <div className="col-4"></div>
                        <div className="col-9">{printnombre}</div>
                    </div>
                    <div className="col-12"></div>
                    {imprimirdetalles}
                </div>

            </div>
        )
    }

}
export default DatosFacturacion;