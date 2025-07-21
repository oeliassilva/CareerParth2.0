// js/pages/vagas.js - Versão com Compass IA Integrada

class VagasManager {
    constructor() {
        this.jobs = [];
        this.currentFilters = {
            search: '',
            match: 0,
            area: 'all'
        };
        this.userProfile = this.loadUserProfile();
        this.currentJob = null;
        this.courseSuggestions = {};
        this.init();
    }

    init() {
        console.log('🚀 Sistema de Vagas com Compass IA inicializando...');
        
        this.loadJobsData();
        this.loadCourseSuggestions();
        this.setupEventListeners();
        this.renderJobs();
        this.updateStats();
        
        console.log('✅ Sistema de Vagas inicializado!');
    }

    loadUserProfile() {
        // Perfil focado em desenvolvimento front-end (mesmo dos outros módulos)
        return {
            skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Git', 'Responsive Design'],
            interests: ['Front-End', 'Web Development', 'UI/UX'],
            level: 'Júnior',
            focusArea: 'Front-End Development',
            certifications: [
                'JavaScript ES6+ Certification',
                'React Developer Certification'
            ],
            completedCourses: ['JavaScript Básico', 'HTML/CSS Fundamentals', 'React Introdução'],
            careerGoals: ['Front-End Sênior', 'Full-Stack Developer'],
            experience: 1.5,
            currentLearning: ['React Hooks', 'TypeScript', 'CSS Grid'],
            salaryExpectation: 'R$ 4.500 - R$ 7.000',
            location: 'São Paulo, SP',
            workModel: 'Híbrido'
        };
    }

