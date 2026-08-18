// Motor de reglas: evalúa cada empresa contra las reglas activas del panel
// y agrega los resultados en las métricas de cartera.

const LGD = 0.45; // pérdida dada la mora, supuesto estándar (45%)
const BASE_LIMIT_MULTIPLIER = 0.5; // cupo = 50% del ingreso mensual declarado
const REDUCED_LIMIT_MULTIPLIER = 0.5; // penalización cuando se "reduce línea"

function getCurrentRules() {
  return {
    utilizacionMaxima: Number(document.getElementById('utilizacion-maxima').value),
    diasMora: Number(document.getElementById('dias-mora').value),
    concentracionGasto: Number(document.getElementById('concentracion-gasto').value),
    antiguedadMinima: Number(document.getElementById('antiguedad-minima').value),
    accionFraude: document.getElementById('accion-fraude').value,
    tratamientoInfoIncompleta: document.getElementById('info-incompleta').value,
  };
}

// Combina las señales de riesgo de una empresa en una probabilidad de
// incumplimiento (PD) aproximada, entre 2% y 32%.
function estimatePd(company) {
  const riskScore =
    0.25 * (1 - company.payment_history / 100) +
    0.20 * (company.days_late / 38) +
    0.15 * (company.utilization / 100) +
    0.15 * (company.concentration / 100) +
    0.10 * (company.flow_variability / 50) +
    0.10 * (company.fraud_alert === 'alta' ? 1 : company.fraud_alert === 'media' ? 0.5 : 0) +
    0.05 * (company.identity_signal === 'alerta' ? 1 : 0);

  return 0.02 + riskScore * 0.30;
}

function evaluateCompany(company, rules) {
  let status = 'aprobado';
  let limitMultiplier = 1;

  const escalate = (level) => {
    if (level === 'rechazado') status = 'rechazado';
    else if (level === 'revision' && status !== 'rechazado') status = 'revision';
  };

  if (company.months_active < rules.antiguedadMinima) {
    escalate('rechazado');
  }

  if (company.fraud_alert !== 'ninguna') {
    if (rules.accionFraude === 'bloquear') escalate('rechazado');
    else if (rules.accionFraude === 'verificacion') escalate('revision');
    else if (rules.accionFraude === 'revision') escalate('revision');
    else if (rules.accionFraude === 'reducir') limitMultiplier = Math.min(limitMultiplier, REDUCED_LIMIT_MULTIPLIER);
  }

  if (!company.bureau_available) {
    if (rules.tratamientoInfoIncompleta === 'rechazar') escalate('rechazado');
    else if (rules.tratamientoInfoIncompleta === 'solicitar-info') escalate('revision');
    else if (rules.tratamientoInfoIncompleta === 'revision-manual') escalate('revision');
    else if (rules.tratamientoInfoIncompleta === 'limite-reducido') limitMultiplier = Math.min(limitMultiplier, REDUCED_LIMIT_MULTIPLIER);
  }

  if (company.utilization > rules.utilizacionMaxima) escalate('revision');
  if (company.concentration > rules.concentracionGasto) escalate('revision');
  if (company.days_late > rules.diasMora) escalate('rechazado');

  const limit = status === 'rechazado'
    ? 0
    : Math.round(company.monthly_revenue * BASE_LIMIT_MULTIPLIER * limitMultiplier);

  const pd = estimatePd(company);
  const exposure = status === 'aprobado' ? limit * (company.utilization / 100) : 0;
  const expectedLoss = exposure * pd * LGD;

  return { company, status, limit, pd, expectedLoss };
}

function evaluatePortfolio(companyList, rules) {
  return companyList.map((company) => evaluateCompany(company, rules));
}

function computePortfolioMetrics(evaluations) {
  const total = evaluations.length;
  const approved = evaluations.filter((e) => e.status === 'aprobado');
  const inReview = evaluations.filter((e) => e.status === 'revision');

  const totalLimit = approved.reduce((sum, e) => sum + e.limit, 0);
  const totalExpectedLoss = evaluations.reduce((sum, e) => sum + e.expectedLoss, 0);
  const avgUtilization = approved.length
    ? approved.reduce((sum, e) => sum + e.company.utilization, 0) / approved.length
    : 0;

  return {
    approvalRate: total ? (approved.length / total) * 100 : 0,
    reviewRate: total ? (inReview.length / total) * 100 : 0,
    totalLimit,
    expectedLoss: totalExpectedLoss,
    avgUtilization,
  };
}
