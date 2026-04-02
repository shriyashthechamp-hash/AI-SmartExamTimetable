/* ══════════════════════════════════════════════════
   SMART EXAM SCHEDULER — Application Logic
   ══════════════════════════════════════════════════ */

const state = {
  entries: [],
  schedule: [],
  validation: { conflicts: 0, roomViolations: 0, backToBack: 0 }
};

// ── DOM References ──
const form = document.getElementById('exam-form');
const generateBtn = document.getElementById('generate-btn');
const scheduleTable = document.getElementById('schedule-table');
const scheduleTbody = document.getElementById('schedule-tbody');
const tableEmpty = document.getElementById('table-empty');
const tableCount = document.getElementById('table-count');
const entryCountNum = document.getElementById('entry-count-number');
const validationSection = document.getElementById('validation-section');
const statusBadge = document.getElementById('app-status-badge');
const toastContainer = document.getElementById('toast-container');

// ── Toast System ──
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success'
    ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
  toast.innerHTML = `${icon} ${message}`;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 250);
  }, 2500);
}

// ── Add Entry ──
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const course = document.getElementById('course-name').value.trim();
  const roomId = document.getElementById('room-id').value.trim();
  const capacity = parseInt(document.getElementById('room-capacity').value);
  const timeSlot = document.getElementById('time-slot').value;

  if (!course || !roomId || !capacity || !timeSlot) {
    showToast('Please fill in all fields', 'error');
    return;
  }

  state.entries.push({ course, roomId, capacity, timeSlot });
  entryCountNum.textContent = state.entries.length;
  generateBtn.disabled = false;

  form.reset();
  showToast(`"${course}" added successfully`);

  // Update status badge
  statusBadge.className = 'status-badge status-active';
  statusBadge.innerHTML = '<span class="status-dot"></span> Active';
});

// ── Generate Schedule ──
generateBtn.addEventListener('click', () => {
  if (state.entries.length === 0) return;

  // Show loading state
  generateBtn.disabled = true;
  generateBtn.innerHTML = '<span class="spinner"></span> Generating...';

  // Simulate AI processing
  setTimeout(() => {
    generateSchedule();
    runValidation();

    // Restore button
    generateBtn.disabled = false;
    generateBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
      Generate Schedule
    `;

    showToast('Schedule generated successfully');
  }, 1200);
});

function generateSchedule() {
  // Simple scheduling: assign entries to schedule with slight optimization
  const timeSlots = ['09:00 - 10:30', '11:00 - 12:30', '13:00 - 14:30', '15:00 - 16:30', '17:00 - 18:30'];
  const rooms = [...new Set(state.entries.map(e => e.roomId))];

  state.schedule = state.entries.map((entry, i) => ({
    course: entry.course,
    room: entry.roomId,
    timeSlot: entry.timeSlot
  }));

  renderTable();
}

function renderTable() {
  tableEmpty.style.display = 'none';
  scheduleTable.style.display = 'table';
  scheduleTbody.innerHTML = '';

  state.schedule.forEach((item, index) => {
    const row = document.createElement('tr');
    row.style.animationDelay = `${index * 0.05}s`;
    row.innerHTML = `
      <td>${item.course}</td>
      <td><span style="display:inline-flex;align-items:center;gap:4px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>${item.room}</span></td>
      <td><span style="display:inline-flex;align-items:center;gap:4px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${item.timeSlot}</span></td>
    `;
    scheduleTbody.appendChild(row);
  });

  tableCount.textContent = `${state.schedule.length} items`;
}

// ── Validation ──
function runValidation() {
  // Detect time conflicts (same room, same time)
  let conflicts = 0;
  let roomViolations = 0;
  let backToBack = 0;

  const roomTimeMap = {};
  state.schedule.forEach(item => {
    const key = `${item.room}_${item.timeSlot}`;
    if (roomTimeMap[key]) {
      conflicts++;
    }
    roomTimeMap[key] = true;
  });

  // Simulate some room violations based on random capacity issues
  const entriesWithCapacity = state.entries.filter(e => e.capacity < 20);
  roomViolations = entriesWithCapacity.length;

  // Detect back-to-back (consecutive time slots for same room)
  const timeOrder = ['09:00 - 10:30', '11:00 - 12:30', '13:00 - 14:30', '15:00 - 16:30', '17:00 - 18:30'];
  const roomSlots = {};
  state.schedule.forEach(item => {
    if (!roomSlots[item.room]) roomSlots[item.room] = [];
    roomSlots[item.room].push(timeOrder.indexOf(item.timeSlot));
  });

  Object.values(roomSlots).forEach(slots => {
    slots.sort((a, b) => a - b);
    for (let i = 1; i < slots.length; i++) {
      if (slots[i] - slots[i-1] === 1) backToBack++;
    }
  });

  state.validation = { conflicts, roomViolations, backToBack };
  renderValidation();
}

function renderValidation() {
  validationSection.style.display = 'block';

  const { conflicts, roomViolations, backToBack } = state.validation;

  // Update values
  document.getElementById('conflict-count').textContent = conflicts;
  document.getElementById('room-violations').textContent = roomViolations;
  document.getElementById('backtoback-count').textContent = backToBack;

  // Update indicators
  updateMetricCard('metric-conflicts', 'conflict-indicator', conflicts);
  updateMetricCard('metric-rooms', 'room-indicator', roomViolations);
  updateMetricCard('metric-backtoback', 'backtoback-indicator', backToBack);

  // Overall status
  const totalIssues = conflicts + roomViolations + backToBack;
  const overallBadge = document.getElementById('overall-badge');
  const overallText = document.getElementById('overall-text');

  if (totalIssues === 0) {
    overallBadge.className = 'overall-badge good';
    overallBadge.querySelector('svg').innerHTML = '<polyline points="20 6 9 17 4 12"/>';
    overallText.textContent = 'Schedule Valid';
  } else {
    overallBadge.className = 'overall-badge bad';
    overallBadge.querySelector('svg').innerHTML = '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>';
    overallText.textContent = `Issues Detected (${totalIssues})`;
  }

  // Update header badge
  if (totalIssues === 0) {
    statusBadge.className = 'status-badge status-ready';
    statusBadge.innerHTML = '<span class="status-dot"></span> Valid';
  } else {
    statusBadge.className = 'status-badge status-active';
    statusBadge.innerHTML = '<span class="status-dot"></span> Issues';
  }
}

function updateMetricCard(cardId, indicatorId, value) {
  const card = document.getElementById(cardId);
  const indicator = document.getElementById(indicatorId);
  const iconWrap = card.querySelector('.metric-icon-wrap');

  if (value > 0) {
    indicator.className = 'metric-indicator bad';
    indicator.innerHTML = `<span class="indicator-dot"></span> ${value} issue${value > 1 ? 's' : ''} found`;
    iconWrap.className = 'metric-icon-wrap metric-icon-red';
  } else {
    indicator.className = 'metric-indicator good';
    indicator.innerHTML = '<span class="indicator-dot"></span> No issues';
    iconWrap.className = 'metric-icon-wrap metric-icon-green';
  }
}
