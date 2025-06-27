// app.js

const SCRIPT_URL      = 'https://script.google.com/macros/s/…/exec'; 
const form            = document.getElementById('mcsForm');
const recordsSection  = document.getElementById('recordsSection');
const statsSection    = document.getElementById('statsSection');
const recordsTableBody= document.querySelector('#recordsTable tbody');
const statsList       = document.getElementById('statsList');
const showRecordsBtn  = document.getElementById('showRecordsBtn');
const showStatsBtn    = document.getElementById('showStatsBtn');

// Envío de datos
form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    const resp = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    const json = await resp.json();
    if (json.result === 'ok') {
      alert('Formulario enviado correctamente');
      form.reset();
      await loadAndRender();
    } else {
      alert('Error al enviar datos: ' + json.message);
    }
  } catch (err) {
    console.error(err);
    alert('No se pudo conectar con el servidor');
  }
});

// Mostrar/ocultar y render
showRecordsBtn.addEventListener('click', async () => {
  recordsSection.classList.toggle('hidden');
  if (!recordsSection.classList.contains('hidden')) await renderRecords();
});
showStatsBtn.addEventListener('click', async () => {
  statsSection.classList.toggle('hidden');
  if (!statsSection.classList.contains('hidden')) await renderStats();
});

let _records = [];
async function loadAndRender() {
  try {
    const resp = await fetch(SCRIPT_URL);
    _records = (await resp.json()).data || [];
  } catch {
    _records = [];
  }
  await renderRecords();
  await renderStats();
}

async function renderRecords() {
  recordsTableBody.innerHTML = '';
  _records.forEach((rec, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${i+1}</td>
      <td>${rec.tipo_consulta}</td>
      <td>${rec.fecha}</td>
      <td>${rec.turnista}</td>
      <td>${rec.nombre_paciente}</td>
    `;
    recordsTableBody.appendChild(tr);
  });
}

async function renderStats() {
  const total = _records.length;
  const counts = _records.reduce((acc, r) => {
    acc[r.tipo_consulta] = (acc[r.tipo_consulta]||0)+1;
    return acc;
  }, {});
  statsList.innerHTML = `
    <li>Total de registros: ${total}</li>
    ${Object.entries(counts).map(([t,c]) => `<li>${t}: ${c}</li>`).join('')}
  `;
}
