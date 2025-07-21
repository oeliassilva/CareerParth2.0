// js/pages/perfil-dashboard.js - Versão com Compass IA Integrada

// Configuração de animações e efeitos sem movimento
const setupProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Observer para animar quando entrar na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.dataset.progress || '0';
                
                // Animação com delay progressivo
                setTimeout(() => {
                    bar.style.width = progress + '%';
                    
                    // Adicionar efeito de brilho após a animação
                    setTimeout(() => {
                        bar.classList.add('progress-animated');
                    }, 1000);
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
};

// Animação dos círculos de soft skills
const setupSoftSkillsAnimation = () => {
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percent = circle.dataset.percent || '0';
                
                // Animar o círculo
                setTimeout(() => {
                    const color1 = percent >= 90 ? '#FF6B47' : '#FF8A6B';
                    const color2 = '#f8f9fa';
                    circle.style.background = `conic-gradient(${color1} ${percent}%, ${color2} 0)`;
                    
                    // Adicionar classe para animação adicional
                    circle.classList.add('circle-animated');
                }, Math.random() * 500);
            }
        });
    }, { threshold: 0.5 });
    
    skillCircles.forEach(circle => observer.observe(circle));
};

// Animação das estatísticas do resumo
const animateNumbers = () => {
    const summaryValues = document.querySelectorAll('.summary-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseInt(element.textContent);
                
                animateCounter(element, 0, targetValue, 1500);
            }
        });
    }, { threshold: 0.5 });
    
    summaryValues.forEach(value => observer.observe(value));
};

// Função para animar contadores
const animateCounter = (element, start, end, duration) => {
    const startTime = performance.now();
    
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Usar easing function para animação mais suave
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = end;
            element.classList.add('number-animated');
        }
    };
    
    requestAnimationFrame(animate);
};

// Efeitos simples nos cards - SEM MOVIMENTO
const setupCardHoverEffects = () => {
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
        // Apenas mudança de sombra - SEM movimento
        card.addEventListener('mouseenter', (e) => {
            e.target.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
            e.target.style.transition = 'box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', (e) => {
            e.target.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        });
    });
};

// Animação de entrada dos cards - MAIS SUTIL
const setupCardEntranceAnimation = () => {
    const cards = document.querySelectorAll('.dashboard-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.classList.add('card-visible');
                }, index * 50); // Delay menor
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transition = 'opacity 0.4s ease'; // Apenas fade in
        observer.observe(card);
    });
};

// Efeito de typing no nome do usuário - MANTIDO
const setupTypingEffect = () => {
    const welcomeText = document.querySelector('.welcome-text h2');
    if (welcomeText) {
        const originalText = welcomeText.textContent;
        welcomeText.textContent = '';
        
        let index = 0;
        const typeChar = () => {
            if (index < originalText.length) {
                welcomeText.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeChar, 100);
            }
        };
        
        setTimeout(typeChar, 500);
    }
};

// COMPASS IA - FUNCIONALIDADES
const setupCompassIA = () => {
    const compassBtn = document.getElementById('compass-perfil-btn');
    const compassContent = document.getElementById('compass-insights-content');
    const modal = document.getElementById('compass-perfil-modal');
    
    if (compassBtn) {
        compassBtn.addEventListener('click', () => {
            handleCompassAnalysis();
        });
    }
    
    // Setup modal listeners
    setupCompassModalListeners();
};

const handleCompassAnalysis = () => {
    const btn = document.getElementById('compass-perfil-btn');
    const modal = document.getElementById('compass-perfil-modal');
    
    // Mostrar modal
    showModal(modal);
    
    // Mostrar loading
    const loading = document.getElementById('compass-perfil-loading');
    const result = document.getElementById('compass-perfil-result');
    
    loading.style.display = 'block';
    result.style.display = 'none';
    
    // Simular processamento da IA
    setTimeout(() => {
        generateCompassProfileAnalysis();
        loading.style.display = 'none';
        result.style.display = 'block';
        
        // Também atualizar a seção de insights na página
        updateInsightsSection();
    }, 3500);
};

