import '../css/PedidoVenta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatosFacturacion from './DF';
import axios from 'axios';
import React, { Component } from 'react';
import ListaProductos from './ListaProductos';

class VerPedido extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pedido: [],
            cargado: false,
            api: axios.create()
        }

        this.getPedido();
    }

    getPedido = () => {
        if (!this.state.cargado) {
            var id = 0
            if (typeof this.props.location.state === 'undefined') {
                id = parseInt(localStorage.getItem('pedido'), 10);
            } else {
                id = this.props.location.state.id;
                localStorage.setItem("pedido", id);
            }
            let url = "https://localhost:44307/api/APIVENTAs/" + id;
            this.state.api.get(url)
                .then(response => {
                    this.setState({ pedido: response.data[0] });
                }).catch(error => console.log(error));
            this.setState({ cargado: true });
            sessionStorage.setItem("detalles", this.state.pedido.detalles);
        }
    }

    render() {
        return (
            <div>
                <div className='text-center tabla informacion'>
                    <div className="row">
                        <h5 className="titulo take-padding-bottom col-12">Detalles del pedido</h5>
                        <div className="col-md-6 col-sm-12 take-padding add-padding">
                            <div className="container align-items-left">
                                <div className="row align-self-end">Fecha de pedido: {this.state.pedido.fecha}</div>
                                <div className="row align-self-end">Encargado: {this.state.pedido.nombreEncargado}</div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 take-padding add-padding">
                            <div className="container align-items-left">
                                <div className="row align-self-end">Cliente: {this.state.pedido.nombreCliente}</div>
                                <div className="row align-self-end">RUC: {this.state.pedido.ruc}</div>
                            </div>
                        </div>
                    </div>
                    <ListaProductos lista={this.state.pedido.detalles}></ListaProductos>
                    <div className="row">
                        <div className="col-6"><DatosFacturacion pedido={this.state.pedido}></DatosFacturacion></div>
                        <div className="col-6 text-right resumen">
                            <div className="row add-padding take-padding-bottom"><label className="col-12 resumen-label">Total: {this.state.pedido.total}</label></div>
                            <div className="row"><label className="col-12 resumen-label">IVA: {this.state.pedido.iva}</label></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} export default VerPedido
