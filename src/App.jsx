import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';


// Revisar si tenemos un token
const token = localStorage.getItem('token');
console.log(token);
if(token){
  tokenAuth(token);
}

function App() {
  // console.log(import.meta.env.VITE_BACKEND_URL);

  return (
    <>
    <ProyectoState>
      <TareaState>
        <AlertaState>
         <AuthState>
            <Router>
              <Routes>
                <Route exact path="/" Component={Login} />  
                <Route exact path="*" Component={Login} />             
              <Route Component={RutaPrivada}>
                  <Route exact path="/nueva-cuenta" Component={NuevaCuenta} />
                  <Route exact path="/proyectos" Component={Proyectos} />
              </Route>              
                
              </Routes>
            </Router>
          </AuthState> 
        </AlertaState>
      </TareaState>
    </ProyectoState>
    </>
  )
}

export default App
