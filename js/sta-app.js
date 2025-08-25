(function(){
  const STORAGE_KEY = 'sta_state_v1';
  const SERVICES = [
    { id: 'khan', name: 'Khan Academy' },
    { id: 'codecademy', name: 'Codecademy' },
    { id: 'coursera', name: 'Coursera' },
    { id: 'duolingo', name: 'Duolingo' }
  ];

  function todayISO(d = new Date()) {
    const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    return t.toISOString().slice(0,10);
  }

  function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateMockState() {
    // Activities over the last 30 days
    const activities = [];
    for (let i = 0; i < 30; i++) {
      const date = daysAgo(i);
      // 60% chance of activity in a day
      if (Math.random() < 0.6) {
        const sessions = randomInt(1, 3);
        for (let s = 0; s < sessions; s++) {
          const service = SERVICES[randomInt(0, SERVICES.length - 1)];
          activities.push({
            date: date.toISOString().slice(0,10),
            service: service.id,
            minutes: randomInt(10, 50),
            title: 'Lesson ' + randomInt(1, 100)
          });
        }
      }
    }
    return { services: SERVICES, activities };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return generateMockState();
      const parsed = JSON.parse(raw);
      if (!parsed.activities) return generateMockState();
      return parsed;
    } catch(e) {
      return generateMockState();
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function groupBy(arr, keyFn) {
    return arr.reduce((acc, item) => {
      const k = keyFn(item);
      acc[k] = acc[k] || [];
      acc[k].push(item);
      return acc;
    }, {});
  }

  function sum(arr, sel = x => x) {
    return arr.reduce((a, b) => a + sel(b), 0);
  }

  function computeMetrics(state) {
    const byDate = groupBy(state.activities, a => a.date);
    const dates = Object.keys(byDate).sort();

    const totalMinutes = sum(state.activities, a => a.minutes);

    // Weekly minutes (last 7 days)
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = daysAgo(i).toISOString().slice(0,10);
      const mins = sum(byDate[d] || [], a => a.minutes);
      last7.push({ date: d, minutes: mins });
    }
    const weeklyMinutes = sum(last7, d => d.minutes);

    // Active streak (consecutive days with any activity, ending today if active)
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const d = daysAgo(i).toISOString().slice(0,10);
      const mins = sum(byDate[d] || [], a => a.minutes);
      if (mins > 0) streak++;
      else break;
    }

    return { totalMinutes, weeklyMinutes, streak, byDate };
  }

  function renderCards(metrics) {
    const $ = (id) => document.getElementById(id);
    const fmt = (m) => Math.round(m);
    const toHours = (m) => (m/60).toFixed(1);

    const totalEl = $('sta-total-minutes');
    const weeklyEl = $('sta-weekly-minutes');
    const streakEl = $('sta-streak-days');

    if (totalEl) totalEl.textContent = `${fmt(metrics.totalMinutes)} min (${toHours(metrics.totalMinutes)} h)`;
    if (weeklyEl) weeklyEl.textContent = `${fmt(metrics.weeklyMinutes)} min (${toHours(metrics.weeklyMinutes)} h)`;
    if (streakEl) streakEl.textContent = `${metrics.streak} day${metrics.streak === 1 ? '' : 's'}`;
  }

  function make14DaySeries(byDate) {
    const labels = [];
    const data = [];
    for (let i = 13; i >= 0; i--) {
      const d = daysAgo(i).toISOString().slice(0,10);
      labels.push(d.slice(5));
      data.push(sum(byDate[d] || [], a => a.minutes));
    }
    return { labels, data };
  }

  function serviceAggregation(activities, services) {
    const totals = {};
    services.forEach(s => totals[s.id] = 0);
    activities.forEach(a => totals[a.service] = (totals[a.service] || 0) + a.minutes);
    const labels = services.map(s => s.name);
    const data = services.map(s => totals[s.id] || 0);
    return { labels, data };
  }

  function renderCharts(state, metrics) {
    if (typeof Chart === 'undefined') return;

    const activityCanvas = document.getElementById('sta-activity-chart');
    if (activityCanvas) {
      const series = make14DaySeries(metrics.byDate);
      new Chart(activityCanvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: series.labels,
          datasets: [{
            label: 'Minutes per day',
            data: series.data,
            fill: true,
            tension: 0.25,
            borderColor: '#2c98f0',
            backgroundColor: 'rgba(44,152,240,0.15)',
            pointRadius: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          },
          plugins: { legend: { display: false } }
        }
      });
    }

    const serviceCanvas = document.getElementById('sta-service-chart');
    if (serviceCanvas) {
      const agg = serviceAggregation(state.activities, state.services);
      new Chart(serviceCanvas.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: agg.labels,
          datasets: [{
            data: agg.data,
            backgroundColor: ['#2c98f0', '#f9bf3f', '#f85a40', '#4ad9d9']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }
  }

  function bindActions(state) {
    const regen = document.getElementById('sta-regenerate');
    if (regen) {
      regen.addEventListener('click', function(e){
        e.preventDefault();
        const fresh = generateMockState();
        saveState(fresh);
        boot();
      });
    }

    const clear = document.getElementById('sta-clear');
    if (clear) {
      clear.addEventListener('click', function(e){
        e.preventDefault();
        localStorage.removeItem(STORAGE_KEY);
        boot();
      });
    }
  }

  function boot() {
    const state = loadState();
    saveState(state); // ensure it's persisted
    const metrics = computeMetrics(state);
    renderCards(metrics);
    renderCharts(state, metrics);
    bindActions(state);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
