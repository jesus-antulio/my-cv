document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar AOS (para las animaciones visuales)
    AOS.init();

    // 2. Función del contador
    const animarContador = (elemento) => {
        const objetivo = +elemento.getAttribute('data-target');
        const duracion = 500; 
        let inicio = null;

        const paso = (timestamp) => {
            if (!inicio) inicio = timestamp;
            const progreso = Math.min((timestamp - inicio) / duracion, 1);
            const sufijo = elemento.getAttribute('data-suffix') || '';
            elemento.innerText = Math.floor(progreso * objetivo) + sufijo;
            if (progreso < 1) {
                window.requestAnimationFrame(paso);
            }
        };
        window.requestAnimationFrame(paso);
    };

    // 3. Configurar el observador de pantalla
    const opciones = {
        threshold: 0.5 // Se dispara cuando el 50% del número es visible
    };

    const observador = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContador(entry.target);
                observer.unobserve(entry.target); // Deja de observar para que no se repita
            }
        });
    }, opciones);

    // 4. Seleccionar y observar todos los contadores
    const misContadores = document.querySelectorAll('.counter');
    misContadores.forEach(contador => observador.observe(contador));
});