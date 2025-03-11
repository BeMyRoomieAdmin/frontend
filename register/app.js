document
  .getElementById('registerForm')
  .addEventListener('submit', function (event) {
    event.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

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

    alert('Registro exitoso')
  })
