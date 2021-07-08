import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PedidoVenta.css';
import { Card, CardContent, CardHeader, Divider, RadioGroup, FormControlLabel, Radio, FormControl } from '@material-ui/core';
import { Container, Button } from 'reactstrap';
import ContadoCredito from './ContadoCredito';

function DatosFacturacion({ facturado, contado, cliente, ruc, datos}) {
    const [isFacturado, setFacturado] = useState(facturado);
    const [isContado, setContado] = useState(contado);
    const [opcion, setOP] = useState("contado")
    const [datosFact, setDatosFact] = useState({
        facturaN: '001-001-1235',
        fechaEmi: "10/05/2021",
        cant: 10,
        contadocredito: 0,
        cantCuotas: 6,
        cuotasPagadas: 3,
        monto: 110000,
        iva: 11000,
        metodoPago: 'efectivo',
        pagadoCon: 150000,
        vuelto: 30000,
        montoCuota: 18400,
    })

    const handleChange = async (e) => {
        setOP(e.target.value);
    }

    if (!isFacturado) {
        return (
            <Container className="fact informacion">
                <Card style={{ backgroundColor: "#F0F0F0" }}>
                    <CardHeader className="row align-items-left encabezado" title={"Pedido listo para facturar"} subheader={"Datos de la factura"} />
                    <Divider variant="middle" style={{ background: 'black' }} />
                    <CardContent className="row align-items-left encabezado">
                        <FormControl className="col-12" component="fieldset">
                            <RadioGroup aria-label="condicion" name="cond" onChange={handleChange}>
                                <FormControlLabel value="contado" control={<Radio />} label="Contado" />
                                <FormControlLabel value="credito" control={<Radio />} label="Credito" />
                                <FormControlLabel value="cancelado" control={<Radio />} label="Cancelado" />
                            </RadioGroup>
                        </FormControl>
                        <div className="col-12 row">
                            <ContadoCredito opcion={opcion} cliente={cliente} ruc={ruc}></ContadoCredito>
                        </div>
                    </CardContent>
                </Card>

            </Container>
        )
    } else if (isContado) {
        return (
            <Container className='fact informacion'>
                <Card style={{ backgroundColor: "#F0F0F0" }}>
                    <CardHeader className="row  encabezado" title={"Pedido facturado"} subheader={"Datos de la factura"} />
                    <Divider variant="middle" style={{ background: 'black' }} />
                    <CardContent className="row align-items-left">
                        <div className="col-6 align-items-left">Factura nro: {datosFact.facturaN}</div>
                        <div className="col-6 align-items-left">Emitido el: {datosFact.fechaEmi}</div>
                        <div className="col-12 align-items-left">Condicion: Contado</div>
                        <div className="col-6 align-items-left">Total: {datosFact.monto}</div>
                        <div className="col-6 align-items-left">Iva: {datosFact.iva}</div>
                    </CardContent>
                </Card>
                <Button className="button button-success" color="success">Imprimir Factura</Button>
            </Container>
        )
    } else {
        return (
            <Container className='fact informacion'>
                <Card style={{ backgroundColor: "#F0F0F0" }}>
                    <CardHeader className="row align-items-left encabezado" title={"Pedido facturado"} subheader={"Datos de la factura"} />
                    <Divider variant="middle" style={{ background: 'black' }} />
                    <CardContent className="row align-items-left">
                        <CardContent className="row align-items-left">
                            <div className="col-6 align-items-left">Factura nro: {datosFact.facturaN}</div>
                            <div className="col-6 align-items-left">Emitido el: {datosFact.fechaEmi}</div>
                            <div className="col-6 align-items-left">Condicion: Contado</div>
                            <div className="col-6 align-items-left">Cant cuotas: {datosFact.cantCuotas}</div>
                            <div className="col-6 align-items-left">Total: {datosFact.monto}</div>
                            <div className="col-6 align-items-left">Monto cuota: {datosFact.montoCuota}</div>
                            <div className="col-6 align-items-left">Iva: {datosFact.iva}</div>
                            <div className="col-6 align-items-left">Cuotas pagadas: {datosFact.cuotasPagadas}</div>
                            <div className="col-6 align-items-left"></div>
                            <Button className="col-6 button button-primary" color="primary">Pagar Cuota</Button>
                        </CardContent>
                        <Button className="button button-success" color="success">Imprimir Factura</Button>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}
export default DatosFacturacion;