import React, { useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { Redirect, useHistory } from "react-router-dom";

function Login({ isLoged }) {
    const [Loged, setLoged] = useState(false);
    const [empleado, setEmpleado] = useState({ usuario: '', contraseña: '' });
    const baseUrl = "https://localhost:44307/api/employee/login";
    const api = axios.create(); 

    let history = useHistory();
    const Login = (e) => {
        e.preventDefault();
        const data = { usuario: empleado.usuario, contraseña: empleado.contraseña };
        api.post(baseUrl, data)
            .then((result) => {
                var a = localStorage.setItem('datos', JSON.stringify(result.data.UserDetails));
                if (result.data.status == '200') {
                    { () => setLoged(true) }
                    localStorage.setItem('token', 'true');
                    console.log(localStorage.getItem('token'));
                    console.log(result.data.status);
                    history.push({
                        pathname: '/home',
                        appState: {
                          isLoged: true
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

    if (!isLoged) {
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
                </div>
            </div>
        )
    } else {
        return (
            <Redirect to={{ pathname:"/", state: {isLoged: true}}}/>
        )
    }
}
export default Login;