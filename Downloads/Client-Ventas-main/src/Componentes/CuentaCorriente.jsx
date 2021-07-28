import React, { useState } from 'react';
import './Informe.css';
import MaterialTable, { MTableToolbar } from 'material-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import { TableRow, TableCell } from '@material-ui/core';

function CuentaCorriente() {
    const [listaInforme, setLista] = useState([]);
    const columns = [
        { title: 'Cuota', field: 'cuota', type: 'numeric' },
        { title: 'Cliente', field: 'cliente' },
        { title: 'Fecha de Vencimiento', field: 'fecha' },
        { title: 'Estado', field: 'estado' }

    ]
    /* Estado
    Pendiente 0
    Pagado es 1*/
    return (
        <Container className="tab">
            <Table bordered hover responsive>
                <MaterialTable
                    title="Cuenta Corriente"
                    columns={columns}
                    data={listaInforme}
                    components={{
                        Toolbar: props => (
                            <div>
                                <MTableToolbar {...props} />
                                <div color="primary" style={{ padding: '0px 10px', color: '#039be5' }}>
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
        </Container>
    );
}
export default CuentaCorriente;