$(document).ready(function() {
    // Limpia el formulario al cargar la página
    cargarFormularios();

    });


function mostrarFormularioAgregar() {
    document.getElementById("modalAgregar").style.display = "block";
}

function cerrarFormularioAgregar() {
    document.getElementById("modalAgregar").style.display = "none";
}

    // Función para enviar el formulario de registro al servidor
    function enviarFormulario() {
        // Realizar las validaciones necesarias aquí antes de enviar el formulario


        // Obtener los datos del formulario
        var cargo = $('#cargo').val();
        var tp_cargo = $('#tp_cargo').val();
        var gestion = $('#gestion').val();
        var cod_cargo = $('#cod_cargo').val();
        var grado_p = $('#grado_p').val();
        var nombres = $('#nombres').val();
        var ap_paterno = $('#ap_paterno').val();
        var ap_materno = $('#ap_materno').val();
        var genero = $('#genero').val();
        var carnet = $('#carnet').val();
        var exten = $('#exten').val();
        var RU = $('#RU').val();
        var cod_depo = $('#cod_depo').val();
        var titulo = $('#titulo').val();
        var tipo_pro = $('#tipo_pro').val();
        var tipo_revista = $('#tipo_revista').val();
        var anio_publi = $('#anio_publi').val();
        var tipo_autor = $('#tipo_autor').val();

        // Enviar los datos al servidor para registrar el nuevo usuario
        $.ajax({
            url: '/crear_formulario', // Ruta en tu servidor para crear el formulario
            method: 'POST',
            data: {
                cargo: cargo,
                tp_cargo: tp_cargo,
                gestion: gestion,
                cod_cargo: cod_cargo,
                grado_p: grado_p,
                nombres: nombres,
                ap_paterno: ap_paterno,
                ap_materno: ap_materno,
                genero: genero,
                carnet: carnet,
                exten: exten,
                RU: RU,
                cod_depo: cod_depo,
                titulo: titulo,
                tipo_pro: tipo_pro,
                tipo_revista: tipo_revista,
                anio_publi: anio_publi,
                tipo_autor: tipo_autor
            },
            success: function(response) {
                mostrarMensajeRegistro('¡El formulario se ha registrado exitosamente!');
                
                // Limpiar los campos del formulario después de registrar el usuario
                $('#cargo').val('');
                $('#tp_cargo').val('');
                $('#gestion').val('');
                $('#cod_cargo').val('');
                $('#grado_p').val('');
                $('#nombres').val('');
                $('#ap_paterno').val('');
                $('#ap_materno').val('');
                $('#genero').val('');
                $('#carnet').val('');
                $('#exten').val('');
                $('#RU').val('');
                $('#cod_depo').val('');
                $('#titulo').val('');
                $('#tipo_pro').val('');
                $('#tipo_revista').val('');
                $('#anio_publi').val('');
                $('#tipo_autor').val('');
                
                // Otra acción que desees realizar después de registrar el usuario
            },
            error: function(xhr, status, error) {
                console.error('Error al enviar formulario de registro:', error);
               
            }
        });
    }



