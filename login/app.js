document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    //Validar campos vacíos
    if (!email || !password) {
      alert('Todos los campos son obligatorios.');
      return;
    }
  
    //Validar email con regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      alert('Por favor, introduce un email válido.');
      return;
    }
  
    //Validar contraseña con regex (mínimo 8 caracteres, una letra mayúscula, una minúscula y un número)
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      alert(
        'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula y un número.'
      );
      return;
    }
  
    //Enviar datos al endpoint
    const formData = { email, password };
  
    fetch('http://localhost:3000/api/auth/login', {
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
        throw new Error('Error en el inicio de sesión');
      })
      .then((data) => {
        alert('Inicio de sesión exitoso');
        console.log('Respuesta del servidor:', data);
      })
      .catch((error) => {
        alert('Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.');
        console.error('Error:', error);
      });
  });