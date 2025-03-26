// const obtenerHabitaciones = async () => {
//   const url = 'http://localhost:3000/api/room/home'
//   const opciones = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }

//   try {
//     const respuesta = await fetch(url, opciones)

//     if (!respuesta.ok) {
//       throw new Error('Error al obtener habitaciones')
//     }

//     const datos = await respuesta.json()

//     const cardContainer = document.getElementById('card-container') // Se obtiene el contenedor de las tarjetas
//     cardContainer.innerHTML = '' // Se limpia el contenedor antes de agregar nuevas tarjetas

//     for (const room of datos) {
//       const { image, price, area, free } = room

//       // Se crea una nueva tarjeta clonando la plantilla siguiente
//       const newCard = document.createElement('div')
//       newCard.innerHTML = `
//       <div class="card-content">
//         <img class="" src="${image}" alt="Habitación" />
//         <div class="card-properties">
//           <div class="room-properties">
//             <p class="area">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
//                 <path fill="none" stroke="#5b5b5b" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4h4v4m-6 2l6-6M8 20H4v-4m0 4l6-6"/>
//               </svg>
//               ${area} m²
//             </p>
//             <p class="price">${price}€<span>/mes</span></p>
//           </div>
//           <div class="availability-container">
//             <p class="availability ${free ? 'available' : 'not-available'}">${
//         free ? 'Disponible' : 'No disponible'
//       }</p>
//           </div>
//         </div>
//       </div>
//       `

//       newCard.classList.add('card') // Se añade la clase 'card' al nuevo div
//       cardContainer.appendChild(newCard) // Se agrega la nueva tarjeta al contenedor
//     }
//   } catch (error) {
//     alert(
//       'Ha habido un problema al obtener las habitaciones. Por favor, inténtalo de nuevo.'
//     )
//     console.error('Error:', error)
//   }
// }

// obtenerHabitaciones()
