// js/pages/perfil.js

const subRoutes = {
    'painel': {
        template: '/templates/perfil-dashboard.html',
        script: '/js/pages/perfil-dashboard.js'
    },
    'resumo-dia': {
        template: '/templates/resumo-dia-detalhe.html',
        script: '/js/pages/resumo-dia-detalhe.js'
    },
    'reunioes-agendadas': {
        template: '/templates/reunioes-agendadas.html',
        script: '/js/pages/reunioes-agendadas.js'
    },
    'contratos-assinar': {
        template: '/templates/contratos-assinar.html',
        script: '/js/pages/contratos-assinar.js'
    },
    'visitas-perfil': {
        template: '/templates/visitas-perfil.html',
        script: '/js/pages/visitas-perfil.js'
    },
    'hardskills': {
        template: '/templates/hardskills-detalhe.html', 
        script: '/js/pages/hardskills-detalhe.js'
    },
    'softskills': {
        template: '/templates/softskills-detalhe.html', 
        script: '/js/pages/softskills-detalhe.js'
    },
    'vagas': {
        template: '/templates/vagas.html',
        script: '/js/pages/vagas.js'
    },
    'projetos': {
        template: '/templates/projetos-detalhe.html',
        script: '/js/pages/projetos-detalhe.js'
    },
    'certificacoes': {
        template: '/templates/certificacoes-detalhe.html',
        script: '/js/pages/certificacoes-detalhe.js'
    },
    'curriculo': {
        template: '/templates/curriculo-detalhe.html',
        script: '/js/pages/curriculo-detalhe.js'
    }
};

const loadSubPage = async () => {
    const hash = window.location.hash;
    // Se for apenas #perfil, carrega o painel principal
    const subpageKey = hash.split('/')[1] || 'painel';
    const contentContainer = document.getElementById('perfil-content');

    const route = subRoutes[subpageKey] || subRoutes['painel'];
    
    if (contentContainer && route.template) {
        try {
            const response = await fetch(route.template);
            if (!response.ok) throw new Error(`HTML da sub-página não encontrado: ${route.template}`);
            
            contentContainer.innerHTML = await response.text();

            // Após carregar o template, configura os botões de explorar
            if (subpageKey === 'painel') {
                setupExploreButtons();
            }

            if (route.script) {
                const pageModule = await import(route.script);
                if (pageModule.init) pageModule.init();
            }
        } catch(error) {
            console.error(error);
            contentContainer.innerHTML = `<h3>Seção não encontrada. Crie o arquivo /templates/${subpageKey}-detalhe.html</h3>`;
        }
    }
};

// Função para configurar navegação pelos botões Explorar
const setupExploreButtons = () => {
    console.log('🔧 Configurando botões de explorar...');
    
    // Mapeamento dos cards para suas rotas
    const cardRoutes = {
        'resumo': '#perfil/resumo-dia',
        'hardskills': '#perfil/hardskills', 
        'softskills': '#perfil/softskills',
        'vagas': '#perfil/vagas',
        'projetos': '#perfil/projetos',
        'certificacoes': '#perfil/certificacoes',
        'curriculo': '#perfil/curriculo'
    };

    // Aguarda um pouco para garantir que os elementos estão no DOM
    setTimeout(() => {
        const exploreButtons = document.querySelectorAll('.btn-explore');
        
        exploreButtons.forEach(button => {
            const card = button.closest('.dashboard-card');
            const cardType = card ? card.dataset.card : null;
            
            if (cardType && cardRoutes[cardType]) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    console.log(`🎯 Navegando para: ${cardType} -> ${cardRoutes[cardType]}`);
                    
                    // Efeito visual no botão
                    button.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                    }, 150);
                    
                    // Navega para a rota correspondente
                    window.location.hash = cardRoutes[cardType];
                });
                
                console.log(`✅ Botão configurado: ${cardType} -> ${cardRoutes[cardType]}`);
            } else {
                console.warn(`⚠️ Card sem rota definida: ${cardType}`);
            }
        });
        
        console.log(`🎉 ${exploreButtons.length} botões de explorar configurados!`);
    }, 100);
};

// Função para voltar ao painel principal
window.voltarAoPainel = () => {
    window.location.hash = '#perfil';
};

export function init() {
    console.log('🚀 Módulo Perfil carregado!');
    
    const handleHashChange = () => {
        if (window.location.hash.startsWith('#perfil')) {
            loadSubPage();
        }
    };
    
    // Carrega a página inicial
    loadSubPage();
    
    // Escuta mudanças na URL
    window.addEventListener('hashchange', handleHashChange);
    
    console.log('✅ Sistema de navegação do perfil inicializado!');
}