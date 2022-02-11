import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const RegistroUsuario = () => {

    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')

    // Estado
    const [credenciales, setCredenciales] = useState({
        nombres: '',
        apellidos: '',
        telefono: '',
        email: '',
        estado: true,
        rol: 2,
        password: ''
    })

    // onChange
    const actualizarState = e => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    const { nombres, apellidos, telefono, email, estado, rol, password } = credenciales

    // Funcion submit
    const submitRegistro = async(e) => {
        e.preventDefault()

        if( nombres.trim() === '' ||
            apellidos.trim() === '' ||
            telefono.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar todos los datos',
                allowEscapeKey: false,
                allowOutsideClick: false,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#1a237e'
            })
            return
        }

        await axios({
            method: 'POST',
            url: 'http://localhost:4000/api/registrar-usuario',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                nombres: nombres,
                apellidos: apellidos,
                telefono: telefono,
                email: email,
                estado: estado,
                rol: rol,
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
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: response.data.mensaje,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#1a237e'
                }).then(() => {
                    navigate('/usuarios')
                })
            }
        })
    }

    return (
        <div className="container-fluid grey lighten-4">
            <div className="row">
                <div className="col s12">
    
                    <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                        <div className="row">
                            <div className="col s12">
                                <h1 className="center title"> Ingrese los datos </h1>
            
                                <div className="card-panel white">
                                    <div className="row valign-wrapper">
                                        <div className="col s12">
                                            <form onSubmit={submitRegistro}>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-append">
                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                    </div>
                                                    <input type="text" name="nombres" className="form-control input_user" value={nombres} placeholder="Nombres" onChange={actualizarState} />
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-append">
                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                    </div>
                                                    <input type="text" name="apellidos" className="form-control input_user" value={apellidos} placeholder="Apellidos" onChange={actualizarState} />
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-append">
                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                    </div>
                                                    <input type="text" name="telefono" className="form-control input_user" value={telefono} placeholder="Teléfono" onChange={actualizarState} />
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-append">
                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                    </div>
                                                    <input type="text" name="email" className="form-control input_user" value={email} placeholder="Email" onChange={actualizarState} />
                                                </div>
                                                <div className="input-group mb-2">
                                                    <div className="input-group-append">
                                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                                    </div>
                                                    <input type="password" name="password" className="form-control input_pass" value={password} placeholder="Contraseña" onChange={actualizarState} />
                                                    <small className="form-text text-muted center">
                                                        La contraseña debe tener mínimo 7 caracteres, 
                                                        una letra mayúscula y un número.
                                                    </small>
                                                </div>
                                                <div className="d-flex justify-content-center mt-3 login_container">
                                                    <input type="submit" className="btn login_btn" value="Registrar" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default RegistroUsuario;