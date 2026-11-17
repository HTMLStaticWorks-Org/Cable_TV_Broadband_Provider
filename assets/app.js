// ConnectWave Main JavaScript Application

const root = document.documentElement;

// Theme Initialization & Toggling
const savedTheme = localStorage.getItem('ctb-theme');
if (savedTheme) {
  root.dataset.theme = savedTheme;
}
function toggleTheme() {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('ctb-theme', next);
  showToast(`Switched to ${next} mode`);
}

// RTL Initialization & Toggling
root.dir = localStorage.getItem('ctb-dir') || 'ltr';
function toggleRTL() {
  const next = root.dir === 'rtl' ? 'ltr' : 'rtl';
  root.dir = next;
  localStorage.setItem('ctb-dir', next);
  showToast(`Text direction: ${next.toUpperCase()}`);
}

// Toast Notification Utility
function showToast(message, duration = 3000) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// Password Eye Toggle Function
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';

  if (isPass) {
    // Eye off icon (Slash across eye)
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    `;
    btn.setAttribute('aria-label', 'Hide password');
    showToast('Password visible');
  } else {
    // Normal Eye icon
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    `;
    btn.setAttribute('aria-label', 'Show password');
    showToast('Password hidden');
  }
}

// Generic Form Notice Helper
function showNotice(form, msg, isError = false) {
  const n = form.querySelector('.notice');
  if (n) {
    n.textContent = msg;
    n.style.display = 'block';
    n.style.borderColor = isError ? 'var(--danger)' : 'rgba(13, 148, 136, 0.4)';
    n.style.background = isError ? 'rgba(220, 38, 38, 0.12)' : 'var(--accent-light)';
  }
}

// Plan Billing Cycle Switcher (Monthly / Annual)
function setBillingCycle(cycle) {
  const buttons = document.querySelectorAll('.plan-switch-btn');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cycle === cycle);
  });

  const cards = document.querySelectorAll('[data-monthly-price]');
  cards.forEach(card => {
    const monthly = parseInt(card.dataset.monthlyPrice, 10);
    const annualMonthly = Math.round(monthly * 0.85); // 15% discount
    const priceEl = card.querySelector('.price');
    if (!priceEl) return;

    if (cycle === 'annual') {
      priceEl.innerHTML = `₹${annualMonthly.toLocaleString('en-IN')}<small> / month* (Billed ₹${(annualMonthly * 12).toLocaleString('en-IN')}/yr)</small>`;
    } else {
      priceEl.innerHTML = `₹${monthly.toLocaleString('en-IN')}<small> / month*</small>`;
    }
  });
  showToast(cycle === 'annual' ? 'Applied 15% Annual Discount!' : 'Showing standard monthly rates');
}

