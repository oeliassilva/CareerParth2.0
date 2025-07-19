// js/pages/vagas.js - Versão Modernizada

// Função principal que será executada quando a página for carregada
function initVagasPage() {
    
    console.log('🚀 Portal de Vagas CareerPath carregando (Versão Modernizada)...');

    // Configurar header fixo para esta página
    if (window.setupPageHeader) {
        window.setupPageHeader();
    } else {
        // Fallback caso a função global não esteja disponível
        console.log('⚠️ setupPageHeader não encontrado, aplicando manualmente...');
        setTimeout(() => {
            const header = document.querySelector('.page-header');
            if (header) {
                header.style.setProperty('background', 'linear-gradient(135deg, #0D253F 0%, #1A3A5C 100%)', 'important');
                header.style.setProperty('color', '#ffffff', 'important');
                header.style.setProperty('position', 'relative', 'important');
                header.style.setProperty('z-index', '1000', 'important');
                header.style.setProperty('border-radius', '16px', 'important');
                header.style.setProperty('margin-bottom', '32px', 'important');
                header.style.setProperty('box-shadow', '0 4px 20px rgba(0, 0, 0, 0.15)', 'important');
                
                console.log('✅ Header das Vagas configurado manualmente!');
            } else {
                console.error('❌ Header .page-header não encontrado! Verifique se foi adicionado no HTML.');
            }
        }, 100);
    }

    // --- DADOS SIMULADOS EXPANDIDOS ---
    const jobs = [
        {
            id: 1,
            title: 'Desenvolvedor(a) Front-End Júnior',
            company: 'Itaú Unibanco',
            location: 'São Paulo, SP',
            model: 'Híbrido',
            logo: 'https://logospng.org/download/itaú/logo-itau-4096.png',
            salary: 'R$ 5.500',
            contractType: 'CLT',
            description: 'Faça parte do time de tecnologia do maior banco da América Latina! Buscamos uma pessoa desenvolvedora Front-End Júnior para criar interfaces intuitivas e acessíveis para nossos produtos digitais. Você trabalhará com tecnologias de ponta em um ambiente ágil, colaborando com times de UX/UI e produto para entregar a melhor experiência aos nossos clientes.',
            technologies: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Git', 'GitHub', 'Jest', 'Redux Toolkit'],
            requiredSkills: {
                match: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Git', 'GitHub', 'Resolução de Problemas'],
                gap: ['Jest (Testes de Software)', 'Redux Toolkit']
            },
            matchPercentage: 85,
            featured: true
        },
        {
            id: 2,
            title: 'Dev. Back-End Jr.',
            company: 'iFood',
            location: 'Qualquer lugar',
            model: 'Remoto',
            logo: 'https://cdn.worldvectorlogo.com/logos/ifood-2.svg',
            salary: 'R$ 6.000',
            contractType: 'CLT',
            description: 'Responsável por desenvolver e manter nossas APIs de alta performance que atendem milhões de usuários, com foco em escalabilidade e resiliência. Você será parte de um time que impacta diretamente a experiência de entrega de comida no Brasil. Trabalhe com tecnologias modernas em um ambiente dinâmico.',
            technologies: ['Node.js', 'JavaScript', 'SQL', 'Docker', 'AWS', 'Git', 'MongoDB', 'Redis'],
            requiredSkills: {
                match: ['JavaScript', 'Git'],
                gap: ['Node.js', 'SQL', 'Docker', 'AWS', 'MongoDB', 'Redis']
            },
            matchPercentage: 20,
            featured: false
        },
        {
            id: 3,
            title: 'Arquiteto de Cloud',
            company: 'AWS',
            location: 'São Paulo, SP',
            model: 'Híbrido',
            logo: 'https://cdn.worldvectorlogo.com/logos/aws-logo.svg',
            salary: 'R$ 18.000',
            contractType: 'PJ',
            description: 'Projetar e implementar soluções de nuvem robustas, seguras e otimizadas para clientes de grande porte, definindo a arquitetura e as melhores práticas. Posição para profissionais seniores com experiência em infraestrutura cloud. Lidere projetos de transformação digital em empresas Fortune 500.',
            technologies: ['AWS', 'Terraform', 'CI/CD', 'Docker', 'Kubernetes', 'Python', 'Linux', 'Networking'],
            requiredSkills: {
                match: ['Git'],
                gap: ['AWS', 'Terraform', 'CI/CD', 'Docker', 'Kubernetes', 'Python', 'Linux', 'Networking']
            },
            matchPercentage: 14,
            featured: false
        }
    ];

    const courseSuggestions = {
        'Jest (Testes de Software)': [
            'Testes para Aplicações React com Jest e Testing Library',
            'Fundamentos de Testes Automatizados'
        ],
        'Redux Toolkit': [
            'Gerenciamento de Estado com Redux Toolkit',
            'Redux para React - Do Básico ao Avançado'
        ],
        'Node.js': [
            'Node.js Completo - Do Zero ao Deploy',
            'APIs REST com Node.js e Express'
        ],
        'SQL': [
            'Banco de Dados SQL - MySQL Completo',
            'PostgreSQL para Desenvolvedores'
        ],
        'Docker': [
            'Docker Essencial para Desenvolvedores',
            'Contêineres com Docker - Curso Completo'
        ],
        'AWS': [
            'Amazon Web Services - Fundamentos',
            'AWS Solutions Architect'
        ],
        'MongoDB': [
            'MongoDB Essencial',
            'NoSQL com MongoDB'
        ],
        'Redis': [
            'Cache com Redis',
            'Redis para Performance'
        ],
        'Terraform': [
            'Infrastructure as Code com Terraform',
            'Terraform na AWS'
        ],
        'Kubernetes': [
            'Kubernetes para Desenvolvedores',
            'Container Orchestration com Kubernetes'
        ],
        'Python': [
            'Python Completo - Do Básico ao Avançado',
            'Python para DevOps'
        ],
        'Linux': [
            'Linux para Desenvolvedores',
            'Administração de Sistemas Linux'
        ],
        'Networking': [
            'Redes de Computadores Fundamentais',
            'TCP/IP e Protocolos de Rede'
        ]
    };

    // Função para aguardar elementos estarem disponíveis
    function waitForElements() {
        return new Promise((resolve) => {
            const checkElements = () => {
                const listView = document.getElementById('vagas-list-view');
                const detailView = document.getElementById('vaga-detail-view');
                const listContainer = document.getElementById('vagas-list-container');
                const searchInput = document.getElementById('search-input');
                const matchFilter = document.getElementById('match-filter');
                const backBtn = document.getElementById('back-to-list-btn');

                if (listView && detailView && listContainer && searchInput && matchFilter && backBtn) {
                    resolve({
                        listView,
                        detailView,
                        listContainer,
                        searchInput,
                        matchFilter,
                        backBtn
                    });
                } else {
                    console.log('⏳ Aguardando elementos DOM...');
                    setTimeout(checkElements, 100);
                }
            };
            checkElements();
        });
    }

    // Aguarda os elementos e inicializa
    waitForElements().then((elements) => {
        const { listView, detailView, listContainer, searchInput, matchFilter, backBtn } = elements;
        
        console.log('✅ Todos os elementos DOM encontrados');

        // --- FUNÇÕES PRINCIPAIS ---

        function applyFilters() {
            const query = searchInput.value.toLowerCase().trim();
            const matchThreshold = parseInt(matchFilter.value, 10);
            
            console.log('🔍 Aplicando filtros:');
            console.log('   - Busca: "' + query + '"');
            console.log('   - Match mínimo: ' + matchThreshold + '%');

            const filteredJobs = jobs.filter(job => {
                // Filtro por texto (cargo, empresa ou tecnologia)
                const matchesQuery = query === '' ||
                    job.title.toLowerCase().includes(query) ||
                    job.company.toLowerCase().includes(query) ||
                    job.technologies.some(tech => tech.toLowerCase().includes(query));

                // Filtro por porcentagem de match
                const matchesThreshold = matchThreshold === 0 || job.matchPercentage >= matchThreshold;

                const passes = matchesQuery && matchesThreshold;
                
                console.log('   - "' + job.title + '": query=' + matchesQuery + ', threshold=' + matchesThreshold + ' → ' + (passes ? '✅' : '❌'));
                
                return passes;
            });

            console.log('📊 Resultado: ' + filteredJobs.length + ' vaga(s) encontrada(s)');
            renderVagasList(filteredJobs);
        }

        function renderVagasList(vagas) {
            listContainer.innerHTML = '';
            
            if (vagas.length === 0) {
                listContainer.innerHTML = `
                    <div class="no-results">
                        <div style="font-size: 64px; margin-bottom: 20px;">🔍</div>
                        <h3>Nenhuma vaga encontrada</h3>
                        <p>Tente ajustar os filtros ou buscar por outros termos. Novas vagas são adicionadas diariamente!</p>
                    </div>
                `;
                return;
            }

            vagas.forEach((job, index) => {
                const card = document.createElement('div');
                card.className = 'vaga-card';
                card.dataset.jobId = job.id;
                
                // Determina a cor do match
                let matchColorClass = 'low-match';
                if (job.matchPercentage >= 75) {
                    matchColorClass = 'high-match';
                } else if (job.matchPercentage >= 50) {
                    matchColorClass = 'medium-match';
                }

                // Gera as tags
                const tags = `
                    <div class="vaga-tags">
                        <span class="vaga-tag salary">💰 ${job.salary}</span>
                        <span class="vaga-tag type">📋 ${job.contractType}</span>
                        <span class="vaga-tag">${job.model}</span>
                    </div>
                `;

                // Template do card modernizado
                card.innerHTML = `
                    <div class="vaga-card-header">
                        <div class="vaga-logo">
                            <img src="${job.logo}" alt="${job.company}" onerror="this.style.display='none'">
                        </div>
                        <div class="vaga-info">
                            <h4>${job.title}</h4>
                            <p>${job.company}</p>
                        </div>
                    </div>
                    
                    ${tags}
                    
                    <div class="vaga-card-footer">
                        <div class="vaga-location">
                            <span class="material-icons-outlined">location_on</span>
                            <span>${job.location} • ${job.model}</span>
                        </div>
                        <div class="match-display">
                            <span class="match-percentage ${matchColorClass}">${job.matchPercentage}%</span>
                            <span class="match-label">Compatibilidade</span>
                        </div>
                    </div>
                `;

                // Adiciona evento de clique
                card.addEventListener('click', function(e) {
                    // Previne clique duplo
                    if (card.classList.contains('loading')) return;
                    
                    console.log('🎯 Clicou na vaga: ' + job.title);
                    
                    // Adiciona estado de loading
                    card.classList.add('loading');
                    
                    // Remove loading e mostra detalhes
                    setTimeout(() => {
                        card.classList.remove('loading');
                        showVagaDetail(job.id);
                    }, 800);
                });

                // Animação de entrada escalonada
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                listContainer.appendChild(card);

                // Anima a entrada do card
                setTimeout(function() {
                    card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });

            console.log('✅ ' + vagas.length + ' cards renderizados com sucesso');
        }

        function showVagaDetail(jobId) {
            const job = jobs.find(j => j.id === jobId);
            if (!job) {
                console.error('❌ Vaga com ID ' + jobId + ' não encontrada');
                return;
            }

            console.log('📋 Carregando detalhes da vaga: ' + job.title);

            // Atualiza informações básicas
            document.getElementById('detail-job-title').textContent = job.title;
            document.getElementById('detail-company-name').textContent = job.company;
            document.getElementById('detail-location').textContent = job.location + ' (' + job.model + ')';
            document.getElementById('detail-company-logo').src = job.logo;
            document.getElementById('detail-contract').textContent = job.contractType;
            document.getElementById('detail-model').textContent = job.model;
            document.getElementById('detail-salary').textContent = job.salary;
            document.getElementById('detail-description').textContent = job.description;
            document.getElementById('detail-percentage-text').textContent = job.matchPercentage + '%';

            // Atualiza skills compatíveis
            const matchingSkillsContainer = document.getElementById('detail-matching-skills');
            matchingSkillsContainer.innerHTML = job.requiredSkills.match
                .map(skill => {
                    const isSoftSkill = skill === 'Resolução de Problemas' || 
                                      skill === 'Comunicação' || 
                                      skill === 'Trabalho em Equipe' ||
                                      skill === 'Liderança';
                    return '<span class="skill-tag match ' + (isSoftSkill ? 'soft' : '') + '">' + skill + '</span>';
                }).join('');

            // Atualiza skills em falta
            const gapSkillsContainer = document.getElementById('detail-gap-skills');
            gapSkillsContainer.innerHTML = job.requiredSkills.gap
                .map(skill => '<span class="skill-tag gap">' + skill + '</span>')
                .join('');

            // Atualiza cursos recomendados
            updateCourseRecommendations(job.requiredSkills.gap);

            // Transição simples e direta
            listView.style.display = 'none';
            detailView.style.display = 'block';
            
            // Anima o círculo de progresso após mostrar a tela
            setTimeout(() => {
                animateProgressCircle(job.matchPercentage);
            }, 100);
            
            window.scrollTo({ top: 0, behavior: 'smooth' });

            console.log('✅ Detalhes da vaga carregados: ' + job.title);
        }

        function animateProgressCircle(percentage) {
            const circle = document.querySelector('.progress-circle-fill');
            if (!circle) return;

            const radius = 54; // Raio do círculo
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percentage / 100) * circumference;
            
            // Reset inicial
            circle.style.strokeDashoffset = circumference;
            
            // Anima após pequeno delay
            setTimeout(function() {
                circle.style.strokeDashoffset = offset;
            }, 500);

            console.log('🎨 Círculo animado para ' + percentage + '%');
        }

        function updateCourseRecommendations(gapSkills) {
            const courseList = document.getElementById('detail-course-list');
            courseList.innerHTML = '';
            
            if (gapSkills.length === 0) {
                courseList.innerHTML = `
                    <div style="text-align: center; color: var(--text-light); padding: 40px 20px; border: 2px dashed var(--border-color); border-radius: 12px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
                        <h4 style="color: var(--success-text); margin-bottom: 8px;">Parabéns!</h4>
                        <p>Você já possui todas as habilidades necessárias para esta vaga.</p>
                    </div>
                `;
                return;
            }

            gapSkills.forEach((skill, index) => {
                const courses = courseSuggestions[skill] || ['Curso Básico de ' + skill, skill + ' para Iniciantes'];
                
                courses.forEach((courseTitle, courseIndex) => {
                    const courseCard = document.createElement('div');
                    courseCard.className = 'course-card';
                    courseCard.style.opacity = '0';
                    courseCard.style.transform = 'translateY(20px)';
                    
                    courseCard.innerHTML = `
                        <h5 class="course-title">📚 ${courseTitle}</h5>
                        <p class="course-platform">🏫 Plataforma: CareerPath Learning</p>
                        <a href="#" class="course-link">Acessar Curso →</a>
                    `;
                    
                    courseList.appendChild(courseCard);

                    // Animação de entrada escalonada
                    setTimeout(function() {
                        courseCard.style.transition = 'all 0.4s ease';
                        courseCard.style.opacity = '1';
                        courseCard.style.transform = 'translateY(0)';
                    }, (index * courses.length + courseIndex) * 100);
                });
            });

            console.log('📚 ' + gapSkills.length + ' skill(s) identificada(s) para desenvolvimento');
        }

        function hideVagaDetail() {
            console.log('🔙 Voltando para a lista de vagas');
            
            detailView.style.display = 'none';
            listView.style.display = 'block';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // --- EVENTOS ---
        
        // Filtro de busca com debounce
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(applyFilters, 300);
        });
        
        matchFilter.addEventListener('change', applyFilters);
        
        // Botão voltar - CORRIGIDO
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔙 Botão voltar clicado');
            hideVagaDetail();
        });

        // Eventos de teclado para acessibilidade
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchInput.value = '';
                applyFilters();
            }
        });

        // ESC para voltar da tela de detalhes
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && detailView.style.display === 'block') {
                hideVagaDetail();
            }
        });

        // Adiciona feedback visual no input de busca
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            this.parentElement.style.boxShadow = '';
        });

        // --- INICIALIZAÇÃO ---
        console.log('🎯 Inicializando portal modernizado...');
        console.log('📊 ' + jobs.length + ' vagas carregadas:');
        jobs.forEach((job, index) => {
            console.log('   ' + (index + 1) + '. ' + job.title + ' - ' + job.company + ' (' + job.matchPercentage + '% match)');
        });

        // Carrega todas as vagas inicialmente
        applyFilters();
        
        console.log('🚀 Portal de Vagas CareerPath totalmente carregado! (Versão Modernizada)');
        console.log('💡 Novidades da versão moderna:');
        console.log('   - ✨ Design moderno com animações suaves');
        console.log('   - 🎨 Cards redesenhados com melhor visual');
        console.log('   - 🚀 Transições fluidas entre telas');
        console.log('   - 📱 Interface mais responsiva');
        console.log('   - 🎯 Melhor feedback visual');
    });
}

// Para sistemas SPA, executa imediatamente se o DOM já está pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVagasPage);
} else {
    // DOM já está pronto, executa imediatamente
    initVagasPage();
}

// Para compatibilidade com módulos ES6
export function init() {
    console.log('🚀 Vagas Modernizadas - Função init() chamada pelo router');
    initVagasPage();
}

// Também expõe a função globalmente para o router chamar se necessário
window.initVagasPage = initVagasPage;