    loadJobsData() {
        this.jobs = [
            {
                id: 1,
                title: 'Desenvolvedor(a) Front-End Júnior',
                company: 'Itaú Unibanco',
                location: 'São Paulo, SP',
                model: 'Híbrido',
                area: 'Front-End',
                logo: 'https://logospng.org/download/itaú/logo-itau-4096.png',
                salary: 'R$ 5.500',
                contractType: 'CLT',
                description: 'Faça parte do time de tecnologia do maior banco da América Latina! Buscamos uma pessoa desenvolvedora Front-End Júnior para criar interfaces intuitivas e acessíveis para nossos produtos digitais. Você trabalhará com tecnologias de ponta em um ambiente ágil, colaborando com times de UX/UI e produto para entregar a melhor experiência aos nossos clientes.',
                technologies: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Git', 'GitHub', 'Jest', 'Redux Toolkit'],
                requiredSkills: {
                    match: ['JavaScript', 'HTML', 'CSS', 'React', 'Git', 'GitHub'],
                    gap: ['TypeScript', 'Jest', 'Redux Toolkit']
                },
                matchPercentage: 85,
                recommended: true,
                featured: true,
                postedDays: 2
            },
            {
                id: 2,
                title: 'Frontend Developer React',
                company: 'Stone',
                location: 'São Paulo, SP',
                model: 'Híbrido',
                area: 'Front-End',
                logo: 'https://logospng.org/download/stone-pagamentos/stone-512.png',
                salary: 'R$ 6.200',
                contractType: 'CLT',
                description: 'Venha fazer parte da revolução dos pagamentos! Procuramos um(a) desenvolvedor(a) React para criar soluções inovadoras em fintech. Ambiente descontraído, tecnologias modernas e oportunidade de crescimento rápido.',
                technologies: ['React', 'JavaScript', 'TypeScript', 'Styled Components', 'Next.js', 'GraphQL'],
                requiredSkills: {
                    match: ['React', 'JavaScript', 'HTML', 'CSS'],
                    gap: ['TypeScript', 'Styled Components', 'Next.js', 'GraphQL']
                },
                matchPercentage: 78,
                recommended: true,
                featured: false,
                postedDays: 1
            },
            {
                id: 3,
                title: 'Dev. Front-End Pleno',
                company: 'Nubank',
                location: 'São Paulo, SP',
                model: 'Remoto',
                area: 'Front-End',
                logo: 'https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-0-1.png',
                salary: 'R$ 8.500',
                contractType: 'CLT',
                description: 'Transforme a experiência financeira de milhões de brasileiros! Buscamos desenvolvedores front-end para trabalhar em produtos que impactam a vida das pessoas. Cultura de inovação, tecnologia de ponta e benefícios incríveis.',
                technologies: ['React', 'TypeScript', 'Clojure', 'CSS-in-JS', 'React Native', 'GraphQL'],
                requiredSkills: {
                    match: ['React', 'JavaScript', 'HTML', 'CSS'],
                    gap: ['TypeScript', 'Clojure', 'CSS-in-JS', 'React Native', 'GraphQL']
                },
                matchPercentage: 65,
                recommended: false,
                featured: true,
                postedDays: 3
            },
            {
                id: 4,
                title: 'Desenvolvedor Back-End Júnior',
                company: 'iFood',
                location: 'Qualquer lugar',
                model: 'Remoto',
                area: 'Back-End',
                logo: 'https://cdn.worldvectorlogo.com/logos/ifood-2.svg',
                salary: 'R$ 6.000',
                contractType: 'CLT',
                description: 'Responsável por desenvolver e manter nossas APIs de alta performance que atendem milhões de usuários, com foco em escalabilidade e resiliência.',
                technologies: ['Node.js', 'JavaScript', 'SQL', 'Docker', 'AWS', 'Git', 'MongoDB', 'Redis'],
                requiredSkills: {
                    match: ['JavaScript', 'Git'],
                    gap: ['Node.js', 'SQL', 'Docker', 'AWS', 'MongoDB', 'Redis']
                },
                matchPercentage: 25,
                recommended: false,
                featured: false,
                postedDays: 5
            },
            {
                id: 5,
                title: 'Desenvolvedor Full-Stack',
                company: 'Mercado Livre',
                location: 'São Paulo, SP',
                model: 'Híbrido',
                area: 'Full-Stack',
                logo: 'https://logoeps.com/wp-content/uploads/2013/03/mercadolibre-vector-logo.png',
                salary: 'R$ 9.200',
                contractType: 'CLT',
                description: 'Desenvolva soluções end-to-end para o maior marketplace da América Latina. Trabalhe com React no front-end e Java/Node.js no back-end.',
                technologies: ['React', 'Node.js', 'Java', 'TypeScript', 'AWS', 'Docker', 'Microservices'],
                requiredSkills: {
                    match: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
                    gap: ['Node.js', 'Java', 'TypeScript', 'AWS', 'Docker', 'Microservices']
                },
                matchPercentage: 55,
                recommended: false,
                featured: false,
                postedDays: 4
            },
            {
                id: 6,
                title: 'UI/UX Developer',
                company: 'Spotify',
                location: 'São Paulo, SP',
                model: 'Híbrido',
                area: 'Front-End',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
                salary: 'R$ 7.800',
                contractType: 'CLT',
                description: 'Crie interfaces musicais incríveis! Combinando design e código para proporcionar a melhor experiência aos usuários do Spotify.',
                technologies: ['React', 'TypeScript', 'Figma', 'Styled Components', 'Animation Libraries'],
                requiredSkills: {
                    match: ['React', 'JavaScript', 'HTML', 'CSS', 'Responsive Design'],
                    gap: ['TypeScript', 'Figma', 'Styled Components', 'Animation Libraries']
                },
                matchPercentage: 72,
                recommended: true,
                featured: false,
                postedDays: 1
            }
        ];
    }

