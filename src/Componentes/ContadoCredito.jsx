import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PedidoVenta.css';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Container, Button } from 'reactstrap';

function ContadoCredito({ opcion, cliente, ruc }) {

    const metodosPago = [{title: "Efectivo"}, {title:"Cheque"}, {title: "Tarjeta Credito/Debito"}]
    const [inputP, setIP] = useState({ min: 0, max: 12 });
    const [metodo, setMetodo] = useState("Contado")
    const setMet = async (e) => {
        setMetodo(e);
    }

    if (opcion === "contado") {
        return (
            <div className="row">
                <div className="col-6">Nombre o Razon Social: {cliente}</div>
                <div className="col-6">RUC: {ruc}</div>
                <Autocomplete
                    id="Metodo de pago"
                    options={metodosPago}
                    onChange={(ev, val) => { setMet(val) }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => <TextField {...params} label="Metodo de pago" variant="outlined" />}
                />
                <Button className="button button-success col-12" color="success">Imprimir Factura</Button>
            </div>
        )
    } else if (opcion == "credito") {
        return (

            <div className="row">
                <div className="col-6">Nombre o Razon Social: {cliente}</div>
                <div className="col-6">RUC: {ruc}</div>
                <Autocomplete
                    id="Metodo de pago"
                    options={metodosPago}
                    onChange={(ev, val) => { setMet(val) }}
                    getOptionLabel={(option) => option.title }
                    renderInput={(params) => <TextField {...params} label="Metodo de Pago" variant="outlined" />}
                />
                <TextField
                    type='number'
                    label="Cantidad Cuotas"
                    inputProps={inputP}
                    aria-invalid={true}
                ></TextField>
                <Button className="button button-success col-12" color="success">Imprimir Factura</Button>
            </div>
        )
    } else {
        return (

            <TextField
                label="Nombre o Razon Social"
                defaultValue="Pedido Cancelado"
                InputProps={{ readOnly: true, }}
            />
        )
    }
}
export default ContadoCredito;