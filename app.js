const getRooms = async () => {
  const url = 'http://localhost:3000/api/room/home'
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error('Error al obtener habitaciones')
    }

    const data = await response.json()

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''

    for (const room of data) {
      const { image, price, area, free, _id } = room

      const newCard = document.createElement('div')
      newCard.innerHTML = `
      <div class="card-content">
        <img class="" src="${image}" alt="Habitación" />
        <div class="card-properties">
          <div class="room-properties">
            <p class="area">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="none" stroke="#5b5b5b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4h4v4m-6 2l6-6M8 20H4v-4m0 4l6-6"/>
              </svg>
              ${area} m²
            </p>
            <p class="price">${price}€<span>/mes</span></p>
          </div>
          <div class="availability-container">
            <p class="availability ${free ? 'available' : 'not-available'}">
              ${free ? 'Available' : 'Not available'}
            </p>
            <a href="rooms/showRoom.html?id=${_id}">More details</button>
          </div>
        </div>
      </div>
      `

      cardContainer.appendChild(newCard)
    }
  } catch (error) {
    alert(
      'Ha habido un problema al obtener las habitaciones. Por favor, inténtalo de nuevo.'
    )
    console.error('Error:', error)
  }
}

getRooms()
