import React, { useState } from 'react';
import '../css/Informe.css';
import MaterialTable, { MTableToolbar } from 'material-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import { TableRow, TableCell } from '@material-ui/core';
import axios from 'axios';

function PagoPendiente() {
    const [listaInforme, setLista] = useState([]); 
    const [saldo, setSaldo] = useState(0); 
    const [suma, setSuma] = useState(0); 
    const [cargado, setCargado] = useState(false);
    const api = axios.create();

    const totalInforme = (e) => {
        let sumaParcial = 0;
        let sumaTotal = listaInforme.map(
            (val) => {
                sumaParcial += parseInt(val.total) * 1000;
            })
        setSuma(sumaTotal); 
    }
    const saldoInforme = (e) => {
        let saldoParcial = 0;
        let saldoTotal = listaInforme.map(
            (val) => {
                saldoParcial += parseInt(val.saldo) * 1000;
            });
        setSaldo(saldoTotal); 
    }
    /* Estado
    Pendiente 0
    Pagado es 1*/
    const componentDidMount = (e) => {
        if (!cargado) {
            api.get("https://localhost:44307/api/APIPAGOS").then(response => {
                setLista(response.data.filter((v) => v.estado === "PENDIENTE"));
                console.log(listaInforme);
                setCargado(true);
                saldoInforme();
            });
        }
    }

    const columns = [
        { title: 'Nro Factura', field: 'FACTURAId.factnum', type: 'numeric', filtering: false, width: 150 },
        { title: 'Fecha de Factura', field: 'fecha', width: 100 },
        { title: 'Cliente ', field: 'CLIENTEId.nombre', width: 100 },
        { title: 'RUC', field: 'CLIENTEId.ruc', width: 100 },
        { title: 'ENCARGADO', field: 'FACTURAId.ENCARGADOId.nombre'},
        { title: 'Fecha de Vencimiento', field: 'fechaVenc', width: 100 },
        { title: 'Monto Pagado', field: 'total', filtering: false, width: 100 },
    ]
    componentDidMount();
    return (
        <div>
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
                        search: true,
                        pagination: false,
                        exportButton: true,
                        filtering: false,
                        headerStyle: {
                            backgroundColor: '#B8B8B8',
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
                        <TableCell align="right">{Intl.NumberFormat("de-DE").format(suma)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align="right" colSpan={3}>Saldo</TableCell>
                        <TableCell align="right">{Intl.NumberFormat("de-DE").format(saldo)}</TableCell>
                    </TableRow>
                </Table>
        </div>
    );
}


export default PagoPendiente;