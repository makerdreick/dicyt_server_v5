
        // control.js
// Función para cargar usuarios al cargar la página
$(document).ready(function() {
    cargarUsuarios();
    });

// Función para mostrar el formulario de agregar usuario
function mostrarFormularioAgregar() {
    $('#modalAgregar').show();
}

// Función para cerrar el formulario de agregar usuario
function cerrarFormularioAgregar() {
    
    $('#modalAgregar').hide();
    $("#nombre").val('');
    $("#apell_pate").val('');
    $("#apell_mate").val('');
    $("#usuario").val('');
    $("#contraseña").val('');
    $("#rol").val('');
    //location.reload();
    }

// Función para agregar un usuario
function agregarUsuario() {
    // Validar si todos los campos del formulario están completos
    if ($('#usuarioForm')[0].checkValidity()) {
        var nombre = $("#nombre").val();
        var apell_pate = $("#apell_pate").val();
        var apell_mate = $("#apell_mate").val();
        var usuario = $("#usuario").val();
        var contraseña = $("#contraseña").val();
        var rol = $("#rol").val();

        $.ajax({
            url: '/registro',
            method: 'POST',
            data: {
                nombre: nombre,
                apell_pate: apell_pate,
                apell_mate: apell_mate,
                usuario: usuario,
                contraseña: contraseña,
                rol: rol
            },
            success: function(response) {
                cargarUsuarios();
                $("#nombre").val('');
                $("#apell_pate").val('');
                $("#apell_mate").val('');
                $("#usuario").val('');
                $("#contraseña").val('');
                $("#rol").val(''); // Reiniciar el campo del rol
                cerrarFormularioAgregar(); // Cerrar el formulario
                // Mostrar mensaje de confirmación flotante con Alertify.js
                alertify.notify('Usuario agregado correctamente', 'success', 2);
            },
            error: function(xhr, status, error) {
                console.error('Error al agregar usuario:', error);
            }
        });
    } else {
        // Si no todos los campos están completos, mostrar un mensaje de error
        alert('Por favor, complete todos los campos del formulario.');
    }
}


