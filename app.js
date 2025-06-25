const form = document.getElementById('mcsForm');
const recordsSection = document.getElementById('recordsSection');
const statsSection = document.getElementById('statsSection');
const recordsTableBody = document.querySelector('#recordsTable tbody');
const statsList = document.getElementById('statsList');
const showRecordsBtn = document.getElementById('showRecordsBtn');
const showStatsBtn = document.getElementById('showStatsBtn');

let records = [];

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  records.push(data);
  alert('Formulario enviado correctamente');
  form.reset();
  updateRecordsTable();
  updateStats();
});

showRecordsBtn.addEventListener('click', () => {
  recordsSection.classList.toggle('hidden');
  updateRecordsTable();
});

showStatsBtn.addEventListener('click', () => {
  statsSection.classList.toggle('hidden');
  updateStats();
});

function updateRecordsTable() {
  recordsTableBody.innerHTML = '';
  records.forEach((rec, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${rec.tipo_consulta}</td>
      <td>${rec.fecha}</td>
      <td>${rec.turnista}</td>
      <td>${rec.nombre_paciente}</td>
    `;
    recordsTableBody.appendChild(row);
  });
}

function updateStats() {
  const total = records.length;
  const countByType = records.reduce((acc, rec) => {
    acc[rec.tipo_consulta] = (acc[rec.tipo_consulta] || 0) + 1;
    return acc;
  }, {});

  statsList.innerHTML = `
    <li>Total de registros: ${total}</li>
    ${Object.entries(countByType)
      .map(([type, count]) => `<li>${type}: ${count}</li>`)
      .join('')}
  `;
}
