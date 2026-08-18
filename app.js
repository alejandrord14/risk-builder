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

function renderCompanyDetail(id) {
  const detail = document.getElementById('company-detail');
  if (!detail || typeof companies === 'undefined') return;

  const company = companies.find((c) => c.id === id);

  if (!company) {
    detail.innerHTML = `
      <div class="detail-empty">
        <p>Selecciona una empresa de la lista para ver su detalle.</p>
      </div>
    `;
    return;
  }

  detail.innerHTML = `
    <div class="detail-header">
      <h3>${company.name}</h3>
      <span class="badge-pill ${identityBadgeClass(company.identity_signal)}">Identidad: ${company.identity_signal}</span>
    </div>
    <div class="detail-stats">
      <div class="detail-stat">
        <span class="detail-label">Antigüedad</span>
        <span class="detail-value">${company.months_active} meses</span>
      </div>
      <div class="detail-stat">
        <span class="detail-label">Ingreso mensual</span>
        <span class="detail-value">${formatCurrency(company.monthly_revenue)}</span>
      </div>
      <div class="detail-stat">
        <span class="detail-label">Variabilidad de flujo</span>
        <span class="detail-value">${company.flow_variability}%</span>
      </div>
      <div class="detail-stat">
        <span class="detail-label">Utilización</span>
        <span class="detail-value">${company.utilization}%</span>
      </div>
      <div class="detail-stat">
        <span class="detail-label">Historial de pago</span>
        <span class="detail-value">${company.payment_history}</span>
      </div>
      <div class="detail-stat">
        <span class="detail-label">Días de mora</span>
        <span class="detail-value">${company.days_late}</span>
      </div>
      <div class="detail-stat">
        <span class="detail-label">Concentración</span>
        <span class="detail-value">${company.concentration}%</span>
      </div>
      <div class="detail-stat">
        <span class="detail-label">Buró disponible</span>
        <span class="detail-value">${company.bureau_available ? 'Sí' : 'No'}</span>
      </div>
      <div class="detail-stat">
        <span class="detail-label">Alerta de fraude</span>
        <span class="badge-pill ${fraudBadgeClass(company.fraud_alert)}">${company.fraud_alert}</span>
      </div>
    </div>
  `;
}

function renderCompaniesTable() {
  const tbody = document.getElementById('companies-tbody');
  if (!tbody || typeof companies === 'undefined') return;

  tbody.innerHTML = companies.map((c) => `
    <tr data-id="${c.id}" class="company-row">
      <td class="company-name">${c.name}</td>
      <td>${c.months_active} m</td>
      <td>${c.utilization}%</td>
    </tr>
  `).join('');

  tbody.addEventListener('click', (event) => {
    const row = event.target.closest('.company-row');
    if (!row) return;

    tbody.querySelectorAll('.company-row').forEach((r) => r.classList.remove('active'));
    row.classList.add('active');

    selectedCompanyId = Number(row.dataset.id);
    renderCompanyDetail(selectedCompanyId);
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

document.querySelectorAll('#controls input, #controls select').forEach((control) => {
  control.addEventListener('input', renderMetrics);
});

renderMetrics();
