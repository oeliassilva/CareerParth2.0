// certificacoes-detalhe.js

// Função de inicialização que será chamada automaticamente
function initCertificacoes() {
    console.log('🏆 Página de Certificações carregada!');
    
    // Dados das certificações do dashboard
    const certificationsData = {
        external: [
            {
                id: 1,
                title: "AWS Cloud Practitioner Foundational",
                provider: "Amazon Web Services",
                date: "2024-11-15",
                level: "beginner",
                status: "valid",
                image: "/assets/images/cert-aws-cloud-practitioner.png",
                description: "Certificação fundamental da AWS que valida o conhecimento básico sobre a nuvem AWS e serviços principais."
            },
            {
                id: 2,
                title: "Oracle Certified Professional",
                provider: "Oracle Corporation", 
                date: "2024-09-22",
                level: "advanced",
                status: "valid",
                image: "/assets/images/cert-oracle-professional.png",
                description: "Certificação avançada Oracle que demonstra expertise em administração de banco de dados."
            },
            {
                id: 3,
                title: "Intro to HTML",
                provider: "Colorado Skills Institute",
                date: "2024-08-10",
                level: "beginner",
                status: "valid",
                image: "/assets/images/badge-challenge-institute.png",
                description: "Certificação em HTML básico pelo Colorado Community College System."
            },
            {
                id: 4,
                title: "Terraform Course Completion",
                provider: "DevOps Artisan",
                date: "2024-07-25",
                level: "intermediate",
                status: "valid",
                image: "/assets/images/badge-course-completion.png",
                description: "Certificação de conclusão em Terraform para infraestrutura como código."
            },
            {
                id: 5,
                title: "Python Certificate of Completion",
                provider: "mthree",
                date: "2024-06-15",
                level: "intermediate",
                status: "valid",
                image: "/assets/images/badge-python.png",
                description: "Certificado de conclusão em Python para desenvolvimento e análise de dados."
            }
        ],
        careerpath: [
            {
                id: 6,
                title: "JavaScript Fundamentals",
                provider: "CareerPath",
                date: "2024-10-01",
                level: "beginner",
                status: "valid",
                image: "/assets/images/badge-javascript.png",
                description: "Badge CareerPath em fundamentos de JavaScript para desenvolvimento web."
            }
        ]
    };

    // Estado da aplicação
    let currentFilter = 'all';
    let currentSort = 'date';
    let searchTerm = '';

    // Elementos DOM
    const searchInput = document.getElementById('cert-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');

    // Inicialização
    function initialize() {
        setupHeader();
        renderAllCertifications();
        setupEventListeners();
        animateCards();
        updateStatistics();
        
        console.log('✅ Certificações totalmente carregadas!');
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
        const totalExt = certificationsData.external.length; // 5
        const totalCP = certificationsData.careerpath.length; // 1
        const total = totalExt + totalCP; // 6
        
        const totalCertifications = document.getElementById('total-certifications');
        const totalBadges = document.getElementById('total-badges');
        const completionRate = document.getElementById('completion-rate');
        const externalCount = document.getElementById('external-count');
        const badgesCount = document.getElementById('badges-count');
        
        if (totalCertifications) totalCertifications.textContent = total;
        if (totalBadges) totalBadges.textContent = totalCP;
        if (completionRate) completionRate.textContent = '100%';
        if (externalCount) externalCount.textContent = totalExt;
        if (badgesCount) badgesCount.textContent = totalCP;
        
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

    // Renderizar todas as certificações
    function renderAllCertifications() {
        renderExternalCertifications();
        renderCareerPathBadges();
        updateVisibility();
    }

    // Renderizar certificações externas
    function renderExternalCertifications() {
        const container = document.getElementById('external-certifications');
        if (!container) return;
        
        const filteredCerts = filterAndSortCertifications(certificationsData.external);
        
        container.innerHTML = '';
        
        filteredCerts.forEach((cert, index) => {
            const card = createCertificationCard(cert, index);
            container.appendChild(card);
        });
    }

    // Renderizar badges CareerPath
    function renderCareerPathBadges() {
        const container = document.getElementById('careerpath-badges');
        if (!container) return;
        
        const filteredBadges = filterAndSortCertifications(certificationsData.careerpath);
        
        container.innerHTML = '';
        
        filteredBadges.forEach((badge, index) => {
            const card = createCertificationCard(badge, index);
            container.appendChild(card);
        });
    }

    // Criar card de certificação
    function createCertificationCard(cert, index) {
        const card = document.createElement('div');
        card.className = 'certification-card';
        
        card.innerHTML = `
            <div class="cert-header">
                <div class="cert-badge">
                    <img src="${cert.image}" alt="${cert.title}" onerror="this.style.display='none'">
                </div>
                <div class="cert-info">
                    <h3>${cert.title}</h3>
                    <div class="cert-provider">${cert.provider}</div>
                    <div class="cert-level ${cert.level}">${getLevelText(cert.level)}</div>
                </div>
            </div>
            <div class="cert-meta">
                <div class="cert-date">${formatDate(cert.date)}</div>
                <div class="cert-status ${cert.status}">
                    <span class="material-icons-outlined">verified</span>
                    Válida
                </div>
            </div>
        `;
        
        return card;
    }

    // Filtrar e ordenar certificações
    function filterAndSortCertifications(certifications) {
        let filtered = certifications;
        
        // Aplicar filtro de busca
        if (searchTerm) {
            filtered = filtered.filter(cert => 
                cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cert.provider.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Aplicar ordenação
        filtered.sort((a, b) => {
            switch (currentSort) {
                case 'name':
                    return a.title.localeCompare(b.title);
                case 'provider':
                    return a.provider.localeCompare(b.provider);
                case 'date':
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });
        
        return filtered;
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Busca
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchTerm = e.target.value;
                renderAllCertifications();
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
                animateCards();
            });
        });
        
        // Ordenação
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                renderAllCertifications();
                animateCards();
            });
        }
        
        // Navegação do breadcrumb
        const breadcrumbLink = document.querySelector('.breadcrumb-link');
        if (breadcrumbLink) {
            breadcrumbLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Aqui você pode implementar a navegação SPA
                if (window.navigateTo) {
                    window.navigateTo('perfil');
                } else {
                    console.log('Navegando para o perfil...');
                }
            });
        }
    }

    // Atualizar visibilidade das seções
    function updateVisibility() {
        const externalSection = document.getElementById('external-section');
        const careerpathSection = document.getElementById('careerpath-section');
        
        if (!externalSection || !careerpathSection) return;
        
        switch (currentFilter) {
            case 'external':
                externalSection.style.display = 'block';
                careerpathSection.style.display = 'none';
                break;
            case 'careerpath':
                externalSection.style.display = 'none';
                careerpathSection.style.display = 'block';
                break;
            case 'all':
            default:
                externalSection.style.display = 'block';
                careerpathSection.style.display = 'block';
                break;
        }
    }

    // Animar cards
    function animateCards() {
        const cards = document.querySelectorAll('.certification-card');
        cards.forEach((card, index) => {
            card.classList.remove('animate');
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 100);
        });
    }

    // Funções utilitárias
    function getLevelText(level) {
        const levels = {
            beginner: 'Iniciante',
            intermediate: 'Intermediário', 
            advanced: 'Avançado',
            expert: 'Expert'
        };
        return levels[level] || level;
    }

    function formatDate(dateString) {
        try {
            return new Date(dateString).toLocaleDateString('pt-BR');
        } catch (error) {
            return dateString;
        }
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
}

// Chamar a função de inicialização
initCertificacoes();