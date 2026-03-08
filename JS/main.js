$(document).ready(function () {

    /* ocultar mensaje de éxito al iniciar */
    $('#mensaje-ok').hide();

    /* ── FECHA Y HORA ──────────────────────────────── */
    function mostrarFecha() {
        var ahora = new Date();
        var dias   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
        var meses  = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                      'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

        var diaNom = dias[ahora.getDay()];
        var dia    = ahora.getDate();
        var mes    = meses[ahora.getMonth()];
        var anio   = ahora.getFullYear();

        var horas   = String(ahora.getHours()).padStart(2,'0');
        var minutos = String(ahora.getMinutes()).padStart(2,'0');
        var secs    = String(ahora.getSeconds()).padStart(2,'0');

        var cadena = diaNom + ', ' + dia + ' de ' + mes + ' de ' + anio +
                     ' &nbsp;|&nbsp; ' + horas + ':' + minutos + ':' + secs;

        $('#reloj').html(cadena);
    }

    if ($('#reloj').length) {
        mostrarFecha();
        setInterval(mostrarFecha, 1000);
    }

    /* ── BXSLIDER ──────────────────────────────────── */
    if ($('.galeria').length) {
        $('.galeria').bxSlider({
            auto: true,
            mode: 'fade',
            captions: true,
            slideWidth: 860,
            responsive: true,
            pager: true,
            controls: true,
            autoHover: true,
            pause: 4000,
            speed: 800
        });
    }

    /* ── VALIDACIÓN FORMULARIO CONTACTO ─────────────── */
    $('#form-contacto').on('submit', function (e) {

        e.preventDefault();
        var valido = true;

        /* limpiar errores anteriores */
        $('.error-msg').hide();
        $('input, textarea, select').removeClass('campo-error');

        /* Nombre */
        var nombre = $('#nombre').val().trim();
        if (nombre === '' || nombre.length < 3) {
            $('#error-nombre').show();
            $('#nombre').addClass('campo-error');
            valido = false;
        }

        /* Email */
        var email = $('#email').val().trim();
        var reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!reEmail.test(email)) {
            $('#error-email').show();
            $('#email').addClass('campo-error');
            valido = false;
        }

        /* Teléfono (opcional) */
        var tel = $('#telefono').val().trim();

        if (tel !== '') {
            var reTel = /^[\d\s\-\+\(\)]{7,15}$/;

            if (!reTel.test(tel)) {
                $('#error-telefono').show();
                $('#telefono').addClass('campo-error');
                valido = false;
            }
        }

        /* Asunto */
        if ($('#asunto').val() === '') {
            $('#error-asunto').show();
            $('#asunto').addClass('campo-error');
            valido = false;
        }

        /* Mensaje */
        var mensaje = $('#mensaje').val().trim();

        if (mensaje.length < 10) {
            $('#error-mensaje').show();
            $('#mensaje').addClass('campo-error');
            valido = false;
        }

        /* SI TODO ES VÁLIDO */
        if (valido) {

            /* mostrar mensaje bonito */
            $('#mensaje-ok').fadeIn();

            /* limpiar formulario */
            $('#form-contacto')[0].reset();

            /* scroll hacia el mensaje */
            $('html, body').animate({
                scrollTop: $('#mensaje-ok').offset().top - 100
            }, 500);
        }

    });

    /* ── BOTÓN IR ARRIBA ───────────────────────────── */
    $('.subir').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 700);
    });

});
