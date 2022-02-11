import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import logo from '../components/images/img.png'
import Swal from 'sweetalert2'
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()

    // Estado
    const [credenciales, setCredenciales] = useState({
        usuario: '',
        password: ''
    })

    // onChange
    const actualizarState = e => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    const { usuario, password } = credenciales

    // Funcion submit
    const submitLogin = async(e) => {
        e.preventDefault()

        if(usuario.trim() === '' || password.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar el usuario y la contraseña.',
                allowEscapeKey: false,
                allowOutsideClick: false,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#1a237e'
            })
            return
        }

        try {
            await axios({
                method: 'POST',
                url: 'http://localhost:4000/api/login-usuario',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: usuario,
                    password: password
                }
            }).then(response => {
                if(response.data.status !== 200) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.data.mensaje,
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#1a237e'
                    })
                    return
                } else {
                    sessionStorage.setItem('token', response.data.token)
                    sessionStorage.setItem('nombres', response.data.data.nombres)
                    sessionStorage.setItem('apellidos', response.data.data.apellidos)
                    sessionStorage.setItem('telefono', response.data.data.telefono)
                    sessionStorage.setItem('email', response.data.data.email)
                    sessionStorage.setItem('estado', response.data.data.estado)
                    sessionStorage.setItem('id', response.data.data._id)
                    sessionStorage.setItem('rol', response.data.data.rol)
                    navigate('/inicio')
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
                allowEscapeKey: false,
                allowOutsideClick: false,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#1a237e'
            })
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src={logo} className="brand_logo" alt="Logo" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                        <form onSubmit={submitLogin}>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" name="usuario" className="form-control input_user" value={usuario} placeholder="Usuario" onChange={actualizarState} />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-append">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" name="password" className="form-control input_pass" value={password} placeholder="Contraseña" onChange={actualizarState} />
                            </div>
                            <div className="d-flex justify-content-center mt-3 login_container">
                                <input type="submit" className="btn login_btn" value="Ingresar" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
	    </div>
    );
}
 
export default Login;