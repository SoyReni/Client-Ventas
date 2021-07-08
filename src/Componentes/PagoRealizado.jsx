import React, { useState } from 'react';
import './Informe.css';
import MaterialTable, { MTableToolbar } from 'material-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import {TableRow, TableCell } from '@material-ui/core';

function PagoRealizado() {
    const [listaInforme, setLista] = useState([]);
    const [total, setTotal] = useState(0);

    const totalInforme = (e) => {
        let suma = 0;
        let sumaTotal = listaInforme.map(
            (val) => {
                suma += parseInt(val.total) * 1000;


            })
        setTotal(total)
    }
    /* Estado
    Pendiente 0
    Pagado es 1*/
    const columns = [
        { title: 'Nro Factura', field: 'nroFactura', type: 'numeric', filtering: false, width: 150 },
        { title: 'Fecha', field: 'fecha', width: 100 },
        { title: 'Cliente  ', field: 'cliente', width: 100 },
        { title: 'Cliente RUC', field: 'clienteRuc', width: 100 },
        { title: 'Condicion', field: 'condicion', width: 100 },
        { title: 'Vendido Por', field: 'vendidoPor', width: 100 },
        { title: 'Monto Pagado', field: 'total', filtering: false, width: 100 },
    ]
    return (
        <Container>
            <Table bordered hover responsive>
                <MaterialTable
                    title="Pagos Realizados"
                    columns={columns}
                    data={listaInforme}
                    components={{
                        Toolbar: props => (
                            <div>
                                <MTableToolbar {...props} />
                                <div color="primary" style={{ padding: '0px 20px', color: '#039be5' }}>
                                </div>
                            </div>
                        ),
                    }}
                    options={{
                        actionsColumnIndex: -1,
                        showTitle: true,
                        search: false,
                        pagination: false,
                        exportButton: true,
                        filtering: true,
                        headerStyle: {
                            backgroundColor: '#039be5',
                            color: '#FFF'
                        }
                    }}
                    localization={{
                        header: {
                            actions: 'Opciones',
                        },
                        toolbar: {
                            exportPDFName: 'Generar PDF',
                            exportCSVName: 'Generar Excel',
                            searchTooltip: 'Buscar',
                            searchPlaceholder: 'Buscar'
                        }
                    }}
                />
            </Table>
            <Table>
                <TableRow>
                    <TableCell align="right" colSpan={3}>Total</TableCell>
                    <TableCell align="right">{Intl.NumberFormat("de-DE").format(total)}</TableCell>
                </TableRow>
            </Table>
        </Container>
    );
}
export default PagoRealizado;