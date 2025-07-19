// js/pages/perfil-dashboard.js (Versão Sem Movimento dos Cards)

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
        
        // REMOVIDO: efeito de parallax e movimento do mouse
        // REMOVIDO: transform translateY e rotateX
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
                    // REMOVIDO: translateY movement
                    entry.target.classList.add('card-visible');
                }, index * 50); // Delay menor
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        // REMOVIDO: transform translateY
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

// REMOVIDO: setupAvatarAnimation (sem flutuação)
// REMOVIDO: setupWeatherAnimation (sem rotação)

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
            
            // Simular navegação (substitua pela lógica real)
            const cardType = button.closest('.dashboard-card').dataset.card;
            console.log(`Navegando para: ${cardType}`);
        });
    });
};

// Função principal de inicialização
export function init() {
    console.log("Dashboard do Perfil carregado (versão sem movimento).");
    
    // Esperar um pouco para garantir que o DOM está totalmente carregado
    setTimeout(() => {
        setupCardEntranceAnimation();    // Apenas fade in
        setupProgressBars();             // Mantido
        setupSoftSkillsAnimation();      // Mantido
        animateNumbers();                // Mantido
        setupCardHoverEffects();         // Apenas sombra
        setupTypingEffect();             // Mantido
        setupExploreButtons();           // Efeito simples
        
        // Adicionar classes CSS para animações
        addCustomStyles();
        
        console.log("Animações sutis inicializadas (sem movimento dos cards)!");
    }, 100);
}

// Estilos CSS customizados - SEM ANIMAÇÕES DE MOVIMENTO
const addCustomStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .progress-animated::after {
            animation-duration: 1.5s;
        }
        
        /* REMOVIDO: animation pulse que movia os círculos */
        .circle-animated {
            /* Sem animação de movimento */
        }
        
        /* REMOVIDO: animation bounce que movia os números */
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
    `;
    
    document.head.appendChild(style);
};

// Inicialização automática se o script for carregado diretamente
if (typeof module === 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
}

// JavaScript Global - Efeito Header Fixo para Todas as Páginas

// Função para configurar o efeito do header fixo globalmente
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