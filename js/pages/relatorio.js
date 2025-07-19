// js/pages/relatorio.js (VERSÃO 100% COMPLETA)

export function initRelatorio() {
    // Variáveis do módulo
    let appData = {};
    let reportStartDate, reportEndDate;
    let durationBarChart = null;
    let distributionDonutChart = null;
    
    // Plugin para o Chart.js, precisa ser definido dentro do escopo
    const doughnutTextPlugin = {
        id: 'doughnutText',
        afterDraw(chart, args, options) {
            if (!options.text) return;
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0);
            if (meta.data.length === 0) return;
            const { total, label } = options.text;
            ctx.save();
            const x = (meta.data[0].x + meta.data[meta.data.length-1].x) / 2; 
            const y = (meta.data[0].y + meta.data[meta.data.length-1].y) / 2;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '500 1em Poppins, sans-serif'; ctx.fillStyle = '#6c757d';
            ctx.fillText(label, x, y - 12);
            ctx.font = '600 1.5em Poppins, sans-serif'; ctx.fillStyle = '#0d253f';
            ctx.fillText(total, x, y + 15);
            ctx.restore();
        }
    };

    // ===================================================================
    // Funções INTERNAS (Chamadas apenas por outro JavaScript)
    // ===================================================================

    function initializeApp() {
        appData = loadData();
        initializeReportFilters();
        renderReportsView();
    }

    function initializeReportFilters() {
        const today = new Date();
        reportStartDate = new Date(today);
        reportStartDate.setDate(today.getDate() - today.getDay());
        reportEndDate = new Date(reportStartDate);
        reportEndDate.setDate(reportEndDate.getDate() + 6);
        if (typeof Litepicker !== 'undefined') {
            new Litepicker({
                element: document.getElementById('report-date-input'),
                singleMode: false, allowRepick: true, lang: "pt-BR",
                lexicon: {"button_previous": "❮", "button_next": "❯", "button_apply": "Aplicar", "button_cancel": "Cancelar", "months": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"], "weekdays": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]},
                format: 'DD/MM/YYYY', startDate: reportStartDate, endDate: reportEndDate,
                setup: (picker) => {
                    picker.on('selected', (date1, date2) => {
                        reportStartDate = date1.dateInstance;
                        reportEndDate = date2.dateInstance;
                        renderReportsView();
                    });
                }
            });
        }
        populateCycleFilter();
    }

    function populateCycleFilter() {
        const selector = document.getElementById('report-cycle-filter');
        if (!selector) return;
        selector.innerHTML = '<option value="all">Todos os Ciclos</option>';
        Object.keys(appData.cycles || {}).forEach(id => selector.innerHTML += `<option value="${id}">${id}</option>`);
    }

    function processReportData(startDate, endDate, selectedCycleId) {
        let totalSeconds = 0;
        const durationByDay = {};
        const distributionByCycle = {};
        const breakdown = {};
        const studyDays = new Set();
        if (!startDate || !endDate) return { totalSeconds: 0, dailyAverage: 0, durationByDay: {}, distributionByCycle: {}, breakdown: {} };
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            durationByDay[getLocalDateString(d)] = 0;
        }
        Object.values(appData.cycles).forEach(cycle => {
            if (selectedCycleId !== 'all' && cycle.id !== selectedCycleId) return;
            if (!cycle.studyHistory) return;
            Object.entries(cycle.studyHistory).forEach(([dateStr, entries]) => {
                const entryDate = new Date(dateStr + 'T12:00:00');
                if (entryDate >= startDate && entryDate <= endDate) {
                    let dailySecondsForCycle = 0;
                    Object.entries(entries).forEach(([discId, seconds]) => {
                        dailySecondsForCycle += seconds;
                        distributionByCycle[cycle.id] = (distributionByCycle[cycle.id] || 0) + seconds;
                        if (!breakdown[cycle.id]) breakdown[cycle.id] = { totalSeconds: 0, disciplines: {} };
                        breakdown[cycle.id].totalSeconds += seconds;
                        breakdown[cycle.id].disciplines[discId] = (breakdown[cycle.id].disciplines[discId] || 0) + seconds;
                    });
                    if (dailySecondsForCycle > 0) {
                        durationByDay[dateStr] = (durationByDay[dateStr] || 0) + dailySecondsForCycle;
                        totalSeconds += dailySecondsForCycle;
                        studyDays.add(dateStr);
                    }
                }
            });
        });
        const dailyAverage = studyDays.size > 0 ? totalSeconds / studyDays.size : 0;
        return { totalSeconds, dailyAverage, durationByDay, distributionByCycle, breakdown };
    }

    function renderDurationBarChart(data) {
        const ctx = document.getElementById('durationBarChart');
        if (!ctx || typeof Chart === 'undefined') return;
        const context = ctx.getContext('2d');
        const labels = Object.keys(data).map(dateStr => new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''));
        const values = Object.values(data);
        if (durationBarChart) durationBarChart.destroy();
        durationBarChart = new Chart(context, {
            type: 'bar',
            data: { labels, datasets: [{ label: 'Duração', data: values, backgroundColor: BAR_CHART_COLOR, borderRadius: 4, barThickness: 25 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { callback: (v) => formatTime(v).substring(0, 5) } } }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => `Duração: ${formatTime(c.raw)}` } } } }
        });
    }

    function renderDistributionDonutChart(data) {
        const ctx = document.getElementById('distributionDonutChart');
        if (!ctx || typeof Chart === 'undefined') return;
        const context = ctx.getContext('2d');
        const labels = Object.keys(data);
        const values = Object.values(data);
        const backgroundColors = labels.map((_, i) => COLORS[i % COLORS.length]);
        const totalSeconds = values.reduce((sum, v) => sum + v, 0);
        if (distributionDonutChart) distributionDonutChart.destroy();
        distributionDonutChart = new Chart(context, {
            type: 'doughnut',
            data: { labels, datasets: [{ data: values, backgroundColor: backgroundColors, borderColor: '#fff', borderWidth: 2 }] },
            options: {
                responsive: true, maintainAspectRatio: false, cutout: '70%',
                plugins: { 
                    legend: { display: false }, 
                    tooltip: { callbacks: { label: (c) => `${c.label}: ${formatTime(c.raw)} (${totalSeconds > 0 ? (c.raw / totalSeconds * 100).toFixed(1) : 0}%)` } }, 
                    doughnutText: { text: { total: formatTime(totalSeconds), label: 'Total' } }
                }
            },
            plugins: [doughnutTextPlugin]
        });
    }

    function renderBreakdownTable(data, totalSeconds) {
        const tableBody = document.getElementById('breakdown-table-body');
        if (!tableBody) return;
        tableBody.innerHTML = '';
        if (Object.keys(data).length === 0) {
            tableBody.innerHTML = '<div style="text-align:center; padding: 20px; color: #6c757d;">Nenhum dado no período.</div>';
            return;
        }
        let colorIndex = 0;
        const sortedCycles = Object.entries(data).sort((a, b) => b[1].totalSeconds - a[1].totalSeconds);
        for (const [cycleId, cycleData] of sortedCycles) {
            const cycle = appData.cycles[cycleId];
            if (!cycle) continue;
            const percentage = totalSeconds > 0 ? ((cycleData.totalSeconds / totalSeconds) * 100).toFixed(1) : 0;
            const cycleColor = COLORS[colorIndex % COLORS.length];
            const cycleRow = document.createElement('div');
            cycleRow.className = 'breakdown-row cycle-row';
            cycleRow.setAttribute('onclick', `toggleCycleDetails(this)`);
            cycleRow.innerHTML = `<div class="cycle-name-cell"><span class="material-icons-outlined toggle-arrow">chevron_right</span><span class="cycle-color-dot" style="background-color:${cycleColor};"></span><span>${cycleId}</span></div><span class="d-right">${formatTime(cycleData.totalSeconds)}</span><span class="d-right">${percentage}%</span>`;
            tableBody.appendChild(cycleRow);
            const disciplinesWrapper = document.createElement('div');
            disciplinesWrapper.className = 'discipline-rows-wrapper';
            const sortedDisciplines = Object.entries(cycleData.disciplines).sort((a, b) => b[1] - a[1]);
            for (const [discId, discSeconds] of sortedDisciplines) {
                const discipline = cycle.disciplines.find(d => String(d.id) === discId);
                if (discipline) {
                    const discPercentage = cycleData.totalSeconds > 0 ? ((discSeconds / cycleData.totalSeconds) * 100).toFixed(1) : 0;
                    disciplinesWrapper.innerHTML += `<div class="breakdown-row discipline-row"><span>${discipline.name}</span><span class="d-right">${formatTime(discSeconds)}</span><span class="d-right">${discPercentage}%</span></div>`;
                }
            }
            tableBody.appendChild(disciplinesWrapper);
            colorIndex++;
        }
    }

    // ===================================================================
    // Funções GLOBAIS (Expostas na `window` para serem chamadas pelo HTML)
    // ===================================================================

    window.renderReportsView = function() {
        appData = loadData();
        const selectedCycleId = document.getElementById('report-cycle-filter').value;
        const reportData = processReportData(reportStartDate, reportEndDate, selectedCycleId);
        document.getElementById('report-total-hours').textContent = formatTime(reportData.totalSeconds);
        document.getElementById('report-daily-average').textContent = formatTime(reportData.dailyAverage);
        renderDurationBarChart(reportData.durationByDay);
        renderDistributionDonutChart(reportData.distributionByCycle);
        renderBreakdownTable(reportData.breakdown, reportData.totalSeconds);
    }
    
    window.toggleCycleDetails = function(element) {
        if (element) {
            element.classList.toggle('expanded');
        }
    }

    // Ponto de entrada do módulo
    initializeApp();
}