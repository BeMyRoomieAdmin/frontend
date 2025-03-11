document
  .getElementById('registerForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const secondLastName = document.getElementById('secondLastName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar campos vacíos
    if (!firstName || !lastName || !secondLastName || !phoneNumber || !email || !password) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // Validar email con regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      alert('Por favor, introduce un email válido.');
      return;
    }

    // Validar contraseña con regex (mínimo 8 caracteres, una letra mayúscula, una minúscula y un número)
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      alert(
        'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número.'
      );
      return;
    }

    // Validar teléfono (número de 9 a 15 dígitos)
    const phonePattern = /^\d{9,15}$/;
    if (!phonePattern.test(phoneNumber)) {
      alert('Por favor, introduce un número de teléfono válido (entre 9 y 15 dígitos).');
      return;
    }

    // Enviar datos al endpoint
    const formData = {
      firstName,
      lastName,
      secondLastName,
      phoneNumber,
      email,
      password,
    };

    fetch('https://tu-endpoint.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error en el registro');
      })
      .then((data) => {
        alert('Registro exitoso');
        console.log('Respuesta del servidor:', data);
      })
      .catch((error) => {
        alert('Hubo un problema al registrar. Por favor, inténtalo de nuevo.');
        console.error('Error:', error);
      });
  });
