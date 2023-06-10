import { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {

    

    //Obtener el state 
    const proyectosContext = useContext(proyectoContext);

    const { proyecto } = proyectosContext;

    //Obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const {tareaseleccionada, obtenerTareas, agregarTarea, validarTarea, errortarea, actualizarTarea, limpiarTarea} = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        }else {
            guardarTarea({
                nombre: ''
            })
        }
    },[tareaseleccionada]);

    //State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: '',

    })

    // Extraer el nombre de la tarea
    const { nombre } = tarea;
    //Si no hay proyecto seleccionado
    if(!proyecto) return null

    // Array destructuring de proyecto

    const [proyectoActual]  = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
        ...tarea,
        [e.target.name] : e.target.value
        })
        
    }

    // Al hacer submit

    const onSubmit = e => {
        e.preventDefault();

        // validar
        if(nombre.trim() === '') {
            validarTarea();
            return;    
        }

        //Si es edicion o si es una nueva tarea
        if(tareaseleccionada === null) {
            // agregar la nueva tarea al state de tarea
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }else {
            //Actualizar tarea existente
            actualizarTarea(tarea);

            // Elimina la tareaseleccionada del state
            limpiarTarea();
        }
  

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id);

        // Reiniciar el form
        guardarTarea({
            nombre: ''
        })

    }

    return ( 
      <div className="formulario">
        <form
            onSubmit={onSubmit}
        >
            <div className="contenedor-input">
                <input 
                    type="text" 
                    name="nombre" 
                    className="input-text" placeholder="Nombre Tarea..." 
                    value={nombre}
                    onChange={handleChange}
                />
            </div> 
            <div className="contenedor-input">
                <input 
                    type="submit" 
                    value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    className="btn btn-primario btn-submit btn-block" 
                />
            </div>
        </form> 

        {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
      </div>  
     );
}
 
export default FormTarea;