    loadCourseSuggestions() {
        this.courseSuggestions = {
            'TypeScript': [
                'TypeScript do Zero ao Avançado',
                'TypeScript para React Developers'
            ],
            'Jest': [
                'Testes para Aplicações React com Jest',
                'Testing JavaScript - Fundamentos'
            ],
            'Redux Toolkit': [
                'Gerenciamento de Estado com Redux Toolkit',
                'Redux Moderno para React'
            ],
            'Next.js': [
                'Next.js - React Framework Completo',
                'SSR e SSG com Next.js'
            ],
            'GraphQL': [
                'GraphQL do Básico ao Avançado',
                'Apollo Client com React'
            ],
            'Styled Components': [
                'CSS-in-JS com Styled Components',
                'Componentes Estilizados no React'
            ],
            'Node.js': [
                'Node.js Completo - Do Zero ao Deploy',
                'APIs REST com Node.js e Express'
            ],
            'Docker': [
                'Docker Essencial para Desenvolvedores',
                'Containerização de Aplicações'
            ],
            'AWS': [
                'Amazon Web Services - Fundamentos',
                'Deploy de Aplicações na AWS'
            ],
            'Figma': [
                'Figma para Desenvolvedores',
                'Design System com Figma'
            ],
            'Animation Libraries': [
                'Animações com Framer Motion',
                'CSS Animations Avançadas'
            ]
        };
    }

