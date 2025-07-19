// --- ARQUIVO COMUM (comum.js) ---

// --- Variáveis Globais e Constantes ---
const COLORS = ['#0d253f', '#ff6f61', '#28a745', '#ffc107', '#6f42c1', '#17a2b8', '#fd7e14', '#20c997'];
const BAR_CHART_COLOR = '#7B68EE';
let confirmCallback = null;

// --- Gerenciamento de Dados com LocalStorage ---
function loadData() {
    const data = localStorage.getItem('careerPathStudyTracker');
    if (data) {
        return JSON.parse(data);
    }
    // Retorna uma estrutura padrão se não houver nada salvo
    return { cycles: {}, activeCycleId: null };
}

function saveData(appData) {
    // Salva o último ID de ciclo ativo para reabrir na próxima vez
    appData.activeCycleId = localStorage.getItem('careerPathActiveCycleId');
    localStorage.setItem('careerPathStudyTracker', JSON.stringify(appData));
}

function setActiveCycleId(cycleId) {
    if (cycleId) {
        localStorage.setItem('careerPathActiveCycleId', cycleId);
    } else {
        localStorage.removeItem('careerPathActiveCycleId');
    }
}

function getActiveCycleId() {
    return localStorage.getItem('careerPathActiveCycleId');
}


// --- Funções Utilitárias ---
function getLocalDateString(date = new Date()) {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset*60*1000));
    return adjustedDate.toISOString().split('T')[0];
}

function formatTime(totalSeconds) {
    totalSeconds = Math.round(totalSeconds || 0);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// --- Modais (Usados por todas as páginas) ---
function showCompletionModal() { document.getElementById('completionModal').style.display = 'flex'; }
function hideCompletionModal() { document.getElementById('completionModal').style.display = 'none'; }
function showCelebrationModal() { document.getElementById('celebrationModal').style.display = 'flex'; }
function hideCelebrationModal() { document.getElementById('celebrationModal').style.display = 'none'; }
function showAlertModal(title, message) {
    document.getElementById('alertModalTitle').textContent = title;
    document.getElementById('alertModalMessage').textContent = message;
    document.getElementById('alertModal').style.display = 'flex';
}
function hideAlertModal() { document.getElementById('alertModal').style.display = 'none'; }
function showConfirmModal(title, message, callback) {
    document.getElementById('confirmModalTitle').textContent = title;
    document.getElementById('confirmModalMessage').textContent = message;
    confirmCallback = callback;
    document.getElementById('confirmModal').style.display = 'flex';
}
function hideConfirmModal() {
    document.getElementById('confirmModal').style.display = 'none';
    confirmCallback = null;
}
function handleConfirmAction() {
    if (typeof confirmCallback === 'function') {
        confirmCallback();
    }
    hideConfirmModal();
}
function openEditModal(id) {
    let appData = loadData();
    const activeCycleId = getActiveCycleId();
    const activeCycle = appData.cycles[activeCycleId];
    const discipline = activeCycle.disciplines.find(d => d.id === id);
    if (!discipline) return;
    
    document.getElementById('editDisciplineId').value = discipline.id;
    document.getElementById('editDisciplineName').value = discipline.name;

    const hours = Math.floor(discipline.targetSeconds / 3600);
    const minutes = Math.floor((discipline.targetSeconds % 3600) / 60);
    document.getElementById('editHoursInput').value = hours;
    document.getElementById('editMinutesInput').value = minutes;

    document.getElementById('editDisciplineModal').style.display = 'flex';
}
function hideEditModal() {
    document.getElementById('editDisciplineModal').style.display = 'none';
}