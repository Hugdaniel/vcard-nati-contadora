const CONFIG = {
    // 👤 Información Personal
    nombre: "Natalia Ramayo", 
    profesion: "Contadora Pública Nacional",
    slogan: "Claridad en tus números, tranquilidad para tu negocio.",
    email: "nataliaramayo32@gmail.com",
    whatsapp: "5491122532326", // Formato: código de país + código de área + número (sin el +)

    // 💰 Datos de Cobro (Para la función copiarCBU)
    cbu: "0000000000000000000000", // Los 22 dígitos
    alias: "ESTUDIO.CONTABLE.IA",

    // 🎙️ Configuración de Audios (Rutas a tus archivos)
    // Recordá que la lógica del script elegirá uno según la hora
    audio: "assets/audio-bienvenida.mp3", 
    audioNoDisponible: "assets/audio-no-disponible.mp3",
    audioLunes: "assets/audio-lunes.mp3",

    // 📊 Listado de Servicios (Para el Carrusel)
    servicios: [
        "Liquidación de Impuestos",
        "Monotributo y Autónomos",
        "Balances y Auditorías",
        "Asesoramiento Contable Integral",
        "Liquidación de Sueldos"
    ],

    // 💬 Mensajes Predefinidos para WhatsApp
    // El 'key' es lo que ve el usuario, el 'value' es lo que llega al celu de ella
    consultas: {
        "Monotributo": "Hola! Necesito consultarte por el Monotributo.",
        "Alta de Impuestos": "Hola! Me gustaría darme de alta en Ingresos Brutos.",
        "Pagos de VEP": "Hola! Tengo una duda sobre cómo pagar una boleta/VEP.",
        "Sueldos": "Hola! Necesito una liquidación de sueldos.",
        "Otra": "Hola! Te contacto por una consulta general."
    }
};