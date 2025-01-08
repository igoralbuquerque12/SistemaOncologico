function loadUser() {

    const nomeUsuario = sessionStorage.getItem('userName')

    if (nomeUsuario) {
        document.getElementById('userName').textContent = nomeUsuario;

        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('registerBtn').style.display = 'none';
        document.getElementById('userArea').style.display = '';
    }
}

document.getElementById('logout-btn').addEventListener('click', function() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userName');

    document.getElementById('loginBtn').style.display = '';
    document.getElementById('registerBtn').style.display = '';
    document.getElementById('userArea').style.display = 'none';
})

document.addEventListener('DOMContentLoaded', loadUser);
