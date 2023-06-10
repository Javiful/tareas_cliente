import { useContext, useState } from "react";
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);

    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    //State para proyecto
    const [ proyecto, guardarProyecto ] = useState({
        nombre:''
    });

    //Extraer nombre de proyecto

    const { nombre } = proyecto;

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar proyecto
        if(nombre === '') {
            mostrarError();
            return;
        }

        //Agregar al state
        agregarProyecto(proyecto);

        //Reiniciar el form
        guardarProyecto({
            nombre: ''
        })


    }

    //Mostrar formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }


    return ( 
        <>
        <button 
            type="button" 
            className="btn btn-block btn-primario"
            onClick={onClickFormulario}
            >Nuevo Proyecto</button>

        {
            formulario ?
            (
                <form 
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitProyecto}
                >

                <input 
                    type="text" 
                    name="nombre" 
                    id="nombre" 
                    className="input-text"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={onChangeProyecto}
                />

                <input 
                    type="submit" 
                    value="Agregar Proyecto" 
                    className="btn btn-primario btn-block" 
                />
                </form>
        ) : null
        }

        { errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null }
        </>
     );
}
 
export default NuevoProyecto;