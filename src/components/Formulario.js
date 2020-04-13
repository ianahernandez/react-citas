import React, { Fragment, useState } from 'react';
import { v4 as uuid } from 'uuid';

const Formulario = ({crearCita}) => {

  //Crear state de citas
  const [cita, actualizarCita] = useState({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
  });

  //Crear state de errores
  const [error, actualizarError] = useState(false);

  // Funcion que se ejecuta para actualizar los datos d ela cita
  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  } 

  // Extraer los valores del formulario
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario presiona agregar cita

  const submitCita = e => {
    e.preventDefault();

    // Validar
    if( mascota.trim() === '' || propietario.trim() === '' || 
      fecha.trim() === '' || hora.trim() === '' || 
      sintomas.trim() === ''){

        actualizarError(true);
        return;
    }
    // ELiminar mensaje de error
    actualizarError(false);

    // Asignar ID
    cita.id = uuid();

    // Crear la cita
    crearCita(cita);

    // Reiniciar el form
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    });
  }

  return ( 
    <Fragment>
        <h2>Crear Cita</h2>
        { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
       
        <form
          onSubmit={submitCita}
        >
          <label>Nombre mascota</label>
          <input
            type="text"
            name="mascota"
            className="u-full-width"
            placeholder="Nombre mascota"
            onChange={actualizarState}
            value={mascota}
          />
          <label>Nombre del dueño</label>
          <input
            type="text"
            name="propietario"
            className="u-full-width"
            placeholder="Nombre del dueño de la mascota"
            onChange={actualizarState}
            value={propietario}
          />
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            className="u-full-width"
            onChange={actualizarState}
            value={fecha}
          />
          <label>Hora</label>
          <input
            type="time"
            name="hora"
            className="u-full-width"
            onChange={actualizarState}
            value={hora}
          />
          <label>Síntomas</label>
          <textarea
            className="u-full-width"
            name="sintomas"
            placeholder="Síntomas"
            onChange={actualizarState}
            value={sintomas}
          ></textarea>
          <button
            type="submit"
            className="u-full-width button-primary"
            onChange={actualizarState}
          >Agregar cita</button>
        </form>
    </Fragment>
    
   );
}
 
export default Formulario;