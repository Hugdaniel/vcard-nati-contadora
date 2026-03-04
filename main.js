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
setInterval(rotarServicios, 3000);


// --- 2. LÓGICA DEL AUDIO PLAYER ---
const audioGuia = new Audio(CONFIG.audio);

function toggleAudio() {
    const playIcon = document.getElementById('play-icon');
    const statusText = document.getElementById('audio-status');
    const visualizer = document.getElementById('audio-visualizer');

    if (audioGuia.paused) {
        audioGuia.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
        statusText.textContent = "Reproduciendo...";
        visualizer.classList.add('playing');
    } else {
        audioGuia.pause();
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