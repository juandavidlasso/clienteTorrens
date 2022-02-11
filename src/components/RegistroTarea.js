import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const RegistroTarea = () => {

    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')
    const id = sessionStorage.getItem('id')

    // Estado
    const [tarea, setTarea] = useState({
        titulo: '',
        descripcion: '',
        tiempo: '',
        idUsuario: id
    })

    // onChange
    const actualizarState = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const { titulo, descripcion, tiempo, idUsuario } = tarea

    // Funcion submit
    const submitRegistro = async(e) => {
        e.preventDefault()

        if( titulo.trim() === '' ||
            descripcion.trim() === '' ||
            tiempo.trim() === '') {
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
            url: 'http://localhost:4000/api/crear-tarea',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                titulo: titulo,
                descripcion: descripcion,
                tiempo: tiempo,
                idUsuario: idUsuario
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
                    navigate('/tareas')
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
                                                    <input type="text" name="titulo" className="form-control input_user" value={titulo} placeholder="Título" onChange={actualizarState} />
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-append">
                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                    </div>
                                                    <input type="text" name="descripcion" className="form-control input_user" value={descripcion} placeholder="Descripción" onChange={actualizarState} />
                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-append">
                                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                                    </div>
                                                    <input type="text" name="tiempo" className="form-control input_user" value={tiempo} placeholder="Tiempo" onChange={actualizarState} />
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
 
export default RegistroTarea;