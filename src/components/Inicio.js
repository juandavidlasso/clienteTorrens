import React from 'react';

const Inicio = () => {

    const nombre = sessionStorage.getItem('nombres')
    const apellido = sessionStorage.getItem('apellidos')
    const telefono = sessionStorage.getItem('telefono')
    const email = sessionStorage.getItem('email')
    const estado = sessionStorage.getItem('estado')

    return (
        <div className="container-fluid grey lighten-4">
            <div className="row">
                <div className="col s12">
    
                    <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                        <div className="row">
                            <div className="col s12">
                                <h1 className="center title"> Mis Datos </h1>
            
                                <div className="card-panel white">
                                    <div className="row valign-wrapper">
                                        <div className="col s12">
                                            <p><span className='fw-bold'>Nombres: </span> {nombre} </p>
                                            <p><span className='fw-bold'>Apellidos: </span> {apellido} </p>
                                            <p><span className='fw-bold'>Teléfono: </span> {telefono} </p>
                                            <p><span className='fw-bold'>Email: </span> {email} </p>
                                            <p><span className='fw-bold'>Estado: </span> {estado ? 'Activo' : 'Inactivo'} </p>
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
 
export default Inicio;