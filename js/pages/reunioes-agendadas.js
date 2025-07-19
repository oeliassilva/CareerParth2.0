// js/pages/reunioes-agendadas.js

// Dados das reuniões (simulados)
const meetingsData = {
    1: {
        title: "Conversa Inicial - Vaga Desenvolvedor Senior",
        datetime: "Quinta-feira, 17 de Julho de 2025 - 10:00",
        duration: "30 minutos",
        person: "Roberto Silva - Tech Recruiter",
        company: "Amazon Web Services (AWS)",
        subject: "Discussão inicial sobre a vaga de Desenvolvedor Senior Java/Spring Boot. Apresentação do candidato e overview da posição.",
        location: "Online - Google Meet",
        link: "https://meet.google.com/abc-defg-hij",
        type: "online"
    },
    2: {
        title: "Entrevista Técnica - Backend Java",
        datetime: "Quinta-feira, 17 de Julho de 2025 - 14:00",
        duration: "60 minutos",
        person: "Ana Paula Santos - Tech Lead",
        company: "Itaú Unibanco",
        subject: "Entrevista técnica focada em Java, Spring Boot, microserviços e arquitetura de sistemas. Resolução de problemas práticos.",
        location: "Online - Microsoft Teams",
        link: "https://teams.microsoft.com/l/meetup-join/xyz123",
        type: "online"
    },
    3: {
        title: "Apresentação da Empresa e Cultura",
        datetime: "Quinta-feira, 17 de Julho de 2025 - 16:30",
        duration: "45 minutos",
        person: "Carlos Mendes - HR Business Partner",
        company: "iFood",
        subject: "Apresentação da cultura organizacional, benefícios, estrutura da empresa e próximos passos do processo seletivo.",
        location: "Presencial - Escritório São Paulo",
        address: "Rua Fidêncio Ramos, 308 - Vila Olímpia, São Paulo - SP, 04551-010",
        type: "presencial"
    }
};

const setupCalendarControls = () => {
    const viewButtons = document.querySelectorAll('.view-btn');
    const navButtons = document.querySelectorAll('.nav-btn');
    const todayButton = document.querySelector('.btn-today');

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Simular mudança de visualização
            const view = button.textContent.toLowerCase();
            console.log(`Mudando para visualização: ${view}`);

            // Aqui você pode implementar a lógica para diferentes visualizações
            if (view === 'semana') {
                // Lógica para visualização semanal
            } else if (view === 'mês') {
                // Lógica para visualização mensal
            }
        });
    });

    // Navegação de datas
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const currentDateSpan = document.querySelector('.current-date');

    if (prevBtn && nextBtn && currentDateSpan) {
        prevBtn.addEventListener('click', () => {
            console.log('Navegando para data anterior...');
            // Aqui você implementaria a lógica para voltar no tempo
        });

        nextBtn.addEventListener('click', () => {
            console.log('Navegando para próxima data...');
            // Aqui você implementaria a lógica para avançar no tempo
        });
    }

    if (todayButton) {
        todayButton.addEventListener('click', () => {
            console.log('Voltando para hoje...');
            currentDateSpan.textContent = 'Julho 2025';
            // Aqui você resetaria para a data atual
        });
    }
};

// Função para abrir link da reunião
window.openMeetingLink = (link) => {
    if (link) {
        // Mostrar confirmação antes de abrir
        if (confirm('Deseja entrar na reunião agora?')) {
            window.open(link, '_blank');
        }
    } else {
        alert('Link da reunião não disponível.');
    }
};

// Função para copiar link da reunião
window.copyMeetingLink = (link) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
            // Feedback visual
            showToast('Link copiado para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar link:', err);
            fallbackCopyTextToClipboard(link);
        });
    } else {
        fallbackCopyTextToClipboard(link);
    }
};

// Fallback para copiar texto (navegadores mais antigos)
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('Link copiado para a área de transferência!');
        } else {
            alert('Não foi possível copiar o link. Copie manualmente: ' + text);
        }
    } catch (err) {
        alert('Não foi possível copiar o link. Copie manualmente: ' + text);
    }

    document.body.removeChild(textArea);
}

// Função para abrir direções no Google Maps
window.openDirections = (address) => {
    if (address) {
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
        window.open(mapsUrl, '_blank');
    } else {
        alert('Endereço não disponível.');
    }
};

// Função para mostrar detalhes da reunião no modal
window.showMeetingDetails = (meetingId) => {
    const meeting = meetingsData[meetingId];
    if (!meeting) {
        alert('Detalhes da reunião não encontrados.');
        return;
    }

    // Preencher modal com dados da reunião
    document.getElementById('modal-title').textContent = meeting.title;
    document.getElementById('modal-datetime').textContent = meeting.datetime;
    document.getElementById('modal-duration').textContent = meeting.duration;
    document.getElementById('modal-person').textContent = meeting.person;
    document.getElementById('modal-company').textContent = meeting.company;
    document.getElementById('modal-subject').textContent = meeting.subject;
    document.getElementById('modal-location').textContent = meeting.location;

    // Mostrar/ocultar seções baseado no tipo
    const linkSection = document.getElementById('modal-link-section');
    const addressSection = document.getElementById('modal-address-section');

    if (meeting.type === 'online') {
        linkSection.style.display = 'block';
        addressSection.style.display = 'none';
        document.getElementById('modal-link').value = meeting.link;
    } else {
        linkSection.style.display = 'none';
        addressSection.style.display = 'block';
        document.getElementById('modal-address').textContent = meeting.address;
    }

    // Mostrar modal
    document.getElementById('meeting-modal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevenir scroll do body
};

// Função para fechar modal
window.closeMeetingModal = () => {
    document.getElementById('meeting-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll do body
};

// Função para mostrar toast de feedback
function showToast(message) {
    // Remover toast existente se houver
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Criar novo toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;

    // Adicionar animação CSS
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Remover toast após 3 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Event listeners para fechar modal
const setupModalEvents = () => {
    const modal = document.getElementById('meeting-modal');

    // Fechar modal clicando fora dele
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeMeetingModal();
        }
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeMeetingModal();
        }
    });
};

// Função para atualizar próxima reunião na sidebar
const updateNextMeeting = () => {
    // Esta função pode ser expandida para calcular dinamicamente a próxima reunião
    // baseado na data/hora atual
    console.log('Atualizando próxima reunião...');
};

// Função principal de inicialização
export function init() {
    console.log("Reuniões Agendadas carregada e inicializada.");

    setupCalendarControls();
    setupModalEvents();
    updateNextMeeting();

    // Adicionar event listeners para hover nos eventos
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', () => {
            item.style.zIndex = '1';
        });
    });

    console.log('Todas as funcionalidades das reuniões foram inicializadas.');
}

// Função para adicionar nova reunião (para futuras implementações)
window.addNewMeeting = (meetingData) => {
    // Esta função pode ser usada para adicionar novas reuniões dinamicamente
    console.log('Adicionando nova reunião:', meetingData);
};

// Função para editar reunião existente (para futuras implementações)
window.editMeeting = (meetingId, newData) => {
    // Esta função pode ser usada para editar reuniões existentes
    console.log('Editando reunião:', meetingId, newData);
};