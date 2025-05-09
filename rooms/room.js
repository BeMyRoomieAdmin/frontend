async function getRoom() {
  const urlParams = new URLSearchParams(window.location.search)
  const idRoom = urlParams.get('id')

  if (!idRoom) {
    // TODO añadir alerta o feedback al usuario
    console.log('ID de habitación no proporcionado')
    return
  }

  const url = `http://localhost:3000/api/room/${idRoom}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await fetch(url, options)

  const data = await response.json()

  const roomImage = document.getElementById('room-image')

  roomImage.onload = () => {
    roomImage.classList.add('loaded')
  }

  if (data.image) {
    roomImage.src = data.image
    roomImage.classList.remove('image-placeholder')
  } else {
    roomImage.src =
      'https://via.placeholder.com/800x450?text=No+hay+imagen+disponible'
    roomImage.classList.add('image-placeholder')
  }

  document.getElementById('id').innerText = data._id
  document.getElementById('cama').innerText = booleanToText(data.bed)
  document.getElementById('escritorio').innerText = booleanToText(data.desk)
  document.getElementById('armario').innerText = booleanToText(data.closet)
  document.getElementById('ventanas').innerText = data.windows
  document.getElementById('banyo').innerText = booleanToText(data.bath)
  document.getElementById('area').innerText = data.area

  const libreElement = document.getElementById('libre')
  const estaLibre = data.free
  libreElement.innerText = booleanToText(estaLibre)

  if (estaLibre) {
    libreElement.classList.add('disponible')
    libreElement.classList.remove('no-disponible')
  } else {
    libreElement.classList.add('no-disponible')
    libreElement.classList.remove('disponible')
  }
}

function booleanToText(value) {
  return value ? 'Sí' : 'No'
}

getRoom()