// Función para cargar usuarios desde el servidor
function cargarUsuarios() {
    $.ajax({
        url: '/obtener_usuarios', // Ruta en tu servidor para obtener los usuarios
        method: 'GET',
        success: function(response) {
            // Limpiar la tabla antes de agregar los nuevos datos
            $('#tablaUsuarios').empty();

            // Iterar sobre la lista de usuarios recibidos
            response.forEach(function(usuario) {
                // Crear una nueva fila de tabla con los datos del usuario
                var fila = '<tr>' +
                    '<td>' + usuario.id + '</td>' + // ID
                    '<td>' + usuario.nombre + '</td>' + // nombre
                    '<td>' + usuario.apell_pate + '</td>' + // apellido_paterno
                    '<td>' + usuario.apell_mate + '</td>' + // apellido_materno
                    '<td>' + usuario.usuario + '</td>' + // usuario
                    '<td>' + usuario.rol_id + '</td>' + // Rol
                    '<td>' +
                        '<button type="button" class="btn btn-primary btn-sm" onclick="editarUsuario(' + usuario.id + ')">Editar</button>' +
                        '<button type="button" class="btn btn-danger btn-sm ml-2" onclick="eliminarUsuario(' + usuario.id + ')">Eliminar</button>' +
                        '</td>' + // Acciones (editar, borrar, etc.)
                    '</tr>';
                // Agregar la fila a la tabla
                $('#tablaUsuarios').append(fila);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar usuarios:', error);
        }
    });
}

function verificarNombreUsuario() {
    var nombreUsuario = $("#usuario").val(); // Obtener el nombre de usuario del campo de entrada
    if (nombreUsuario.length > 0) { // Verificar si el campo no está vacío
        $.ajax({
            url: '/verificar_nombre_usuario', // Ruta en tu servidor para verificar el nombre de usuario
            method: 'POST',
            data: {nombre_usuario: nombreUsuario}, // Enviar el nombre de usuario al servidor
            success: function(response) {
                if (response.disponible) {
                    // Si el nombre de usuario está disponible, mostrar un check verde y un mensaje verde
                    $("#mensajeUsuario").html('<i class="fas fa-check-circle icon"></i> <span class="disponible">El nombre de usuario está disponible</span>').removeClass("no-disponible").addClass("disponible");
                } else {
                    // Si el nombre de usuario no está disponible, mostrar una X roja y un mensaje rojo
                    $("#mensajeUsuario").html('<i class="fas fa-times-circle icon"></i> <span class="no-disponible">El nombre de usuario ya está en uso</span>').removeClass("disponible").addClass("no-disponible");
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al verificar el nombre de usuario:', error);
            }
        });
    } else {
        // Si el campo está vacío, borrar el mensaje
        $("#mensajeUsuario").text("");
    }
}

// Función para eliminar un usuario
function eliminarUsuario(usuarioId) {
    // Mostrar ventana de confirmación con Alertify.js
    alertify.confirm('¿Estás seguro de que quieres eliminar este usuario?', function() {
        // Realizar la solicitud AJAX para eliminar el usuario
        $.ajax({
            type: 'POST',
            url: '/eliminar_usuario/' + usuarioId,
            success: function(response) {
                // Eliminar la fila de la tabla correspondiente al usuario eliminado
                $('#tablaUsuarios tr[data-id="' + usuarioId + '"]').remove();

                // Mostrar mensaje de eliminación exitosa
                alertify.success('Usuario eliminado correctamente.');
                cargarUsuarios();
            },
            error: function(xhr, status, error) {
                console.error('Error al eliminar usuario:', error);
                alertify.error('Error al eliminar usuario. Por favor, inténtalo de nuevo.');
            }
        });
    },function() {
        // En caso de cancelar, no hacer nada
    }).set({title:'Confirmación de eliminación'}); // Cambiar el título de la ventana de confirmación
}

//<!--      qui comienza para editar -->

// Función para abrir el modal de editar usuario
function editarUsuario(usuarioId) {
    console.log('Editar usuario:', usuarioId);
    $.ajax({
        url: '/obtener_usuario/' + usuarioId, // Ruta en tu servidor para obtener la información del usuario
        method: 'GET',
        success: function(response) {
            // Llenar el formulario de edición con la información del usuario
            $('#editUsuarioId').val(response.id); // Mostrar el ID del usuario en un campo oculto
            $('#editNombre').val(response.nombre);
            $('#editApellidoPaterno').val(response.apell_pate); // Corrección de identificador
            $('#editApellidoMaterno').val(response.apell_mate); // Corrección de identificador
            $('#editUsuario').val(response.usuario);
            $('#editPass').val(response.pass);
            // Buscar el nombre del rol correspondiente al rol_id del usuario
            var rolNombre = ''; // Variable para almacenar el nombre del rol
            switch (response.rol_id) {
                case 1:
                    rolNombre = 'admin';
                    break;
                case 2:
                    rolNombre = 'invitado'; 
                    break;
                case 3:
                    rolNombre = 'usuario';
                    break;
                default:
                    rolNombre = '';
                    break;
            }
            // Establecer el nombre del rol como valor del campo de selección
            $('#editRol').val(rolNombre);

            
            $('#modalEditar').show(); // Mostrar el modal de editar usuario
        },
        error: function(xhr, status, error) {
            console.error('Error al obtener información del usuario:', error);
            alert('Error al obtener información del usuario. Por favor, inténtalo de nuevo.');
        }
    });
}

    
    // Event listener para el botón de editar en la tabla de usuarios
    $(document).on('click', '.btn-editar', function() {
        var usuarioId = $(this).closest('tr').find('.usuario-id').text();
        editarUsuario(usuarioId);
    });
    
    // Función para guardar los cambios realizados en la edición de usuario
    function guardarCambiosUsuario() {
        // Obtener los valores del formulario de edición
        var usuarioId = $('#editUsuarioId').val();
        var nombre = $('#editNombre').val();
        var apell_pate = $('#editApellidoPaterno').val(); 
        var apell_mate = $('#editApellidoMaterno').val();
        var usuario = $('#editUsuario').val();
        var contraseña = $('#editPass').val();
        var rol = $('#editRol').val();
    
        // Realizar una solicitud AJAX para guardar los cambios
        $.ajax({
            url: '/editar_usuario/' + usuarioId,
            method: 'POST',
            data: {
                nombre: nombre,
                apell_pate: apell_pate,
                apell_mate: apell_mate,
                usuario: usuario,
                contraseña: contraseña,
                rol: rol
            },
            success: function(response) {
                // Recargar la lista de usuarios después de guardar los cambios
                cargarUsuarios();
                // Cerrar el modal de editar usuario
                cerrarFormularioEditar();
                // Mostrar notificación de éxito con Toastr
                 // Mostrar notificación de éxito
                 alertify.success('Usuario editado correctamente');
                },
            error: function(xhr, status, error) {
                console.error('Error al guardar cambios del usuario:', error);
                alert('Error al guardar cambios del usuario. Por favor, inténtalo de nuevo.');
            }
        });
    }
    
        // Función para cerrar el formulario de edición
        function cerrarFormularioEditar() {
            $('#modalEditar').hide(); // Ocultar el modal de editar usuario
        }
    
   
    // Función para mostrar/ocultar la contraseña al hacer clic en el botón
    $('#togglePassword').click(function(){
        var tipo = $('#editPass').attr('type');
        if(tipo == 'password'){
            $('#editPass').attr('type', 'text');
            $('#togglePassword i').removeClass('fa-eye').addClass('fa-eye-slash');
            $('#togglePassword').attr('title', 'Ocultar contraseña');
        } else {
            $('#editPass').attr('type', 'password');
            $('#togglePassword i').removeClass('fa-eye-slash').addClass('fa-eye');
            $('#togglePassword').attr('title', 'Mostrar contraseña');
        }
    });
    /////////////////////////  validacion de usuarios.
  ///////////////////////// Validación de usuarios en modo de edición
function verificarNombreUsuarioEditar(inputId) {
    var nombreUsuario = $("#" + inputId).val(); // Obtener el nombre de usuario del campo de entrada
    var nombreUsuarioActual = $("#nombreUsuarioActual").val(); // Obtener el nombre de usuario actual
    if (nombreUsuario.length > 0 && nombreUsuario !== nombreUsuarioActual) { // Verificar si el campo no está vacío y si ha habido cambios en el nombre de usuario
        $.ajax({
            url: '/verificar_nombre_usuario', // Ruta en tu servidor para verificar el nombre de usuario
            method: 'POST',
            data: {nombre_usuario: nombreUsuario}, // Enviar el nombre de usuario al servidor
            success: function(response) {
                if (response.disponible) {
                    // Si el nombre de usuario está disponible, mostrar un check verde y un mensaje verde
                    $("#mensajeEditUsuario").html('<i class="fas fa-check-circle icon"></i> <span class="disponible">El nombre de usuario está disponible</span>').removeClass("no-disponible").addClass("disponible");
                } else {
                    // Si el nombre de usuario no está disponible, mostrar una X roja y un mensaje rojo
                    $("#mensajeEditUsuario").html('<i class="fas fa-times-circle icon"></i> <span class="no-disponible">El nombre de usuario ya está en uso</span>').removeClass("disponible").addClass("no-disponible");
                }
            },
            error: function(xhr, status, error) {
                console.error('Error al verificar el nombre de usuario:', error);
            }
        });
    } else {
        // Si el campo está vacío o si el nombre de usuario no ha cambiado, borrar el mensaje
        $("#mensajeEditUsuario").empty();
    }
}