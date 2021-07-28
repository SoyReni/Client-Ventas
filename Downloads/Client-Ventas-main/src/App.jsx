import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navegacion from './Componentes/Navegacion';
import Login from './Componentes/Login'
import { Switch, Route, BrowserRouter } from 'react-router-dom';

function App (){
        const loged = sessionStorage.getItem('token'); 
        const [isloged, setLoged] = useState(false);

        if (loged === 'true') {() => setLoged(true)}
        else {() => setLoged(false)} 
        
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} isloged={isloged}/>
                    <Route path="/" component={Navegacion} isloged={isloged}/>
                </Switch>
            </BrowserRouter>
        )
    }


export default App;