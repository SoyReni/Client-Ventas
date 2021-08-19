import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Components/Nav'
import Inicio from './Components/Inicio'
import { Switch, Route, BrowserRouter } from 'react-router-dom';

function App (){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Inicio} />
                    <Route path="/" component={Nav} />
                </Switch>
            </BrowserRouter>
        )
    }


export default App;