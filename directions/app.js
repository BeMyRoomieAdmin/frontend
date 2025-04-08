function cargarDirecciones(){
    fetch("http://localhost:4050/direcciones")
    .then(function(respuestaTextoPlano){
        return respuestaTextoPlano.json();
    })
    .then(function(data){
        const tbody = document.getElementById("direcciones-body");
        for(let direccion of data){
            
            const row = document.createElement("tr");
            const idCell = document.createElement("td");
            idCell.innerText = direccion.idDireccion;
            const ciudadCell = document.createElement("td");
            ciudadCell.innerText = direccion.ciudad;
            const codigoPostalCell = document.createElement("td");
            codigoPostalCell.innerText = direccion.codigoPostal;

            //show button
            const detallesCell = document.createElement("td");
            const detallesButton = document.createElement("button");
            detallesButton.innerText = "Ver";
            detallesButton.classList.add("btn-detalles");
            detallesButton.onclick = function(){
                window.location.href = "showDireccion.html?id=" + direccion.idDireccion;
            };
            detallesCell.appendChild(detallesButton);

            //edit button
            const editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.classList.add("btn-detalles");
            editButton.id = "bEditar";
            editButton.onclick = function(){
                window.location.href = "editDirecciones.html?id=" + direccion.idDireccion;
            };
            detallesCell.appendChild(editButton);

            //delete button
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.classList.add("btn-detalles");
            deleteButton.id = "bEliminar";
            deleteButton.onclick =function(){
                eliminarDireccion(direccion.idDireccion);
            };
            detallesCell.appendChild(deleteButton); 

            row.appendChild(idCell);
            row.appendChild(ciudadCell);
            row.appendChild(codigoPostalCell);
            row.appendChild(detallesCell);
            tbody.appendChild(row);
        }
    })
    .catch(function(error){
        console.log("Error al obtener las direcciones", error);
    });
}

function eliminarDireccion(idDireccion){
    Swal.fire({
        title:"¿Estás seguro de que quieres borrar la dirección?",
        text: `Eliminar usuario '${idDireccion}'Esta acción NO se puede deshacer`,
        icon: "warning",
        showCancelButton:true,
        confirmButtonText:"Sí, eliminar",
        cancelButtonText:"Cancelar"
    }).then(function(result){
        if(result.isConfirmed){
            //Si le hemos dado a Sí, eliminar, hacemos todo lo del fetch
            fetch("http://localhost:4050/direcciones/" + idDireccion,{
                method:"DELETE"
            })
            .then(function(respuestaTextoPlano){
                return respuestaTextoPlano.json()
            })
            .then(function(data){
                //OK
                console.log(data);
                if(data.message.includes("Error")){
                    Swal.fire({
                        title: "Error!",
                        text: data.message, //muestro mensaje desde el backend
                        icon: "error"
                    })
                } else {
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Dirección eliminada con éxito!",
                        icon: "success"
                    })
                    .then(function(){
                            //Refresco de página en JS desde el servidor y no desde caché
                            window.location.reload(true)
                            //cargarProductos()
                    }) 
                }
                              
            })
            .catch(function(error){
                console.log(error)
                Swal.fire({
                    title: "¡Error!",
                    text: error,
                    icon: "error"
                });
            })
        }
    })
}

cargarDirecciones();