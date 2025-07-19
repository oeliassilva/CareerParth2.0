// js/pages/calendario.js (VERSÃO 100% COMPLETA)

export function initCalendario() {
    // Variáveis do módulo
    let appData = {};
    let currentCalendarDate = new Date();
    let selectedDate = null;
    let calendarViewMode = 'month';

    // ===================================================================
    // Funções INTERNAS (Chamadas apenas por outro JavaScript)
    // ===================================================================

    function initializeApp() {
        appData = loadData();
        renderCalendar();
    }

    function renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        const titleEl = document.getElementById('calendarTitle');
        const summaryEl = document.getElementById('calendar-summary');
        if (!grid || !titleEl || !summaryEl) return;
        grid.innerHTML = '';
        appData = loadData();
        const allHistories = Object.values(appData.cycles).map(c => c.studyHistory).filter(Boolean);
        if (calendarViewMode === 'month') {
            const year = currentCalendarDate.getFullYear();
            const month = currentCalendarDate.getMonth();
            titleEl.textContent = `${currentCalendarDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            let monthlyTotalSeconds = 0;
            for (let i = 0; i < firstDayOfMonth; i++) grid.insertAdjacentHTML('beforeend', '<div></div>');
            for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(year, month, i);
                const isoDate = getLocalDateString(date);
                let dailyTotal = 0;
                allHistories.forEach(history => {
                    if (history[isoDate]) {
                        dailyTotal += Object.values(history[isoDate]).reduce((sum, s) => sum + s, 0);
                    }
                });
                monthlyTotalSeconds += dailyTotal;
                let classes = 'calendar-day';
                if (isoDate === getLocalDateString()) classes += ' today';
                if (selectedDate === isoDate) classes += ' selected';
                if (dailyTotal > 0) classes += ' has-studies';
                grid.insertAdjacentHTML('beforeend', `<div class="${classes}" onclick="selectDate('${isoDate}')">${i}</div>`);
            }
            summaryEl.innerHTML = `Total no Mês: <strong>${formatTime(monthlyTotalSeconds)}</strong>`;
        } else { // 'week' view
            const weekStart = new Date(currentCalendarDate);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            titleEl.textContent = `${weekStart.toLocaleDateString('pt-BR')} - ${weekEnd.toLocaleDateString('pt-BR')}`;
            let weeklyTotalSeconds = 0;
            for (let i = 0; i < 7; i++) {
                const date = new Date(weekStart);
                date.setDate(date.getDate() + i);
                const isoDate = getLocalDateString(date);
                let dailyTotal = 0;
                allHistories.forEach(history => {
                    if (history[isoDate]) {
                        dailyTotal += Object.values(history[isoDate]).reduce((sum, s) => sum + s, 0);
                    }
                });
                weeklyTotalSeconds += dailyTotal;
                let classes = 'calendar-day';
                if (isoDate === getLocalDateString()) classes += ' today';
                if (selectedDate === isoDate) classes += ' selected';
                if (dailyTotal > 0) classes += ' has-studies';
                grid.insertAdjacentHTML('beforeend', `<div class="${classes}" onclick="selectDate('${isoDate}')">${date.getDate()}</div>`);
            }
            summaryEl.innerHTML = `Total na Semana: <strong>${formatTime(weeklyTotalSeconds)}</strong>`;
        }
    }

    // ===================================================================
    // Funções GLOBAIS (Expostas na `window` para serem chamadas pelo HTML)
    // ===================================================================

    window.setCalendarView = function(mode) {
        calendarViewMode = mode;
        document.getElementById('view-toggle-month').classList.toggle('active', mode === 'month');
        document.getElementById('view-toggle-week').classList.toggle('active', mode === 'week');
        renderCalendar();
    }

    window.navigateCalendar = function(direction) {
        if (calendarViewMode === 'month') {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
        } else {
            currentCalendarDate.setDate(currentCalendarDate.getDate() + (direction * 7));
        }
        renderCalendar();
    }

    window.selectDate = function(dateStr) {
        selectedDate = dateStr;
        renderCalendar();
        const infoEl = document.getElementById('selectedDateInfo');
        if (!infoEl) return;
        appData = loadData();
        let dailyTotalSeconds = 0;
        let html = `<h4 style="color: #0d253f; font-weight: 600;">Estudos de ${new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR', {day: '2-digit', month: 'long', year: 'numeric'})}</h4>`;
        let studiesFound = false;
        Object.values(appData.cycles).forEach(cycle => {
            if (cycle.studyHistory && cycle.studyHistory[dateStr]) {
                Object.entries(cycle.studyHistory[dateStr]).forEach(([discId, seconds]) => {
                    const discipline = cycle.disciplines.find(d => String(d.id) === discId);
                    if (discipline) {
                        html += `<div class="study-history-item"> <span><strong>${discipline.name}</strong> (${cycle.id}): ${formatTime(seconds)}</span> <button class="history-delete-btn" title="Apagar" onclick="deleteHistoryEntry('${dateStr}', '${cycle.id}', '${discId}')">X</button> </div>`;
                        studiesFound = true;
                        dailyTotalSeconds += seconds;
                    }
                });
            }
        });
        const summaryHtml = `<div class="daily-total"><strong>Total do Dia:</strong> ${formatTime(dailyTotalSeconds)}</div>`;
        infoEl.innerHTML = (studiesFound ? summaryHtml : '') + html + (!studiesFound ? `<p style="margin-top:10px;">Nenhum estudo registrado.</p>` : '');
        infoEl.style.display = 'block';
    }

    window.deleteHistoryEntry = function(dateStr, cycleId, disciplineId) {
        showConfirmModal('Apagar Registro', 'Tem certeza?', () => {
            appData = loadData();
            const cycle = appData.cycles[cycleId];
            if (!cycle?.studyHistory?.[dateStr]?.[disciplineId]) return;
            const secondsToDelete = cycle.studyHistory[dateStr][disciplineId];
            const discipline = cycle.disciplines.find(d => String(d.id) === disciplineId);
            if (discipline) {
                discipline.currentSeconds = Math.max(0, discipline.currentSeconds - secondsToDelete);
            }
            delete cycle.studyHistory[dateStr][disciplineId];
            if (Object.keys(cycle.studyHistory[dateStr]).length === 0) {
                delete cycle.studyHistory[dateStr];
            }
            saveData(appData);
            selectDate(dateStr);
        });
    }

    // Ponto de entrada do módulo
    initializeApp();
}