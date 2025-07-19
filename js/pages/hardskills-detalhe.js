// hardskills-detalhe.js

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    const viewToggleBtns = document.querySelectorAll('.view-btn');
    const skillsGrid = document.getElementById('skills-grid');
    const skillCards = document.querySelectorAll('.skill-card');

    // Elementos de estatísticas
    const totalTechElement = document.getElementById('total-technologies');
    const averageLevelElement = document.getElementById('average-level');
    const specializationElement = document.getElementById('specialization');

    // Inicialização
    init();

    function init() {
        setupEventListeners();
        setupAdvancedSearch();
        animateProgressBars();
        setupFilterSystem();
        calculateStats();
        setupScrollAnimations();
        setupKeyboardShortcuts();
        setupTooltips();
        showToast('Hard Skills carregado com sucesso!', 'success');
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
        searchInput.placeholder = 'Buscar habilidades...';
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
                const topics = Array.from(card.querySelectorAll('.topic-tag'))
                    .map(tag => tag.textContent.toLowerCase());
                
                const matches = skillName.includes(searchTerm) || 
                               skillCategory.includes(searchTerm) ||
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

    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        // Intersection Observer para animar quando entrar na viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.style.width;
                    
                    // Reset e animar
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 100);
                }
            });
        }, { threshold: 0.1 });

        progressBars.forEach(bar => observer.observe(bar));
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
            const topics = Array.from(card.querySelectorAll('.topic-tag'))
                .map(tag => tag.textContent.toLowerCase());
            
            let showCard = true;

            // Filtro por categoria
            if (categoryValue !== 'all') {
                showCard = showCard && (cardCategory === categoryValue);
            }

            // Filtro por nível
            if (levelValue !== 'all') {
                const levelMap = {
                    'beginner': 'beginner',
                    'intermediate': 'intermediate', 
                    'advanced': 'advanced'
                };
                showCard = showCard && (cardLevel === levelMap[levelValue]);
            }

            // Filtro por busca
            if (searchTerm) {
                const searchMatches = skillName.includes(searchTerm) || 
                                    skillCategory.includes(searchTerm) ||
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
        localStorage.setItem('hardskills-category-filter', categoryValue);
        localStorage.setItem('hardskills-level-filter', levelValue);
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
        localStorage.setItem('hardskills-view', view);
    }

    function setupFilterSystem() {
        // Restaurar filtros salvos
        const savedCategory = localStorage.getItem('hardskills-category-filter');
        const savedLevel = localStorage.getItem('hardskills-level-filter');
        const savedView = localStorage.getItem('hardskills-view');

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
            totalTechElement.textContent = '0';
            averageLevelElement.textContent = '0%';
            return;
        }

        // Calcular estatísticas
        const totalSkills = visibleCards.length;
        const levels = visibleCards.map(card => {
            const levelText = card.querySelector('.skill-level').textContent;
            return parseInt(levelText.replace('%', ''));
        });

        const averageLevel = Math.round(levels.reduce((sum, level) => sum + level, 0) / levels.length);
        
        // Determinar especialização (categoria com mais skills)
        const categories = visibleCards.map(card => card.dataset.category);
        const categoryCount = {};
        categories.forEach(cat => {
            categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        });
        
        const topCategory = Object.keys(categoryCount).reduce((a, b) => 
            categoryCount[a] > categoryCount[b] ? a : b
        );
        
        const categoryNames = {
            'frontend': 'Frontend',
            'backend': 'Backend',
            'tools': 'Ferramentas'
        };
        
        // Atualizar DOM com animação
        animateNumber(totalTechElement, parseInt(totalTechElement.textContent), totalSkills);
        animateNumber(averageLevelElement, parseInt(averageLevelElement.textContent.replace('%', '')), averageLevel, '%');
        specializationElement.textContent = categoryNames[topCategory] || 'N/A';
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
        
        counter.textContent = `${visibleCards.length} habilidade${visibleCards.length !== 1 ? 's' : ''} encontrada${visibleCards.length !== 1 ? 's' : ''}`;
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
    }

    function handleCardLeave(event) {
        const card = event.currentTarget;
        card.style.boxShadow = '';
        
        const icon = card.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = '';
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

    // Função para adicionar novas skills dinamicamente
    function addSkill(skillData) {
        const skillCard = createSkillCard(skillData);
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
    }

    function createSkillCard(data) {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.dataset.category = data.category;
        card.dataset.level = data.level;
        
        card.innerHTML = `
            <div class="skill-header">
                <div class="skill-icon ${data.iconClass}">
                    <img src="assets/images/${data.image}" alt="${data.name}" />
                </div>
                <div class="skill-info">
                    <h3>${data.name}</h3>
                    <span class="skill-category">${data.categoryName}</span>
                </div>
                <div class="skill-level">${data.percentage}%</div>
            </div>
            
            <div class="skill-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${data.percentage}%; background: ${data.progressGradient};"></div>
                </div>
            </div>
            
            <div class="skill-details">
                <div class="skill-topics">
                    ${data.topics.map(topic => `
                        <span class="topic-tag ${topic.status}">${topic.name}</span>
                    `).join('')}
                </div>
                
                <div class="skill-stats">
                    <div class="stat-item">
                        <span class="stat-label">Projetos:</span>
                        <span class="stat-value">${data.projects}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Horas:</span>
                        <span class="stat-value">${data.hours}h</span>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }

    // Função para exportar dados das skills
    function exportSkillsData() {
        const skillsData = Array.from(skillCards).map(card => {
            return {
                name: card.querySelector('.skill-info h3').textContent,
                category: card.dataset.category,
                level: card.dataset.level,
                percentage: parseInt(card.querySelector('.skill-level').textContent.replace('%', '')),
                topics: Array.from(card.querySelectorAll('.topic-tag')).map(tag => ({
                    name: tag.textContent,
                    status: tag.classList.contains('completed') ? 'completed' : 
                           tag.classList.contains('learning') ? 'learning' : 'planned'
                })),
                projects: card.querySelector('.stat-value').textContent,
                hours: card.querySelectorAll('.stat-value')[1].textContent
            };
        });

        return skillsData;
    }

    // Simulação de dados em tempo real
    function simulateDataUpdates() {
        setInterval(() => {
            // Simular mudança nos dados a cada 30 segundos
            const randomCard = skillCards[Math.floor(Math.random() * skillCards.length)];
            const currentLevel = parseInt(randomCard.querySelector('.skill-level').textContent.replace('%', ''));
            const newLevel = Math.min(100, currentLevel + Math.floor(Math.random() * 3));
            
            if (newLevel > currentLevel) {
                randomCard.querySelector('.skill-level').textContent = newLevel + '%';
                randomCard.querySelector('.progress-fill').style.width = newLevel + '%';
                
                // Recalcular stats
                calculateStats();
                
                showToast(`${randomCard.querySelector('.skill-info h3').textContent} evoluiu para ${newLevel}%!`, 'success');
            }
        }, 30000);
    }

    // Iniciar simulação de atualizações (opcional)
    // simulateDataUpdates();

    // Expor funções globais se necessário
    window.HardSkillsManager = {
        addSkill,
        exportSkillsData,
        showToast,
        applyFilters,
        calculateStats
    };

    // Adicionar estilo para os toasts se não existir
    if (!document.querySelector('#toast-styles')) {
        const toastStyles = document.createElement('style');
        toastStyles.id = 'toast-styles';
        toastStyles.textContent = `
            .tooltip {
                font-family: 'Inter', sans-serif;
            }
        `;
        document.head.appendChild(toastStyles);
    }

    console.log('Hard Skills module initialized successfully');
});