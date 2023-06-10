import { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

const RutaPrivada = () => {

    const authContext = useContext(AuthContext);
    const { autenticado, cargando, usuarioAutenticado,  } = authContext;

    useEffect(() => {
        const e = localStorage.getItem('token');
        console.log(e);
        usuarioAutenticado(e);
    }, [])
    
    
    if(autenticado === true && !cargando) {
        return (
           <Outlet />
        )
       
    }else {
        return (
            <Navigate to="/"/>
       ) 
    }
}

export default RutaPrivada;


