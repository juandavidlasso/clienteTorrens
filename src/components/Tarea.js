import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Tarea = () => {

    const token = sessionStorage.getItem('token')
    const rol = Number(sessionStorage.getItem('rol'))
    const idUsu = sessionStorage.getItem('id')
    const navigate = useNavigate()
    // Estado
    const [datos, setDatos] = useState([])

    useEffect(() => {
        const obtenerTareas = async() => {
            await axios({
                method: 'GET',
                url: 'http://localhost:4000/api/obtener-tareas',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then(result => {
                setDatos(result.data.data)
            })
        }
        const obtenerTarea = async() => {
            await axios({
                method: 'GET',
                url: 'http://localhost:4000/api/obtener-tarea',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                data: {
                    idUsuario: idUsu
                }
            }).then(result => {
                setDatos(result.data.data)
            })
        }
        // obtenerTareas()
        obtenerTarea()
    }, [])

    // Eliminar una tarea
    const eliminarTarea = async(id) => {

        try {
            Swal.fire({
                title: 'Alerta',
                text: "Desea eliminar la tarea? Esta acción no se podrá deshacer.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, Eliminar',
                confirmButtonColor: '#1b5e20',
                cancelButtonText: 'No, Cancelar',
                cancelButtonColor: '#b71c1c',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then( async(result) => {
                if (result.isConfirmed) {
                    await axios({
                        method: 'DELETE',
                        url: `http://localhost:4000/api/borrar-tarea/${id}`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
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
                                window.location.reload()
                            })
                        }
                    })
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
        <div className="container-fluid grey lighten-4">
            <div className="row">
                <div className="col s12">
                    <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                        <div className="row">
                            <div className="col s12">
                                <h1 className="center title"> Listado de Tareas </h1>

                                {rol === 1 ?
                                    <button type='button' className='btnRegistro' onClick={() => navigate('/registro-tarea')}>Registrar tarea</button>
                                :
                                    null
                                }
            
                                <div className="card-panel white">
                                    <div className="row valign-wrapper">
                                        <div className="col s12">
                                            {datos.length === 0 ?
                                                'No hay tareas registrados'
                                            :
                                                <table className='table table-responsive table-hover'>
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Título</th>
                                                            <th>Descripción</th>
                                                            <th>Tiempo</th>
                                                            {rol === 1 ?
                                                                <th>Edición</th>
                                                            :
                                                                null
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {datos.map(result => {
                                                            const {_id, titulo, descripcion, tiempo} = result
                                                            return (
                                                                <tr key={_id}>
                                                                    <td>{_id}</td>
                                                                    <td>{titulo}</td>
                                                                    <td>{descripcion}</td>
                                                                    <td>{tiempo}</td>
                                                                    {rol === 1 ?
                                                                        <td>
                                                                            <button type='button' className='btnEditar me-2' onClick={() => navigate('/editar-tarea', { state: result })}>Editar</button>
                                                                            <button type='button' className='btnEliminar' onClick={() => eliminarTarea(_id)}>Eliminar</button>
                                                                        </td>
                                                                    :
                                                                        null
                                                                    }
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            }
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
 
export default Tarea;