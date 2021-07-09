import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import './PedidoVenta.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Container, Button } from 'reactstrap';
import { useLocation } from 'react-router-dom'

function ContadoCredito({ opcion, cliente, ruc, clienteid, total, iva, carrito }) {
  const loc = useLocation();
  const data = loc.state;
  const [cuotas, setCuotas] = useState(0);

  console.log(data);

  const op = useState(opcion);

  const metodosPago = [{ title: "Efectivo" }, { title: "Cheque" }, { title: "Tarjeta Credito/Debito" }]
  const [inputP, setIP] = useState({ min: 0, max: 12 });
  const [metodo, setMetodo] = useState("Contado")
  const setMet = async (e) => {
    setMetodo(e);
  }

  const submitContado = async (e) => {
    var axios = require('axios');
    var saldo = 0;
    if (e === "CREDITO") saldo = data.total;
    var datos = JSON.stringify({
      "condicion": e,
      "ENCARGADOId": { "ENCARGADOId": 1 },
      "CLIENTEId": { "credito": data.clienteid },
      "total": data.total,
      "iva": data.iva,
      "saldo": saldo
    });

    var config = {
      method: 'post',
      url: 'https://localhost:44307/api/apifacturas',
      headers: {
        'Content-Type': 'application/json'
      },
      data: datos
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        guardarDetFact(response.data.FACTURAId)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const guardarDetFact = async (e) => {
    var axios = require('axios');
    data.carro.map((elem) => {
      var datos = JSON.stringify({
        "FACTURAId": { "total": e },
        "ENCARGADOId": { "ENCARGADOId": 0 },
        "DETALLE_CREDITO": { "MONTO_CUOTA": 0 },
        "iva": (elem.total / 11),
        "total": elem.total,
        "estado": "PAGADO"
      });

      var config = {
        method: 'post',
        url: 'https://localhost:44307/api/apidetalles_factura',
        headers: {
          'Content-Type': 'application/json'
        },
        data: datos
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
          alert("Factura emitida")
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  const definirCantCuotas = (e) => {
    setCuotas(e);
  }

  if (opcion == "contado") {
    return (
      <div className="row">
        <Autocomplete
          className="separar col-8"
          id="Metodo de pago"
          options={metodosPago}
          onChange={(ev, val) => { setMet(ev.target.value) }}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => <TextField {...params} label="Metodo de pago" variant="outlined" />}
        />
        <Button onClick={(e) => submitContado("CONTADO")} className="button button-success separar col-8" color="success">Imprimir Factura</Button>
      </div>
    )
  } else if (opcion == "credito") {
    return (

      <div className="row">
        <Autocomplete
          className="separar col-8"
          id="Metodo de pago"
          options={metodosPago}
          onChange={(ev, val) => { setMet(val) }}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => <TextField {...params} label="Metodo de Pago" variant="outlined" />}
        />
        <TextField
          className="separar col-8"
          onChange={(ev, val) => definirCantCuotas(ev.target.value)}
          type='number'
          label="Cantidad Cuotas"
          variant="outlined"
          inputProps={inputP}
          aria-invalid={true}
        ></TextField>
        <Button onClick={(e) => submitContado("CREDITO")} className="button button-success separar col-8" color="success">Imprimir Factura</Button>
      </div>
    )
  } else {
    return (
      <TextField
        className="separar col-8"
        defaultValue="Pedido Cancelado"
        InputProps={{ readOnly: true, }}
      />
    )
  }
}
export default ContadoCredito;