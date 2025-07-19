// softskills-detalhe.js

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    const viewToggleBtns = document.querySelectorAll('.view-btn');
    const skillsGrid = document.getElementById('skills-grid');
    const skillCards = document.querySelectorAll('.skill-card');

    // Elementos de estatísticas
    const totalSoftSkillsElement = document.getElementById('total-softskills');
    const averageLevelElement = document.getElementById('average-level');
    const topSkillElement = document.getElementById('top-skill');

    // Inicialização
    init();

    function init() {
        setupEventListeners();
        setupAdvancedSearch();
        animateProgressCircles();
        setupFilterSystem();
        calculateStats();
        setupScrollAnimations();
        setupKeyboardShortcuts();
        setupTooltips();
        showToast('Soft Skills carregado com sucesso!', 'success');
    }

    function setupEventListeners() {
        // Filtros
        categoryFilter.addEventListener('change', applyFilters);
        levelFilter.addEventListener('change', applyFilters);

        // Toggle de visualização
        viewToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                toggleView(view);
                
                // Atualizar estado ativo
                viewToggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Hover effects nos cards
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', handleCardHover);
            card.addEventListener('mouseleave', handleCardLeave);
        });
    }

    function setupAdvancedSearch() {
        // Criar input de busca
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar competências...';
        searchInput.className = 'skill-search';
        
        // Adicionar ao container de filtros
        const filtersContainer = document.querySelector('.filters-container');
        filtersContainer.insertBefore(searchInput, filtersContainer.firstChild);

        // Event listener para busca
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            skillCards.forEach(card => {
                const skillName = card.querySelector('.skill-info h3').textContent.toLowerCase();
                const skillCategory = card.querySelector('.skill-category').textContent.toLowerCase();
                const skillDescription = card.querySelector('.skill-description').textContent.toLowerCase();
                const topics = Array.from(card.querySelectorAll('.topic-tag'))
                    .map(tag => tag.textContent.toLowerCase());
                
                const matches = skillName.includes(searchTerm) || 
                               skillCategory.includes(searchTerm) ||
                               skillDescription.includes(searchTerm) ||
                               topics.some(topic => topic.includes(searchTerm));
                
                if (matches || searchTerm === '') {
                    showCard(card);
                } else {
                    hideCard(card);
                }
            });

            updateResultsCounter();
            calculateStats();
        });
    }

    function animateProgressCircles() {
        const progressCircles = document.querySelectorAll('.progress-circle-fill');
        
        // Intersection Observer para animar quando entrar na viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target;
                    const percentage = parseInt(circle.dataset.percentage);
                    
                    // Calcular o stroke-dasharray baseado na porcentagem
                    const radius = 40;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDasharray = (percentage / 100) * circumference;
                    
                    // Animar o círculo
                    setTimeout(() => {
                        circle.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
                    }, 100);
                }
            });
        }, { threshold: 0.1 });

        progressCircles.forEach(circle => observer.observe(circle));
    }

    function applyFilters() {
        const categoryValue = categoryFilter.value;
        const levelValue = levelFilter.value;
        const searchInput = document.querySelector('.skill-search');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        skillCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardLevel = card.dataset.level;
            const skillName = card.querySelector('.skill-info h3').textContent.toLowerCase();
            const skillCategory = card.querySelector('.skill-category').textContent.toLowerCase();
            const skillDescription = card.querySelector('.skill-description').textContent.toLowerCase();
            const topics = Array.from(card.querySelectorAll('.topic-tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            let showCard = true;

            // Filtro por categoria
            if (categoryValue !== 'all') {
                showCard = showCard && (cardCategory === categoryValue);
            }

            // Filtro por nível
            if (levelValue !== 'all') {
                showCard = showCard && (cardLevel === levelValue);
            }

            // Filtro por busca
            if (searchTerm) {
                const searchMatches = skillName.includes(searchTerm) || 
                                    skillCategory.includes(searchTerm) ||
                                    skillDescription.includes(searchTerm) ||
                                    topics.some(topic => topic.includes(searchTerm));
                showCard = showCard && searchMatches;
            }

            // Aplicar filtro com animação
            if (showCard) {
                showCard(card);
            } else {
                hideCard(card);
            }
        });

        // Atualizar contador de resultados e estatísticas
        updateResultsCounter();
        calculateStats();
        
        // Salvar estado dos filtros
        localStorage.setItem('softskills-category-filter', categoryValue);
        localStorage.setItem('softskills-level-filter', levelValue);
    }

    function showCard(card) {
        card.style.display = 'block';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50);
    }

    function hideCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
    }

    function toggleView(view) {
        if (view === 'list') {
            skillsGrid.classList.add('list-view');
        } else {
            skillsGrid.classList.remove('list-view');
        }

        // Salvar preferência
        localStorage.setItem('softskills-view', view);
    }

    function setupFilterSystem() {
        // Restaurar filtros salvos
        const savedCategory = localStorage.getItem('softskills-category-filter');
        const savedLevel = localStorage.getItem('softskills-level-filter');
        const savedView = localStorage.getItem('softskills-view');

        if (savedCategory) categoryFilter.value = savedCategory;
        if (savedLevel) levelFilter.value = savedLevel;
        if (savedView) {
            toggleView(savedView);
            document.querySelector(`[data-view="${savedView}"]`).classList.add('active');
            document.querySelector(`[data-view="${savedView === 'list' ? 'grid' : 'list'}"]`).classList.remove('active');
        }

        // Aplicar filtros iniciais
        applyFilters();
    }

    function calculateStats() {
        const visibleCards = Array.from(skillCards).filter(card => 
            window.getComputedStyle(card).display !== 'none'
        );

        if (visibleCards.length === 0) {
            totalSoftSkillsElement.textContent = '0';
            averageLevelElement.textContent = '0%';
            topSkillElement.textContent = 'N/A';
            return;
        }

        // Calcular estatísticas
        const totalSkills = visibleCards.length;
        const levels = visibleCards.map(card => {
            const levelText = card.querySelector('.skill-level').textContent;
            return parseInt(levelText.replace('%', ''));
        });

        const averageLevel = Math.round(levels.reduce((sum, level) => sum + level, 0) / levels.length);
        
        // Encontrar a skill com maior nível
        let topSkill = 'N/A';
        let maxLevel = 0;
        visibleCards.forEach(card => {
            const level = parseInt(card.querySelector('.skill-level').textContent.replace('%', ''));
            if (level > maxLevel) {
                maxLevel = level;
                topSkill = card.querySelector('.skill-info h3').textContent;
            }
        });
        
        // Atualizar DOM com animação
        animateNumber(totalSoftSkillsElement, parseInt(totalSoftSkillsElement.textContent), totalSkills);
        animateNumber(averageLevelElement, parseInt(averageLevelElement.textContent.replace('%', '')), averageLevel, '%');
        topSkillElement.textContent = topSkill;
    }

    function animateNumber(element, from, to, suffix = '') {
        const duration = 1000;
        const steps = 20;
        const stepSize = (to - from) / steps;
        const stepDuration = duration / steps;
        
        let current = from;
        const timer = setInterval(() => {
            current += stepSize;
            if ((stepSize > 0 && current >= to) || (stepSize < 0 && current <= to)) {
                current = to;
                clearInterval(timer);
            }
            element.textContent = Math.round(current) + suffix;
        }, stepDuration);
    }

    function updateResultsCounter() {
        const visibleCards = Array.from(skillCards).filter(card => 
            window.getComputedStyle(card).display !== 'none'
        );
        
        // Criar ou atualizar contador se não existir
        let counter = document.querySelector('.results-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'results-counter';
            skillsGrid.parentNode.insertBefore(counter, skillsGrid);
        }
        
        counter.textContent = `${visibleCards.length} competência${visibleCards.length !== 1 ? 's' : ''} encontrada${visibleCards.length !== 1 ? 's' : ''}`;
    }

    function handleCardHover(event) {
        const card = event.currentTarget;
        const skillLevel = card.querySelector('.skill-level').textContent;
        const percentage = parseInt(skillLevel.replace('%', ''));
        
        // Adicionar efeito de brilho baseado no nível
        const intensity = percentage / 100;
        card.style.boxShadow = `0 20px 40px rgba(255, 107, 71, ${0.1 + intensity * 0.2})`;
        
        // Animar ícone
        const icon = card.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
        
        // Animar círculo de progresso
        const progressCircle = card.querySelector('.progress-circle');
        if (progressCircle) {
            progressCircle.style.transform = 'scale(1.05)';
        }
    }

    function handleCardLeave(event) {
        const card = event.currentTarget;
        card.style.boxShadow = '';
        
        const icon = card.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = '';
        }
        
        const progressCircle = card.querySelector('.progress-circle');
        if (progressCircle) {
            progressCircle.style.transform = '';
        }
    }

    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar cards de estatísticas
        document.querySelectorAll('.stat-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + F para focar na busca
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                const searchInput = document.querySelector('.skill-search');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // Esc para limpar filtros
            if (e.key === 'Escape') {
                const searchInput = document.querySelector('.skill-search');
                if (searchInput && searchInput.value) {
                    searchInput.value = '';
                    searchInput.dispatchEvent(new Event('input'));
                }
                
                categoryFilter.value = 'all';
                levelFilter.value = 'all';
                applyFilters();
            }

            // G para alternar entre grid/list
            if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !e.target.matches('input')) {
                const activeView = document.querySelector('.view-btn.active');
                const isGrid = activeView.dataset.view === 'grid';
                const targetBtn = document.querySelector(`[data-view="${isGrid ? 'list' : 'grid'}"]`);
                targetBtn.click();
            }
        });
    }

    function setupTooltips() {
        const tooltipElements = document.querySelectorAll('[title]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = element.getAttribute('title');
                tooltip.style.cssText = `
                    position: absolute;
                    background: #1f2937;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 500;
                    z-index: 1000;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = element.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
                
                setTimeout(() => tooltip.style.opacity = '1', 10);
                
                element.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                    setTimeout(() => {
                        if (document.body.contains(tooltip)) {
                            document.body.removeChild(tooltip);
                        }
                    }, 200);
                }, { once: true });
            });
        });
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        `;
        toast.textContent = message;

        document.body.appendChild(toast);

        // Animar entrada
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 10);

        // Remover após 3 segundos
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // Função para adicionar novas soft skills dinamicamente
    function addSoftSkill(skillData) {
        const skillCard = createSoftSkillCard(skillData);
        skillsGrid.appendChild(skillCard);
        
        // Re-setup dos event listeners
        skillCard.addEventListener('mouseenter', handleCardHover);
        skillCard.addEventListener('mouseleave', handleCardLeave);
        
        // Animar entrada
        skillCard.style.opacity = '0';
        skillCard.style.transform = 'translateY(20px)';
        setTimeout(() => {
            skillCard.style.opacity = '1';
            skillCard.style.transform = 'translateY(0)';
        }, 100);

        // Recalcular stats
        calculateStats();
        updateResultsCounter();
        
        // Animar círculo de progresso da nova skill
        const progressCircle = skillCard.querySelector('.progress-circle-fill');
        if (progressCircle) {
            animateProgressCircles();
        }
    }

    function createSoftSkillCard(data) {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.dataset.category = data.category;
        card.dataset.level = data.level;
        
        card.innerHTML = `
            <div class="skill-header">
                <div class="skill-icon">
                    ${data.icon}
                </div>
                <div class="skill-info">
                    <h3>${data.name}</h3>
                    <span class="skill-category">${data.categoryName}</span>
                </div>
                <div class="skill-level">${data.percentage}%</div>
            </div>
            
            <div class="skill-progress">
                <div class="progress-circle">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" class="bg-circle"/>
                        <circle cx="50" cy="50" r="40" class="progress-circle-fill" data-percentage="${data.percentage}"/>
                    </svg>
                    <div class="percentage">${data.percentage}%</div>
                </div>
            </div>
            
            <div class="skill-details">
                <div class="skill-description">
                    ${data.description}
                </div>
                
                <div class="skill-topics">
                    ${data.topics.map(topic => `
                        <span class="topic-tag ${topic.status}">${topic.name}</span>
                    `).join('')}
                </div>
                
                <div class="skill-stats">
                    <div class="stat-item">
                        <span class="stat-label">Experiência:</span>
                        <span class="stat-value">${data.experience}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Projetos:</span>
                        <span class="stat-value">${data.projects}</span>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }

    // Simulação de dados em tempo real para soft skills
    function simulateDataUpdates() {
        setInterval(() => {
            // Simular mudança nos dados a cada 45 segundos
            const randomCard = skillCards[Math.floor(Math.random() * skillCards.length)];
            const currentLevel = parseInt(randomCard.querySelector('.skill-level').textContent.replace('%', ''));
            const newLevel = Math.min(100, currentLevel + Math.floor(Math.random() * 2));
            
            if (newLevel > currentLevel) {
                // Atualizar nível no card
                randomCard.querySelector('.skill-level').textContent = newLevel + '%';
                randomCard.querySelector('.percentage').textContent = newLevel + '%';
                
                // Atualizar círculo de progresso
                const progressCircle = randomCard.querySelector('.progress-circle-fill');
                progressCircle.dataset.percentage = newLevel;
                
                const radius = 40;
                const circumference = 2 * Math.PI * radius;
                const strokeDasharray = (newLevel / 100) * circumference;
                progressCircle.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
                
                // Recalcular stats
                calculateStats();
                
                showToast(`${randomCard.querySelector('.skill-info h3').textContent} evoluiu para ${newLevel}%!`, 'success');
            }
        }, 45000);
    }

    // Função para destacar competências em desenvolvimento
    function highlightDevelopingSkills() {
        skillCards.forEach(card => {
            const level = parseInt(card.querySelector('.skill-level').textContent.replace('%', ''));
            const developingTags = card.querySelectorAll('.topic-tag.developing');
            
            if (developingTags.length > 0 && level < 95) {
                // Adicionar indicador visual para skills em desenvolvimento
                const indicator = document.createElement('div');
                indicator.className = 'development-indicator';
                indicator.style.cssText = `
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    width: 8px;
                    height: 8px;
                    background: #f97316;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                `;
                card.style.position = 'relative';
                card.appendChild(indicator);
            }
        });
        
        // Adicionar CSS da animação pulse
        if (!document.querySelector('#pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'pulse-animation';
            style.textContent = `
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Função para análise de gaps de competências
    function analyzeSkillGaps() {
        const skillLevels = Array.from(skillCards).map(card => ({
            name: card.querySelector('.skill-info h3').textContent,
            level: parseInt(card.querySelector('.skill-level').textContent.replace('%', '')),
            category: card.dataset.category
        }));
        
        // Encontrar competências que precisam de mais desenvolvimento
        const gaps = skillLevels.filter(skill => skill.level < 85);
        
        if (gaps.length > 0) {
            console.log('Competências que precisam de desenvolvimento:', gaps);
            return gaps;
        }
        
        return [];
    }

    // Função para recomendações de desenvolvimento
    function getRecommendations() {
        const gaps = analyzeSkillGaps();
        const recommendations = [];
        
        gaps.forEach(gap => {
            switch(gap.category) {
                case 'leadership':
                    recommendations.push({
                        skill: gap.name,
                        suggestions: ['Curso de Liderança Avançada', 'Mentoria com executivos', 'Projetos de gestão de equipe']
                    });
                    break;
                case 'communication':
                    recommendations.push({
                        skill: gap.name,
                        suggestions: ['Workshop de Comunicação', 'Apresentações públicas', 'Feedback 360°']
                    });
                    break;
                case 'thinking':
                    recommendations.push({
                        skill: gap.name,
                        suggestions: ['Cursos de análise de dados', 'Estudos de caso', 'Projetos analíticos']
                    });
                    break;
                case 'emotional':
                    recommendations.push({
                        skill: gap.name,
                        suggestions: ['Coaching emocional', 'Mindfulness', 'Inteligência emocional']
                    });
                    break;
            }
        });
        
        return recommendations;
    }

    // Função para mostrar modal de recomendações
    function showRecommendationsModal() {
        const recommendations = getRecommendations();
        
        if (recommendations.length === 0) {
            showToast('Parabéns! Todas as suas competências estão em excelente nível!', 'success');
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'recommendations-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 16px;
            padding: 32px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: translateY(20px);
            transition: transform 0.3s ease;
        `;

        let contentHTML = `
            <h3 style="color: #2C3E50; margin-bottom: 20px; font-size: 24px;">Recomendações de Desenvolvimento</h3>
            <p style="color: #6C757D; margin-bottom: 24px;">
                Baseado na sua avaliação atual, aqui estão algumas sugestões para desenvolvimento:
            </p>
        `;

        recommendations.forEach(rec => {
            contentHTML += `
                <div style="margin-bottom: 20px; padding: 16px; background: #f8f9fa; border-radius: 8px;">
                    <h4 style="color: #FF6B47; margin-bottom: 12px;">${rec.skill}</h4>
                    <ul style="margin: 0; padding-left: 20px;">
                        ${rec.suggestions.map(suggestion => `<li style="color: #495057; margin-bottom: 4px;">${suggestion}</li>`).join('')}
                    </ul>
                </div>
            `;
        });

        contentHTML += `
            <button class="close-modal" style="
                background: #FF6B47;
                border: none;
                border-radius: 8px;
                padding: 12px 24px;
                color: white;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                margin-top: 16px;
            ">Fechar</button>
        `;

        modalContent.innerHTML = contentHTML;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Animar entrada
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }, 10);

        // Event listener para fechar
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.opacity = '0';
            modalContent.style.transform = 'translateY(20px)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });

        // Fechar ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.querySelector('.close-modal').click();
            }
        });
    }

    // Adicionar botão de recomendações (opcional)
    function addRecommendationsButton() {
        const button = document.createElement('button');
        button.className = 'recommendations-btn';
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style="margin-right: 8px;">
                <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13H7v-2h2v2zm0-3H7V4h2v6z"/>
            </svg>
            Recomendações
        `;
        button.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #FF6B47;
            border: none;
            border-radius: 50px;
            padding: 12px 20px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(255, 107, 71, 0.3);
            transition: all 0.3s ease;
            z-index: 100;
            display: flex;
            align-items: center;
        `;

        button.addEventListener('click', showRecommendationsModal);
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 6px 20px rgba(255, 107, 71, 0.4)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 4px 12px rgba(255, 107, 71, 0.3)';
        });

        document.body.appendChild(button);
    }

    // Inicializar funcionalidades específicas das soft skills
    highlightDevelopingSkills();
    addRecommendationsButton();
    
    // Iniciar simulação de atualizações (opcional)
    // simulateDataUpdates();

    // Expor funções globais se necessário
    window.SoftSkillsManager = {
        addSoftSkill,
        exportSoftSkillsData,
        showToast,
        applyFilters,
        calculateStats,
        analyzeSkillGaps,
        getRecommendations,
        showRecommendationsModal
    };

    // Adicionar estilo para os elementos se não existir
    if (!document.querySelector('#softskills-styles')) {
        const softSkillsStyles = document.createElement('style');
        softSkillsStyles.id = 'softskills-styles';
        softSkillsStyles.textContent = `
            .tooltip {
                font-family: 'Inter', sans-serif;
            }
            
            .development-indicator {
                position: absolute !important;
            }
            
            .recommendations-modal .close-modal:hover {
                background: #e55a3c !important;
                transform: translateY(-1px);
            }
        `;
        document.head.appendChild(softSkillsStyles);
    }

    console.log('Soft Skills module initialized successfully');
});