// Plans Filter Category
function filterPlans(cat) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => b.classList.toggle('active', b.dataset.filter === cat));

  const items = document.querySelectorAll('.plan-item');
  items.forEach(item => {
    if (cat === 'all' || item.dataset.category === cat) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Coverage Checker
const coverageData = {
  '110001': { area: 'Connaught Place / Central', status: 'ready', speed: 'Up to 1 Gbps', type: 'Pure FTTH Fiber' },
  '560001': { area: 'Bangalore Central / MG Road', status: 'ready', speed: 'Up to 1 Gbps', type: 'Gigabit Fiber & Cable TV' },
  '400001': { area: 'Fort / South Mumbai', status: 'ready', speed: 'Up to 1 Gbps', type: 'Ultra Fiber + 4K Cable' },
  '600001': { area: 'Chennai North / George Town', status: 'ready', speed: 'Up to 500 Mbps', type: 'Fiber Optic Broadband' },
  '500081': { area: 'HITEC City / Madhapur', status: 'ready', speed: 'Up to 1 Gbps', type: 'Next-Gen FTTH 10G Ready' },
  '380001': { area: 'Ahmedabad Central', status: 'expanding', speed: 'Expanding Soon', type: 'Under Rollout Q1 2027' }
};

function checkCoverage(inputQuery) {
  const query = (inputQuery || (document.getElementById('coverageInput') ? document.getElementById('coverageInput').value : '')).trim();
  const resultBox = document.getElementById('coverageResult');
  if (!resultBox) return;

  if (!query) {
    showToast('Please enter a PIN code or area name');
    return;
  }

  const match = coverageData[query] || (query.length === 6 ? { area: `Postal Zone ${query}`, status: 'ready', speed: 'Up to 1 Gbps', type: 'ConnectWave Fiber Ready' } : null);

  if (match && match.status === 'ready') {
    resultBox.className = 'coverage-result available';
    resultBox.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:12px">
        <span style="font-size:24px">🎉</span>
        <div>
          <h3 style="margin:0 0 4px;color:var(--accent)">Great news! Gigabit Fiber is LIVE in ${match.area}</h3>
          <p style="margin:0 0 10px;color:var(--muted)">Your address is verified for <strong>${match.speed}</strong> with ${match.type}. Zero installation fee applies this month.</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <a href="plans.html" class="btn small">View Available Plans</a>
            <a href="signup.html?pincode=${encodeURIComponent(query)}" class="btn secondary small">Book Free Installation</a>
          </div>
        </div>
      </div>
    `;
  } else if (match && match.status === 'expanding') {
    resultBox.className = 'coverage-result unavailable';
    resultBox.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:12px">
        <span style="font-size:24px">🚧</span>
        <div>
          <h3 style="margin:0 0 4px;color:var(--warning)">Rollout In Progress in ${match.area}</h3>
          <p style="margin:0 0 10px;color:var(--muted)">Our underground fiber ring is currently being laid here. Estimated ready date: Q1 2027.</p>
          <button class="btn secondary small" onclick="openCoveragePrebook('${match.area}')">Pre-Register for Early Bird Offer</button>
        </div>
      </div>
    `;
  } else {
    resultBox.className = 'coverage-result available';
    resultBox.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:12px">
        <span style="font-size:24px">📍</span>
        <div>
          <h3 style="margin:0 0 4px;color:var(--accent)">Fiber & Cable TV Coverage is Available in "${query}"</h3>
          <p style="margin:0 0 10px;color:var(--muted)">ConnectWave covers this zone with reliable fiber broadband up to 500 Mbps and 200+ HD channels.</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <a href="plans.html" class="btn small">Compare Packages</a>
            <a href="signup.html" class="btn secondary small">Request New Line</a>
          </div>
        </div>
      </div>
    `;
  }
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function selectAreaChip(code) {
  const input = document.getElementById('coverageInput');
  if (input) {
    input.value = code;
    checkCoverage(code);
  }
}

// Quick Demo Login for Subscriber Portal
function quickDemoLogin() {
  const emailInput = document.getElementById('loginIdentifier');
  const passInput = document.getElementById('loginPassword');
  if (emailInput && passInput) {
    emailInput.value = 'CW-984210';
    passInput.value = 'Subscriber@2026';
    showToast('Demo Subscriber credentials auto-filled! Logging in...');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 600);
  } else {
    window.location.href = 'dashboard.html';
  }
}

// ============================================================
// SUBSCRIBER DASHBOARD LOGIC
// ============================================================

function switchDashTab(tabId) {
  const buttons = document.querySelectorAll('.dash-tab-btn');
  const sidebarButtons = document.querySelectorAll('.dash-sidebar-item');
  const panels = document.querySelectorAll('.dash-panel');

  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  sidebarButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  panels.forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${tabId}`);
  });

  // Close mobile sidebar if open
  const sidebar = document.getElementById('dashSidebar');
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openPayModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.add('active');
}

function closePayModal() {
  const modal = document.getElementById('paymentModal');
  if (modal) modal.classList.remove('active');
}

