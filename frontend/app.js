
async function sendRequest(url, method, data = null) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return { mensaje: 'Error en la solicitud al servidor' };
    }
}

function crearRegistro() {
  
    const plataforma = document.getElementById('plataforma').value;
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;

   
    if (!plataforma || !usuario || !clave) {
        console.log("Por favor completa todos los campos.");
        return;
    }

  
    const data = { plataforma, usuario, clave };

   
    sendRequest('http://localhost:5000/registro/', 'POST', data)
        .then(response => {
            console.log(response);

            
            if (response.error) {
                console.error(`Error del servidor: ${response.error}`);
       
            } else {
               
                console.log("Registro exitoso");
               
            }
        })
        .catch(error => {
            console.error("Error al realizar la solicitud:", error);
      
        });
}


function consultarRegistro() {
    const codigo = document.getElementById('consultaCodigo').value;

    sendRequest(`http://localhost:5000/consulta_individual/${codigo}`, 'GET')
        .then(response => {
            console.log(response);
            
        });
}

// Función para actualizar un registro por ID
function actualizarRegistro() {
    const codigo = document.getElementById('actualizarCodigo').value;
    const nuevaPlataforma = document.getElementById('nuevaPlataforma').value;
    const nuevoUsuario = document.getElementById('nuevoUsuario').value;
    const nuevaClave = document.getElementById('nuevaClave').value;

    const data = { plataforma: nuevaPlataforma, usuario: nuevoUsuario, clave: nuevaClave };

    sendRequest(`http://localhost:5000/actualizar/${codigo}`, 'PUT', data)
        .then(response => {
            console.log(response);
           
        });
}

function eliminarRegistro() {
    const codigo = document.getElementById('eliminarCodigo').value;

    sendRequest(`http://localhost:5000/eliminar/${codigo}`, 'DELETE')
        .then(response => {
            console.log(response);
            
        });
}
