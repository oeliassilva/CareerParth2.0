// js/pages/ciclo.js (VERSÃO 100% COMPLETA)

export function initCiclo() {
    // Variáveis do módulo
    let appData = {};
    let activeCycle = null;
    let timers = {};

    // ===================================================================
    // Funções INTERNAS (Chamadas apenas por outro JavaScript)
    // ===================================================================

    function initializeApp() {
        appData = loadData();
        const activeId = getActiveCycleId();
        if (activeId && appData.cycles[activeId]) {
            activeCycle = appData.cycles[activeId];
            switchView('current');
            updateDisplay();
        } else {
            switchView('cycle-selection');
            populateCycleSelector();
        }
        setInterval(updateTotalHoursToday, 60000);
    }

    function switchView(viewName) {
        const selectionView = document.getElementById('cycle-selection-view');
        const currentView = document.getElementById('current-view');
        if (selectionView) selectionView.style.display = 'none';
        if (currentView) currentView.style.display = 'none';
        const viewToShow = document.getElementById(`${viewName}-view`);
        if(viewToShow) viewToShow.style.display = 'block';
    }

    function populateCycleSelector() {
        const selector = document.getElementById('existingCycleSelector');
        if (!selector) return;
        selector.innerHTML = '<option value="">-- Selecione um ciclo --</option>';
        const cycleIds = Object.keys(appData.cycles || {});
        const loadButton = selector.parentElement.nextElementSibling;
        if (cycleIds.length > 0) {
            cycleIds.forEach(id => selector.innerHTML += `<option value="${id}">${id}</option>`);
            selector.disabled = false;
            if (loadButton) loadButton.disabled = false;
        } else {
            selector.innerHTML = '<option value="">Nenhum ciclo criado</option>';
            selector.disabled = true;
            if (loadButton) loadButton.disabled = true;
        }
    }

    function startTimer(id) {
        if (!activeCycle) return;
        const discipline = activeCycle.disciplines.find(d => d.id === id);
        if (!discipline || discipline.isRunning) return;
        activeCycle.disciplines.forEach(d => { if (d.isRunning) stopTimer(d.id, false); });
        discipline.isRunning = true;
        updateDisciplinesList();
        timers[id] = setInterval(() => {
            discipline.currentSeconds++;
            const today = getLocalDateString();
            if (!activeCycle.studyHistory[today]) activeCycle.studyHistory[today] = {};
            const discIdStr = String(discipline.id);
            activeCycle.studyHistory[today][discIdStr] = (activeCycle.studyHistory[today][discIdStr] || 0) + 1;
            updateTimerDisplay(discipline);
        }, 1000);
    }

    function stopTimer(id, doCheckCompletion = true) {
        if (!timers[id]) return;
        clearInterval(timers[id]);
        delete timers[id];
        if (activeCycle) {
            const discipline = activeCycle.disciplines.find(d => d.id === id);
            if (discipline) discipline.isRunning = false;
            saveData(appData);
        }
        if (doCheckCompletion && checkCycleCompletion()) showCompletionModal();
        updateDisciplinesList();
    }

    function checkCycleCompletion() {
        if (!activeCycle || activeCycle.disciplines.length === 0) return false;
        return activeCycle.disciplines.every(d => d.currentSeconds >= d.targetSeconds);
    }

    function updateDisplay() {
        if (!activeCycle) return;
        document.getElementById('cycleTitleText').textContent = `Ciclo: ${activeCycle.id}`;
        updateStats();
        updateDisciplinesList();
        createWheelChart();
    }

    function updateTotalHoursToday() {
        const today = getLocalDateString();
        let totalSecondsToday = 0;
        const currentData = loadData();
        Object.values(currentData.cycles).forEach(cycle => {
            if (cycle.studyHistory && cycle.studyHistory[today]) {
                totalSecondsToday += Object.values(cycle.studyHistory[today]).reduce((sum, s) => sum + s, 0);
            }
        });
        const totalHoursEl = document.getElementById('totalHours');
        if(totalHoursEl) totalHoursEl.textContent = formatTime(totalSecondsToday);
    }

    function updateStats() {
        if (!activeCycle) return;
        const cycleCompletionsEl = document.getElementById('cycleCompletions');
        const totalDisciplinesEl = document.getElementById('totalDisciplines');
        if(cycleCompletionsEl) cycleCompletionsEl.textContent = activeCycle.completions || 0;
        if(totalDisciplinesEl) totalDisciplinesEl.textContent = activeCycle.disciplines.length;
        updateTotalHoursToday();
    }

    function updateDisciplinesList() {
        if (!activeCycle) return;
        const listEl = document.getElementById('disciplinesList');
        if (!listEl) return;
        listEl.innerHTML = activeCycle.disciplines.map((d, i) => {
            const isCompleted = d.targetSeconds > 0 && d.currentSeconds >= d.targetSeconds;
            return `<div class="discipline-item ${isCompleted ? 'completed' : ''}" id="discipline-${d.id}" style="border-left-color: ${COLORS[i % COLORS.length]};">
                <div class="discipline-name-group">
                    <button class="edit-btn" title="Editar" onclick="openEditModal(${d.id})"><span class="material-icons-outlined">edit</span></button>
                    <span>${d.name}</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; min-width: 100px;">
                    <span class="time-current">${formatTime(d.currentSeconds)}</span>
                    <span style="font-size: 12px; color: #666;">Meta: ${formatTime(d.targetSeconds)}</span>
                </div>
                <div class="timer-controls" style="display:flex; gap:8px; align-items:center;">
                    <button class="timer-btn ${d.isRunning ? 'stop' : ''}" onclick="toggleTimer(${d.id})">${d.isRunning ? 'Pausar' : 'Iniciar'}</button>
                    <button class="remove-btn secondary" onclick="removeDiscipline(${d.id})">Remover</button>
                </div>
            </div>`;
        }).join('');
    }

    function updateTimerDisplay(discipline) {
        if (!discipline) return;
        const itemEl = document.getElementById(`discipline-${discipline.id}`);
        if (!itemEl) return;
        itemEl.querySelector('.time-current').textContent = formatTime(discipline.currentSeconds);
        itemEl.classList.toggle('completed', discipline.targetSeconds > 0 && discipline.currentSeconds >= discipline.targetSeconds);
        updateTotalHoursToday();
    }

    function createWheelChart() {
        const svg = document.getElementById('wheelChart');
        const tooltip = document.getElementById('tooltip');
        if (!svg || !tooltip) return;
        svg.innerHTML = '';
        if (!activeCycle || activeCycle.disciplines.length === 0) {
            svg.innerHTML = `<text x="200" y="200" text-anchor="middle" font-size="16" fill="#6c757d">Adicione disciplinas</text>`;
            return;
        }
        const totalStudied = activeCycle.disciplines.reduce((sum, d) => sum + d.currentSeconds, 0);
        const totalTarget = activeCycle.disciplines.reduce((sum, d) => sum + d.targetSeconds, 0);
        let startAngle = -90;
        const gapDegrees = totalTarget > 0 ? 2 : 0;
        const createArcPath = (x, y, outerR, innerR, start, end) => {
            if (end - start >= 360) end = start + 359.99;
            const startRad = (start * Math.PI) / 180, endRad = (end * Math.PI) / 180;
            const largeArc = (end - start) > 180 ? 1 : 0;
            const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const d = ["M",x + outerR * Math.cos(startRad),y + outerR * Math.sin(startRad),"A",outerR,outerR,0,largeArc,1,x + outerR * Math.cos(endRad),y + outerR * Math.sin(endRad),"L",x + innerR * Math.cos(endRad),y + innerR * Math.sin(endRad),"A",innerR,innerR,0,largeArc,0,x + innerR * Math.cos(startRad),y + innerR * Math.sin(startRad),"Z"].join(" ");
            p.setAttribute("d", d);
            return p;
        };
        activeCycle.disciplines.forEach((d, i) => {
            const sliceAngle = totalTarget > 0 ? (d.targetSeconds / totalTarget) * 360 : 360 / activeCycle.disciplines.length;
            if (sliceAngle <= 0) return;
            const endAngle = startAngle + sliceAngle;
            const arcStart = startAngle + gapDegrees / 2;
            const arcEnd = endAngle - gapDegrees / 2;
            if (arcEnd > arcStart) {
                const path = createArcPath(200, 200, 150, 90, arcStart, arcEnd);
                path.setAttribute("fill", COLORS[i % COLORS.length]);
                path.addEventListener('mouseover', (e) => {
                    tooltip.innerHTML = `<strong>${d.name}</strong><br>Estudado: ${formatTime(d.currentSeconds)}<br>Meta: ${formatTime(d.targetSeconds)}`;
                    tooltip.style.display = 'block';
                    tooltip.style.left = `${e.clientX + 15}px`;
                    tooltip.style.top = `${e.clientY - 10}px`;
                });
                path.addEventListener('mouseout', () => { tooltip.style.display = 'none'; });
                svg.appendChild(path);
            }
            startAngle = endAngle;
        });
        const createText = (x, y, content, size, weight, color, opacity = 1) => {
            const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
            textEl.setAttribute("x", x); textEl.setAttribute("y", y); textEl.setAttribute("text-anchor", "middle");
            textEl.setAttribute("font-size", size);
            if (weight) textEl.setAttribute("font-weight", weight);
            textEl.setAttribute("fill", color);
            textEl.setAttribute("opacity", opacity);
            textEl.textContent = content;
            return textEl;
        };
        svg.appendChild(createText("200", "185", "Estudei", "18", "500", "#6c757d"));
        svg.appendChild(createText("200", "215", formatTime(totalStudied), "28", "600", "#0d253f"));
        svg.appendChild(createText("200", "238", `de ${formatTime(totalTarget)}`, "16", "500", "#6c757d", 0.8));
    }

    // ===================================================================
    // Funções GLOBAIS (Expostas na `window` para serem chamadas pelo HTML)
    // ===================================================================

    window.returnToCycleSelection = function() {
        Object.keys(timers).forEach(id => stopTimer(id, false));
        setActiveCycleId(null);
        activeCycle = null;
        switchView('cycle-selection');
        populateCycleSelector();
    }

    window.loadSelectedCycle = function() {
        const selectedId = document.getElementById('existingCycleSelector').value;
        if (selectedId && appData.cycles[selectedId]) {
            setActiveCycleId(selectedId);
            activeCycle = appData.cycles[selectedId];
            switchView('current');
            updateDisplay();
        } else {
            showAlertModal('Seleção Inválida', 'Por favor, selecione um ciclo válido.');
        }
    }

    window.createNewCycle = function() {
        const newName = document.getElementById('newCycleNameInput').value.trim();
        if (!newName) return showAlertModal('Nome Inválido', 'Dê um nome ao novo ciclo.');
        if (appData.cycles[newName]) return showAlertModal('Nome Duplicado', 'Já existe um ciclo com esse nome.');
        appData.cycles[newName] = { id: newName, disciplines: [], completions: 0, studyHistory: {} };
        setActiveCycleId(newName);
        activeCycle = appData.cycles[newName];
        saveData(appData);
        switchView('current');
        updateDisplay();
        document.getElementById('newCycleNameInput').value = '';
    }

    window.deleteCurrentCycle = function() {
        if (!activeCycle) return;
        showConfirmModal('Apagar Ciclo', `Tem certeza? Esta ação é irreversível.`, () => {
            Object.keys(timers).forEach(id => stopTimer(id, false));
            delete appData.cycles[activeCycle.id];
            saveData(appData);
            returnToCycleSelection();
        });
    }

    window.addDiscipline = function() {
        if (!activeCycle) return;
        const name = document.getElementById('disciplineInput').value.trim();
        const hours = parseInt(document.getElementById('hoursInput').value, 10) || 0;
        const minutes = parseInt(document.getElementById('minutesInput').value, 10) || 0;
        const targetSeconds = (hours * 3600) + (minutes * 60);
        if (!name || targetSeconds <= 0) return showAlertModal('Dados Inválidos', 'Insira um nome e uma meta de tempo.');
        if (activeCycle.disciplines.some(d => d.name.toLowerCase() === name.toLowerCase())) return showAlertModal('Nome Duplicado', 'Disciplina já existe.');
        activeCycle.disciplines.push({ id: Date.now(), name, currentSeconds: 0, targetSeconds, isRunning: false });
        saveData(appData);
        updateDisplay();
        document.getElementById('disciplineInput').value = '';
        document.getElementById('hoursInput').value = '1';
        document.getElementById('minutesInput').value = '0';
    }

    window.removeDiscipline = function(id) {
        if (!activeCycle) return;
        showConfirmModal('Remover Disciplina', 'Tem certeza?', () => {
            if (timers[id]) stopTimer(id, false);
            activeCycle.disciplines = activeCycle.disciplines.filter(d => d.id !== id);
            saveData(appData);
            updateDisplay();
        });
    }

    window.saveDisciplineChanges = function() {
        const id = parseInt(document.getElementById('editDisciplineId').value, 10);
        const newName = document.getElementById('editDisciplineName').value.trim();
        const newHours = parseInt(document.getElementById('editHoursInput').value, 10) || 0;
        const newMinutes = parseInt(document.getElementById('editMinutesInput').value, 10) || 0;
        const newTargetSeconds = (newHours * 3600) + (newMinutes * 60);
        if (!newName || newTargetSeconds <= 0) return showAlertModal('Dados Inválidos', 'O nome e a meta devem ser válidos.');
        const discipline = activeCycle.disciplines.find(d => d.id === id);
        if (discipline) {
            discipline.name = newName;
            discipline.targetSeconds = newTargetSeconds;
            saveData(appData);
            updateDisplay();
            hideEditModal();
        }
    }

    window.toggleTimer = function(id) {
        if (!activeCycle) return;
        const discipline = activeCycle.disciplines.find(d => d.id === id);
        if (discipline) discipline.isRunning ? stopTimer(id, true) : startTimer(id);
    }

    window.manuallyEndCycle = function() {
        if (!activeCycle) return;
        showConfirmModal('Encerrar Ciclo?', 'Ele será contabilizado como concluído.', () => {
            hideConfirmModal();
            window.handleStartNewCycle();
        });
    }

    window.handleStartNewCycle = function() {
        if (!activeCycle) return;
        hideCompletionModal();
        activeCycle.completions = (activeCycle.completions || 0) + 1;
        activeCycle.disciplines.forEach(d => {
            d.currentSeconds = 0;
            d.isRunning = false;
        });
        Object.keys(timers).forEach(id => stopTimer(parseInt(id, 10), false));
        saveData(appData);
        updateDisplay();
        showCelebrationModal();
    }

    window.handleContinueCycle = function() {
        hideCompletionModal();
    }

    // Ponto de entrada do módulo: chama a função de inicialização interna.
    initializeApp();
}