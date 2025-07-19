// Visitas ao Perfil - JavaScript Corrigido

// Dados simulados de visitas com datas variadas para testar filtros
const visitorsData = [
    // VISITAS DE HOJE
    {
        id: 1,
        name: "Ana Silva",
        title: "Tech Recruiter",
        company: "Amazon",
        avatar: "AS",
        time: "2h atrás",
        type: "recruiter",
        date: new Date()
    },
    {
        id: 2,
        name: "Carlos Santos",
        title: "Senior Software Engineer",
        company: "Google",
        avatar: "CS",
        time: "3h atrás",
        type: "user",
        date: new Date()
    },
    {
        id: 3,
        name: "Marina Costa",
        title: "Head of Engineering",
        company: "Microsoft",
        avatar: "MC",
        time: "5h atrás",
        type: "recruiter",
        date: new Date()
    },
    {
        id: 4,
        name: "Roberto Lima",
        title: "DevOps Engineer",
        company: "Meta",
        avatar: "RL",
        time: "6h atrás",
        type: "user",
        date: new Date()
    },
    {
        id: 5,
        name: "Juliana Ferreira",
        title: "Talent Acquisition",
        company: "Netflix",
        avatar: "JF",
        time: "8h atrás",
        type: "recruiter",
        date: new Date()
    },
    
    // VISITAS DE ONTEM
    {
        id: 6,
        name: "Pedro Oliveira",
        title: "Full Stack Developer",
        company: "Spotify",
        avatar: "PO",
        time: "1 dia atrás",
        type: "user",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
        id: 7,
        name: "Camila Rocha",
        title: "Engineering Manager",
        company: "Uber",
        avatar: "CR",
        time: "1 dia atrás",
        type: "recruiter",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    
    // VISITAS DESTA SEMANA (2-3 dias atrás)
    {
        id: 8,
        name: "Lucas Almeida",
        title: "Data Scientist",
        company: "Airbnb",
        avatar: "LA",
        time: "2 dias atrás",
        type: "user",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
        id: 9,
        name: "Fernanda Dias",
        title: "Product Manager",
        company: "Tesla",
        avatar: "FD",
        time: "3 dias atrás",
        type: "user",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
        id: 10,
        name: "Gabriel Martins",
        title: "Senior Recruiter",
        company: "Apple",
        avatar: "GM",
        time: "4 dias atrás",
        type: "recruiter",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    },
    
    // VISITAS MAIS ANTIGAS (semana passada)
    {
        id: 11,
        name: "Thiago Mendes",
        title: "Backend Developer",
        company: "Nubank",
        avatar: "TM",
        time: "8 dias atrás",
        type: "user",
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    },
    {
        id: 12,
        name: "Larissa Costa",
        title: "Tech Lead",
        company: "iFood",
        avatar: "LC",
        time: "10 dias atrás",
        type: "recruiter",
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    }
];

let currentFilter = 'all';

// Função para renderizar a lista de visitantes
function renderVisits(data) {
    console.log('🎯 Função renderVisits chamada com', data.length, 'visitantes');
    
    const visitsList = document.getElementById('visitsList');
    
    if (!visitsList) {
        console.error('❌ ERRO: Elemento visitsList não encontrado no DOM');
        return;
    }
    
    console.log('✅ Elemento visitsList encontrado');
    
    if (data.length === 0) {
        visitsList.innerHTML = `
            <div class="empty-state">
                <span class="material-icons-outlined">visibility_off</span>
                <h3>Nenhuma visita encontrada</h3>
                <p>Não há visitas para os filtros selecionados.</p>
            </div>
        `;
        console.log('📭 Estado vazio renderizado');
        return;
    }

    const html = data.map((visitor, index) => `
        <div class="visit-item">
            <div class="visitor-avatar">${visitor.avatar}</div>
            <div class="visitor-info">
                <div class="visitor-name">${visitor.name}</div>
                <div class="visitor-title">${visitor.title}</div>
                <div class="visitor-company">
                    <span class="material-icons-outlined" style="font-size: 12px;">business</span>
                    ${visitor.company}
                </div>
            </div>
            <div class="visit-meta">
                <div class="visit-time">${visitor.time}</div>
                <div class="visit-type ${visitor.type}">
                    ${visitor.type === 'recruiter' ? 'Recrutador' : 'Usuário'}
                </div>
            </div>
            <div class="visit-actions">
                <button class="action-btn" onclick="viewProfile(${visitor.id})">
                    Ver perfil
                </button>
                ${visitor.type === 'recruiter' ? 
                    '<button class="action-btn" onclick="connectWithRecruiter(' + visitor.id + ')">Conectar</button>' : 
                    '<button class="action-btn" onclick="sendMessage(' + visitor.id + ')">Mensagem</button>'
                }
            </div>
        </div>
    `).join('');

    visitsList.innerHTML = html;
    console.log('✅ Lista de visitantes renderizada com sucesso -', data.length, 'itens');
}

// Função para filtrar visitas - VERSÃO SIMPLIFICADA PARA DEBUG
function filterVisits(filter, buttonElement) {
    console.log('🔍 Função filterVisits chamada com filtro:', filter);
    console.log('🖱️ Elemento botão:', buttonElement);
    
    try {
        currentFilter = filter;
        
        // Atualizar botões de filtro
        const allButtons = document.querySelectorAll('.filter-btn');
        console.log('🔘 Botões encontrados:', allButtons.length);
        
        allButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (buttonElement) {
            buttonElement.classList.add('active');
            console.log('✅ Botão ativo definido');
        }

        let filteredData = [];
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        console.log('📅 Data de hoje:', startOfToday.toDateString());
        console.log('📅 Data semana passada:', weekAgo.toDateString());

        switch(filter) {
            case 'recruiter':
                filteredData = visitorsData.filter(v => v.type === 'recruiter');
                console.log(`👔 Filtro Recrutadores: ${filteredData.length} encontrados`);
                break;
                
            case 'user':
                filteredData = visitorsData.filter(v => v.type === 'user');
                console.log(`👤 Filtro Usuários: ${filteredData.length} encontrados`);
                break;
                
            case 'today':
                filteredData = visitorsData.filter(v => {
                    const visitDate = new Date(v.date.getFullYear(), v.date.getMonth(), v.date.getDate());
                    const isToday = visitDate.getTime() === startOfToday.getTime();
                    console.log(`📅 ${v.name}: ${visitDate.toDateString()} é hoje? ${isToday}`);
                    return isToday;
                });
                console.log(`📅 Filtro Hoje: ${filteredData.length} visitas hoje`);
                break;
                
            case 'week':
                filteredData = visitorsData.filter(v => {
                    const isThisWeek = v.date >= weekAgo;
                    console.log(`📅 ${v.name}: ${v.date.toDateString()} é desta semana? ${isThisWeek}`);
                    return isThisWeek;
                });
                console.log(`📅 Filtro Esta Semana: ${filteredData.length} visitas nos últimos 7 dias`);
                break;
                
            default: // 'all'
                filteredData = visitorsData;
                console.log(`📊 Filtro Todos: ${filteredData.length} visitas totais`);
        }

        // Ordenar por data (mais recente primeiro)
        filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        console.log('🔄 Dados filtrados e ordenados:', filteredData.map(v => `${v.name} (${v.type})`));
        
        // Renderizar dados filtrados
        renderVisits(filteredData);
        
        console.log('✅ Filtro aplicado com sucesso!');
        
    } catch (error) {
        console.error('❌ ERRO na função filterVisits:', error);
    }
}

// Função para voltar ao resumo do dia
function goBack() {
    console.log('⬅️ Voltando para o Resumo do Dia...');
    alert('Navegando de volta para o Resumo do Dia...');
    // window.location.hash = '#perfil/resumo-dia';
}

// Função para visualizar perfil do visitante
function viewProfile(visitorId) {
    console.log('👁️ Visualizando perfil ID:', visitorId);
    const visitor = visitorsData.find(v => v.id === visitorId);
    if (visitor) {
        console.log('✅ Visitante encontrado:', visitor);
        alert(`Visualizando perfil de ${visitor.name} - ${visitor.company}`);
    } else {
        console.error('❌ Visitante não encontrado');
    }
}

// Função para conectar com recrutador
function connectWithRecruiter(visitorId) {
    console.log('🤝 Conectando com recrutador ID:', visitorId);
    const visitor = visitorsData.find(v => v.id === visitorId);
    if (visitor) {
        console.log('✅ Recrutador encontrado:', visitor);
        alert(`Solicitação de conexão enviada para ${visitor.name} (${visitor.company})`);
    }
}

// Função para enviar mensagem
function sendMessage(visitorId) {
    console.log('💬 Enviando mensagem para ID:', visitorId);
    const visitor = visitorsData.find(v => v.id === visitorId);
    if (visitor) {
        console.log('✅ Usuário encontrado:', visitor);
        alert(`Abrindo chat com ${visitor.name}`);
    }
}

// Função para otimizar perfil
function optimizeProfile() {
    console.log('⚙️ Otimizando perfil...');
    alert('Redirecionando para otimização de perfil...');
}

// Função para compartilhar perfil
function shareProfile() {
    console.log('📤 Compartilhando perfil...');
    alert('Funcionalidade de compartilhamento ativada!');
}

// Função de inicialização
function initVisitasPerfil() {
    console.log('🚀 Inicializando página de Visitas ao Perfil...');
    console.log('📊 Total de visitantes nos dados:', visitorsData.length);
    
    // Verificar se elementos existem
    const visitsList = document.getElementById('visitsList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    console.log('🎯 Elemento visitsList:', visitsList ? 'ENCONTRADO' : 'NÃO ENCONTRADO');
    console.log('🔘 Botões de filtro encontrados:', filterButtons.length);
    
    if (!visitsList) {
        console.error('❌ ERRO CRÍTICO: visitsList não encontrado!');
        return;
    }
    
    // Renderizar todos os visitantes inicialmente (ordenados por data)
    const sortedData = [...visitorsData].sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log('📝 Renderizando dados iniciais...');
    renderVisits(sortedData);
    
    console.log('✅ Inicialização da página de visitas completa!');
}

// Aguardar carregamento do DOM
if (document.readyState === 'loading') {
    console.log('⏳ DOM ainda carregando, aguardando...');
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ DOM carregado, inicializando...');
        initVisitasPerfil();
    });
} else {
    console.log('✅ DOM já carregado, inicializando imediatamente...');
    initVisitasPerfil();
}

// Tornar funções globais para onclick funcionar
window.filterVisits = filterVisits;
window.goBack = goBack;
window.viewProfile = viewProfile;
window.connectWithRecruiter = connectWithRecruiter;
window.sendMessage = sendMessage;
window.optimizeProfile = optimizeProfile;
window.shareProfile = shareProfile;

console.log('🌐 Funções globais definidas:', {
    filterVisits: typeof window.filterVisits,
    goBack: typeof window.goBack,
    viewProfile: typeof window.viewProfile,
    connectWithRecruiter: typeof window.connectWithRecruiter,
    sendMessage: typeof window.sendMessage,
    optimizeProfile: typeof window.optimizeProfile,
    shareProfile: typeof window.shareProfile
});