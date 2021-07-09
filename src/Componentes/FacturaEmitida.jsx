import React, { useState } from 'react';
import './Informe.css';
import MaterialTable, { MTableToolbar } from 'material-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import { TableRow, TableCell } from '@material-ui/core';
import axios from 'axios';


function FacturaEmitida() {
    const [listaInforme, setLista] = useState([])
    const [suma, setSuma] = useState(0);
    const [saldo, setSaldo] = useState(0);
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
            })
        setSaldo(saldoTotal);
    }

    const componentDidMount = (e) => {
        if (!cargado) {
            api.get("https://localhost:44307/api/APIFACTURAS").then(response => {
                setLista(response.data);
                console.log(listaInforme);
                setCargado(true);
                totalInforme();
                saldoInforme();
            });
        }
    }
    /* Estado
    Pendiente 0
    Pagado es 1*/
    const columns = [
        { title: 'Cliente', field: 'CLIENTEId.nombre', width: 100 },
        { title: 'Cliente RUC', field: 'CLIENTEId.ruc', width: 100 },
        { title: 'Estado', field: 'estado', width: 100, render: (row) => <div className={row.estado ? "pagado" : "pendiente"}>{row.estado ? "Pagado" : "Pendiente"}</div> },
        { title: 'Condicion', field: 'condicion', width: 100 },
        { title: 'Vendido Por', field: 'ENCARGADOId.nombre', width: 100 },
        { title: 'Total', field: 'total', filtering: false, width: 100 },
        { title: 'IVA', field: 'iva', filtering: false, width: 100 },
        { title: 'Saldo', field: 'saldo', filtering: false, width: 100 }
    ]
    componentDidMount();
    return (
        <Container>
            <Table bordered hover responsive>
                <MaterialTable
                    title="Facturas Emitidas"
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
                    <TableCell align="right">{Intl.NumberFormat("de-DE").format(suma)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="right" colSpan={3}>Saldo</TableCell>
                    <TableCell align="right">{Intl.NumberFormat("de-DE").format(saldo)}</TableCell>
                </TableRow>
            </Table>
        </Container>
    );
}

export default FacturaEmitida;