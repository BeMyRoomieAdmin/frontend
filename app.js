const obtenerHabitaciones = async () => {
  const url = 'http://localhost:3000/api/room/home'
  const opciones = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const respuesta = await fetch(url, opciones)

    if (!respuesta.ok) {
      throw new Error('Error al obtener habitaciones')
    }

    const datos = await respuesta.json()
    console.log(datos)
  } catch (error) {
    alert(
      'Hubo un problema al obtener las habitaciones. Por favor, inténtalo de nuevo.'
    )
    console.error('Error:', error)
  }
}

obtenerHabitaciones()
