// Contratos a Assinar - JavaScript Corrigido para SPA

// Dados dos contratos (simulação)
const contractsData = {
    1: {
        id: 1,
        company: 'Amazon Web Services',
        position: 'Senior Software Engineer',
        type: 'CLT',
        value: 'R$ 18.500',
        deadline: 'Hoje até 18:00',
        representative: 'Roberto Silva',
        role: 'Tech Recruiter',
        status: 'urgent',
        pdfUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
        signUrl: 'https://docusign.com/sign/aws-contract'
    },
    2: {
        id: 2,
        company: 'Itaú Unibanco',
        position: 'Desenvolvedor Full Stack',
        type: 'CLT',
        value: 'R$ 15.200',
        deadline: '22 Jul - 5 dias',
        representative: 'Ana Paula',
        role: 'HR Manager',
        status: 'pending',
        pdfUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
        signUrl: 'https://docusign.com/sign/itau-contract'
    },
    3: {
        id: 3,
        company: 'iFood',
        position: 'Tech Lead Frontend',
        type: 'PJ',
        value: 'R$ 22.000',
        deadline: '25 Jul - 8 dias',
        representative: 'Carlos Santos',
        role: 'Engineering Manager',
        status: 'pending',
        pdfUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
        signUrl: 'https://docusign.com/sign/ifood-contract'
    },
    4: {
        id: 4,
        company: 'Nubank',
        position: 'Backend Engineer',
        type: 'CLT',
        value: 'R$ 16.800',
        deadline: '28 Jul - 11 dias',
        representative: 'Maria Fernanda',
        role: 'People Partner',
        status: 'pending',
        pdfUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
        signUrl: 'https://docusign.com/sign/nubank-contract'
    },
    5: {
        id: 5,
        company: 'Stone Pagamentos',
        position: 'Senior DevOps Engineer',
        type: 'PJ',
        value: 'R$ 19.500',
        deadline: 'Amanhã até 12:00',
        representative: 'Lucas Silva',
        role: 'Tech Lead',
        status: 'urgent',
        pdfUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
        signUrl: 'https://docusign.com/sign/stone-contract'
    }
};

// Estado atual dos filtros
let currentFilter = 'all';
let currentSort = 'deadline';
let searchTerm = '';
let isInitialized = false;

// Inicialização principal
function initializeContracts() {
    console.log('🔄 Inicializando Contratos a Assinar...');
    
    if (isInitialized) {
        console.log('⚠️ Contratos já inicializados');
        return;
    }

    try {
        setupFilters();
        setupSearch();
        setupSort();
        setupModal();
        setupKeyboardShortcuts();
        addNotificationStyles();
        updateContractCounts();
        
        isInitialized = true;
        console.log('✅ Contratos inicializados com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao inicializar contratos:', error);
    }
}

// Configurar filtros
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active de todos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active ao clicado
            this.classList.add('active');
            
            // Atualiza filtro
            currentFilter = this.dataset.filter;
            
            // Aplica filtro
            applyFilters();
        });
    });
}

// Configurar busca
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchTerm = this.value.toLowerCase();
            applyFilters();
        });
    }
}

// Configurar ordenação
function setupSort() {
    const sortBtn = document.querySelector('.sort-btn');
    
    if (sortBtn) {
        sortBtn.addEventListener('click', toggleSort);
    }
}

// Configurar modal
function setupModal() {
    const modal = document.getElementById('contract-modal');
    const closeBtn = document.querySelector('.close-modal');

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeContractModal();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeContractModal);
    }
}

