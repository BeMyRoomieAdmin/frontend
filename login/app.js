document
  .getElementById('loginForm')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    //Validar campos vacíos
    if (!email || !password) {
      alert('Todos los campos son obligatorios.')
      return
    }

    //Validar email con regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!emailPattern.test(email)) {
      alert('Por favor, introduce un email válido.')
      return
    }

    //Validar contraseña con regex (mínimo 8 caracteres, una letra mayúscula, una minúscula y un número)
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if (!passwordPattern.test(password)) {
      alert(
        'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número.'
      )
      return
    }

    //Enviar datos al endpoint
    const formData = { email, password }

    const url = 'http://localhost:3000/api/auth/login'
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
      console.log(datos)

      if (datos.message === 'Invalid credentials') {
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
          errorData.statusCode === 401 &&
          errorData.message === 'Invalid credentials'
        ) {
          alert('Invalid credentials')
        }
      } catch (parseError) {
        alert('Ocurrió un error inesperado.')
      }
    }
  })