const generateCompassProfileAnalysis = () => {
    // Análise de posicionamento atual
    const currentPosition = document.getElementById('compass-current-position');
    currentPosition.innerHTML = `
        <div class="analysis-item">
            <strong>🎯 Nível Profissional:</strong> Desenvolvedor Front-End Júnior com sólido conhecimento em JavaScript (85%), HTML (83%) e CSS (81%)
        </div>
        <div class="analysis-item">
            <strong>💪 Pontos Fortes:</strong> Excelente liderança (96%) e trabalho em equipe (93%). Perfil equilibrado entre habilidades técnicas e interpessoais
        </div>
        <div class="analysis-item">
            <strong>📊 Posição no Mercado:</strong> Acima da média para profissionais júnior. Suas soft skills destacam você de outros candidatos
        </div>
    `;
    
    // Oportunidades identificadas
    const opportunities = document.getElementById('compass-opportunities');
    opportunities.innerHTML = `
        <div class="analysis-item">
            <strong>🚀 Mercado Aquecido:</strong> Demanda por desenvolvedores React cresceu 40% nos últimos 6 meses
        </div>
        <div class="analysis-item">
            <strong>💰 Potencial Salarial:</strong> Com suas skills atuais, faixa salarial de R$ 5.500 - R$ 7.800 em empresas como Itaú, Stone e Spotify
        </div>
        <div class="analysis-item">
            <strong>🎯 Match Perfeito:</strong> 3 vagas com alta compatibilidade (75%+) disponíveis agora
        </div>
    `;
    
    // Roadmap de crescimento
    const roadmap = document.getElementById('compass-growth-roadmap');
    roadmap.innerHTML = `
        <div class="analysis-item">
            <strong>📅 Próximos 3 meses:</strong> Foco em TypeScript e React avançado. Isso aumentará seu match para 90%+ nas melhores vagas
        </div>
        <div class="analysis-item">
            <strong>📅 6-12 meses:</strong> Adicionar Node.js ao seu stack para se tornar Full-Stack. Potencial salarial de R$ 8.000 - R$ 12.000
        </div>
        <div class="analysis-item">
            <strong>📅 Longo prazo:</strong> Com sua liderança excepcional, posições de Tech Lead em 2-3 anos são muito viáveis
        </div>
    `;
    
    // Recomendações de aprendizado
    const learning = document.getElementById('compass-learning-recommendations');
    learning.innerHTML = `
        <div class="recommendation-item">
            <div class="recommendation-icon"></div>
            <div class="recommendation-content">
                <h5>🔥 Prioridade Alta: TypeScript</h5>
                <p>Presente em 80% das vagas que combinam com seu perfil. ROI imediato no seu posicionamento</p>
            </div>
        </div>
        <div class="recommendation-item">
            <div class="recommendation-icon"></div>
            <div class="recommendation-content">
                <h5>⚡ Impacto Médio: React Hooks & Testing</h5>
                <p>Diferencial técnico que as empresas mais procuram. Jest e React Testing Library</p>
            </div>
        </div>
        <div class="recommendation-item">
            <div class="recommendation-icon"></div>
            <div class="recommendation-content">
                <h5>🚀 Visão Futura: Node.js Básico</h5>
                <p>Preparação para transição Full-Stack. Abrirá portas para posições sênior</p>
            </div>
        </div>
    `;
};

const updateInsightsSection = () => {
    const compassContent = document.getElementById('compass-insights-content');
    const btn = document.getElementById('compass-perfil-btn');
    
    // Atualizar texto do botão
    btn.innerHTML = `
        <span class="material-icons-outlined">refresh</span>
        Nova Análise
    `;
    
    // Mostrar seção de insights se estiver oculta
    if (compassContent.style.display === 'none') {
        compassContent.style.display = 'block';
        
        // Preencher cards de insights
        const careerPosition = document.getElementById('career-position-analysis');
        careerPosition.innerHTML = `
            <div class="analysis-item">
                <strong>Nível:</strong> Front-End Júnior
            </div>
            <div class="analysis-item">
                <strong>Destaque:</strong> Skills de liderança excepcionais (96%)
            </div>
            <div class="analysis-item">
                <strong>Potencial:</strong> Tech Lead em 2-3 anos
            </div>
        `;
        
        const marketTrends = document.getElementById('market-trends-analysis');
        marketTrends.innerHTML = `
            <div class="analysis-item">
                <strong>TypeScript:</strong> +40% de demanda
            </div>
            <div class="analysis-item">
                <strong>React:</strong> Skill mais requisitada
            </div>
            <div class="analysis-item">
                <strong>Salário médio:</strong> R$ 6.500 (Front-End Jr)
            </div>
        `;
        
        const nextSteps = document.getElementById('next-steps-analysis');
        nextSteps.innerHTML = `
            <div class="analysis-item">
                <strong>Imediato:</strong> Aprender TypeScript (2-3 semanas)
            </div>
            <div class="analysis-item">
                <strong>Curto prazo:</strong> React avançado + Testing
            </div>
            <div class="analysis-item">
                <strong>Médio prazo:</strong> Explorar Node.js
            </div>
        `;
        
        // Scroll suave para a seção
        compassContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const setupCompassModalListeners = () => {
    // Fechar modal
    const closeBtn = document.querySelector('#compass-perfil-modal .modal-close');
    const modal = document.getElementById('compass-perfil-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeModal(modal);
        });
    }
    
    // Fechar clicando fora
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }
};