let selectedPaymentMethod = 'UPI';
function selectPaymentMethod(method, btn) {
  selectedPaymentMethod = method;
  document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('selected'));
  if (btn) btn.classList.add('selected');

  const detailBox = document.getElementById('payMethodDetails');
  if (detailBox) {
    if (method === 'UPI') {
      detailBox.innerHTML = `
        <div class="field">
          <label>Enter UPI ID (VPA)</label>
          <div class="input-with-icon">
            <span class="input-icon-left">📱</span>
            <input type="text" placeholder="alex@okhdfcbank or 984210xxxx@paytm" value="alexmorgan@okaxis" required>
          </div>
        </div>
        <div style="font-size:12px;color:var(--muted)">Supports Google Pay, PhonePe, Paytm, BHIM, and Cred UPI.</div>
      `;
    } else if (method === 'Card') {
      detailBox.innerHTML = `
        <div class="field">
          <label>Card Number</label>
          <div class="input-with-icon">
            <span class="input-icon-left">💳</span>
            <input type="text" placeholder="4111 2222 3333 4444" value="4532 •••• •••• 8821">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="field"><label>Expiry</label><input type="text" placeholder="MM/YY" value="09/29"></div>
          <div class="field"><label>CVV</label><input type="password" placeholder="•••" value="123"></div>
        </div>
      `;
    } else {
      detailBox.innerHTML = `
        <div class="field">
          <label>Select Bank</label>
          <div class="input-with-icon">
            <span class="input-icon-left">🏛️</span>
            <select><option>HDFC Bank</option><option>State Bank of India</option><option>ICICI Bank</option><option>Axis Bank</option></select>
          </div>
        </div>
      `;
    }
  }
}

function processBillPayment(e) {
  if (e) e.preventDefault();
  const payBtn = document.getElementById('confirmPayBtn');
  if (payBtn) {
    payBtn.disabled = true;
    payBtn.textContent = 'Processing Payment... ⏳';
  }

  setTimeout(() => {
    closePayModal();
    if (payBtn) {
      payBtn.disabled = false;
      payBtn.textContent = 'Confirm & Pay ₹799.00';
    }

    const billValueEl = document.getElementById('statCurrentBill');
    const billBadgeEl = document.getElementById('statBillBadge');
    const payNowBtn = document.getElementById('cardPayBtn');

    if (billValueEl) billValueEl.textContent = '₹0.00';
    if (billBadgeEl) {
      billBadgeEl.className = 'badge badge-success';
      billBadgeEl.textContent = '● All Clear / Paid';
    }
    if (payNowBtn) {
      payNowBtn.textContent = '✓ Paid for Nov';
      payNowBtn.classList.remove('btn');
      payNowBtn.classList.add('btn', 'secondary');
      payNowBtn.disabled = true;
    }

    const tableBody = document.getElementById('invoiceTableBody');
    if (tableBody) {
      const now = new Date();
      const invoiceRow = document.createElement('tr');
      invoiceRow.innerHTML = `
        <td><strong>INV-2026-${Math.floor(1000 + Math.random() * 9000)}</strong></td>
        <td>Nov 01 - Nov 30, 2026</td>
        <td>₹799.00</td>
        <td>${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
        <td><span class="badge badge-success">● Paid (${selectedPaymentMethod})</span></td>
        <td><button class="btn secondary small" onclick="downloadInvoice('INV-2026-NOV')">Receipt 📄</button></td>
      `;
      tableBody.insertBefore(invoiceRow, tableBody.firstChild);
    }

    showToast('Payment of ₹799.00 successful! Receipt generated.');
  }, 1200);
}

function downloadInvoice(id) {
  showToast(`Downloading receipt ${id}.pdf ...`);
}

