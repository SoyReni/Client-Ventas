import React, { useState } from 'react';
import axios from 'axios';
import './PedidoVenta.css';
import MaterialTable, { MTableToolbar } from 'material-table'
import Typography from '@material-ui/core/Typography'
import {Edit, Delete, Check, SaveAlt} from '@material-ui/icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';

function PedidoVenta({ isLoged }) {
  const [listaVenta, setListaVenta] = useState([])
  const componentDidMount = (e) => {
    axios.get("https://localhost:44307/api/APIVENTAs").then(response => {
      setListaVenta(response.data)
    });
  }

  const columns = [
    { align: 'left', title: 'ID', field: 'VENTAId', type: 'numeric' },
    { align: 'left', title: 'Fecha de emision', field: 'fecha' },
    { align: 'left', title: 'Encargado', field: 'ENCARGADOId.nombre' },
    { align: 'left', title: 'Cliente', field: 'CLIENTEId.nombre' },
    { align: 'left', title: 'Estado', field: 'estado' }
  ]

  if (!true) {
    return (
      <Redirect to={{ pathname: "/login", state: { isLoged: false } }} />
    )
  } else {
    componentDidMount();
    return (
      <Row className='tabla'>
        <Table bordered hover responsive>
          <MaterialTable
            columns={columns}
            data={listaVenta}
            title='Acciones'
            actions={[
              rowData => ({ icon: () => <Edit/>, tooltip: <Typography>'Modificar  estado'</Typography> }),
              rowData => ({ icon: () => <Delete/>, tooltip: <Typography>'Eliminar Pedido' </Typography>}),
              rowData => ({ icon: () => <Check/>, tooltip: <Typography>'Facturar' </Typography> }),
              rowData => ({ icon: () => <SaveAlt/>, tooltip: <Typography>'Emitir Factura' </Typography> })
            ]}
            localization={{
              header: { actions: 'Opciones' },
              body: {
                deleteTooltip: 'Eliminar',
                emptyDataSourceMessage: 'No hay elementos en la lista',
                editRow: { deleteText: 'Estas seguro que seas eliminarlo', }
              },
              pagination: { labelRowsSelect: 'Filas' },
              toolbar: { searchTooltip: 'Buscar', searchPlaceholder: 'Buscar' }
            }}
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
              showTitle: false,
              search: true,
              filtering: true,
              headerStyle: {
                backgroundColor: '#039be5',
                color: '#FFF'
              }
            }}
          />
        </Table>
        <div className="card-body">
          <div className="center">
            <Button color="primary" className="btn btn-primary boton-aceptar">Nuevo Pedido </Button>
          </div>
        </div>
      </Row>
    );
  }
}

export default PedidoVenta;