// Función para cargar los formularios desde el servidor
function cargarFormularios() {
    $.ajax({
        url: '/obtener_formularios', // Ruta en tu servidor para obtener los formularios
        method: 'GET',
        success: function(response) {
            // Limpiar la tabla antes de agregar los nuevos datos
            $('#tablaFormularios').empty();

            // Iterar sobre la lista de formularios recibidos
            response.forEach(function(formulario) {
                // Crear una nueva fila de tabla con los datos del formulario
                var fila = '<tr>' +
                    '<td>' + formulario.id + '</td>' + // ID
                    '<td>' + formulario.titulo + '</td>' + // Título
                    '<td>' + formulario.tipo_pro + '</td>' + // Tipo de Producción
                    '<td>' + formulario.tipo_revista + '</td>' + // Tipo de Revista
                    '<td>' + formulario.anio_publi + '</td>' + // Año de Publicación
                    '<td>' + formulario.cargo + '</td>' + // Cargo
                    '<td>' + formulario.gestion + '</td>' + // Gestión
                    '<td>' + formulario.nombres + '</td>' + // Nombre
                    '<td>' + formulario.ap_paterno + '</td>' + // Apellido Paterno
                    '<td>' + formulario.ap_materno + '</td>' + // Apellido Materno
                    '<td>' + formulario.carnet + '</td>' + // Carnet
                    '<td>' + formulario.tipo_autor + '</td>' + // Tipo de Autor
                    '<td>' +
                    '<button type="button" class="btn btn-primary btn-sm" onclick="editarFormulario(' + formulario.id + ')">Editar</button>' +
                    '<button type="button" class="btn btn-danger btn-sm ml-2" onclick="eliminarFormulario(' + formulario.id + ')">Eliminar</button>' +
                    '</td>' + // Acciones (editar, borrar, etc.)
                    '</tr>';
                // Agregar la fila a la tabla
                $('#tablaFormularios').append(fila);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar formularios:', error);
        }
    });
}


function eliminarFormulario(formulario_id) {
    if (confirm("¿Estás seguro de que deseas eliminar este formulario?")) {
        $.ajax({
            url: '/eliminar_formulario/' + formulario_id,
            method: 'POST',
            success: function(response) {
                // Manejar la respuesta del servidor si es necesario
                console.log(response);
                // Recargar la tabla u otra acción si es necesario
                cargarFormularios();
                // Mostrar mensaje de eliminación exitosa
                mostrarMensaje("¡Formulario eliminado exitosamente!", "alert-success");
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar formulario:', error);
                // Mostrar mensaje de error
                mostrarMensaje("Error al eliminar formulario", "alert-danger");
            }
        });
    }
}

// codigo editar 
//$('#generoEditar').val(response[17]);
          // Funcion editar 
                    function traducirGenero(genero) {
                        if (genero === "el" || genero === "Masculino") {
                            return "Masculino";
                        } else if (genero === "la" || genero === "Femenino") {
                            return "Femenino";
                        } else {
                            return "No especificado";
                        }
                    }
                function editarFormulario(formulario_id) {
                    $.ajax({
                        url: '/obtener_formulario_por_id/' + formulario_id, // Ruta para obtener los datos del formulario por su ID
                        method: 'GET',
                        success: function(response) {
                        
                        $('#idEditar').val(response.id);
                        $('#cargoEditar').val(response.cargo);
                        $('#tp_cargoEditar').val(response.tp_cargo);
                        $('#gestionEditar').val(response.gestion);
                        $('#cod_cargoEditar').val(response.cod_cargo);
                        $('#grado_pEditar').val(response.grado_p);
                        $('#nombresEditar').val(response.nombres);
                        $('#ap_paternoEditar').val(response.ap_paterno);
                        $('#ap_maternoEditar').val(response.ap_materno);
                        $('#generoEditar').val(traducirGenero(response.genero));
                        $('#carnetEditar').val(response.carnet);
                        $('#extenEditar').val(response.exten);
                        $('#RUEditar').val(response.RU);
                        $('#cod_depoEditar').val(response.cod_depo);
                        $('#tituloEditar').val(response.titulo);
                        $('#tipo_proEditar').val(response.tipo_pro);
                        $('#tipo_revistaEditar').val(response.tipo_revista);
                        $('#anio_publiEditar').val(response.anio_publi);
                        $('#tipo_autorEditar').val(response.tipo_autor);
                        
                        // Mostrar el modal de edición
                        $('#modalEditarFormulario').modal('show');
                    },
                    error: function(xhr, status, error) {
                        console.error('Error al cargar datos del formulario para editar:', error);
                    }
                });

                }


                // Función para enviar el formulario de edición al servidor
                function enviarFormularioEditar() {
                    // Obtener los datos del formulario de edición
                    var id = $('#idEditar').val();
                    var cargo = $('#cargoEditar').val();
                    var tp_cargo = $('#tp_cargoEditar').val();
                    var gestion = $('#gestionEditar').val();
                    var cod_cargo = $('#cod_cargoEditar').val();
                    var grado_p = $('#grado_pEditar').val();
                    var nombres = $('#nombresEditar').val();
                    var ap_paterno = $('#ap_paternoEditar').val();
                    var ap_materno = $('#ap_maternoEditar').val();
                    var genero = $('#generoEditar').val();
                    var carnet = $('#carnetEditar').val();
                    var exten = $('#extenEditar').val();
                    var RU = $('#RUEditar').val();
                    var cod_depo = $('#cod_depoEditar').val();
                    var titulo = $('#tituloEditar').val();
                    var tipo_pro = $('#tipo_proEditar').val();
                    var tipo_revista = $('#tipo_revistaEditar').val();
                    var anio_publi = $('#anio_publiEditar').val();
                    var tipo_autor = $('#tipo_autorEditar').val();

                    // Log datos antes de enviar
                    console.log("Enviando datos para edición:", {
                        id, cargo, tp_cargo, gestion, cod_cargo, grado_p, nombres, ap_paterno, ap_materno, genero, carnet, exten, RU, cod_depo, titulo, tipo_pro, tipo_revista, anio_publi, tipo_autor
                    });

                    // Enviar los datos al servidor para actualizar el formulario
                    $.ajax({
                        url: '/editar_formulario/' + id, // Ruta en tu servidor para editar el formulario
                        method: 'POST',
                        data: {
                            cargo: cargo,
                            tp_cargo: tp_cargo,
                            gestion: gestion,
                            cod_cargo: cod_cargo,
                            grado_p: grado_p,
                            nombres: nombres,
                            ap_paterno: ap_paterno,
                            ap_materno: ap_materno,
                            genero: genero,
                            carnet: carnet,
                            exten: exten,
                            RU: RU,
                            cod_depo: cod_depo,
                            titulo: titulo,
                            tipo_pro: tipo_pro,
                            tipo_revista: tipo_revista,
                            anio_publi: anio_publi,
                            tipo_autor: tipo_autor
                        },
                        success: function(response) {
                            console.log("Respuesta del servidor:", response); 
                            
                            mostrarMensaje("¡Edición realizada con éxito!", "success");

                            cargarFormularios();
                            // Cerrar el modal de edición después de editar el formulario exitosamente
                            cerrarFormularioEditar();
                        },
                        error: function(xhr, status, error) {
                            console.error('Error al enviar formulario de edición:', error);
                        }
                    });
                }

                // Función para cerrar el modal de edición
                function cerrarFormularioEditar() {
                    $('#modalEditarFormulario').modal('hide');
                }
                // Función para mostrar mensajes en la interfaz de usuario
function mostrarMensaje(mensaje, tipo) {
    // Crear elemento de mensaje
    var mensajeElemento = $('<div class="alert alert-' + tipo + ' alert-dismissible fade show" role="alert">' + mensaje +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span></button></div>');
    // Agregar mensaje al contenedor de mensajes
    $('#mensajesEditar').append(mensajeElemento);
    // Desvanecer el mensaje después de unos segundos
    setTimeout(function() {
        mensajeElemento.fadeOut(1000, function() {
            $(this).remove();
        });
    }, 5000); // Desvanecer después de 5 segundos
}
// Función para mostrar mensaje de confirmación de registro
function mostrarMensajeRegistro(mensaje) {
    // Crear elemento de mensaje
    var mensajeElemento = $('<div class="alert alert-success alert-dismissible fade show" role="alert">' + mensaje +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span></button></div>');
    // Agregar mensaje al contenedor de mensajes de registro
    $('#mensajeRegistro').empty().append(mensajeElemento);
    // Desvanecer el mensaje después de unos segundos
    setTimeout(function() {
        mensajeElemento.fadeOut(1000, function() {
            $(this).remove();
        });
    }, 5000); // Desvanecer después de 5 segundos
}
