import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Login from './components/Login'
import Inicio from './components/Inicio'
import Header from './components/Header'
import Tarea from './components/Tarea'
import Usuario from './components/Usuario'
import RegistroUsuario from './components/RegistroUsuario'
import RegistroTarea from './components/RegistroTarea'
import EditarTarea from './components/EditarTarea'

// Proteger rutas frontend
const isAuthenticated = () => {
  const token = sessionStorage.getItem('token')
  let isValid = true
  try{
    isValid = jwt_decode(token)
  }catch(e){
    return false;
  }
  return isValid;
}

// Componente ruta privado
const PrivateRoute = ({ children }) => (
  isAuthenticated()
    ? children
    :<Navigate to="/user/login" />
)

const App = () => {

  const location = useLocation()
  
  return (
    <div className="container-fluid">

      {location.pathname !== '/user/login' ?
        <Header />
      :
        null
      }

      <Routes>
        <Route path="/user/login" element={ <Login /> } />
        <Route path="/inicio" element={ <PrivateRoute> <Inicio /> </PrivateRoute> } />
        <Route path="/tareas" element={ <PrivateRoute> <Tarea /> </PrivateRoute> } />
        <Route path="/usuarios" element={ <PrivateRoute> <Usuario /> </PrivateRoute> } />
        <Route path="/registro-usuario" element={ <PrivateRoute> <RegistroUsuario /> </PrivateRoute> } />
        <Route path="/registro-tarea" element={ <PrivateRoute> <RegistroTarea /> </PrivateRoute> } />
        <Route path="/editar-tarea" element={ <PrivateRoute> <EditarTarea /> </PrivateRoute> } />
        <Route path="*" element={<Navigate to="/user/login" />} />
      </Routes>
    </div>
  );
}

export default App;
