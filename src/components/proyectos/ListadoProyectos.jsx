import { useContext, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import Proyecto from "./Proyecto";
import AlertaContext from '../../context/alertas/alertaContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListadoProyectos = () => {

    //Obtener el state inicial
    const proyectosContext = useContext(proyectoContext);

    const { mensaje, proyectos, obtenerProyectos} = proyectosContext;

    const alertaConstext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaConstext;


    useEffect(() =>{
      // Si hay un error
      if(mensaje) {
        mostrarAlerta(mensaje.msg, mensaje.categoria);
      }

      obtenerProyectos();
      // eslint-disable-next-line
    },[mensaje]);

    // revisar si proyectos tiene contenido
    if( proyectos.length === 0 ) return <p className="text-center">No hay proyectos</p>

    return ( 
        <ul className="listado-proyectos">

          { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }

            <TransitionGroup>
              {proyectos.map(proyecto => (
              <CSSTransition
                 key={proyecto._id}
                 timeout={200}
                 classNames="proyecto"
              >
                <Proyecto
                  proyecto={proyecto} 
                />   
              </CSSTransition>  
            ))}
            </TransitionGroup>

        </ul>
     );
}
 
export default ListadoProyectos;