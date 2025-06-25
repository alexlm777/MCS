const form = document.getElementById('mcsForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log('Datos enviados:', data);
  alert('Formulario enviado correctamente');
  form.reset();
});
