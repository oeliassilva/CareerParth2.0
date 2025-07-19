// js/pages/resumo-dia-detalhe.js - Versão Corrigida

let isInitialized = false;
let cssLoaded = false;

const loadCSS = () => {
    return new Promise((resolve) => {
        // Garantir que o CSS específico seja carregado
        const cssId = 'resumo-dia-css';
        
        // Se já existe, remove para recarregar
        const existingCSS = document.getElementById(cssId);
        if (existingCSS) {
            existingCSS.remove();
        }
        
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.href = '/css/pages/resumo-dia-detalhe.css';
        
        // Aguardar carregamento do CSS
        link.onload = () => {
            cssLoaded = true;
            console.log('✅ CSS do resumo do dia carregado');
            resolve();
        };
        
        link.onerror = () => {
            console.warn('⚠️ Erro ao carregar CSS, usando estilos inline');
            addInlineStyles();
            cssLoaded = true;
            resolve();
        };
        
        document.head.appendChild(link);
    });
};

const addInlineStyles = () => {
    const styleId = 'resumo-dia-inline-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        .content-area {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            background: #F8F9FA;
            min-height: 100vh;
        }

        .resumo-dia-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .resumo-dia-header h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: #2C3E50;
            margin-bottom: 0.5rem;
            position: relative;
        }

        .resumo-dia-header h2::before {
            content: '';
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, #FF6B47, #FF8A6B);
            border-radius: 2px;
        }

        .resumo-dia-header p {
            color: #6C757D;
            font-size: 1.1rem;
            max-width: 600px;
            margin: 0 auto;
        }

        .resumo-cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .resumo-card {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(44, 62, 80, 0.08);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 107, 71, 0.1);
            cursor: pointer;
            opacity: 0;
            transform: translateY(30px);
        }

        .resumo-card.loaded {
            opacity: 1;
            transform: translateY(0);
        }

        .resumo-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(44, 62, 80, 0.15);
            border-color: rgba(255, 107, 71, 0.3);
        }

        .card-status-indicator {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #FF6B47, #FF8A6B);
        }

        .card-icon {
            width: 60px;
            height: 60px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            color: white;
            background: linear-gradient(135deg, #FF6B47, #FF8A6B);
            margin-bottom: 1.5rem;
            box-shadow: 0 4px 15px rgba(255, 107, 71, 0.3);
        }

        .card-content h3 {
            color: #2C3E50;
            font-size: 1.4rem;
            font-weight: 700;
            margin: 0 0 0.5rem 0;
            line-height: 1.2;
        }

        .card-description {
            color: #6C757D;
            font-size: 0.95rem;
            margin: 0 0 1.5rem 0;
            line-height: 1.4;
        }

        .card-stats {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            background: linear-gradient(135deg, rgba(255, 107, 71, 0.08), rgba(255, 107, 71, 0.04));
            padding: 1.5rem;
            border-radius: 12px;
            border-left: 5px solid #FF6B47;
            margin-bottom: 1.5rem;
            position: relative;
            overflow: hidden;
        }

        .stat-number {
            font-size: 3.5rem;
            font-weight: 900;
            color: #FF6B47;
            line-height: 1;
            margin-bottom: 0.25rem;
            text-shadow: 0 2px 4px rgba(255, 107, 71, 0.2);
            display: block;
        }

        .stat-label {
            color: #2C3E50;
            font-weight: 600;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            opacity: 0.8;
        }

        .card-action-btn {
            position: absolute;
            bottom: 1.5rem;
            right: 1.5rem;
            background: rgba(255, 107, 71, 0.1);
            border: 2px solid rgba(255, 107, 71, 0.2);
            color: #FF6B47;
            width: 45px;
            height: 45px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1.3rem;
        }

        .card-action-btn:hover {
            background: #FF6B47;
            color: white;
            transform: scale(1.1);
            box-shadow: 0 4px 15px rgba(255, 107, 71, 0.4);
        }

        /* Variações específicas */
        .contracts-card .card-icon {
            background: linear-gradient(135deg, #2C3E50, #34495E);
        }

        .contracts-card .card-stats {
            background: linear-gradient(135deg, rgba(44, 62, 80, 0.08), rgba(44, 62, 80, 0.04));
            border-left-color: #2C3E50;
        }

        .contracts-card .stat-number {
            color: #2C3E50;
            text-shadow: 0 2px 4px rgba(44, 62, 80, 0.2);
        }

        .visits-card .card-icon {
            background: linear-gradient(135deg, #FF6B47, #2C3E50);
        }

        .visits-card .stat-number {
            background: linear-gradient(135deg, #FF6B47, #2C3E50);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: none;
        }

        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }

        @media (max-width: 768px) {
            .content-area {
                padding: 1rem;
            }
            .resumo-cards-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            .resumo-card {
                padding: 1.5rem;
            }
        }
    `;
    
    document.head.appendChild(style);
};

const waitForDOM = () => {
    return new Promise((resolve) => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    });
};

const waitForElements = () => {
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 50; // 5 segundos
        
        const checkElements = () => {
            const cards = document.querySelectorAll('.resumo-card');
            const counters = document.querySelectorAll('.stat-number');
            
            if (cards.length > 0 && counters.length > 0) {
                console.log(`✅ Elementos encontrados: ${cards.length} cards, ${counters.length} contadores`);
                resolve();
            } else if (attempts < maxAttempts) {
                attempts++;
                setTimeout(checkElements, 100);
            } else {
                console.warn('⚠️ Timeout aguardando elementos');
                resolve(); // Resolve mesmo assim para não travar
            }
        };
        
        checkElements();
    });
};

const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) {
        console.warn('⚠️ Nenhum contador encontrado para animar');
        return;
    }
    
    console.log(`🔄 Animando ${counters.length} contadores`);
    
    counters.forEach((counter, index) => {
        const target = parseInt(counter.textContent) || 0;
        let current = 0;
        const increment = Math.max(1, target / 30);
        
        // Reset para 0 antes de animar
        counter.textContent = '0';
        
        setTimeout(() => {
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.min(Math.ceil(current), target);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        }, index * 200); // Delay entre animações
    });
};

const setupCardInteractions = () => {
    const cards = document.querySelectorAll('.resumo-card');
    
    if (cards.length === 0) {
        console.warn('⚠️ Nenhum card encontrado para configurar interações');
        return;
    }
    
    console.log(`🔄 Configurando interações para ${cards.length} cards`);
    
    cards.forEach(card => {
        // Remover listeners existentes
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        
        // Adicionar efeito de ripple
        newCard.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Acessibilidade
        newCard.setAttribute('tabindex', '0');
        newCard.setAttribute('role', 'button');
        
        newCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                newCard.click();
            }
        });
    });
};

const initializeLayout = () => {
    // Forçar layout correto
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.style.opacity = '1';
        contentArea.style.visibility = 'visible';
    }
    
    const perfilContent = document.getElementById('perfil-content');
    if (perfilContent) {
        perfilContent.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        perfilContent.style.minHeight = 'calc(100vh - 200px)';
        perfilContent.style.padding = '32px';
    }
};

const showCards = () => {
    const cards = document.querySelectorAll('.resumo-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('loaded');
        }, index * 150);
    });
};

const forceRefresh = () => {
    // Limpar cache de elementos
    const containers = document.querySelectorAll('.content-area, .resumo-cards-grid');
    containers.forEach(container => {
        if (container) {
            container.style.display = 'none';
            container.offsetHeight; // Force reflow
            container.style.display = '';
        }
    });
};

// Função principal de inicialização
export async function init() {
    console.log("🚀 Inicializando Resumo do Dia - Detalhes...");
    
    // Evitar inicialização múltipla
    if (isInitialized) {
        console.log("⚠️ Resumo do dia já inicializado, forçando refresh...");
        forceRefresh();
        animateCounters();
        return;
    }
    
    try {
        // 1. Aguardar DOM completamente carregado
        await waitForDOM();
        console.log("✅ DOM carregado");
        
        // 2. Carregar CSS (com fallback inline)
        await loadCSS();
        console.log("✅ CSS carregado");
        
        // 3. Aguardar elementos estarem no DOM
        await waitForElements();
        console.log("✅ Elementos encontrados");
        
        // 4. Inicializar layout
        initializeLayout();
        console.log("✅ Layout inicializado");
        
        // 5. Configurar interações (com delay)
        setTimeout(() => {
            setupCardInteractions();
            console.log("✅ Interações configuradas");
        }, 100);
        
        // 6. Mostrar cards com animação
        setTimeout(() => {
            showCards();
            console.log("✅ Cards exibidos");
        }, 200);
        
        // 7. Animar contadores (com delay maior)
        setTimeout(() => {
            animateCounters();
            console.log("✅ Contadores animados");
        }, 500);
        
        isInitialized = true;
        console.log("🎉 Resumo do Dia inicializado com sucesso!");
        
    } catch (error) {
        console.error("❌ Erro ao inicializar Resumo do Dia:", error);
        
        // Fallback: tentar novamente após um tempo
        setTimeout(() => {
            isInitialized = false;
            init();
        }, 1000);
    }
}

// Função de cleanup para SPA
export function cleanup() {
    console.log("🧹 Fazendo cleanup do Resumo do Dia");
    isInitialized = false;
    cssLoaded = false;
    
    // Remover estilos inline se existirem
    const inlineStyles = document.getElementById('resumo-dia-inline-styles');
    if (inlineStyles) {
        inlineStyles.remove();
    }
}

// Para sistemas que não usam modules
if (typeof window !== 'undefined') {
    window.resumoDiaDetalhe = {
        init,
        cleanup
    };
}