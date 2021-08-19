import React, { useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/inicio.css';
import { Redirect, useHistory } from "react-router-dom";

function Inicio() {
    const [empleado, setEmpleado] = useState({ usuario: '', contraseña: '' });
    const baseUrl = "https://localhost:44307/api/employee/login";
    const api = axios.create(); 
    const log = sessionStorage.getItem("token")

    let history = useHistory();
    const Login = (e) => {
        e.preventDefault();
        const data = { usuario: empleado.usuario, contraseña: empleado.contraseña };
        api.post(baseUrl, data)
            .then((result) => {
                if (result.data.status == '200') {
                    sessionStorage.setItem("token", "true"); 
                    sessionStorage.setItem("Encargado", JSON.stringify(result.data.UserDetails));
                    history.push({
                        pathname: '/home',
                        state: {
                          encargado: result.data.UserDetails
                        }
                      });
                }
                else alert('Usuario o contraseña incorrectos')
            })
    }
    const onChange = (e) => {
        e.persist();
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    }

    if (log === null) {
        return (
            <div className="card o-hidden border-0 text-center tarjeta shadow-lg my-5">
                <div className="card-body p-5">
                    <h2 className="h4 text-gray-900 text-center">Bienvenido!</h2>
                    <form onSubmit={Login} className="user text-center">
                        <div className="form-group text-center">
                            <input className="form-control" value={empleado.user} onChange={onChange} name="usuario" id="Usuario" placeholder="Ingrese su usuario" />
                        </div>
                        <div className="form-group text-center">
                            <input type="password" className="form-control" value={empleado.contraseña} onChange={onChange} name="contraseña" id="Contraseña" placeholder="Contraseña" />
                        </div>
                        <button type="submit" className="btn btn-info mb-1"><span>Ingresar</span></button>
                        <hr />
                    </form>
                    <div>Tiene algun problema con el inicio de sesion? Contacte con el administrador al +595(975)161771</div>
                </div>
            </div>
        )
    } else {
        return (
            <Redirect to={{ pathname:"/"}}/>
        )
    }
}
export default Inicio;