// Aplicar filtros
function applyFilters() {
    const rows = document.querySelectorAll('.contract-row');
    let visibleCount = 0;

    rows.forEach(row => {
        let shouldShow = true;

        // Filtro por tipo
        if (currentFilter !== 'all') {
            if (currentFilter === 'urgent') {
                shouldShow = row.classList.contains('urgent');
            } else {
                shouldShow = row.dataset.type === currentFilter;
            }
        }

        // Filtro por busca
        if (shouldShow && searchTerm) {
            const companyName = row.querySelector('.company-name');
            const position = row.querySelector('.position-title');
            const value = row.querySelector('.value-amount');
            const representative = row.querySelector('.rep-name');

            const textToSearch = [
                companyName ? companyName.textContent.toLowerCase() : '',
                position ? position.textContent.toLowerCase() : '',
                value ? value.textContent.toLowerCase() : '',
                representative ? representative.textContent.toLowerCase() : ''
            ].join(' ');

            shouldShow = textToSearch.includes(searchTerm);
        }

        // Mostrar/ocultar linha
        row.style.display = shouldShow ? '' : 'none';
        if (shouldShow) visibleCount++;
    });

    // Mostrar/ocultar empty state
    const emptyState = document.querySelector('.empty-state');
    const tableContainer = document.querySelector('.contracts-table-container');

    if (emptyState && tableContainer) {
        if (visibleCount === 0) {
            emptyState.style.display = 'block';
            tableContainer.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            tableContainer.style.display = 'block';
        }
    }
}

// Alternar ordenação
function toggleSort() {
    const rows = Array.from(document.querySelectorAll('.contract-row'));
    const tbody = document.querySelector('.contracts-table tbody');

    if (rows.length === 0 || !tbody) return;

    // Ordenar por urgência primeiro, depois por empresa
    rows.sort((a, b) => {
        const aUrgent = a.classList.contains('urgent');
        const bUrgent = b.classList.contains('urgent');

        if (aUrgent && !bUrgent) return -1;
        if (!aUrgent && bUrgent) return 1;

        // Ordenar por empresa
        const aCompany = a.querySelector('.company-name');
        const bCompany = b.querySelector('.company-name');
        
        const aText = aCompany ? aCompany.textContent : '';
        const bText = bCompany ? bCompany.textContent : '';

        return aText.localeCompare(bText);
    });

    // Reordenar no DOM
    rows.forEach(row => tbody.appendChild(row));

    // Feedback visual
    const sortBtn = document.querySelector('.sort-btn');
    if (sortBtn) {
        sortBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            sortBtn.style.transform = 'scale(1)';
        }, 150);
    }

    showNotification('Contratos reordenados!', 'success');
}

// Atualizar contadores
function updateContractCounts() {
    const allRows = document.querySelectorAll('.contract-row');
    const urgentRows = document.querySelectorAll('.contract-row.urgent');
    const cltRows = document.querySelectorAll('.contract-row[data-type="clt"]');
    const pjRows = document.querySelectorAll('.contract-row[data-type="pj"]');

    // Atualizar badges dos filtros
    const counters = {
        all: document.querySelector('[data-filter="all"] .filter-count'),
        clt: document.querySelector('[data-filter="clt"] .filter-count'),
        pj: document.querySelector('[data-filter="pj"] .filter-count'),
        urgent: document.querySelector('[data-filter="urgent"] .filter-count')
    };

    if (counters.all) counters.all.textContent = allRows.length;
    if (counters.clt) counters.clt.textContent = cltRows.length;
    if (counters.pj) counters.pj.textContent = pjRows.length;
    if (counters.urgent) counters.urgent.textContent = urgentRows.length;

    // Atualizar estatísticas do header
    const urgentStat = document.querySelector('.stat-item.urgent .stat-number');
    const totalStat = document.querySelector('.stat-item.total .stat-number');

    if (urgentStat) urgentStat.textContent = urgentRows.length;
    if (totalStat) totalStat.textContent = allRows.length;
}

// Atualizar contratos
function refreshContracts() {
    const refreshBtn = document.querySelector('.refresh-btn');
    if (!refreshBtn) return;

    const originalContent = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<span class="material-icons-outlined rotating">refresh</span> Atualizando...';
    refreshBtn.disabled = true;

    setTimeout(() => {
        refreshBtn.innerHTML = originalContent;
        refreshBtn.disabled = false;
        showNotification('Contratos atualizados com sucesso!', 'success');
        applyFilters();
        updateContractCounts();
    }, 1500);
}

