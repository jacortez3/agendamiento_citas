import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function VerCitasAgendadas() {
  console.log('Rendering VerCitasAgendadas component');
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/appointments');
        const data = await response.json();
        setCitas(data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Link to="/crear-cita">Crear nueva cita</Link>
      <h2>Citas Agendadas:</h2>
      <div>
        {citas.length > 0 ? (
          citas.map(cita => (
            <div key={cita.id}>
              <p>{cita.date} - {cita.name}</p>
              <p>{cita.description}</p>
            </div>
          ))
        ) : (
          <p>No hay citas agendadas.</p>
        )}
      </div>
    </div>
  );
}

export default VerCitasAgendadas;