// Interactive Complaints Management
const DEFAULT_COMPLAINTS = [
  {
    id: 'CW-TKT-9214',
    category: 'Wi-Fi Speed Optimization',
    status: 'In Progress',
    statusClass: 'badge-warning',
    step: 2,
    date: '04 Nov 2026',
    desc: 'Intermittent signal drops on 5GHz Wi-Fi band in bedroom. Field engineer assigned.'
  },
  {
    id: 'CW-TKT-8410',
    category: 'Cable TV HD Channels',
    status: 'Resolved',
    statusClass: 'badge-success',
    step: 3,
    date: '28 Oct 2026',
    desc: 'Resolved set-top box smart card authorization for Sports HD channel bundle.'
  }
];

function getStoredComplaints() {
  const saved = localStorage.getItem('cw_subscriber_complaints');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { }
  }
  return DEFAULT_COMPLAINTS;
}

function saveComplaints(complaints) {
  localStorage.setItem('cw_subscriber_complaints', JSON.stringify(complaints));
}

function renderComplaints() {
  const container = document.getElementById('complaintsListContainer');
  if (!container) return;

  const complaints = getStoredComplaints();
  const activeCount = complaints.filter(c => c.status !== 'Resolved').length;
  const countEl = document.getElementById('statOpenTickets');
  if (countEl) countEl.textContent = activeCount;

  if (complaints.length === 0) {
    container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:24px">No complaints found. Your connection is running smoothly!</p>';
    return;
  }

  container.innerHTML = complaints.map(c => `
    <article class="ticket-card" style="background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:22px;margin-bottom:16px;box-shadow:var(--shadow-sm)">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
        <div>
          <span style="font-size:13px;color:var(--muted);font-weight:750">${c.id}</span>
          <h3 style="margin:4px 0 0;font-size:17px;color:var(--text)">${c.category}</h3>
        </div>
        <div style="text-align:right">
          <span class="badge ${c.statusClass || 'badge-warning'}">${c.status}</span>
          <div style="font-size:12px;color:var(--muted);margin-top:4px">Logged on: ${c.date}</div>
        </div>
      </div>
      <p style="margin:0 0 12px;color:var(--muted);font-size:14px">${c.desc}</p>
      
      <div style="display:flex;align-items:center;margin:18px 0 6px;position:relative">
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;position:relative;font-size:12px;color:var(--muted)">
          <div style="width:26px;height:26px;border-radius:50%;background:var(--accent);color:white;display:grid;place-items:center;font-weight:750;margin-bottom:4px">✓</div>
          <span>Logged</span>
        </div>
        <div style="height:3px;background:var(--accent);flex:1;margin-bottom:16px"></div>
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;position:relative;font-size:12px;color:var(--muted)">
          <div style="width:26px;height:26px;border-radius:50%;background:${c.step >= 2 ? (c.step === 2 ? 'var(--primary)' : 'var(--accent)') : 'var(--surface-alt)'};color:white;display:grid;place-items:center;font-weight:750;margin-bottom:4px">${c.step > 2 ? '✓' : '2'}</div>
          <span style="${c.step === 2 ? 'color:var(--primary);font-weight:750' : ''}">Assigned</span>
        </div>
        <div style="height:3px;background:${c.step >= 3 ? 'var(--accent)' : 'var(--line)'};flex:1;margin-bottom:16px"></div>
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;position:relative;font-size:12px;color:var(--muted)">
          <div style="width:26px;height:26px;border-radius:50%;background:${c.step >= 3 ? 'var(--accent)' : 'var(--surface-alt)'};color:${c.step >= 3 ? 'white' : 'var(--muted)'};border:2px solid ${c.step >= 3 ? 'var(--accent)' : 'var(--line)'};display:grid;place-items:center;font-weight:750;margin-bottom:4px">${c.step >= 3 ? '✓' : '3'}</div>
          <span style="${c.step >= 3 ? 'color:var(--accent);font-weight:750' : ''}">Resolved</span>
        </div>
      </div>
    </article>
  `).join('');
}

