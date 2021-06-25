import React, { useState } from 'react';
import './Informe.css';
import MaterialTable, { MTableToolbar } from 'material-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';


function Informe({ isLoged }) {
  const [listaVenta, setListaVenta] = useState([])

  const columns = [
    { title: 'ID', field: 'i', type: 'numeric' },
    { title: 'Fecha de emision', field: 'fecha' },
    { title: 'Cliente', field: 'cliente' },
    { title: 'Total', field: 'total' },
    { title: 'IVA', field: 'iva' }

  ]

  if (!true) {
    return (
      <Redirect to={{ pathname: "/login", state: { isLoged: false } }} />
    )
  } else {
    return (

      <Container>
        <div className="encabezado">
          <div className="div3">
            <button className="btn btn-primary">Generar Informe</button>
          </div>
        </div>

        <Table bordered hover responsive>
          <MaterialTable

            columns={columns}
            data={listaVenta}
            title='Acciones'
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
              search: false,
              //  filtering: true,
              headerStyle: {
                backgroundColor: '#039be5',
                color: '#FFF'
              }
            }}
          />
        </Table>
      </Container>
    );
  }
}

export default Informe;