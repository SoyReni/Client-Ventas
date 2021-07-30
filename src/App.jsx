import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navegacion from './Componentes/Navegacion';
import Login from './Componentes/Login'
import { Switch, Route, BrowserRouter } from 'react-router-dom';

function App (){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Navegacion} />
                </Switch>
            </BrowserRouter>
        )
    }


export default App;