// KIKO LAREO® — interacciones de la portada

// Tarjetas con historia: el botón "HISTORIA ↻" gira la tarjeta (foto delante,
// relato detrás), igual que en el prototipo de Claude Design.
document.querySelectorAll('.flip-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.flip').classList.toggle('flipped');
  });
});

// Formulario de contacto: sin backend todavía, abre el cliente de correo
// con el mensaje ya redactado. Sustituir por un servicio de formularios
// (Formspree, Netlify Forms…) cuando haya hosting elegido.
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Proyecto — ${data.get('nombre')}`);
    const body = encodeURIComponent(
      `${data.get('mensaje')}\n\n— ${data.get('nombre')} (${data.get('email')})`
    );
    window.location.href = `mailto:hola@kikolareo.com?subject=${subject}&body=${body}`;
  });
}
