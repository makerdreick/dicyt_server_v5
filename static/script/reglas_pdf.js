function search() {
    var input = document.getElementById('criterio_busqueda').value.trim();
    if (input !== '') {
        var formulariosList = document.getElementById('formularios-list');
        formulariosList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos resultados
        
        // Realizar una solicitud al servidor para buscar formularios
        fetch(`/buscar_formularios?criterio_busqueda=${input}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ocurrió un error al buscar los formularios.');
                }
                return response.json();
            })
            .then(data => {
                if (data.formularios.length === 0) {
                    mostrarModal('No se encontraron formularios que coincidan con la búsqueda.');
                } else {
                    data.formularios.forEach(formulario => {
                        var li = document.createElement('li');
                        li.className = 'formularios-item';
                        // Modificar el formato de presentación de los resultados
                        var contenido = `${formulario.titulo} - ${formulario.nombres} ${formulario.ap_paterno} ${formulario.ap_materno} - Carnet: ${formulario.carnet} - Año de publicación: ${formulario.anio_publi}`;
                        li.textContent = contenido;
                        // Agregar el evento click para mostrar más información si es necesario
                        li.addEventListener('click', function() {
                            mostrarInformacionResultado(formulario.id);
                        });
                        formulariosList.appendChild(li);
                    });
                }
            })
            .catch(error => {
                console.error('Error al buscar formularios:', error);
                mostrarModal('Ocurrió un error al buscar los formularios.');
            });
    } else {
        mostrarModal('Por favor, ingrese un criterio de búsqueda válido.');
    }
}










// Event listener para escuchar la tecla "Enter" en el campo de búsqueda
document.getElementById('criterio_busqueda').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        search(); // Llamar a la función de búsqueda cuando se presione "Enter"
    }
});


    

    
    document.getElementById('search-form').addEventListener('submit', function(event) {
        var input = document.getElementById('criterio_busqueda').value.trim();
        if (input === '') {
            event.preventDefault(); // Evitar el envío del formulario si el campo de búsqueda está vacío
            mostrarModal('Por favor, escriba el texto primero.');
        } else {
            search();
        }
    });
    
    
    
    
    // Función para mostrar un modal y cerrarlo automáticamente después de 2 segundos
    function mostrarModal(mensaje) {
    // Mostrar el modal
    document.getElementById('ventana-emergente-contenido').textContent = mensaje;
    document.getElementById('ventana-emergente').classList.remove('d-none');
    
    // Cerrar automáticamente el modal después de 2 segundos
    setTimeout(function() {
    // Ocultar el modal
    document.getElementById('ventana-emergente').classList.add('d-none');
    }, 2000); // 2000 milisegundos = 2 segundos
    }
    
    
///////////************************************************ */    
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const criterioBusqueda = document.getElementById('criterio_busqueda').value;
    fetch(`/listar_formularios?criterio_busqueda=${criterioBusqueda}`)
    .then(response => response.json())
    .then(data => {
        const formulariosList = document.getElementById('formularios-list');
        formulariosList.innerHTML = '';
        data.formularios.forEach(formulario => {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `/generar_certificado/${formulario.id}`;
            link.textContent = `Datos: ${formulario.nombres} ${formulario.ap_paterno} ${formulario.ap_materno} -- Carnet: ${formulario.carnet} -- Título: ${formulario.titulo} -- Año: ${formulario.anio_publi}`;
            link.classList.add('resultado'); // Agregar la clase 'resultado' para aplicar el estilo
            link.addEventListener('click', function() {
                // Eliminar la clase 'selected' de todos los elementos de la lista
                const items = formulariosList.getElementsByTagName('a');
                for (const item of items) {
                    item.classList.remove('selected');
                }
                // Agregar la clase 'selected' al elemento clicado
                link.classList.add('selected');
            });
            li.appendChild(link);
            formulariosList.appendChild(li);
        });
    });
});






    //********************************************* */

    // Ativar/desativar busca ao pressionar F1
    let searchInput = document.getElementById('criterio_busqueda');
    window.addEventListener('keydown', function(e) {
    if (e.key === 'F1') {
       e.preventDefault();
       searchInput.focus();
    }
    });
    
 // Redireccionar a busqueda.html al presionar ESC
window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        e.preventDefault();
        window.location.href = '/busqueda'; // Redireccionar a busqueda.html
    }
});