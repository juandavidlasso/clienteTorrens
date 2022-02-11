import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Usuario = () => {

    const token = sessionStorage.getItem('token')
    const rol = Number(sessionStorage.getItem('rol'))
    const navigate = useNavigate()
    // Estado
    const [datos, setDatos] = useState([])

    useEffect(() => {
        const obtenerUsuarios = async() => {
            await axios({
                method: 'GET',
                url: 'http://localhost:4000/api/obtener-usuarios',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }).then(result => {
                setDatos(result.data.data)
            })
        }
        obtenerUsuarios()
    }, [])

    return (
        <div className="container-fluid grey lighten-4">
            <div className="row">
                <div className="col s12">
    
                    <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                        <div className="row">
                            <div className="col s12">
                                <h1 className="center title"> Listado de Usuarios </h1>

                                {rol === 1 ?
                                    <button type='button' className='btnRegistro' onClick={() => navigate('/registro-usuario')}>Registrar usuario</button>
                                :
                                    null
                                }
            
                                <div className="card-panel white">
                                    <div className="row valign-wrapper">
                                        <div className="col s12">
                                            {datos.length === 0 ?
                                                'No hay usuarios registrados'
                                            :
                                                <table className='table table-responsive table-hover'>
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Nombres</th>
                                                            <th>Apellidos</th>
                                                            <th>Teléfono</th>
                                                            <th>Email</th>
                                                            <th>Estado</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {datos.map(result => {
                                                            const {_id, nombres, apellidos, telefono, email, estado} = result
                                                            return (
                                                                <tr key={_id}>
                                                                    <td>{_id}</td>
                                                                    <td>{nombres}</td>
                                                                    <td>{apellidos}</td>
                                                                    <td>{telefono}</td>
                                                                    <td>{email}</td>
                                                                    <td>{estado === true ? 'Activo': 'Inactivo' }</td>
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
 
export default Usuario;