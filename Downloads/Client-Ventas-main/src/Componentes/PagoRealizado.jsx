import React, { useState,useEffect } from 'react';
import './Informe.css';
import MaterialTable, { MTableToolbar } from 'material-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import {TableRow, TableCell, Select , MenuItem } from '@material-ui/core';


const listaInforme = [
    {nroFactura: '520', fecha: '27/05/2020', cliente: "Pedro Perez",clienteRuc: "3478525-1",
    estado: 0, condicion: "Credito", vendidoPor: "Super User", total: "480.000 ", saldo: "200.000 "},
    {nroFactura: '330', fecha: '27/05/2020', cliente: "Pedro Perez",clienteRuc: "3478525-1",
    estado: 0, condicion: "Contado", vendidoPor: "Super User", total: "480.000 ", saldo: "200.000 "},
       
    ]

function PagoRealizado() {
  
  // const [listaInforme, setLista] = useState([]);
    const [total, setTotal] = useState(0);
    const [condicion,setCondidion]=useState('all');
    const [filterList, setFilterList]=useState(listaInforme);

   useEffect(()=>{
    setFilterList (condicion==='all'?listaInforme: listaInforme.filter(l=>l.condicion===condicion))

      },[condicion])
  
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
        { title: 'Nro Factura', field: 'nroFactura', type: 'numeric', width: 150 },
        { title: 'Fecha', field: 'fecha', width: 100 },
        { title: 'Cliente  ', field: 'cliente', width: 100 },
        { title: 'Cliente RUC', field: 'clienteRuc', width: 100 },
        { title: 'Condicion', field: 'condicion', width: 100 },
        { title: 'Vendido Por', field: 'vendidoPor', width: 100 },
        { title: 'Monto Pagado', field: 'total', width: 100 },
    ]

    useEffect(()=>{

    },[condicion])
    return (
        
        <Container>
        

            <Table bordered hover responsive>
                <MaterialTable
                    title="Pagos Realizados"
                    columns={columns}
                    data={filterList}
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