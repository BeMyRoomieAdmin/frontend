async function logout() {
  localStorage.removeItem('user')
  window.location.href = '../index.html'
}

function getUser() {
  const localStorageUser = localStorage.getItem('user')
  const { user, token } = JSON.parse(localStorageUser)

  const name = user.firstName
  const email = user.email
  const id = user._id
  const role = user.role
  const authToken = token

  document.getElementById('user').innerHTML = `
    <li>Name: ${name}</li>
    <li>Email: ${email}</li>
    <li>Id: ${id}</li>
    <li>Role: ${role}</li>
    <li>Token: ${authToken}</li>
  `
}

getUser()
