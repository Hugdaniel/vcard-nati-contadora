// --- 1. LÓGICA DEL CARRUSEL (SERVICIOS) ---
let indiceServicio = 0;

function rotarServicios() {
    const textoElemento = document.getElementById('carrusel-texto');
    if (!textoElemento) return;

    // Aplicamos fade-out (transparencia)
    textoElemento.style.opacity = 0;

    setTimeout(() => {
        // Cambiamos el texto usando los datos de tu config.js
        textoElemento.textContent = CONFIG.servicios[indiceServicio];
        // Aplicamos fade-in
        textoElemento.style.opacity = 1;
        
        indiceServicio = (indiceServicio + 1) % CONFIG.servicios.length;
    }, 500); // Medio segundo para la transición
}

// Iniciar el carrusel cada 3 segundos
setInterval(rotarServicios, 2000);


// --- 2. LÓGICA DEL AUDIO PLAYER ---
const audioGuia = new Audio(CONFIG.audio);

function toggleAudio() {
    const playIcon = document.getElementById('play-icon');
    const statusText = document.getElementById('audio-status');
    const visualizer = document.getElementById('audio-visualizer');

    // Si es la primera vez que hace clic, creamos el objeto Audio con la ruta correcta
    if (!window.miAudioActual) {
        const rutaCorrecta = obtenerRutaAudioSegunHora();
        window.miAudioActual = new Audio(rutaCorrecta);
        
        // Configuración para que el botón vuelva a "Play" cuando termine el audio
        window.miAudioActual.onended = () => {
            playIcon.classList.replace('fa-pause', 'fa-play');
            statusText.textContent = "Escuchar presentación";
            visualizer.classList.remove('playing');
            window.miAudioActual = null; // Limpiamos para que la próxima vez chequee la hora de nuevo
        };
    }

    // Lógica de Play/Pausa
    if (window.miAudioActual.paused) {
        window.miAudioActual.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
        statusText.textContent = "Reproduciendo...";
        visualizer.classList.add('playing');
    } else {
        window.miAudioActual.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
        statusText.textContent = "Escuchar presentación";
        visualizer.classList.remove('playing');
    }
}

audioGuia.onended = () => {
    document.getElementById('play-icon').classList.replace('fa-pause', 'fa-play');
    document.getElementById('audio-status').textContent = "Escuchar presentación";
    document.getElementById('audio-visualizer').classList.remove('playing');
};


// --- 3. LÓGICA DE COPIADO (CBU) ---
function copiarCBU() {
    navigator.clipboard.writeText(CONFIG.cbu).then(() => {
        // Usamos una alerta simple o podés mejorarla con un Toast
        alert("CBU Copiado: " + CONFIG.cbu);
    });
}


// --- 4. GENERADOR DE CONTACTO (VCF) ---
function descargarVCF() {
    // Creamos el contenido del archivo de contacto
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${CONFIG.nombre}
ORG:${CONFIG.profesion}
TEL;TYPE=CELL:${CONFIG.whatsapp}
EMAIL:${CONFIG.email}
NOTE:Slogan: ${CONFIG.slogan}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${CONFIG.nombre}.vcf`;
    a.click();
}

// Inicializar el primer texto del carrusel al cargar la página
window.onload = () => {
    const textoElemento = document.getElementById('carrusel-texto');
    if (textoElemento) textoElemento.textContent = CONFIG.servicios[0];
};

function copiarCBU() {
    // Verificamos que CONFIG exista para que no tire error
    if (typeof CONFIG !== 'undefined' && CONFIG.cbu) {
        navigator.clipboard.writeText(CONFIG.cbu).then(() => {
            const toast = document.getElementById("toast");
            
            if (toast) { // Verificamos que el div exista en el HTML
                toast.textContent = "✅ CBU Copiado con éxito";
                toast.classList.add("show"); // Usar classList es más seguro
                
                setTimeout(() => { 
                    toast.classList.remove("show"); 
                }, 3000);
            } else {
                // Si olvidaste el HTML, al menos te avisa por consola
                console.error("No se encontró el elemento #toast en el HTML");
            }
        });
    }
}

function enviarWhatsappPersonalizado() {
    const selector = document.getElementById('tipo-consulta');
    const opcionSeleccionada = selector.value;
    
    // Obtenemos el texto real del objeto CONFIG usando la opción del selector
    const mensajeTexto = CONFIG.consultas[opcionSeleccionada] || "Hola, vengo de tu vCard.";
    const mensajeURL = encodeURIComponent(mensajeTexto);
    
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${mensajeURL}`, '_blank');
}

function obtenerRutaAudioSegunHora() {
    const ahora = new Date();
    const hora = ahora.getHours();
    const dia = ahora.getDay(); // 0: Domingo, 1: Lunes... 6: Sábado

    // 1. FIN DE SEMANA (Sábado desde las 13hs o Domingo todo el día)
    if (dia === 0 || (dia === 6 && hora >= 13)) {
        return "assets/audio-lunes.mp3";
    }

    // 2. FUERA DE HORARIO SEMANAL (Noche: 19hs a 08hs)
    if (hora >= 19 || hora < 8) {
        return "assets/audio-no-disponible.mp3";
    }

    // 3. HORARIO COMERCIAL (Resto del tiempo)
    return "assets/audio-bienvenida.mp3";
}