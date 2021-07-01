import React, { useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PedidoVenta.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';


function DatosFacturacion() {
    const [isFacturado, setFacturado] = useState(false);
    const [datosFact, setDatosFact] = useState({
      facturaN: '001-001-1235',
      cant: 10,
      contadocredito: 0,
      cantCuotas: 6,
      cuotasPagadas: 3,
      monto: 110000,
      iva: 11000,
      metodoPago: 'efectivo',
      pagadoCon: 150000, 
      vuelto: 30000,
    })

    return (
        <div className="container llenar">
            <div className="row align-items-left">

                <div className="col-md-4 col-sm-12 add-margin">
                    <div className="container align-items-left">
                        <div className="row align-self-end">Fecha: {new Date().toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ''}</div>
                        <div className="row align-self-end">Encargado: Dalila Castelnovo</div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default DatosFacturacion; 