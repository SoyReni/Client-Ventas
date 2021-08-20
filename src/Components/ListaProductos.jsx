import React, { Component } from 'react';
import '../css/PedidoVenta.css';
import MaterialTable from 'material-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import NumberFormat from "react-number-format";

class ListaProductos extends Component {
    render() {
        return (
            <MaterialTable
                className="add-padding add-margin"
                columns={[
                    { align: 'left', title: 'Producto', field: 'nombre' },
                    { align: 'left', title: 'Cantidad', field: 'cantidad' },
                    { align: 'left', title: 'Precio unitario', field: 'precio', type: "currency", 
                    currencySetting:{ currencyCode:'PYG', minimumFractionDigits:0, maximumFractionDigits:0}},
                    { align: 'left', title: 'Total', field: 'total', type: "currency", 
                    currencySetting:{ currencyCode:'PYG', minimumFractionDigits:0, maximumFractionDigits:0}}
                ]}
                data={this.props.lista}
                align='left'
                options={{
                    showTitle: false,
                    paging: false,
                    search: false,
                    filtering: false,
                    headerStyle: {
                        backgroundColor: '#B8B8B8',
                        color: '#FFF'
                    },
                    toolbar: false,
                }}
                localization={{
                    emptyDataSourceMessage: <h1 style={{ marginTop: '6%', position: 'absolute', top: '16%', marginLeft: '-70px', textAlign: 'center' }}>No hay elelementos en la lista</h1>
                }}
            />
        )
    }
}
export default ListaProductos