import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext'

/*Notas a partir de la version 6 react-router-dom
los props.history.push ya no se utilizan se deve usar el useNavigate de la siguiente manera:
import { useNavigate } from 'react-router-dom';

let navigate = useNavigate;

navigate('/usuario');
*/

const NuevaCuenta = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;
    let navigate = useNavigate();

    // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(() => {
        if(autenticado) {
            navigate('/proyectos');
        }
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);    
        }
    }, [mensaje, autenticado]);
    
   
    // State para iniciar sesion
    const [ usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    // estraer de usuario
    const { nombre, email, password, confirmar } = usuario;

    //evento onchange
    const onChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usario quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        //validar que campos no vacios
        if(nombre.trim() === '' ||
           email.trim() === '' ||
           password.trim() === '' ||
           confirmar.trim() === '') {
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
                return
           }

        //password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return
        }

        //los dos password iguales
            if(password !== confirmar){
                mostrarAlerta('Los password no son iguales', 'alerta-error');
                return            
            } 

        //Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });


    }

    return ( 
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg}</div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            id="nombre" 
                            placeholder="Tu nombre" 
                            onChange={onChange} 
                            value={nombre}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Tu email" 
                            onChange={onChange} 
                            value={email}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Tu password" 
                            onChange={onChange} 
                            value={password}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Repite Password</label>
                        <input 
                            type="password" 
                            name="confirmar" 
                            id="confirmar" 
                            placeholder="repite tu password" 
                            onChange={onChange} 
                            value={confirmar}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit" 
                            value="Registrarme" className="btn btn-primario btn-block" 
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;