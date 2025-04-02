function cargarUsers() {
  fetch('http://localhost:4050/users')
    .then(function (respuestaTextoPlano) {
      return respuestaTextoPlano.json()
    })
    .then(function (data) {
      const tbody = document.getElementById('usersBody')
      tbody.innerHTML = '' // Limpiar la tabla antes de llenarla

      for (let user of data) {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.innerText = user.idUser

        const usernameCell = document.createElement('td')
        usernameCell.innerText = user.username

        const nombreCell = document.createElement('td')
        nombreCell.innerText = user.firstName

        const apellidoCell = document.createElement('td')
        apellidoCell.innerText = user.lastName

        const emailCell = document.createElement('td')
        emailCell.innerText = user.email

        const passwordCell = document.createElement('td')
        passwordCell.innerText = user.password

        const perfilCell = document.createElement('td')
        perfilCell.innerText = user.profile

        // CELDA DE BOTONES
        const detallesCell = document.createElement('td')

        // BOTÓN VER
        const detallesBtn = document.createElement('button')
        detallesBtn.innerText = 'Ver'
        detallesBtn.onclick = function () {
          window.location.href = 'showUser.html?id=' + user.idUser
        }
        detallesCell.appendChild(detallesBtn)

        // BOTÓN EDITAR
        const editarBtn = document.createElement('button')
        editarBtn.innerText = 'Editar user'
        editarBtn.onclick = function () {
          window.location.href = 'editUser.html?id=' + user.idUser
        }
        detallesCell.appendChild(editarBtn)

        // BOTÓN ELIMINAR
        const eliminarBtn = document.createElement('button')
        eliminarBtn.style.backgroundColor = 'red'
        eliminarBtn.innerText = 'Eliminar user'
        eliminarBtn.onmouseover = function () {
          eliminarBtn.style.backgroundColor = 'darkred'
        }
        eliminarBtn.onmouseout = function () {
          eliminarBtn.style.backgroundColor = 'red'
        }
        eliminarBtn.onclick = function () {
          eliminarUsuario(user.idUser)
        }
        detallesCell.appendChild(eliminarBtn)

        // Agregar celdas a la fila
        row.appendChild(idCell)
        row.appendChild(usernameCell)
        row.appendChild(nombreCell)
        row.appendChild(apellidoCell)
        row.appendChild(emailCell)
        row.appendChild(passwordCell)
        row.appendChild(perfilCell)
        row.appendChild(detallesCell) // ← SE AGREGÓ ESTA LÍNEA

        tbody.appendChild(row)
      }
    })
    .catch(function (error) {
      console.log('Error al cargar users: ' + error)
    })
}

function eliminarUsuario(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: `Eliminar Usuario '${id}'. Esta acción no se puede deshacer`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(function (result) {
    if (result.isConfirmed) {
      //Si le hemos dado a "Sí, eliminar"
      fetch('http://localhost:4050/users/' + id, {
        method: 'DELETE'
      })
        /*.then(function (respuestaTextoPlano) {
          return respuestaTextoPlano.text() // Cambia a .text() para manejar texto plano
        })*/
        .then(function (data) {
          // Data = String no JSON
          console.log(data) // Aquí manejarás el texto como respuesta
          Swal.fire({
            title: 'Eliminado!',
            text: '¡Usuario eliminado con éxito!',
            icon: 'success'
          }).then(function () {
            window.location.reload(true)
          })
        })
        .catch(function (error) {
          console.error(error)
          Swal.fire({
            title: '¡Error!',
            text: 'Hubo un problema al intentar eliminar el usuario.',
            icon: 'error'
          })
        })
    }
  })
}

