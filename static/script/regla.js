// Ocultar mensajes de conexión después de 2 segundos
document.addEventListener('DOMContentLoaded', function() {
    var notifications = document.querySelectorAll('.notification');
    notifications.forEach(function(notification) {
        setTimeout(function() {
            notification.style.display = 'none';
        }, 2000); // Ocultar después de 2 segundos
    });

    function clearFormFields() {
        // Restablecer los valores de los campos del formulario
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("token-input").value = "";
    }

    // Obtener todos los elementos "navbar-burger"
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Verificar si hay algún menú hamburguesa
    if ($navbarBurgers.length > 0) {
        // Agregar un evento de clic a cada uno de ellos
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                // Obtener el objetivo del atributo "data-target"
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Alternar la clase "is-active" tanto en "navbar-burger" como en "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }

    // Agregar eventos de clic a los elementos de menú para abrir el modal de video con diferentes videos
    document.querySelectorAll('.js-modal-trigger').forEach(el => {
        el.addEventListener('click', () => {
            const target = el.dataset.target;
            const videoSrc = el.dataset.videoSrc;

            if (target === 'modal-video') {
                const modal = document.getElementById(target);
                const video = modal.querySelector('video');
                const source = modal.querySelector('#modal-video-source');

                source.src = videoSrc;
                video.load();
                modal.classList.add('is-active');

                modal.querySelector('.modal-close').addEventListener('click', () => {
                    modal.classList.remove('is-active');
                    video.pause();
                });

                modal.querySelector('.modal-background').addEventListener('click', () => {
                    modal.classList.remove('is-active');
                    video.pause();
                });

                video.onended = () => {
                    modal.classList.remove('is-active');
                };
            } else {
                const modal = document.getElementById(target);
                modal.classList.add('is-active');
                modal.querySelector('.modal-close').addEventListener('click', () => {
                    modal.classList.remove('is-active');
                });
                modal.querySelector('.modal-background').addEventListener('click', () => {
                    modal.classList.remove('is-active');
                });
            }
        });
    });
});









    // Manejar la notificación de versión
    const versionItem = document.getElementById('version-item');
    const modalVersion = document.getElementById('modal-version');

    versionItem.addEventListener('click', () => {
        modalVersion.classList.add('is-active');
    });

    modalVersion.querySelector('.modal-close').addEventListener('click', () => {
        modalVersion.classList.remove('is-active');
    });

    modalVersion.querySelector('.modal-background').addEventListener('click', () => {
        modalVersion.classList.remove('is-active');
    });

    // Manejar el modal de ayuda
    const itemAyuda = document.getElementById('help-item');
    const modalAyuda = document.getElementById('modal-help');

    itemAyuda.addEventListener('click', () => {
        modalAyuda.classList.add('is-active');
    });

    modalAyuda.querySelector('.modal-close').addEventListener('click', () => {
        modalAyuda.classList.remove('is-active');
    });

    modalAyuda.querySelector('.modal-background').addEventListener('click', () => {
        modalAyuda.classList.remove('is-active');
    });
