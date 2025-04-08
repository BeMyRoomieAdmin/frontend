document
  .getElementById('registerForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    const firstName = document.getElementById('firstName').value
    const lastName = document.getElementById('lastName').value
    const secondLastName = document.getElementById('secondLastName').value
    const phoneNumber = document.getElementById('phoneNumber').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    // Validar campos vacíos
    if (
      !firstName ||
      !lastName ||
      !secondLastName ||
      !phoneNumber ||
      !email ||
      !password
    ) {
      alert('Todos los campos son obligatorios.')
      return
    }

    // Validar email con regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!emailPattern.test(email)) {
      alert('Por favor, introduce un email válido.')
      return
    }

    // Validar contraseña con regex (mínimo 8 caracteres, una letra mayúscula, una minúscula y un número)
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!passwordPattern.test(password)) {
      alert(
        'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número.'
      )
      return
    }

    // Validar teléfono (número de 9 a 15 dígitos)
    const phonePattern = /^\d{9,15}$/
    if (!phonePattern.test(phoneNumber)) {
      alert(
        'Por favor, introduce un número de teléfono válido (entre 9 y 15 dígitos).'
      )
      return
    }

    // Enviar datos al endpoint
    const formData = {
      firstName,
      lastName,
      secondLastName,
      phoneNumber,
      email,
      password
    }

    const url = 'http://localhost:3000/api/auth/register'
    const opciones = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    try {
      const respuesta = await fetch(url, opciones)
      const datos = await respuesta.json()

      if (datos.message === 'User already exists') {
        const errorInfo = JSON.stringify({
          message: datos.message,
          statusCode: respuesta.status
        })
        throw new Error(errorInfo)
      }

      localStorage.setItem('user', JSON.stringify(datos))
      window.location.href = '../dashboard/index.html'
    } catch (error) {
      try {
        const errorData = JSON.parse(error.message)

        if (
          errorData.statusCode === 400 &&
          errorData.message === 'User already exists'
        ) {
          alert('User already exists with this email or phone number')
        }
      } catch (parseError) {
        alert('Ocurrió un error inesperado.')
      }
    }
  })
