function CrearCita() {
  console.log('Rendering CrearCita component');
  const [selectedDate, setSelectedDate] = useState(null);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/appointments') // Asegúrate de reemplazar esto con la URL de tu servidor
      .then(response => response.json())
      .then(data => setCitas(data.appointments));
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleConfirmClick = () => {
    if (selectedDate) {
      const appointment = {
        date: selectedDate,
      };

      // Valida la fecha
      if (!appointment.date || !appointment.date.isValid()) {
        alert('La fecha no es válida');
        return;
      }

      // Especifica el formato de la fecha
      appointment.date = appointment.date.toISOString();

      // Envía los datos al servidor
      fetch('http://localhost:3001/appointments', {
        method: 'POST',
        body: JSON.stringify(appointment),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('La cita se creó correctamente');
          } else {
            alert('Ocurrió un error al crear la cita');
          }
        });
    }
  };

  return (
    <div>
      <p>Seleccione la fecha para agendar una cita:</p>
      <input type="date" onChange={handleDateChange} />
      <button onClick={handleConfirmClick}>Confirmar cita</button>
      <div>
        {citas.map(cita => (
          <div key={cita.id}>
            <p>{cita.date} - {cita.name}</p>
            <p>{cita.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrearCita;