const showModal = (modal) => {
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
};

const closeModal = (modal) => {
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
};

// Funcionalidade dos botões explorar - SEM EFEITOS VISUAIS EXCESSIVOS
const setupExploreButtons = () => {
    const exploreButtons = document.querySelectorAll('.btn-explore');
    
    exploreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Efeito simples no botão - SEM ripple
            button.style.transform = 'scale(0.98)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
            
            // Lógica de navegação será implementada pelo sistema de roteamento
            const cardType = button.closest('.dashboard-card').dataset.card;
            console.log(`Navegando para: ${cardType}`);
        });
    });
};

// Função principal de inicialização
export function init() {
    console.log("Dashboard do Perfil carregado com Compass IA integrada.");
    
    // Esperar um pouco para garantir que o DOM está totalmente carregado
    setTimeout(() => {
        setupCardEntranceAnimation();    // Apenas fade in
        setupProgressBars();             // Mantido
        setupSoftSkillsAnimation();      // Mantido
        animateNumbers();                // Mantido
        setupCardHoverEffects();         // Apenas sombra
        setupTypingEffect();             // Mantido
        setupExploreButtons();           // Efeito simples
        setupCompassIA();                // NOVO - Compass IA
        
        // Adicionar classes CSS para animações
        addCustomStyles();
        
        console.log("Dashboard com Compass IA inicializado!");
    }, 100);
}

// Estilos CSS customizados - SEM ANIMAÇÕES DE MOVIMENTO
const addCustomStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .progress-animated::after {
            animation-duration: 1.5s;
        }
        
        .circle-animated {
            /* Sem animação de movimento */
        }
        
        .number-animated {
            /* Sem animação de movimento */
        }
        
        .card-visible {
            box-shadow: 0 4px 20px rgba(44, 62, 80, 0.08) !important;
        }
        
        /* Transições suaves apenas para hover */
        .dashboard-card {
            transition: box-shadow 0.3s ease !important;
        }
        
        .btn-explore {
            transition: transform 0.1s ease !important;
        }
        
        /* Modal styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        }
        
        .modal-overlay.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 32px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
        }
        
        .modal-overlay.show .modal-content {
            transform: scale(1);
        }
        
        .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid #E9ECEF;
        }
        
        .modal-header h3 {
            color: #0D253F;
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6C757D;
            transition: color 0.3s ease;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-close:hover {
            color: #2C3E50;
            background: #F8F9FA;
        }
    `;
    
    document.head.appendChild(style);
};

// Inicialização automática se o script for carregado diretamente
if (typeof module === 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
}

// JavaScript Global - Efeito Header Fixo para Todas as Páginas
function setupGlobalStickyHeaderEffect() {
    const header = document.querySelector('.page-header');
    
    if (!header) {
        console.log('⚠️ Header não encontrado nesta página');
        return;
    }
    
    console.log('✅ Configurando header fixo global...');
    
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        // Se rolou para baixo mais de 10px
        if (currentScrollY > 10) {
            header.classList.add('scrolled');
        } else {
            // Se voltou para o topo
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    };
    
    // Remove listener antigo se existir
    window.removeEventListener('scroll', handleScroll);
    
    // Adiciona o novo listener
    window.addEventListener('scroll', handleScroll);
    
    console.log('✅ Efeito do header fixo configurado globalmente!');
}

// Função para aplicar em qualquer página da CareerPath
function initGlobalHeader() {
    // Aguarda um pouco para garantir que o DOM está carregado
    setTimeout(() => {
        setupGlobalStickyHeaderEffect();
    }, 100);
}

// Função que deve ser chamada por cada página individual
function setupPageHeader() {
    console.log('🎯 Inicializando header da página...');
    initGlobalHeader();
}

// Auto-execução se o DOM já estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalHeader);
} else {
    initGlobalHeader();
}

// Expor funções globalmente para uso em módulos
if (typeof window !== 'undefined') {
    window.setupPageHeader = setupPageHeader;
    window.setupGlobalStickyHeaderEffect = setupGlobalStickyHeaderEffect;
}

// Para sistemas de módulos ES6
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupPageHeader,
        setupGlobalStickyHeaderEffect,
        initGlobalHeader
    };
}