function cargarHabitaciones() {
  fetch('http://localhost:4050/rooms')
    .then(function (respuestaTextoPlano) {
      // La respuesta (OK o KO) la transformo a JSON
      return respuestaTextoPlano.json()
    })
    .then(function (data) {
      console.log('Datos recibidos:', data)
      const tbody = document.getElementById('habitacionesBody')
      if (!tbody) {
        console.error('El elemento con id "habitacionesBody" no existe.')
        return
      }

      for (let habitacion of data) {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.innerText = habitacion.idRoom

        const camaCell = document.createElement('td')
        camaCell.innerText = booleanToText(habitacion.cama)

        const armarioCell = document.createElement('td')
        armarioCell.innerText = booleanToText(habitacion.armario)

        const ventanasCell = document.createElement('td')
        ventanasCell.innerText = habitacion.ventanas

        const areaCell = document.createElement('td')
        areaCell.innerText = habitacion.area

        const escritorioCell = document.createElement('td')
        escritorioCell.innerText = booleanToText(habitacion.escritorio)

        const bañoCell = document.createElement('td')
        bañoCell.innerText = booleanToText(habitacion.banyo)

        const calefacciónCell = document.createElement('td')
        calefacciónCell.innerText = booleanToText(habitacion.calefaccion)

        const aireCell = document.createElement('td')
        aireCell.innerText = booleanToText(habitacion.aire_acondicionado)

        const libreCell = document.createElement('td')
        libreCell.innerText = booleanToText(habitacion.libre)

        const detallesCell = document.createElement('td')

        // BOTÓN VER
        const detallesBtn = document.createElement('button')
        detallesBtn.innerText = 'Ver'
        detallesBtn.onclick = function () {
          window.location.href = 'showRoom.html?id=' + habitacion.idRoom
        }
        detallesCell.appendChild(detallesBtn)

        // BOTÓN EDITAR
        const editarBtn = document.createElement('button')
        editarBtn.innerText = 'Editar Habitación'
        editarBtn.onclick = function () {
          window.location.href = 'editRoom.html?id=' + habitacion.idRoom
        }
        detallesCell.appendChild(editarBtn)

        // BOTÓN ELIMINAR
        const eliminarBtn = document.createElement('button')
        eliminarBtn.style.backgroundColor = 'red'
        eliminarBtn.innerText = 'Eliminar Habitación'
        eliminarBtn.onmouseover = function () {
          eliminarBtn.style.backgroundColor = 'darkred'
        }
        eliminarBtn.onmouseout = function () {
          eliminarBtn.style.backgroundColor = 'red'
        }
        eliminarBtn.onclick = function () {
          eliminarHabitacion(habitacion.idRoom)
        }
        detallesCell.appendChild(eliminarBtn)

        row.appendChild(idCell)
        row.appendChild(camaCell)
        row.appendChild(armarioCell)
        row.appendChild(ventanasCell)
        row.appendChild(areaCell)
        row.appendChild(escritorioCell)
        row.appendChild(bañoCell)
        row.appendChild(calefacciónCell)
        row.appendChild(aireCell)
        row.appendChild(libreCell)
        row.appendChild(detallesCell)

        tbody.appendChild(row)
      }
    })
    .catch(function (error) {
      console.log('Error al cargar habitaciones: ' + error)
    })
}

function eliminarHabitacion(id) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: `Eliminar Habitación '${id}'. Esta acción no se puede deshacer`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then(function (result) {
    if (result.isConfirmed) {
      //Si le hemos dado a "Sí, eliminar"
      fetch('http://localhost:4050/rooms/' + id, {
        method: 'DELETE'
      })
        /*.then(function (respuestaTextoPlano) {
          return respuestaTextoPlano.text() // Cambia a .text() para manejar texto plano
        })*/
        .then(function (data) {
          // Data = String no JSON
          console.log(data) // Aquí manejarás el texto como respuesta
          Swal.fire({
            title: 'Eliminado!',
            text: '¡Habitación eliminada con éxito!',
            icon: 'success'
          }).then(function () {
            window.location.reload(true)
          })
        })
        .catch(function (error) {
          console.error(error)
          Swal.fire({
            title: '¡Error!',
            text: 'Hubo un problema al intentar eliminar la habitación.',
            icon: 'error'
          })
        })
    }
  })
}

// Función para sustituir el 'true' por un 'Si' y el 'false' por un 'no'
function booleanToText(value) {
  return value ? 'Sí' : 'No'
}

cargarUsers()
document.addEventListener('DOMContentLoaded', function () {
  cargarHabitaciones()
})
