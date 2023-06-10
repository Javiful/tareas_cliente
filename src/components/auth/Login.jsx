import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext'

const Login = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;
    let navigate = useNavigate();

    // En caso de que el password o usuario no exista
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
        email: '',
        password: ''
    });

    // estraer de usuario
    const { email, password } = usuario;

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

        //validar que no haya campos vacios
        if(email === '' || password === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');   
        }

        //Pasarlo al action
        iniciarSesion({email, password});


    }

    return ( 
        <div className="form-usuario">
             { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg}</div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={onSubmit}
                >
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
                        <input 
                            type="submit" 
                            value="Iniciar Sesión" className="btn btn-primario btn-block" 
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;