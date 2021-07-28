import React, { useState } from 'react';
import './PedidoVenta.css';
import { Table, TableContainer, Card, CardContent } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import MaterialTable from 'material-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import { Redirect, useLocation } from 'react-router-dom';
import DatosFacturacion from './DatosFacturacion';

function VerPedido() {
  const loc = useLocation();
  const data = loc.state;
  

  const [datos, setDatos] = useState({
    encargado: 'Sebastian Caballero',
    fecha: new Date().getDate,
  });

  const columns = [
    { align: 'left', title: 'Producto', field: 'producto' },
    { align: 'left', title: 'Cantidad', field: 'cantidad' },
    { align: 'left', title: 'Precio unitario', field: 'precio' },
    { align: 'left', title: 'Total', field: 'total' }
  ]

  if (!true) {
    return (
      <Redirect to={{ pathname: "/login", state: { isLoged: false } }} />
    )
  } else {
    return (
      
      <Container className='text-center tabla'>
        <Card style={{ backgroundColor: "#F0F0F0" }} className="add-margin llenar">
          <CardContent className="row align-items-left">
            <div className="col-md-6 col-sm-12">
              <div className="container align-items-left">
                <div className="row align-self-end">Fecha de pedido: {datos.fecha}</div>
                <div className="row align-self-end">Encargado: {datos.encargado}</div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="container align-items-left">
                <div className="row align-self-end">Cliente: {data.cliente.nombre}</div>
                <div className="row align-self-end">RUC: {data.cliente.ruc}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <TableContainer className="informacion">
          <Table>
            <MaterialTable
              columns={columns}
              data={data.carro}
              align='left'
              title='Acciones'
              actions={[rowData => ({
                icon: Delete,
                tooltip: 'Eliminar'
              })]}
              options={{
                actionsColumnIndex: -1,
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
          </Table>
        <div className="container text-right resumen">
          <div className="row"><label className="col-12 resumen-label">Total: {data.total}</label></div>
          <div className="row"><label className="col-12 resumen-label">IVA: {data.iva}</label></div>
        </div>
        </TableContainer>
        <DatosFacturacion facturado={false} contado={true} cliente={data.cliente.nombre} ruc={data.cliente.ruc} carrito={data.carro} total={data.total} iva={data.iva} idCiente={data.idcliente}/>
      </Container>
    )
  }
}
export default VerPedido;