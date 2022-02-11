import React from 'react';
import logo from '../components/images/img.png'
import 'materialize-css';
import { SideNav, SideNavItem, Icon, Navbar, NavItem } from 'react-materialize'

const Header = () => {

    const nombre = sessionStorage.getItem('nombres')
    const apellido = sessionStorage.getItem('apellidos')

    const cerrarSesion = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('rol')
        sessionStorage.removeItem('nombres')
        sessionStorage.removeItem('apellidos')
        sessionStorage.removeItem('_id')
        sessionStorage.clear()
        window.location.reload()
      }

    return (
        <div className="row">
            <div className="hide-on-med-and-down">
                <SideNav
                    id="SideNav-10"
                    fixed
                    options={{
                        draggable: true
                    }}
                >
            
                    <SideNavItem
                        user={{
                            image: logo,
                        }}
                        userView
                        className="sidenavp"
                    />
                
                    <SideNavItem href="/inicio" icon={<Icon>home</Icon>} className="txtBtn">
                        Home
                    </SideNavItem>
                
                    <SideNavItem href="/usuarios" icon={<Icon>person</Icon>} className="txtBtn">
                        Users
                    </SideNavItem>
        
                    <SideNavItem href="/tareas" icon={<Icon>list</Icon>} className="txtBtn">
                        Tasks
                    </SideNavItem>
                </SideNav>
            </div>
    
    
            <Navbar
                alignLinks="right"
                id="mobile-nav"
                className="header1"
                options={{
                    draggable: true,
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 200,
                    preventScrolling: true
                }}
            >
                <NavItem>
                    <i className="material-icons left">search</i> 
                </NavItem>
                <NavItem className="hide-on-med-and-down">
                    <i className="material-icons left">add_alert</i> 
                </NavItem>
                <NavItem className="hide-on-med-and-down">
                    {nombre} - {apellido}
                </NavItem>


                <NavItem className="hide-on-large-only">
                    <i className="material-icons left">add_alert</i>
                </NavItem>
                <NavItem className="hide-on-large-only">
                    {nombre} - {apellido}
                </NavItem>
                
                <NavItem className="divider subheader blue-grey lighten-1 fw-bold black-text hide-on-large-only">
                    Acciones
                </NavItem>
                <NavItem href="/inicio" className="hide-on-large-only txtBtn">
                    <i className="material-icons left">home</i> Home
                </NavItem>
                <NavItem href="/usuarios" className="hide-on-large-only">
                    <i className="material-icons left">person</i> Users
                </NavItem>
                <NavItem href="/tareas" className="hide-on-large-only">
                    <i className="material-icons left">list</i> Tasks
                </NavItem>
                <NavItem href="/user/login" onClick={() => cerrarSesion()}>
                    <i className="material-icons left">power_settings_new</i> Salir
                </NavItem>
            </Navbar>
    
        </div>
    );
}
 
export default Header;