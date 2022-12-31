function obtenerPerfil() {
    fetch("http://localhost:9000/api/users/" + sessionStorage.login, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then((data) => {
            console.log(data)

            for (const i in data) {
                console.log(i, data[i], data[3])


                let campo = document.createElement('input');
                campo.value = data[i];
                campo.id = i;
                let label = document.createElement('label');
                label.innerHTML = i;
                label.append(campo)
                let formPrimerBtn = document.querySelector('form button:first-of-type')
                let form = document.querySelector('form')

                //inserta losinputs antes del primer btn
                form.insertBefore(label, formPrimerBtn)

            }
        })
        .catch(error => console.error('Error:', error))
}
function update() {
    const rpta = confirm("Desea actualizar los datos?")
    if (rpta) {
        let allInputs = document.querySelectorAll('form input');

        allInputs.forEach(input => {
            console.log(input.value)
        })

        nombre = document.getElementById('nombre').value;
        correo = document.getElementById('correo').value;
        usuario = document.getElementById('usuario').value;
        contraseña = document.getElementById('contraseña').value;

        fetch("http://localhost:9000/api/users/" + sessionStorage.login, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "nombre": nombre, "correo": correo, "usuario": usuario, "contraseña": contraseña })
        }).then(res => res.json())
            .then((data) => {
                if (data.modifiedCount==1) {
                    alert('Datos actualizados')
                }
                console.log(data)
            })
            .catch(error => console.error('Error:', error))
    }
}

function eliminar() {
    const rpta = confirm("Desea eliminar la cuenta?");
    if (rpta) {
        fetch("http://localhost:9000/api/users/" + sessionStorage.login, {
            method: 'DELETE',
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.deletedCount == 1) {
                    alert('Usuario eliminado');
                    window.location.href = "sign.html";
                } else {
                    alert("No se pudo eliminar usuario")
                }
            });
    }

}

function editarClick() {


    let fieldset = document.querySelector('fieldset');

    fieldset.hasAttribute('disabled') ? fieldset.removeAttribute('disabled') : fieldset.setAttribute('disabled', '')
}