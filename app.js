document.querySelectorAll('input[type="range"]').forEach((slider) => {
  const valueLabel = document.getElementById(`${slider.id}-value`);
  const suffix = slider.dataset.suffix || '';

  const updateValue = () => {
    valueLabel.textContent = `${slider.value}${suffix}`;
  };

  slider.addEventListener('input', updateValue);
  updateValue();
});

let selectedCompanyId = null;

function formatCurrency(value) {
  return `$${value.toLocaleString('en-US')}`;
}

function fraudBadgeClass(level) {
  if (level === 'alta') return 'badge-danger';
  if (level === 'media') return 'badge-warning';
  return 'badge-ok';
}

function identityBadgeClass(signal) {
  return signal === 'alerta' ? 'badge-warning' : 'badge-ok';
}

function statusBadgeClass(status) {
  if (status === 'aprobado') return 'badge-ok';
  if (status === 'revision') return 'badge-warning';
  return 'badge-danger';
}

const STATUS_LABELS = {
  aprobado: 'Aprobado',
  revision: 'En revisión',
  rechazado: 'Rechazado',
};

function renderCompanyDetail(id) {
  const detail = document.getElementById('company-detail');
  if (!detail || typeof companies === 'undefined' || typeof getCurrentRules === 'undefined') return;

  const company = companies.find((c) => c.id === id);

  if (!company) {
    detail.innerHTML = `
      <div class="detail-empty">
        <p>Selecciona una empresa de la lista para ver su detalle.</p>
      </div>
    `;
    return;
  }

  const rules = getCurrentRules();
  const evaluation = evaluateCompany(company, rules);
  const explanation = generateExplanation(evaluation);

  const utilizationChipClass = company.utilization > rules.utilizacionMaxima ? 'badge-warning' : 'badge-ok';
  const variabilityChipClass = company.flow_variability > 30 ? 'badge-danger' : company.flow_variability > 15 ? 'badge-warning' : 'badge-ok';
  const paymentChipClass = company.payment_history >= 80 ? 'badge-ok' : company.payment_history >= 60 ? 'badge-warning' : 'badge-danger';
  const bureauChipClass = company.bureau_available ? 'badge-ok' : 'badge-warning';

  detail.innerHTML = `
    <div class="detail-header">
      <h3>${company.name}</h3>
      <span class="badge-pill ${statusBadgeClass(evaluation.status)}">${STATUS_LABELS[evaluation.status]}</span>
    </div>

    <div class="detail-highlights">
      <div class="detail-highlight">
        <span class="detail-label">Línea de crédito recomendada</span>
        <span class="detail-highlight-value">${formatCurrency(evaluation.limit)}</span>
      </div>
      <div class="detail-highlight">
        <span class="detail-label">Nivel de confianza</span>
        <span class="detail-highlight-value">${evaluation.confidence}%</span>
      </div>
    </div>

    <div class="detail-chips">
      <span class="badge-pill ${utilizationChipClass}">Utilización: ${company.utilization}%</span>
      <span class="badge-pill ${variabilityChipClass}">Variabilidad de flujo: ${company.flow_variability}%</span>
      <span class="badge-pill ${paymentChipClass}">Historial de pago: ${company.payment_history}</span>
      <span class="badge-pill ${identityBadgeClass(company.identity_signal)}">Identidad: ${company.identity_signal}</span>
      <span class="badge-pill ${fraudBadgeClass(company.fraud_alert)}">Fraude: ${company.fraud_alert}</span>
      <span class="badge-pill ${bureauChipClass}">Buró: ${company.bureau_available ? 'disponible' : 'no disponible'}</span>
    </div>

    <div class="detail-explanation">
      <span class="detail-label">Razón explicable</span>
      <p>${explanation}</p>
    </div>
  `;
}

function renderCompaniesTable() {
  const tbody = document.getElementById('companies-tbody');
  if (!tbody || typeof companies === 'undefined' || typeof getCurrentRules === 'undefined') return;

  const evaluations = evaluatePortfolio(companies, getCurrentRules());

  tbody.innerHTML = evaluations.map(({ company: c, status }) => `
    <tr
      data-id="${c.id}"
      class="company-row${c.id === selectedCompanyId ? ' active' : ''}"
      tabindex="0"
      aria-selected="${c.id === selectedCompanyId}"
    >
      <td class="company-name">${c.name}</td>
      <td>${c.months_active} m</td>
      <td>${c.utilization}%</td>
      <td><span class="badge-pill ${statusBadgeClass(status)}">${STATUS_LABELS[status]}</span></td>
    </tr>
  `).join('');
}

function selectCompanyRow(row) {
  row.parentElement.querySelectorAll('.company-row').forEach((r) => {
    r.classList.remove('active');
    r.setAttribute('aria-selected', 'false');
  });
  row.classList.add('active');
  row.setAttribute('aria-selected', 'true');

  selectedCompanyId = Number(row.dataset.id);
  renderCompanyDetail(selectedCompanyId);
}

const companiesTbody = document.getElementById('companies-tbody');
if (companiesTbody) {
  companiesTbody.addEventListener('click', (event) => {
    const row = event.target.closest('.company-row');
    if (row) selectCompanyRow(row);
  });

  companiesTbody.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const row = event.target.closest('.company-row');
    if (!row) return;
    event.preventDefault();
    selectCompanyRow(row);
  });
}

renderCompaniesTable();
renderCompanyDetail(selectedCompanyId);

function formatPercent(value) {
  return `${value.toFixed(1)}%`;
}

function renderMetrics() {
  if (typeof companies === 'undefined' || typeof getCurrentRules === 'undefined') return;

  const rules = getCurrentRules();
  const evaluations = evaluatePortfolio(companies, rules);
  const metrics = computePortfolioMetrics(evaluations);

  document.getElementById('metric-approval-rate').textContent = formatPercent(metrics.approvalRate);
  document.getElementById('metric-total-limit').textContent = formatCurrency(Math.round(metrics.totalLimit));
  document.getElementById('metric-expected-loss').textContent = formatCurrency(Math.round(metrics.expectedLoss));
  document.getElementById('metric-review-rate').textContent = formatPercent(metrics.reviewRate);
  document.getElementById('metric-avg-utilization').textContent = formatPercent(metrics.avgUtilization);
}

function refreshFromRules() {
  renderMetrics();
  renderCompaniesTable();
  renderCompanyDetail(selectedCompanyId);
}

document.querySelectorAll('#controls input, #controls select').forEach((control) => {
  control.addEventListener('input', refreshFromRules);
});

renderMetrics();
