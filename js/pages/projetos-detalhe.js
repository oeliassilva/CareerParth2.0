// projetos-detalhe.js

// Função de inicialização que será chamada automaticamente
function initProjetos() {
    console.log('🚀 Página de Projetos carregada!');
    
    // Dados dos projetos (simulando integração GitHub)
    const projectsData = {
        featured: [
            {
                id: 1,
                name: "Landing Page para Escola da Nuvem",
                description: "Landing page moderna e responsiva desenvolvida para a Escola da Nuvem com foco em conversão e experiência do usuário.",
                language: "JavaScript",
                stars: 15,
                lastUpdate: "2024-11-20",
                technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "SASS"],
                featured: true,
                githubUrl: "https://github.com/eliassilva/escola-nuvem-landing",
                demoUrl: "https://escola-nuvem-landing.vercel.app",
                aiAnalysis: {
                    overallScore: 92,
                    complexity: 78,
                    practices: 95,
                    documentation: 88,
                    insights: "Excelente estrutura de código com boas práticas de responsividade e SEO. Sugestão: implementar lazy loading para imagens."
                }
            },
            {
                id: 2,
                name: "Dashboard de Investimento com Python",
                description: "Dashboard interativo para análise de investimentos com visualizações dinâmicas e cálculos financeiros em tempo real.",
                language: "Python",
                stars: 23,
                lastUpdate: "2024-11-18",
                technologies: ["Python", "Streamlit", "Pandas", "Plotly", "NumPy"],
                featured: true,
                githubUrl: "https://github.com/eliassilva/investment-dashboard",
                demoUrl: "https://investment-dashboard-python.streamlit.app",
                aiAnalysis: {
                    overallScore: 89,
                    complexity: 85,
                    practices: 87,
                    documentation: 95,
                    insights: "Ótima documentação e estrutura modular. O código demonstra conhecimento avançado em análise de dados financeiros."
                }
            },
            {
                id: 3,
                name: "Calculadora de Investimento com Python",
                description: "Aplicação para cálculos de investimentos com diferentes modalidades e simulações de cenários financeiros.",
                language: "Python",
                stars: 12,
                lastUpdate: "2024-11-15",
                technologies: ["Python", "Tkinter", "Matplotlib", "Pandas"],
                featured: true,
                githubUrl: "https://github.com/eliassilva/calculadora-investimento",
                demoUrl: null,
                aiAnalysis: {
                    overallScore: 85,
                    complexity: 72,
                    practices: 90,
                    documentation: 92,
                    insights: "Código bem estruturado com interface intuitiva. Sugestão: migrar para framework web para maior acessibilidade."
                }
            }
        ],
        all: [
            {
                id: 4,
                name: "Sistema de Gestão Escolar",
                description: "Sistema completo para gestão de instituições de ensino com módulos de alunos, professores e notas.",
                language: "PHP",
                stars: 8,
                lastUpdate: "2024-10-28",
                technologies: ["PHP", "MySQL", "Bootstrap", "jQuery"],
                featured: false,
                githubUrl: "https://github.com/eliassilva/gestao-escolar",
                demoUrl: null,
                aiAnalysis: {
                    overallScore: 76,
                    complexity: 82,
                    practices: 71,
                    documentation: 75,
                    insights: "Sistema funcional com boa arquitetura MVC. Recomenda-se implementar validação de dados mais robusta."
                }
            },
            {
                id: 5,
                name: "E-commerce Responsivo",
                description: "Loja virtual completa com carrinho de compras, sistema de pagamento e painel administrativo.",
                language: "JavaScript",
                stars: 19,
                lastUpdate: "2024-10-15",
                technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
                featured: false,
                githubUrl: "https://github.com/eliassilva/ecommerce-react",
                demoUrl: "https://ecommerce-demo.vercel.app",
                aiAnalysis: {
                    overallScore: 88,
                    complexity: 90,
                    practices: 85,
                    documentation: 90,
                    insights: "Excelente uso de React hooks e context API. Arquitetura escalável com boas práticas de segurança."
                }
            },
            {
                id: 6,
                name: "API REST para Blog",
                description: "API completa para sistema de blog com autenticação JWT, upload de imagens e sistema de comentários.",
                language: "Node.js",
                stars: 14,
                lastUpdate: "2024-09-30",
                technologies: ["Node.js", "Express", "MongoDB", "JWT", "Multer"],
                featured: false,
                githubUrl: "https://github.com/eliassilva/blog-api",
                demoUrl: null,
                aiAnalysis: {
                    overallScore: 83,
                    complexity: 78,
                    practices: 88,
                    documentation: 83,
                    insights: "API bem estruturada com autenticação segura. Sugestão: implementar rate limiting e cache Redis."
                }
            },
            {
                id: 7,
                name: "App de Tarefas Mobile",
                description: "Aplicativo mobile para gerenciamento de tarefas com sincronização em nuvem e notificações push.",
                language: "Dart",
                stars: 6,
                lastUpdate: "2024-09-20",
                technologies: ["Flutter", "Firebase", "Dart", "Provider"],
                featured: false,
                githubUrl: "https://github.com/eliassilva/tasks-flutter",
                demoUrl: null,
                aiAnalysis: {
                    overallScore: 79,
                    complexity: 75,
                    practices: 80,
                    documentation: 82,
                    insights: "Boa implementação de state management com Provider. Considere implementar testes unitários."
                }
            },
            {
                id: 8,
                name: "Portfolio Pessoal",
                description: "Site portfolio pessoal com animações CSS, modo escuro e formulário de contato funcional.",
                language: "HTML",
                stars: 11,
                lastUpdate: "2024-08-25",
                technologies: ["HTML5", "CSS3", "JavaScript", "EmailJS"],
                featured: false,
                githubUrl: "https://github.com/eliassilva/portfolio",
                demoUrl: "https://eliassilva.dev",
                aiAnalysis: {
                    overallScore: 81,
                    complexity: 65,
                    practices: 90,
                    documentation: 88,
                    insights: "Design clean e código bem organizado. Excelente uso de CSS animations e responsividade."
                }
            }
        ]
    };

    // Combinar todos os projetos
    const allProjects = [...projectsData.featured, ...projectsData.all];

    // Estado da aplicação
    let currentFilter = 'all';
    let currentSort = 'date';
    let searchTerm = '';

    // Elementos DOM
    const searchInput = document.getElementById('project-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const loadingOverlay = document.getElementById('loading-overlay');
    const syncButton = document.getElementById('sync-github');

    // Inicialização
    function initialize() {
        setupHeader();
        renderAllProjects();
        renderTechAnalysis();
        renderAISuggestions();
        setupEventListeners();
        animateCards();
        updateStatistics();
        
        console.log('✅ Projetos totalmente carregados!');
    }

    // Configurar header para esta página
    function setupHeader() {
        const header = document.querySelector('.page-header');
        if (header) {
            header.style.setProperty('background', 'var(--gradient-secondary)', 'important');
            header.style.setProperty('color', '#ffffff', 'important');
            header.style.setProperty('position', 'sticky', 'important');
            header.style.setProperty('top', '0', 'important');
            header.style.setProperty('z-index', '1000', 'important');
            
            // Efeito de scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    header.style.setProperty('background', '#0A1B2F', 'important');
                    header.style.setProperty('box-shadow', '0 4px 20px rgba(13, 37, 63, 0.4)', 'important');
                } else {
                    header.style.setProperty('background', 'var(--gradient-secondary)', 'important');
                    header.style.setProperty('box-shadow', '0 2px 12px rgba(13, 37, 63, 0.3)', 'important');
                }
            });
        }
    }

    // Atualizar estatísticas
    function updateStatistics() {
        const totalProjects = allProjects.length;
        const technologies = [...new Set(allProjects.flatMap(p => p.technologies))];
        const avgScore = Math.round(allProjects.reduce((sum, p) => sum + p.aiAnalysis.overallScore, 0) / totalProjects);
        
        const totalProjectsEl = document.getElementById('total-projects');
        const totalTechnologiesEl = document.getElementById('total-technologies');
        const aiScoreEl = document.getElementById('ai-score');
        const featuredCountEl = document.getElementById('featured-count');
        const allCountEl = document.getElementById('all-count');
        
        if (totalProjectsEl) totalProjectsEl.textContent = totalProjects;
        if (totalTechnologiesEl) totalTechnologiesEl.textContent = technologies.length;
        if (aiScoreEl) aiScoreEl.textContent = avgScore + '%';
        if (featuredCountEl) featuredCountEl.textContent = projectsData.featured.length;
        if (allCountEl) allCountEl.textContent = totalProjects;
        
        // Animar contadores
        animateCounters();
    }

    // Animar contadores
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace('%', ''));
            let current = 0;
            const increment = target / 30;
            const isPercentage = counter.textContent.includes('%');
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (isPercentage ? '%' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (isPercentage ? '%' : '');
                }
            };
            
            setTimeout(updateCounter, 500);
        });
    }

    // Renderizar todos os projetos
    function renderAllProjects() {
        renderFeaturedProjects();
        renderAllProjectsSection();
        updateVisibility();
    }

    // Renderizar projetos em destaque
    function renderFeaturedProjects() {
        const container = document.getElementById('featured-projects');
        if (!container) return;
        
        container.innerHTML = '';
        
        projectsData.featured.forEach((project, index) => {
            const card = createProjectCard(project, index, true);
            container.appendChild(card);
        });
    }

    // Renderizar seção de todos os projetos
    function renderAllProjectsSection() {
        const container = document.getElementById('all-projects');
        if (!container) return;
        
        const filteredProjects = filterAndSortProjects(allProjects);
        
        container.innerHTML = '';
        
        filteredProjects.forEach((project, index) => {
            const card = createProjectCard(project, index, false);
            container.appendChild(card);
        });
    }

    // Criar card de projeto
    function createProjectCard(project, index, isFeatured = false) {
        const card = document.createElement('div');
        card.className = `project-card ${isFeatured ? 'featured' : ''}`;
        
        const lastUpdate = new Date(project.lastUpdate).toLocaleDateString('pt-BR');
        const techTags = project.technologies.slice(0, 3).map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="project-header">
                <div class="project-icon">
                    <span class="material-icons-outlined">${getProjectIcon(project.language)}</span>
                </div>
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <div class="project-description">${project.description}</div>
                    <div class="project-technologies">
                        ${techTags}
                        ${project.technologies.length > 3 ? `<span class="tech-tag">+${project.technologies.length - 3}</span>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-metadata">
                <div class="project-stats">
                    <div class="stat-item-small">
                        <span class="material-icons-outlined">star</span>
                        ${project.stars}
                    </div>
                    <div class="stat-item-small">
                        <span class="material-icons-outlined">code</span>
                        ${project.language}
                    </div>
                    <div class="stat-item-small">
                        <span class="material-icons-outlined">schedule</span>
                        ${lastUpdate}
                    </div>
                </div>
                <div class="ai-score">IA: ${project.aiAnalysis.overallScore}%</div>
            </div>
        `;
        
        // Evento de clique
        card.addEventListener('click', () => showProjectModal(project));
        
        return card;
    }

    // Obter ícone do projeto baseado na linguagem
    function getProjectIcon(language) {
        const icons = {
            'JavaScript': 'javascript',
            'Python': 'psychology',
            'PHP': 'code',
            'Node.js': 'developer_mode',
            'Dart': 'phone_android',
            'HTML': 'web',
            'CSS': 'palette'
        };
        return icons[language] || 'folder';
    }

    // Filtrar e ordenar projetos
    function filterAndSortProjects(projects) {
        let filtered = projects;
        
        // Aplicar filtro de busca
        if (searchTerm) {
            filtered = filtered.filter(project => 
                project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        
        // Aplicar filtro de categoria
        switch (currentFilter) {
            case 'recent':
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                filtered = filtered.filter(project => new Date(project.lastUpdate) >= oneMonthAgo);
                break;
            case 'featured':
                filtered = filtered.filter(project => project.featured);
                break;
            case 'analyzed':
                filtered = filtered.filter(project => project.aiAnalysis.overallScore > 80);
                break;
        }
        
        // Aplicar ordenação
        filtered.sort((a, b) => {
            switch (currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'stars':
                    return b.stars - a.stars;
                case 'score':
                    return b.aiAnalysis.overallScore - a.aiAnalysis.overallScore;
                case 'date':
                default:
                    return new Date(b.lastUpdate) - new Date(a.lastUpdate);
            }
        });
        
        return filtered;
    }

    // Renderizar análise de tecnologias
    function renderTechAnalysis() {
        const container = document.getElementById('tech-analysis');
        if (!container) return;
        
        // Contar tecnologias
        const techCount = {};
        allProjects.forEach(project => {
            project.technologies.forEach(tech => {
                techCount[tech] = (techCount[tech] || 0) + 1;
            });
        });
        
        // Ordenar por frequência
        const sortedTechs = Object.entries(techCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 8);
        
        container.innerHTML = sortedTechs.map(([tech, count]) => `
            <div class="tech-item">
                <div class="tech-icon">
                    <span class="material-icons-outlined">${getTechIcon(tech)}</span>
                </div>
                <div class="tech-name">${tech}</div>
                <div class="tech-level">${count} projeto${count > 1 ? 's' : ''}</div>
            </div>
        `).join('');
    }

    // Obter ícone da tecnologia
    function getTechIcon(tech) {
        const icons = {
            'JavaScript': 'javascript',
            'Python': 'psychology',
            'HTML5': 'web',
            'CSS3': 'palette',
            'React': 'dynamic_feed',
            'Node.js': 'developer_mode',
            'MongoDB': 'storage',
            'Bootstrap': 'view_module'
        };
        return icons[tech] || 'code';
    }

    // Renderizar sugestões da IA
    function renderAISuggestions() {
        const container = document.getElementById('ai-suggestions');
        if (!container) return;
        
        const suggestions = [
            {
                title: "Implementar Testes Unitários",
                description: "Adicione testes automatizados para aumentar a confiabilidade do código e melhorar o score de qualidade.",
                icon: "bug_report"
            },
            {
                title: "Otimização de Performance",
                description: "Implemente lazy loading e otimização de imagens nos projetos front-end para melhor experiência do usuário.",
                icon: "speed"
            },
            {
                title: "Documentação Técnica",
                description: "Aprimore a documentação dos projetos com diagramas de arquitetura e guias de instalação detalhados.",
                icon: "description"
            },
            {
                title: "Segurança de APIs",
                description: "Implemente rate limiting e validação de entrada mais robusta nos projetos de API.",
                icon: "security"
            }
        ];
        
        container.innerHTML = suggestions.map(suggestion => `
            <div class="improvement-item">
                <div class="improvement-icon">
                    <span class="material-icons-outlined">${suggestion.icon}</span>
                </div>
                <div class="improvement-content">
                    <h4>${suggestion.title}</h4>
                    <p>${suggestion.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Busca
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchTerm = e.target.value;
                renderAllProjects();
                animateCards();
            });
        }
        
        // Filtros
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                updateVisibility();
                renderAllProjects();
                animateCards();
            });
        });
        
        // Ordenação
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                renderAllProjects();
                animateCards();
            });
        }
        
        // Sincronização GitHub
        if (syncButton) {
            syncButton.addEventListener('click', () => {
                simulateGitHubSync();
            });
        }
        
        // Modal
        if (modalClose) {
            modalClose.addEventListener('click', closeProjectModal);
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeProjectModal();
            });
        }
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display === 'block') {
                closeProjectModal();
            }
        });
        
        // Navegação do breadcrumb
        const breadcrumbLink = document.querySelector('.breadcrumb-link');
        if (breadcrumbLink) {
            breadcrumbLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.navigateTo) {
                    window.navigateTo('perfil');
                } else {
                    console.log('Navegando para o perfil...');
                }
            });
        }
    }

    // Simular sincronização GitHub
    function simulateGitHubSync() {
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }
        
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            
            // Atualizar status de sincronização
            const statusInfo = document.querySelector('.status-info p');
            if (statusInfo) {
                statusInfo.textContent = 'Última sincronização: agora';
            }
            
            // Mostrar notificação (se tiver sistema de notificações)
            console.log('✅ Sincronização com GitHub concluída!');
        }, 2000);
    }

    // Mostrar modal do projeto
    function showProjectModal(project) {
        if (!modal) return;
        
        // Preencher dados do modal
        const modalTitle = document.getElementById('modal-project-title');
        const modalDescription = document.getElementById('modal-project-description');
        const modalLanguage = document.getElementById('modal-project-language');
        const modalStars = document.getElementById('modal-project-stars');
        const modalDate = document.getElementById('modal-project-date');
        const modalTechs = document.getElementById('modal-project-techs');
        const modalInsights = document.getElementById('modal-ai-insights');
        const complexityScore = document.getElementById('complexity-score');
        const practicesScore = document.getElementById('practices-score');
        const documentationScore = document.getElementById('documentation-score');
        
        if (modalTitle) modalTitle.textContent = project.name;
        if (modalDescription) modalDescription.textContent = project.description;
        if (modalLanguage) modalLanguage.textContent = project.language;
        if (modalStars) modalStars.textContent = `${project.stars} estrelas`;
        if (modalDate) modalDate.textContent = new Date(project.lastUpdate).toLocaleDateString('pt-BR');
        if (modalInsights) modalInsights.textContent = project.aiAnalysis.insights;
        
        // Tecnologias
        if (modalTechs) {
            modalTechs.innerHTML = project.technologies.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');
        }
        
        // Scores da IA
        if (complexityScore) complexityScore.style.width = project.aiAnalysis.complexity + '%';
        if (practicesScore) practicesScore.style.width = project.aiAnalysis.practices + '%';
        if (documentationScore) documentationScore.style.width = project.aiAnalysis.documentation + '%';
        
        // Botões de ação
        const viewGithub = document.getElementById('view-github');
        const viewDemo = document.getElementById('view-demo');
        const analyzeAgain = document.getElementById('analyze-again');
        
        if (viewGithub) {
            viewGithub.onclick = () => window.open(project.githubUrl, '_blank');
        }
        
        if (viewDemo) {
            if (project.demoUrl) {
                viewDemo.style.display = 'flex';
                viewDemo.onclick = () => window.open(project.demoUrl, '_blank');
            } else {
                viewDemo.style.display = 'none';
            }
        }
        
        if (analyzeAgain) {
            analyzeAgain.onclick = () => {
                closeProjectModal();
                simulateAIAnalysis(project);
            };
        }
        
        // Mostrar modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Fechar modal
    function closeProjectModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Simular análise da IA
    function simulateAIAnalysis(project) {
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
            const loadingText = loadingOverlay.querySelector('p');
            if (loadingText) {
                loadingText.textContent = `Compass-IA analisando ${project.name}...`;
            }
        }
        
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            
            // Simular pequenas variações nos scores
            const variations = [-2, -1, 0, 1, 2];
            project.aiAnalysis.complexity += variations[Math.floor(Math.random() * variations.length)];
            project.aiAnalysis.practices += variations[Math.floor(Math.random() * variations.length)];
            project.aiAnalysis.documentation += variations[Math.floor(Math.random() * variations.length)];
            
            // Recalcular score geral
            project.aiAnalysis.overallScore = Math.round(
                (project.aiAnalysis.complexity + project.aiAnalysis.practices + project.aiAnalysis.documentation) / 3
            );
            
            console.log('🤖 Análise Compass-IA concluída!');
            
            // Reabrir modal com novos dados
            setTimeout(() => showProjectModal(project), 500);
        }, 3000);
    }

    // Atualizar visibilidade das seções
    function updateVisibility() {
        const featuredSection = document.getElementById('featured-section');
        const allProjectsSection = document.getElementById('all-projects-section');
        const aiAnalysisSection = document.getElementById('ai-analysis-section');
        
        if (!featuredSection || !allProjectsSection || !aiAnalysisSection) return;
        
        switch (currentFilter) {
            case 'featured':
                featuredSection.style.display = 'block';
                allProjectsSection.style.display = 'none';
                aiAnalysisSection.style.display = 'none';
                break;
            case 'analyzed':
                featuredSection.style.display = 'none';
                allProjectsSection.style.display = 'block';
                aiAnalysisSection.style.display = 'block';
                break;
            case 'recent':
            case 'all':
            default:
                featuredSection.style.display = currentFilter === 'all' ? 'block' : 'none';
                allProjectsSection.style.display = 'block';
                aiAnalysisSection.style.display = currentFilter === 'all' ? 'block' : 'none';
                break;
        }
    }

    // Animar cards
    function animateCards() {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.classList.remove('animate');
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 100);
        });
    }

    // Funções utilitárias
    function formatDate(dateString) {
        try {
            return new Date(dateString).toLocaleDateString('pt-BR');
        } catch (error) {
            return dateString;
        }
    }

    // Função para detectar tecnologias em repositórios (simulada)
    function detectTechnologies(repoContent) {
        // Esta função simularia a detecção de tecnologias
        // baseada no conteúdo dos arquivos do repositório
        const detectedTechs = [];
        
        // Simulação de detecção baseada em extensões de arquivos
        if (repoContent.includes('.js')) detectedTechs.push('JavaScript');
        if (repoContent.includes('.py')) detectedTechs.push('Python');
        if (repoContent.includes('.php')) detectedTechs.push('PHP');
        if (repoContent.includes('package.json')) detectedTechs.push('Node.js');
        if (repoContent.includes('requirements.txt')) detectedTechs.push('Python');
        if (repoContent.includes('.html')) detectedTechs.push('HTML5');
        if (repoContent.includes('.css')) detectedTechs.push('CSS3');
        
        return detectedTechs;
    }

    // Função para calcular score de complexidade (simulada)
    function calculateComplexityScore(codeMetrics) {
        // Esta função simularia o cálculo baseado em:
        // - Número de linhas de código
        // - Complexidade ciclomática
        // - Número de funções
        // - Profundidade de aninhamento
        return Math.floor(Math.random() * 30) + 70; // 70-100
    }

    // Função para avaliar boas práticas (simulada)
    function evaluateBestPractices(codeAnalysis) {
        // Esta função simularia a avaliação baseada em:
        // - Convenções de nomenclatura
        // - Estrutura de pastas
        // - Uso de linters
        // - Padrões de design
        return Math.floor(Math.random() * 25) + 75; // 75-100
    }

    // Função para avaliar documentação (simulada)
    function evaluateDocumentation(repoFiles) {
        // Esta função simularia a avaliação baseada em:
        // - Presença de README
        // - Comentários no código
        // - Documentação de API
        // - Exemplos de uso
        return Math.floor(Math.random() * 20) + 80; // 80-100
    }

    // Integração real com GitHub API (para implementação futura)
    async function fetchGitHubRepos(username) {
        try {
            // Esta seria a implementação real da API do GitHub
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            const repos = await response.json();
            
            return repos.map(repo => ({
                id: repo.id,
                name: repo.name,
                description: repo.description,
                language: repo.language,
                stars: repo.stargazers_count,
                lastUpdate: repo.updated_at,
                githubUrl: repo.html_url,
                demoUrl: repo.homepage
            }));
        } catch (error) {
            console.error('Erro ao buscar repositórios:', error);
            return [];
        }
    }

    // Função para buscar conteúdo de arquivos do GitHub
    async function fetchRepoContent(owner, repo) {
        try {
            // Esta seria a implementação real para buscar arquivos
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
            const files = await response.json();
            return files;
        } catch (error) {
            console.error('Erro ao buscar conteúdo do repositório:', error);
            return [];
        }
    }

    // Função para gerar insights da IA (simulada)
    function generateAIInsights(projectData) {
        const insights = [
            "Excelente estrutura de código com boas práticas de organização.",
            "Código bem documentado e fácil de manter.",
            "Uso eficiente de padrões de design modernos.",
            "Implementação robusta com tratamento adequado de erros.",
            "Código escalável com arquitetura bem definida.",
            "Boa separação de responsabilidades entre componentes.",
            "Implementação segura com validações adequadas.",
            "Interface intuitiva e experiência do usuário otimizada."
        ];
        
        const suggestions = [
            "Considere implementar testes automatizados para aumentar a confiabilidade.",
            "Adicione mais comentários no código para melhorar a legibilidade.",
            "Implemente cache para otimizar a performance da aplicação.",
            "Considere usar TypeScript para melhor tipagem e manutenibilidade.",
            "Adicione validação de entrada mais robusta para melhorar a segurança.",
            "Implemente logging para facilitar a depuração e monitoramento.",
            "Considere implementar CI/CD para automatizar deployments.",
            "Adicione documentação de API para facilitar integração de terceiros."
        ];
        
        const randomInsight = insights[Math.floor(Math.random() * insights.length)];
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        
        return `${randomInsight} ${randomSuggestion}`;
    }

    // Função para exportar dados dos projetos
    function exportProjectsData() {
        const data = {
            totalProjects: allProjects.length,
            technologies: [...new Set(allProjects.flatMap(p => p.technologies))],
            averageScore: Math.round(allProjects.reduce((sum, p) => sum + p.aiAnalysis.overallScore, 0) / allProjects.length),
            projects: allProjects.map(p => ({
                name: p.name,
                language: p.language,
                technologies: p.technologies,
                score: p.aiAnalysis.overallScore,
                lastUpdate: p.lastUpdate
            }))
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'projetos-careerpath.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Função para integração com sistema de skills
    function updateSkillsFromProjects() {
        // Esta função integraria com o sistema de hard skills
        // para atualizar automaticamente as pontuações baseadas
        // na análise dos projetos
        
        const techSkills = {};
        
        allProjects.forEach(project => {
            const projectWeight = project.aiAnalysis.overallScore / 100;
            
            project.technologies.forEach(tech => {
                if (!techSkills[tech]) {
                    techSkills[tech] = 0;
                }
                techSkills[tech] += projectWeight;
            });
        });
        
        // Normalizar scores (0-100)
        const maxScore = Math.max(...Object.values(techSkills));
        Object.keys(techSkills).forEach(tech => {
            techSkills[tech] = Math.round((techSkills[tech] / maxScore) * 100);
        });
        
        console.log('🎯 Skills atualizadas baseadas nos projetos:', techSkills);
        return techSkills;
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
}

// Chamar a função de inicialização
initProjetos();