import { Button } from '@progress/kendo-react-buttons';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import React, { useRef } from 'react';


function Factura_PDF({fact, det}) {
  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);
  const factura = fact;
  const detalles = det.map(
    (pedido, i) => {
      return (
        <tr>
          <th>{pedido.nombre}</th>
          <th>{pedido.cantidad}</th>
          <th>{pedido.precio}</th>
          <th>{pedido.total}</th>
        </tr >
      )
}
  )

const handleExportWithComponent = (event) => {
  pdfExportComponent.current.save();
}

const handleExportWithFunction = (event) => {
  savePDF(contentArea.current, { paperSize: "A4" });
}

return (
  <div className="app-content">
    <PDFExport ref={pdfExportComponent} paperSize="A4">
      <div className="container" ref={contentArea}>
        <div className="row">
          <div className="col-md-4">
            <h4>Proyecto Sistemas de Gestion</h4>
          </div>
          <div className="col-md-4 offset-md-4">
            <h5>Fecha: {new Date().toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ''}</h5>
            <h5>Factura Nro.: {factura.factNum}</h5>
          </div>
        </div>
        <div>
          <h5>----------------------------------------------------------------------</h5>
          <h5> Nombre o Razon Social: {factura.CLIENTEId.nombre}</h5>
          <h5> RUC o CI: {factura.CLIENTEId.ruc}</h5>
          <h5> Direccion: </h5>
          <h5> Condicion de la venta: {factura.condicion}</h5>
          <h5>----------------------------------------------------------------------</h5>
          <table className="default">
            <tr>
              <th scope="col">Descripcion</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
            {detalles}
          </table>
          <h5>Subtotal: {factura.total - factura.iva}</h5>
          <h5>IVA: {factura.iva} </h5>
          <h5>Total: {factura.total}</h5>



        </div>
      </div>
    </PDFExport>
    <div className="button-area">
      <Button primary={true} onClick={handleExportWithComponent}>Imprimir factura Component</Button>
      <Button onClick={handleExportWithFunction}>Imprimir Factura with Method</Button>
    </div>


  </div>
);
}

export default Factura_PDF;