function submitNewComplaint(e) {
  e.preventDefault();
  const form = e.target;
  const category = form.querySelector('[name="category"]').value;
  const priority = form.querySelector('[name="priority"]').value;
  const desc = form.querySelector('[name="description"]').value;
  const slot = form.querySelector('[name="slot"]').value;

  const newTicket = {
    id: `CW-TKT-${Math.floor(10000 + Math.random() * 90000)}`,
    category: category,
    status: 'In Progress',
    statusClass: 'badge-warning',
    step: 2,
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    desc: `${desc} (Priority: ${priority}, Preferred slot: ${slot})`
  };

  const complaints = getStoredComplaints();
  complaints.unshift(newTicket);
  saveComplaints(complaints);
  renderComplaints();

  form.reset();
  showToast(`Ticket ${newTicket.id} registered! Technician will contact you.`);
  switchDashTab('complaints');
}

// Live Speed Test Simulation
let isRunningSpeedTest = false;
function runSpeedTest() {
  if (isRunningSpeedTest) return;
  isRunningSpeedTest = true;

  const btn = document.getElementById('runSpeedBtn');
  const speedDisplay = document.getElementById('speedValue');
  const pingDisplay = document.getElementById('pingValue');
  const uploadDisplay = document.getElementById('uploadValue');

  if (btn) btn.textContent = 'Testing Network... ⚡';

  let current = 0;
  const target = 98.4;
  const interval = setInterval(() => {
    current += 3.8;
    if (speedDisplay) speedDisplay.textContent = current.toFixed(1);

    if (current >= target) {
      clearInterval(interval);
      if (speedDisplay) speedDisplay.textContent = target.toFixed(1);
      if (pingDisplay) pingDisplay.textContent = '7 ms';
      if (uploadDisplay) uploadDisplay.textContent = '96.8 Mbps';
      if (btn) {
        btn.textContent = 'Run Speed Test Again';
        btn.disabled = false;
      }
      isRunningSpeedTest = false;
      showToast('Speed Test complete: 98.4 Mbps Download / 96.8 Mbps Upload');
    }
  }, 60);
}

// Global Demo Form Handler
document.addEventListener('submit', e => {
  const f = e.target;
  if (f.matches('[data-demo-form]')) {
    e.preventDefault();
    if (!f.reportValidity()) return;

    if (f.id === 'subscriberLoginForm') {
      showToast('Login successful! Redirecting to Subscriber Dashboard...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 700);
      return;
    }

    showNotice(f, 'Success! Request submitted. In production, this connects to your CRM / billing gateway.');
    showToast('Success! Request received.');
    f.reset();
  }
});

// Mobile Hamburger Menu Toggle
function toggleMobileMenu() {
  const navlinks = document.querySelector('.navlinks');
  const btn = document.querySelector('.hamburger-btn');
  if (!navlinks) return;
  const isOpen = navlinks.classList.toggle('open');
  if (btn) {
    btn.innerHTML = isOpen ? '✕' : '☰';
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
}

// Dashboard Sidebar Toggle (Mobile / Tablet)
function toggleDashSidebar() {
  const sidebar = document.getElementById('dashSidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

// Back to Top Functionality
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const btt = document.getElementById('backToTop');
  if (btt) {
    if (window.scrollY > 300) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderComplaints();

  // Close mobile nav when clicking outside or clicking link
  document.addEventListener('click', (e) => {
    const navlinks = document.querySelector('.navlinks');
    const btn = document.querySelector('.hamburger-btn');
    if (navlinks && navlinks.classList.contains('open')) {
      if (!navlinks.contains(e.target) && !btn.contains(e.target)) {
        navlinks.classList.remove('open');
        if (btn) {
          btn.innerHTML = '☰';
          btn.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });

  // Reset mobile nav when resizing to desktop (> 1024px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      const navlinks = document.querySelector('.navlinks');
      const btn = document.querySelector('.hamburger-btn');
      if (navlinks && navlinks.classList.contains('open')) {
        navlinks.classList.remove('open');
        if (btn) {
          btn.innerHTML = '☰';
          btn.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });

  const modal = document.getElementById('paymentModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePayModal();
    });
  }
});