// Assinar contrato
function signContract(contractId) {
    const contract = contractsData[contractId];
    if (!contract) {
        showNotification('Contrato não encontrado!', 'error');
        return;
    }

    if (confirm(`Deseja assinar o contrato da ${contract.company}?`)) {
        showNotification('Redirecionando para assinatura...', 'info');
        
        setTimeout(() => {
            window.open(contract.signUrl, '_blank');
            showNotification('Link de assinatura aberto!', 'success');
        }, 1000);
    }
}

// Visualizar contrato
function viewContract(contractId) {
    const contract = contractsData[contractId];
    if (!contract) {
        showNotification('Contrato não encontrado!', 'error');
        return;
    }

    const modal = document.getElementById('contract-modal');
    const modalTitle = document.getElementById('modal-title');
    const iframe = document.getElementById('contract-iframe');

    if (!modal || !modalTitle || !iframe) {
        showNotification('Erro ao abrir modal!', 'error');
        return;
    }

    modalTitle.textContent = `Contrato - ${contract.company}`;
    iframe.src = contract.pdfUrl;
    modal.style.display = 'block';
    
    window.currentContractId = contractId;
    showNotification('Carregando contrato...', 'info');
}

// Baixar contrato
function downloadContract(contractId) {
    const contract = contractsData[contractId];
    if (!contract) {
        showNotification('Contrato não encontrado!', 'error');
        return;
    }

    showNotification('Iniciando download...', 'info');

    setTimeout(() => {
        const link = document.createElement('a');
        link.href = contract.pdfUrl;
        link.download = `contrato-${contract.company.toLowerCase().replace(/\s+/g, '-')}.pdf`;
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showNotification('Download iniciado!', 'success');
    }, 500);
}

// Fechar modal
function closeContractModal() {
    const modal = document.getElementById('contract-modal');
    const iframe = document.getElementById('contract-iframe');

    if (modal) modal.style.display = 'none';
    if (iframe) iframe.src = '';
    
    window.currentContractId = null;
}

// Mostrar notificação
function showNotification(message, type) {
    // Remove notificação existente
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        info: 'info'
    };

    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };

    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon material-icons-outlined">${icons[type]}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <span class="material-icons-outlined">close</span>
        </button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        border-left: 4px solid ${colors[type]};
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) notification.remove();
            }, 300);
        }
    }, 4000);
}

// Adicionar estilos de notificação
function addNotificationStyles() {
    if (document.getElementById('notification-styles')) return;

    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 8px;
            flex: 1;
        }
        .notification-icon { font-size: 20px; }
        .notification-message {
            font-size: 14px;
            font-weight: 500;
            color: #374151;
        }
        .notification-close {
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        .notification-close:hover {
            background: #f3f4f6;
            color: #6b7280;
        }
        .rotating {
            animation: rotate 1s linear infinite;
        }
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
}

// Atalhos de teclado
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeContractModal();
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            refreshContracts();
        }
    });
}

// Função de navegação
function goBack() {
    window.history.back();
}

// Cleanup para SPA
function cleanup() {
    const modal = document.getElementById('contract-modal');
    if (modal) modal.style.display = 'none';
    
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(n => n.remove());
    
    currentFilter = 'all';
    searchTerm = '';
    isInitialized = false;
}

// Exportar funções globais
window.signContract = signContract;
window.viewContract = viewContract;
window.downloadContract = downloadContract;
window.closeContractModal = closeContractModal;
window.refreshContracts = refreshContracts;
window.toggleSort = toggleSort;
window.goBack = goBack;
window.initializeContracts = initializeContracts;
window.cleanup = cleanup;

// Auto-inicialização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContracts);
} else {
    setTimeout(initializeContracts, 100);
}

console.log('📋 Módulo Contratos carregado!');