import React, { Component } from 'react';
import axios from 'axios';
import '../css/PedidoVenta.css';
import MaterialTable from 'material-table'
import { Visibility } from '@material-ui/icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            encargado: JSON.parse(sessionStorage.getItem("Encargado")),
            api: axios.create(),
            listaVenta: [],
            cargado: false,
            pedido: -1
        };
    };



    setPedido = (rowData) => {
        const { history } = this.props;
        history.push({
            pathname: "/VerPedido", // re-route to this path
            state: { id: rowData.VENTAId } // your row data
        });
    }

    getListaVenta = (e) =>{
        if (!this.state.cargado) {
            this.state.api.get("https://localhost:44307/api/APIVENTAs").then(response => {
                this.setState({ listaVenta: response.data });
                this.setState({ cargado: true });
            })
        }
    }
    render() {
        this.getListaVenta();
        return (
            <div className='tabla'>
                <div className="row">
                    <h5 className="titulo col-md-6 col-sm-12">Bienvenido {this.state.encargado.nombre}</h5>
                    <div className="card-body col-md-6 col-sm-12">
                        <div className="center">
                            <Link className="btn btn-success boton-aceptar" to='/Nuevo'><h5>Nuevo Pedido +</h5></Link>
                        </div>
                    </div>
                </div>
                <MaterialTable
                    title='Lista de pedidos'
                    columns={[
                        { align: 'left', title: 'ID', field: 'VENTAId', type: 'numeric', width: 10 },
                        { align: 'left', title: 'Fecha de emision', field: 'fecha', width: 100 },
                        { align: 'left', title: 'Encargado', field: 'ENCARGADOId.nombre', width: 100 },
                        { align: 'left', title: 'Cliente', field: 'CLIENTEId.nombre', width: 100 },
                        {
                            align: 'left', title: 'Estado', field: 'estado',
                            lookup: { "PENDIENTE": 'Pendiente', "FACTURADO": 'Facturado', "CANCELADO": 'Cancelado' }, width: 100,
                            render: rowData => {
                                return (
                                    rowData.estado === "PENDIENTE" ? <p style={{ background: "#FFC300", color: "#ffffff" }}>{rowData.estado}</p> :
                                        rowData.estado === "FACTURADO" ? <p style={{ background: "#3BFF00", color: "#ffffff" }}>{rowData.estado}</p> :
                                            <p style={{ background: "#FF5733", color: "#ffffff" }}>{rowData.estado}</p>
                                )
                            }
                        }
                    ]}
                    data={this.state.listaVenta}
                    localization={{
                        header: { actions: 'Ver Pedido' },
                        body: { cemptyDataSourceMessage: 'No hay elementos en la lista' },
                        pagination: { labelRowsSelect: 'Elementos' },
                        toolbar: { searchTooltip: 'Buscar', searchPlaceholder: 'Buscar' }
                    }}
                    actions={[{
                        icon: Visibility,
                        tooltip: 'Ver Pedido',
                        onClick: (e, v) => this.setPedido(v)
                    }]}

                    options={{
                        actionsColumnIndex: -1,
                        showTitle: true,
                        search: true,
                        filtering: true,
                        headerStyle: {
                            backgroundColor: '#B8B8B8',
                            color: '#FFF'
                        }
                    }}
                />
            </div>
        )
    }
}
export default Home;