    setupEventListeners() {
        // Filtros
        document.getElementById('search-input')?.addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase().trim();
            this.debounceRender();
        });

        document.getElementById('match-filter')?.addEventListener('change', (e) => {
            this.currentFilters.match = parseInt(e.target.value);
            this.renderJobs();
        });

        document.getElementById('area-filter')?.addEventListener('change', (e) => {
            this.currentFilters.area = e.target.value;
            this.renderJobs();
        });

        // Compass IA - Análise
        document.getElementById('compass-analise-btn')?.addEventListener('click', () => {
            this.handleCompassAnalysis();
        });

        // Modal listeners
        this.setupModalListeners();
    }

    setupModalListeners() {
        // Fechar modais
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal-overlay');
                this.closeModal(modal);
            });
        });

        // Fechar modal clicando fora
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });

        // Ações da vaga
        document.getElementById('perguntar-compass-vaga-btn')?.addEventListener('click', () => {
            this.perguntarCompassVaga();
        });

        document.getElementById('favoritar-vaga-btn')?.addEventListener('click', () => {
            this.favoritarVaga();
        });
    }

    debounceRender() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.renderJobs();
        }, 300);
    }

    handleCompassAnalysis() {
        const btn = document.getElementById('compass-analise-btn');
        const section = document.getElementById('compass-vagas-section');
        
        // Mostrar loading
        btn.innerHTML = `
            <div class="typing-animation">
                <span></span><span></span><span></span>
            </div>
            Compass analisando...
        `;
        btn.disabled = true;
        
        // Simular delay de processamento da IA
        setTimeout(() => {
            this.generateCompassAnalysis();
            section.style.display = 'block';
            
            // Restaurar botão
            btn.innerHTML = `
                <span class="material-icons-outlined">auto_awesome</span>
                Nova Análise
            `;
            btn.disabled = false;
            
            // Scroll suave para a análise
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 3000);
    }

    generateCompassAnalysis() {
        // Análise do perfil
        const profileSummary = document.getElementById('compass-profile-summary');
        profileSummary.innerHTML = `
            <div class="analysis-item">
                <strong>💼 Nível Atual:</strong> ${this.userProfile.level} em ${this.userProfile.focusArea}
            </div>
            <div class="analysis-item">
                <strong>🛠️ Skills Principais:</strong> ${this.userProfile.skills.slice(0, 4).join(', ')}
            </div>
            <div class="analysis-item">
                <strong>🎯 Objetivos:</strong> ${this.userProfile.careerGoals.join(' → ')}
            </div>
            <div class="analysis-item">
                <strong>📍 Localização:</strong> ${this.userProfile.location} (${this.userProfile.workModel})
            </div>
        `;

        // Insights do mercado
        const marketAnalysis = document.getElementById('compass-market-analysis');
        const avgSalary = this.calculateAverageSalary();
        const highMatchCount = this.jobs.filter(job => job.matchPercentage >= 75).length;
        
        marketAnalysis.innerHTML = `
            <div class="analysis-item">
                <strong>💰 Salário Médio (Front-End Jr):</strong> ${avgSalary}
            </div>
            <div class="analysis-item">
                <strong>📈 Vagas com Alto Match:</strong> ${highMatchCount} de ${this.jobs.length} disponíveis
            </div>
            <div class="analysis-item">
                <strong>🔥 Tecnologia em Alta:</strong> React + TypeScript
            </div>
            <div class="analysis-item">
                <strong>⚡ Skill Mais Demandada:</strong> TypeScript (presente em 80% das vagas)
            </div>
        `;

        // Vagas recomendadas
        const recommendedJobs = this.jobs
            .filter(job => job.recommended || job.matchPercentage >= 70)
            .sort((a, b) => b.matchPercentage - a.matchPercentage)
            .slice(0, 3);

        const container = document.getElementById('compass-vagas-container');
        container.innerHTML = recommendedJobs
            .map(job => this.createJobCard(job, true))
            .join('');

        // Explicação da Compass
        const reasoning = document.getElementById('compass-vagas-reasoning');
        reasoning.textContent = `Baseado no seu perfil de ${this.userProfile.level} em ${this.userProfile.focusArea}, priorizei vagas que utilizam suas skills atuais (${this.userProfile.skills.slice(0, 3).join(', ')}) e oferecem oportunidade de crescimento em tecnologias complementares como TypeScript e ferramentas modernas de React.`;

        this.setupCardListeners();
    }

    calculateAverageSalary() {
        const frontEndJobs = this.jobs.filter(job => job.area === 'Front-End');
        const salaries = frontEndJobs.map(job => {
            const salary = job.salary.replace(/[^\d,]/g, '').replace(',', '');
            return parseInt(salary);
        });
        const avg = salaries.reduce((a, b) => a + b, 0) / salaries.length;
        return `R$ ${Math.round(avg).toLocaleString()}`;
    }

    renderJobs() {
        const filtered = this.filterJobs();
        const container = document.getElementById('vagas-list-container');
        const emptyState = document.getElementById('empty-state');
        
        if (filtered.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        container.style.display = 'grid';
        emptyState.style.display = 'none';
        
        container.innerHTML = filtered
            .map(job => this.createJobCard(job))
            .join('');
        
        this.setupCardListeners();
        this.updateStats();
    }

    filterJobs() {
        let filtered = [...this.jobs];
        
        // Filtro por busca
        if (this.currentFilters.search) {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(this.currentFilters.search) ||
                job.company.toLowerCase().includes(this.currentFilters.search) ||
                job.technologies.some(tech => tech.toLowerCase().includes(this.currentFilters.search)) ||
                job.area.toLowerCase().includes(this.currentFilters.search)
            );
        }
        
        // Filtro por match
        if (this.currentFilters.match > 0) {
            filtered = filtered.filter(job => job.matchPercentage >= this.currentFilters.match);
        }
        
        // Filtro por área
        if (this.currentFilters.area !== 'all') {
            filtered = filtered.filter(job => job.area === this.currentFilters.area);
        }
        
        // Ordenar por match e se é recomendada
        return filtered.sort((a, b) => {
            if (a.recommended && !b.recommended) return -1;
            if (!a.recommended && b.recommended) return 1;
            return b.matchPercentage - a.matchPercentage;
        });
    }

    createJobCard(job, isCompassRecommended = false) {
        let matchColorClass = 'low-match';
        if (job.matchPercentage >= 75) {
            matchColorClass = 'high-match';
        } else if (job.matchPercentage >= 50) {
            matchColorClass = 'medium-match';
        }

        const recommendedClass = job.recommended || isCompassRecommended ? 'recommended' : '';
        const daysAgo = job.postedDays === 1 ? '1 dia' : `${job.postedDays} dias`;

        return `
            <div class="vaga-card ${recommendedClass}" data-job-id="${job.id}">
                <div class="vaga-card-header">
                    <div class="vaga-logo">
                        <img src="${job.logo}" alt="${job.company}" onerror="this.style.display='none'">
                    </div>
                    <div class="vaga-info">
                        <h4>${job.title}</h4>
                        <p>${job.company}</p>
                    </div>
                </div>
                
                <div class="vaga-tags">
                    <span class="vaga-tag salary">💰 ${job.salary}</span>
                    <span class="vaga-tag type">📋 ${job.contractType}</span>
                    <span class="vaga-tag">📍 ${job.model}</span>
                    <span class="vaga-tag">🕒 ${daysAgo} atrás</span>
                </div>
                
                <div class="vaga-card-footer">
                    <div class="vaga-location">
                        <span class="material-icons-outlined">location_on</span>
                        <span>${job.location}</span>
                    </div>
                    <div class="match-display">
                        <span class="match-percentage ${matchColorClass}">${job.matchPercentage}%</span>
                        <span class="match-label">Compatibilidade</span>
                    </div>
                </div>
            </div>
        `;
    }

    setupCardListeners() {
        document.querySelectorAll('.vaga-card').forEach(card => {
            card.addEventListener('click', () => {
                const jobId = parseInt(card.getAttribute('data-job-id'));
                this.showJobDetail(jobId);
            });
        });
    }

    showJobDetail(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;
        
        this.currentJob = job;
        
        // Preencher dados básicos
        document.getElementById('detail-job-title').textContent = job.title;
        document.getElementById('detail-company-name').textContent = job.company;
        document.getElementById('detail-location').textContent = `${job.location} (${job.model})`;
        document.getElementById('detail-company-logo').src = job.logo;
        document.getElementById('detail-contract').textContent = job.contractType;
        document.getElementById('detail-model').textContent = job.model;
        document.getElementById('detail-salary').textContent = job.salary;
        document.getElementById('detail-description').textContent = job.description;
        document.getElementById('detail-percentage-text').textContent = `${job.matchPercentage}%`;
        
        // Tecnologias
        const techList = document.getElementById('detail-tech-list');
        techList.innerHTML = job.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        // Skills compatíveis
        const matchingSkillsContainer = document.getElementById('detail-matching-skills');
        matchingSkillsContainer.innerHTML = job.requiredSkills.match
            .map(skill => `<span class="skill-tag match">${skill}</span>`)
            .join('');
        
        // Skills em falta
        const gapSkillsContainer = document.getElementById('detail-gap-skills');
        gapSkillsContainer.innerHTML = job.requiredSkills.gap
            .map(skill => `<span class="skill-tag gap">${skill}</span>`)
            .join('');
        
        // Atualizar contadores
        document.getElementById('matching-skills-count').textContent = `${job.requiredSkills.match.length} skills`;
        document.getElementById('gap-skills-count').textContent = `${job.requiredSkills.gap.length} skills`;
        
        // Plano de desenvolvimento
        this.updateDevelopmentPlan(job);
        
        // Cursos recomendados
        this.updateCourseRecommendations(job.requiredSkills.gap);
        
        // Limpar resposta anterior da Compass
        document.getElementById('compass-vaga-response').innerHTML = '';
        
        // Mostrar modal
        this.showModal(document.getElementById('vaga-detail-modal'));
        
        // Animar círculo de progresso
        setTimeout(() => {
            this.animateProgressCircle(job.matchPercentage);
        }, 500);
    }

    updateDevelopmentPlan(job) {
        const immediateSkills = job.requiredSkills.gap.slice(0, 2);
        const mediumTermSkills = job.requiredSkills.gap.slice(2, 4);
        const longTermSkills = job.requiredSkills.gap.slice(4);
        
        document.getElementById('immediate-focus').innerHTML = immediateSkills.length > 0 
            ? immediateSkills.map(skill => `<span class="skill-tag gap">${skill}</span>`).join('')
            : '<span class="skill-tag match">✅ Você já tem o foco necessário!</span>';
        
        document.getElementById('medium-term-dev').innerHTML = mediumTermSkills.length > 0
            ? mediumTermSkills.map(skill => `<span class="skill-tag gap">${skill}</span>`).join('')
            : '<span class="skill-tag match">✅ Desenvolvimento opcional</span>';
        
        document.getElementById('long-term-goals').innerHTML = longTermSkills.length > 0
            ? longTermSkills.map(skill => `<span class="skill-tag gap">${skill}</span>`).join('')
            : '<span class="skill-tag match">✅ Você está preparado!</span>';
    }

    updateCourseRecommendations(gapSkills) {
        const courseList = document.getElementById('detail-course-list');
        courseList.innerHTML = '';
        
        if (gapSkills.length === 0) {
            courseList.innerHTML = `
                <div class="no-gaps-message">
                    <div style="text-align: center; color: var(--success-text); padding: 20px;">
                        <div style="font-size: 3rem; margin-bottom: 12px;">🎉</div>
                        <h4>Parabéns!</h4>
                        <p>Você já possui todas as habilidades necessárias para esta vaga.</p>
                    </div>
                </div>
            `;
            return;
        }

        gapSkills.slice(0, 4).forEach((skill, index) => {
            const courses = this.courseSuggestions[skill] || [`Curso de ${skill}`, `${skill} para Iniciantes`];
            
            courses.forEach((courseTitle, courseIndex) => {
                const courseCard = document.createElement('div');
                courseCard.className = 'course-card';
                courseCard.style.opacity = '0';
                courseCard.style.transform = 'translateY(20px)';
                
                courseCard.innerHTML = `
                    <h5 class="course-title">📚 ${courseTitle}</h5>
                    <p class="course-platform">🏫 CareerPath Learning</p>
                    <a href="#" class="course-link">Acessar Curso →</a>
                `;
                
                courseList.appendChild(courseCard);

                // Animação de entrada
                setTimeout(() => {
                    courseCard.style.transition = 'all 0.4s ease';
                    courseCard.style.opacity = '1';
                    courseCard.style.transform = 'translateY(0)';
                }, (index * courses.length + courseIndex) * 100);
            });
        });
    }

    animateProgressCircle(percentage) {
        const circle = document.querySelector('.progress-circle-fill');
        if (!circle) return;

        const radius = 54;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
    }

    perguntarCompassVaga() {
        if (!this.currentJob) return;
        
        const response = this.generateCompassJobResponse(this.currentJob);
        const responseContainer = document.getElementById('compass-vaga-response');
        
        // Animação de typing
        responseContainer.innerHTML = `
            <div class="compass-vaga-msg">
                <div class="typing-animation">
                    <span></span><span></span><span></span>
                </div>
                Compass analisando esta vaga...
            </div>
        `;
        
        setTimeout(() => {
            responseContainer.innerHTML = `
                <div class="compass-vaga-msg">
                    ${response}
                </div>
            `;
        }, 2500);
    }

    generateCompassJobResponse(job) {
        const userSkills = this.userProfile.skills.map(s => s.toLowerCase());
        const jobSkills = job.technologies.map(s => s.toLowerCase());
        const matchingSkills = userSkills.filter(skill => 
            jobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
        );

        // Análise específica por vaga
        if (job.matchPercentage >= 80) {
            return `
                <h5>🎯 Vaga Altamente Recomendada!</h5>
                <p><strong>Excelente match!</strong> Com ${job.matchPercentage}% de compatibilidade, esta vaga é perfeita para seu perfil atual. 
                Você já domina as principais tecnologias: <strong>${matchingSkills.join(', ')}</strong>.</p>
                
                <p><strong>💰 Análise salarial:</strong> ${job.salary} está ${this.compareSalaryWithExpectation(job.salary)} sua expectativa.</p>
                
                <p><strong>🚀 Recomendação:</strong> Candidate-se imediatamente! Esta é uma oportunidade de ouro para crescer na ${job.company}.</p>
            `;
        }
        
        if (job.matchPercentage >= 60) {
            return `
                <h5>📈 Boa Oportunidade de Crescimento</h5>
                <p><strong>Match sólido!</strong> Com ${job.matchPercentage}% de compatibilidade, esta vaga oferece um bom equilíbrio entre suas skills atuais e aprendizado.</p>
                
                <p><strong>📚 Preparação sugerida:</strong> Dedique 2-3 semanas estudando ${job.requiredSkills.gap.slice(0, 2).join(' e ')} 
                para aumentar suas chances de aprovação.</p>
                
                <p><strong>⏰ Timeline:</strong> Com dedicação, você estará 100% preparado em 1-2 meses.</p>
            `;
        }
        
        return `
            <h5>🎓 Oportunidade de Desenvolvimento</h5>
            <p><strong>Desafio interessante!</strong> Esta vaga expandirá significativamente suas habilidades. 
            Requer aprendizado em: <strong>${job.requiredSkills.gap.slice(0, 3).join(', ')}</strong>.</p>
            
            <p><strong>📈 Estratégia:</strong> Considere esta vaga como meta de médio prazo (3-6 meses). 
            Use-a como motivação para direcionar seus estudos.</p>
            
            <p><strong>💡 Dica:</strong> Aprenda primeiro ${job.requiredSkills.gap[0]}, depois candidate-se para vagas similares de menor complexidade.</p>
        `;
    }

    compareSalaryWithExpectation(jobSalary) {
        const salary = parseInt(jobSalary.replace(/[^\d]/g, ''));
        const expectationMin = 4500;
        const expectationMax = 7000;
        
        if (salary >= expectationMax) return 'acima da';
        if (salary >= expectationMin) return 'dentro da';
        return 'abaixo da';
    }

    favoritarVaga() {
        if (!this.currentJob) return;
        
        const btn = document.getElementById('favoritar-vaga-btn');
        const icon = btn.querySelector('.material-icons-outlined');
        
        if (icon.textContent === 'bookmark_border') {
            icon.textContent = 'bookmark';
            btn.style.background = 'var(--primary-light)';
            btn.style.color = 'var(--primary-color)';
            this.mostrarNotificacao('Vaga favoritada! ⭐', 'success');
        } else {
            icon.textContent = 'bookmark_border';
            btn.style.background = '';
            btn.style.color = '';
            this.mostrarNotificacao('Vaga removida dos favoritos.', 'info');
        }
    }

    updateStats() {
        const totalVagas = this.jobs.length;
        const highMatchCount = this.jobs.filter(job => job.matchPercentage >= 75).length;
        const recommendedCount = this.jobs.filter(job => job.recommended).length;
        const avgSalary = this.calculateAverageSalary();
        
        document.getElementById('total-vagas').textContent = totalVagas;
        document.getElementById('high-match-count').textContent = highMatchCount;
        document.getElementById('recommended-count').textContent = recommendedCount;
        document.getElementById('avg-salary').textContent = avgSalary;
    }

    showModal(modal) {
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    mostrarNotificacao(mensagem, tipo = 'info') {
        // Remover notificação anterior se existir
        const notificacaoExistente = document.querySelector('.notification');
        if (notificacaoExistente) {
            notificacaoExistente.remove();
        }

        const icones = {
            success: 'check_circle',
            error: 'error',
            warning: 'warning',
            info: 'info'
        };

        const notificacao = document.createElement('div');
        notificacao.className = `notification ${tipo}`;
        notificacao.innerHTML = `
            <span class="material-icons-outlined notification-icon">${icones[tipo]}</span>
            <div class="notification-content">${mensagem}</div>
            <span class="material-icons-outlined notification-close">close</span>
        `;

        // Estilos inline para a notificação
        notificacao.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            padding: 16px 20px;
            box-shadow: var(--shadow-medium);
            border: 1px solid var(--border-light);
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 12px;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notificacao);

        // Mostrar notificação
        setTimeout(() => {
            notificacao.style.transform = 'translateX(0)';
        }, 100);

        // Event listener para fechar
        notificacao.querySelector('.notification-close').addEventListener('click', () => {
            notificacao.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notificacao.remove();
            }, 300);
        });

        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    notificacao.remove();
                }, 300);
            }
        }, 5000);
    }
}

// Função de inicialização para compatibilidade com o sistema SPA
export function init() {
    console.log('🚀 Iniciando página de vagas com Compass IA...');
    
    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.vagasManager = new VagasManager();
        });
    } else {
        window.vagasManager = new VagasManager();
    }
}

// Também expõe globalmente para compatibilidade
if (typeof window !== 'undefined') {
    window.initVagasPage = () => {
        if (!window.vagasManager) {
            window.vagasManager = new VagasManager();
        }
    };
    
    // Auto-inicializar se DOM já está pronto
    if (document.readyState !== 'loading') {
        window.initVagasPage();
    } else {
        document.addEventListener('DOMContentLoaded', window.initVagasPage);
    }
}