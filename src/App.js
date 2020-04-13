import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita'

function App() {

  // Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales){
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // UseEffect para realizar varias operaciones cuando el state cambia
  // Se ejecuta cuando se generan cambios en el componente, de acuerdo al
  // valor pasado por parámetro (en el array)
  useEffect( () => {
    // Se ejecuta cada vez que cambia el state de citas
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  // Funcion que agregue nueva cita
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Funcion que elimina una cita por su Id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="one-half column">
          <Formulario
            crearCita={crearCita}
          />
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita
              cita={cita}
              key={cita.id}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>
   </Fragment>  
  );
}

export default App;
