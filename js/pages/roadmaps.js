// js/pages/roadmaps.js - Versão Modernizada

class RoadmapsManager {
    constructor() {
        this.roadmaps = [];
        this.userProgress = {};
        this.currentFilters = {
            area: 'all',
            nivel: 'all',
            search: ''
        };
        this.userProfile = this.loadUserProfile();
        this.currentRoadmap = null;
        this.init();
    }

    init() {
        console.log('🚀 Sistema de Roadmaps inicializando...');
        
        this.loadRoadmapsData();
        this.loadUserProgress();
        this.setupEventListeners();
        this.renderRoadmaps();
        this.renderMeuProgresso();
        
        console.log('✅ Sistema de Roadmaps inicializado!');
    }

    loadUserProfile() {
        // Perfil focado em desenvolvimento web/front-end
        return {
            skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Git', 'Responsive Design'],
            interests: ['Front-End', 'Web Development', 'UI/UX'],
            level: 'Júnior',
            focusArea: 'Front-End Development', // Área principal de interesse
            certifications: [
                'JavaScript ES6+ Certification',
                'React Developer Certification'
            ],
            completedCourses: ['JavaScript Básico', 'HTML/CSS Fundamentals', 'React Introdução'],
            careerGoals: ['Front-End Sênior', 'Full-Stack Developer'],
            experience: 1.5, // anos de experiência
            currentLearning: ['React Hooks', 'TypeScript', 'CSS Grid'] // O que está estudando agora
        };
    }

    loadRoadmapsData() {
        this.roadmaps = [
            {
                id: 1,
                title: "Desenvolvedor Front-End Completo",
                area: "Front-End",
                nivel: "Iniciante",
                duracao: "6-8 meses",
                rating: 4.9,
                avaliacoes: 1250,
                description: "Torne-se um desenvolvedor front-end completo dominando HTML, CSS, JavaScript, React e ferramentas modernas. Ideal para quem está começando na programação.",
                certificacao: "Certificado CareerPath Front-End",
                steps: [
                    {
                        id: 1,
                        skill: "HTML & CSS Fundamentals",
                        description: "Estruturação semântica e estilização responsiva",
                        tags: ["HTML5", "CSS3", "Flexbox", "Grid"],
                        done: true,
                        current: false,
                        estimatedHours: 40
                    },
                    {
                        id: 2,
                        skill: "JavaScript ES6+",
                        description: "Programação moderna, DOM manipulation, APIs",
                        tags: ["ES6", "Async/Await", "DOM", "APIs"],
                        done: true,
                        current: false,
                        estimatedHours: 60
                    },
                    {
                        id: 3,
                        skill: "React Fundamentals",
                        description: "Componentes, props, state e lifecycle",
                        tags: ["React", "JSX", "Components", "State"],
                        done: false,
                        current: true,
                        estimatedHours: 50
                    },
                    {
                        id: 4,
                        skill: "React Hooks & Context",
                        description: "Hooks modernos e gerenciamento de estado",
                        tags: ["Hooks", "Context API", "useEffect", "useState"],
                        done: false,
                        current: false,
                        estimatedHours: 40
                    },
                    {
                        id: 5,
                        skill: "Ferramentas & Deploy",
                        description: "Git, Webpack, deployment e otimização",
                        tags: ["Git", "Webpack", "Netlify", "Performance"],
                        done: false,
                        current: false,
                        estimatedHours: 30
                    }
                ]
            },
            {
                id: 2,
                title: "Back-End Developer Node.js",
                area: "Back-End",
                nivel: "Intermediário",
                duracao: "4-6 meses",
                rating: 4.8,
                avaliacoes: 890,
                description: "Construa APIs robustas e escaláveis com Node.js, Express, bancos de dados e deploy em cloud. Perfeito para quem já tem base em programação.",
                certificacao: "Certificado CareerPath Back-End",
                steps: [
                    {
                        id: 1,
                        skill: "Node.js & Express",
                        description: "Servidor, rotas, middleware e APIs RESTful",
                        tags: ["Node.js", "Express", "REST API", "Middleware"],
                        done: false,
                        current: false,
                        estimatedHours: 45
                    },
                    {
                        id: 2,
                        skill: "Bancos de Dados",
                        description: "SQL, NoSQL, ORMs e design de esquemas",
                        tags: ["PostgreSQL", "MongoDB", "Prisma", "Mongoose"],
                        done: false,
                        current: false,
                        estimatedHours: 50
                    },
                    {
                        id: 3,
                        skill: "Autenticação & Segurança",
                        description: "JWT, OAuth, criptografia e boas práticas",
                        tags: ["JWT", "OAuth", "Bcrypt", "HTTPS"],
                        done: false,
                        current: false,
                        estimatedHours: 35
                    },
                    {
                        id: 4,
                        skill: "Testes & Documentação",
                        description: "Testes unitários, integração e API docs",
                        tags: ["Jest", "Supertest", "Swagger", "TDD"],
                        done: false,
                        current: false,
                        estimatedHours: 40
                    },
                    {
                        id: 5,
                        skill: "Deploy & DevOps",
                        description: "Docker, CI/CD e monitoramento",
                        tags: ["Docker", "AWS", "CI/CD", "Monitoring"],
                        done: false,
                        current: false,
                        estimatedHours: 45
                    }
                ]
            },
            {
                id: 3,
                title: "Full-Stack MERN Developer",
                area: "Full-Stack",
                nivel: "Avançado",
                duracao: "8-12 meses",
                rating: 4.9,
                avaliacoes: 670,
                description: "Domine o stack completo: MongoDB, Express, React e Node.js. Para desenvolvedores que querem se tornar especialistas full-stack.",
                certificacao: "Certificado CareerPath Full-Stack",
                steps: [
                    {
                        id: 1,
                        skill: "React Avançado",
                        description: "Patterns, performance, SSR e Next.js",
                        tags: ["Next.js", "SSR", "Performance", "React Patterns"],
                        done: false,
                        current: false,
                        estimatedHours: 60
                    },
                    {
                        id: 2,
                        skill: "Node.js Avançado",
                        description: "Microserviços, WebSockets e escalabilidade",
                        tags: ["Microservices", "WebSockets", "Redis", "Scale"],
                        done: false,
                        current: false,
                        estimatedHours: 70
                    },
                    {
                        id: 3,
                        skill: "MongoDB & Agregações",
                        description: "Modelagem avançada e otimização",
                        tags: ["MongoDB", "Aggregation", "Indexing", "Optimization"],
                        done: false,
                        current: false,
                        estimatedHours: 45
                    },
                    {
                        id: 4,
                        skill: "DevOps & Cloud",
                        description: "AWS, containers e orquestração",
                        tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
                        done: false,
                        current: false,
                        estimatedHours: 80
                    }
                ]
            },
            {
                id: 4,
                title: "Cloud Solutions Architect",
                area: "Cloud",
                nivel: "Avançado",
                duracao: "6-9 meses",
                rating: 4.7,
                avaliacoes: 450,
                description: "Torne-se especialista em arquitetura cloud com AWS, Azure e Google Cloud. Focado em soluções empresariais e certificações.",
                certificacao: "AWS Solutions Architect Certified",
                steps: [
                    {
                        id: 1,
                        skill: "AWS Fundamentals",
                        description: "EC2, S3, VPC, IAM e serviços essenciais",
                        tags: ["AWS", "EC2", "S3", "VPC", "IAM"],
                        done: true,
                        current: false,
                        estimatedHours: 50
                    },
                    {
                        id: 2,
                        skill: "Arquitetura Serverless",
                        description: "Lambda, API Gateway, DynamoDB",
                        tags: ["Lambda", "API Gateway", "DynamoDB", "Serverless"],
                        done: false,
                        current: true,
                        estimatedHours: 60
                    },
                    {
                        id: 3,
                        skill: "Containers & Orquestração",
                        description: "ECS, EKS, Fargate e Kubernetes",
                        tags: ["ECS", "EKS", "Fargate", "Kubernetes"],
                        done: false,
                        current: false,
                        estimatedHours: 70
                    },
                    {
                        id: 4,
                        skill: "Infraestrutura como Código",
                        description: "Terraform, CloudFormation e automação",
                        tags: ["Terraform", "CloudFormation", "Infrastructure", "Automation"],
                        done: false,
                        current: false,
                        estimatedHours: 55
                    }
                ]
            },
            {
                id: 5,
                title: "DevOps Engineer Professional",
                area: "DevOps",
                nivel: "Avançado",
                duracao: "7-10 meses",
                rating: 4.8,
                avaliacoes: 380,
                description: "Automatize, monitore e escale aplicações com as melhores práticas DevOps. Inclui CI/CD, containers e observabilidade.",
                certificacao: "DevOps Professional Certified",
                steps: [
                    {
                        id: 1,
                        skill: "CI/CD Pipelines",
                        description: "Jenkins, GitHub Actions, GitLab CI",
                        tags: ["Jenkins", "GitHub Actions", "GitLab CI", "Automation"],
                        done: false,
                        current: false,
                        estimatedHours: 45
                    },
                    {
                        id: 2,
                        skill: "Containerização",
                        description: "Docker, Kubernetes e orquestração",
                        tags: ["Docker", "Kubernetes", "Helm", "Containers"],
                        done: false,
                        current: false,
                        estimatedHours: 65
                    },
                    {
                        id: 3,
                        skill: "Monitoring & Observabilidade",
                        description: "Prometheus, Grafana, ELK Stack",
                        tags: ["Prometheus", "Grafana", "ELK", "Monitoring"],
                        done: false,
                        current: false,
                        estimatedHours: 50
                    },
                    {
                        id: 4,
                        skill: "Segurança & Compliance",
                        description: "DevSecOps, scanning e governança",
                        tags: ["DevSecOps", "Security", "Compliance", "Scanning"],
                        done: false,
                        current: false,
                        estimatedHours: 40
                    }
                ]
            },
            {
                id: 6,
                title: "Mobile Developer React Native",
                area: "Mobile",
                nivel: "Intermediário",
                duracao: "5-7 meses",
                rating: 4.6,
                avaliacoes: 520,
                description: "Desenvolva apps nativos para iOS e Android com React Native. Ideal para desenvolvedores React que querem expandir para mobile.",
                certificacao: "Mobile Developer Certified",
                steps: [
                    {
                        id: 1,
                        skill: "React Native Básico",
                        description: "Componentes, navegação e styling",
                        tags: ["React Native", "Components", "Navigation", "Styling"],
                        done: false,
                        current: false,
                        estimatedHours: 40
                    },
                    {
                        id: 2,
                        skill: "APIs & Estado",
                        description: "Consumo de APIs e gerenciamento de estado",
                        tags: ["APIs", "Redux", "Context", "AsyncStorage"],
                        done: false,
                        current: false,
                        estimatedHours: 35
                    },
                    {
                        id: 3,
                        skill: "Recursos Nativos",
                        description: "Câmera, geolocalização, notificações",
                        tags: ["Camera", "GPS", "Notifications", "Native Features"],
                        done: false,
                        current: false,
                        estimatedHours: 45
                    },
                    {
                        id: 4,
                        skill: "Publicação & Deploy",
                        description: "App Store, Google Play e CI/CD mobile",
                        tags: ["App Store", "Google Play", "Fastlane", "CodePush"],
                        done: false,
                        current: false,
                        estimatedHours: 30
                    }
                ]
            },
            {
                id: 7,
                title: "Data Scientist Python",
                area: "Data Science",
                nivel: "Intermediário",
                duracao: "8-12 meses",
                rating: 4.8,
                avaliacoes: 290,
                description: "Analise dados, construa modelos de ML e gere insights com Python, pandas, scikit-learn e mais. Para quem quer entrar em Data Science.",
                certificacao: "Data Scientist Professional",
                steps: [
                    {
                        id: 1,
                        skill: "Python & Pandas",
                        description: "Manipulação e análise de dados",
                        tags: ["Python", "Pandas", "NumPy", "Data Analysis"],
                        done: false,
                        current: false,
                        estimatedHours: 50
                    },
                    {
                        id: 2,
                        skill: "Visualização de Dados",
                        description: "Matplotlib, Seaborn, Plotly",
                        tags: ["Matplotlib", "Seaborn", "Plotly", "Visualization"],
                        done: false,
                        current: false,
                        estimatedHours: 35
                    },
                    {
                        id: 3,
                        skill: "Machine Learning",
                        description: "Algoritmos, scikit-learn e avaliação",
                        tags: ["ML", "Scikit-learn", "Algorithms", "Evaluation"],
                        done: false,
                        current: false,
                        estimatedHours: 70
                    },
                    {
                        id: 4,
                        skill: "Deep Learning",
                        description: "TensorFlow, Keras e redes neurais",
                        tags: ["TensorFlow", "Keras", "Neural Networks", "Deep Learning"],
                        done: false,
                        current: false,
                        estimatedHours: 80
                    }
                ]
            },
            {
                id: 8,
                title: "AI/ML Engineer",
                area: "IA/ML",
                nivel: "Avançado",
                duracao: "10-15 meses",
                rating: 4.9,
                avaliacoes: 180,
                description: "Torne-se especialista em AI/ML com PyTorch, TensorFlow, MLOps e deploy de modelos em produção. Para o futuro da tecnologia.",
                certificacao: "AI/ML Engineer Professional",
                steps: [
                    {
                        id: 1,
                        skill: "Fundamentos de ML",
                        description: "Matemática, estatística e algoritmos",
                        tags: ["Mathematics", "Statistics", "Algorithms", "Theory"],
                        done: false,
                        current: false,
                        estimatedHours: 60
                    },
                    {
                        id: 2,
                        skill: "Deep Learning Avançado",
                        description: "CNNs, RNNs, Transformers",
                        tags: ["CNN", "RNN", "Transformers", "PyTorch"],
                        done: false,
                        current: false,
                        estimatedHours: 90
                    },
                    {
                        id: 3,
                        skill: "MLOps & Deployment",
                        description: "Pipeline ML, monitoring e escalabilidade",
                        tags: ["MLOps", "Deployment", "Monitoring", "Kubernetes"],
                        done: false,
                        current: false,
                        estimatedHours: 70
                    },
                    {
                        id: 4,
                        skill: "IA Generativa",
                        description: "LLMs, GPT, fine-tuning e aplicações",
                        tags: ["LLM", "GPT", "Fine-tuning", "Generative AI"],
                        done: false,
                        current: false,
                        estimatedHours: 80
                    }
                ]
            }
        ];
    }

    loadUserProgress() {
        // Progresso focado em desenvolvimento front-end
        this.userProgress = {
            1: { // Front-End Developer Completo
                iniciado: true,
                progresso: 60, // 3 de 5 steps concluídos (HTML/CSS, JS, parte do React)
                ultimaAtividade: "há 1 dia",
                tempoGasto: 140 // horas estudadas
            },
            3: { // Full-Stack MERN (próximo passo lógico)
                iniciado: false,
                progresso: 0,
                ultimaAtividade: "nunca",
                tempoGasto: 0
            },
            6: { // Mobile React Native (expansão futura)
                iniciado: false,
                progresso: 0,
                ultimaAtividade: "nunca", 
                tempoGasto: 0
            }
        };
    }

    setupEventListeners() {
        // Filtros
        document.getElementById('area-filter-roadmap')?.addEventListener('change', (e) => {
            this.currentFilters.area = e.target.value;
            this.renderRoadmaps();
        });

        document.getElementById('nivel-filter-roadmap')?.addEventListener('change', (e) => {
            this.currentFilters.nivel = e.target.value;
            this.renderRoadmaps();
        });

        document.getElementById('roadmap-search-input')?.addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase().trim();
            this.renderRoadmaps();
        });

        // Compass IA - Personalização
        document.getElementById('compass-personalizar-btn')?.addEventListener('click', () => {
            this.handleCompassPersonalization();
        });

        // Modal listeners
        this.setupModalListeners();
    }

    setupModalListeners() {
        // Modal de detalhes do roadmap
        const roadmapModal = document.getElementById('roadmap-detail-modal');
        const compassModal = document.getElementById('compass-roadmap-modal');

        // Fechar modais
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal-overlay');
                this.closeModal(modal);
            });
        });

        // Fechar modal clicando fora
        [roadmapModal, compassModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal(modal);
                    }
                });
            }
        });

        // Ações do roadmap
        document.getElementById('iniciar-roadmap-btn')?.addEventListener('click', () => {
            this.iniciarRoadmap();
        });

        document.getElementById('perguntar-compass-roadmap-btn')?.addEventListener('click', () => {
            this.perguntarCompassRoadmap();
        });

        document.getElementById('favoritar-roadmap-btn')?.addEventListener('click', () => {
            this.favoritarRoadmap();
        });
    }

    handleCompassPersonalization() {
        const btn = document.getElementById('compass-personalizar-btn');
        const section = document.getElementById('compass-roadmaps-section');
        
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
            this.generateCompassRecommendations();
            section.style.display = 'block';
            
            // Restaurar botão
            btn.innerHTML = `
                <span class="material-icons-outlined">auto_awesome</span>
                Novas Recomendações
            `;
            btn.disabled = false;
            
            // Scroll suave para as recomendações
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 3000);
    }

    generateCompassRecommendations() {
        // Análise focada em desenvolvimento web/front-end
        const userSkills = this.userProfile.skills.map(s => s.toLowerCase());
        const userInterests = this.userProfile.interests.map(i => i.toLowerCase());
        
        // Lógica de recomendação específica para front-end
        let recomendados = [];
        
        // 1. Front-End Completo (sempre recomendado para quem está começando)
        recomendados.push(this.roadmaps.find(r => r.id === 1)); // Front-End Developer Completo
        
        // 2. Full-Stack MERN (evolução natural do front-end)
        recomendados.push(this.roadmaps.find(r => r.id === 3)); // Full-Stack MERN
        
        // 3. Mobile React Native (expansão para mobile mantendo React)
        recomendados.push(this.roadmaps.find(r => r.id === 6)); // Mobile React Native
        
        // Remover duplicatas e garantir que temos exatamente 3
        recomendados = recomendados.filter(Boolean).slice(0, 3);
        
        // Renderizar recomendações
        const container = document.getElementById('compass-roadmaps-container');
        container.innerHTML = recomendados
            .map(roadmap => this.createRoadmapCard(roadmap, true))
            .join('');
        
        // Explicação personalizada para desenvolvedor front-end
        const reasoning = document.getElementById('compass-roadmap-reasoning');
        reasoning.textContent = `Como desenvolvedor front-end júnior com experiência em ${this.userProfile.skills.slice(0, 3).join(', ')}, selecionei uma trilha estratégica: primeiro consolidar suas habilidades front-end, depois expandir para full-stack para se tornar mais versátil, e finalmente mobile para dominar o ecossistema React completo. Essa sequência maximiza seu potencial de crescimento na área web.`;
        
        this.setupCardListeners();
    }

    renderRoadmaps() {
        const filtered = this.filterRoadmaps();
        const container = document.getElementById('roadmaps-list-container');
        const emptyState = document.getElementById('empty-state');
        const countBadge = document.getElementById('roadmaps-count');
        
        if (filtered.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        container.style.display = 'grid';
        emptyState.style.display = 'none';
        
        // Atualizar contador
        if (countBadge) {
            countBadge.textContent = `${filtered.length} trilha${filtered.length !== 1 ? 's' : ''} disponível${filtered.length !== 1 ? 'is' : ''}`;
        }
        
        container.innerHTML = filtered
            .map(roadmap => this.createRoadmapCard(roadmap))
            .join('');
        
        this.setupCardListeners();
    }

    renderMeuProgresso() {
        const container = document.getElementById('meu-progresso-container');
        if (!container) return;
        
        const roadmapsEmAndamento = this.roadmaps.filter(roadmap => 
            this.userProgress[roadmap.id]?.iniciado
        );
        
        if (roadmapsEmAndamento.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="material-icons-outlined">trending_up</span>
                    <h3>Nenhum roadmap iniciado</h3>
                    <p>Escolha um roadmap para começar sua jornada de aprendizado!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = roadmapsEmAndamento
            .map(roadmap => this.createProgressCard(roadmap))
            .join('');
        
        this.setupCardListeners();
    }

    filterRoadmaps() {
        let filtered = [...this.roadmaps];
        
        // Filtro por área
        if (this.currentFilters.area !== 'all') {
            filtered = filtered.filter(roadmap => roadmap.area === this.currentFilters.area);
        }
        
        // Filtro por nível
        if (this.currentFilters.nivel !== 'all') {
            filtered = filtered.filter(roadmap => roadmap.nivel === this.currentFilters.nivel);
        }
        
        // Filtro por busca
        if (this.currentFilters.search) {
            filtered = filtered.filter(roadmap =>
                roadmap.title.toLowerCase().includes(this.currentFilters.search) ||
                roadmap.description.toLowerCase().includes(this.currentFilters.search) ||
                roadmap.area.toLowerCase().includes(this.currentFilters.search) ||
                roadmap.steps.some(step => 
                    step.skill.toLowerCase().includes(this.currentFilters.search) ||
                    step.tags.some(tag => tag.toLowerCase().includes(this.currentFilters.search))
                )
            );
        }
        
        return filtered;
    }

    createRoadmapCard(roadmap, isRecommended = false) {
        const progress = this.userProgress[roadmap.id];
        const isStarted = progress?.iniciado || false;
        const progressPercent = progress?.progresso || 0;
        
        const statusClass = isStarted ? 'iniciado' : '';
        const recommendedClass = isRecommended ? 'recomendado' : '';
        
        const progressSection = isStarted ? `
            <div class="roadmap-progress-section">
                <div class="progress-header">
                    <span>Seu Progresso</span>
                    <span>${progressPercent}%</span>
                </div>
                <div class="roadmap-progress-bar">
                    <div class="roadmap-progress" style="width: ${progressPercent}%"></div>
                </div>
                <div class="progress-stats">
                    <div class="stat-item">
                        <span class="material-icons-outlined">schedule</span>
                        <span>${progress.tempoGasto || 0}h gastas</span>
                    </div>
                    <div class="stat-item">
                        <span class="material-icons-outlined">update</span>
                        <span>${progress.ultimaAtividade || 'Nunca'}</span>
                    </div>
                </div>
            </div>
        ` : `
            <div class="roadmap-progress-section">
                <div class="progress-header">
                    <span>Duração Estimada</span>
                    <span>${roadmap.duracao}</span>
                </div>
                <div class="roadmap-meta">
                    <div class="meta-item">
                        <span class="material-icons-outlined">star</span>
                        <span>${roadmap.rating} (${roadmap.avaliacoes})</span>
                    </div>
                    <div class="meta-item">
                        <span class="material-icons-outlined">school</span>
                        <span>${roadmap.steps.length} módulos</span>
                    </div>
                </div>
            </div>
        `;

        return `
            <div class="roadmap-card ${statusClass} ${recommendedClass}" data-roadmap-id="${roadmap.id}">
                <div class="roadmap-card-header">
                    <h4>${roadmap.title}</h4>
                    <div>
                        <div class="roadmap-area">${roadmap.area}</div>
                        <div class="roadmap-nivel skill-badge ${roadmap.nivel.toLowerCase()}">${roadmap.nivel}</div>
                    </div>
                </div>
                
                <div class="roadmap-description">
                    ${roadmap.description}
                </div>

                ${roadmap.certificacao ? `
                    <div class="certificacao-badge">
                        <span class="material-icons-outlined">verified</span>
                        ${roadmap.certificacao}
                    </div>
                ` : ''}

                ${progressSection}
            </div>
        `;
    }

    createProgressCard(roadmap) {
        const progress = this.userProgress[roadmap.id];
        const completedSteps = roadmap.steps.filter(step => step.done).length;
        const currentStep = roadmap.steps.find(step => step.current);
        
        return `
            <div class="roadmap-card iniciado" data-roadmap-id="${roadmap.id}">
                <div class="roadmap-card-header">
                    <h4>${roadmap.title}</h4>
                    <div class="roadmap-area">${roadmap.area}</div>
                </div>
                
                <div class="roadmap-progress-section">
                    <div class="progress-header">
                        <span>Progresso Atual</span>
                        <span>${progress.progresso}%</span>
                    </div>
                    <div class="roadmap-progress-bar">
                        <div class="roadmap-progress" style="width: ${progress.progresso}%"></div>
                    </div>
                </div>

                ${currentStep ? `
                    <div style="margin-top: 12px; padding: 12px; background: var(--primary-light); border-radius: 8px;">
                        <strong>Estudando agora:</strong> ${currentStep.skill}
                    </div>
                ` : ''}

                <div class="progress-stats">
                    <div class="stat-item">
                        <span class="material-icons-outlined">check_circle</span>
                        <span>${completedSteps}/${roadmap.steps.length} módulos</span>
                    </div>
                    <div class="stat-item">
                        <span class="material-icons-outlined">schedule</span>
                        <span>${progress.tempoGasto}h estudadas</span>
                    </div>
                    <div class="stat-item">
                        <span class="material-icons-outlined">update</span>
                        <span>${progress.ultimaAtividade}</span>
                    </div>
                </div>
            </div>
        `;
    }

    setupCardListeners() {
        document.querySelectorAll('.roadmap-card').forEach(card => {
            card.addEventListener('click', () => {
                const roadmapId = parseInt(card.getAttribute('data-roadmap-id'));
                this.showRoadmapDetail(roadmapId);
            });
        });
    }

    showRoadmapDetail(roadmapId) {
        const roadmap = this.roadmaps.find(r => r.id === roadmapId);
        if (!roadmap) return;
        
        this.currentRoadmap = roadmap;
        const progress = this.userProgress[roadmapId];
        const progressPercent = progress?.progresso || 0;
        
        // Preencher dados básicos
        document.getElementById('roadmap-detail-title').textContent = roadmap.title;
        document.getElementById('roadmap-detail-area').textContent = roadmap.area;
        document.getElementById('roadmap-detail-nivel').textContent = roadmap.nivel;
        document.getElementById('roadmap-detail-duracao').textContent = roadmap.duracao;
        document.getElementById('roadmap-detail-rating').textContent = `${roadmap.rating} (${roadmap.avaliacoes})`;
        document.getElementById('roadmap-detail-description').textContent = roadmap.description;
        
        // Progresso
        document.getElementById('roadmap-progress-percent').textContent = `${progressPercent}%`;
        document.getElementById('roadmap-progress-fill').style.width = `${progressPercent}%`;
        
        // Steps
        const stepsContainer = document.getElementById('roadmap-detail-steps');
        stepsContainer.innerHTML = roadmap.steps.map(step => this.createStepElement(step)).join('');
        
        // Atualizar botão iniciar
        const iniciarBtn = document.getElementById('iniciar-roadmap-btn');
        if (progress?.iniciado) {
            iniciarBtn.innerHTML = `
                <span class="material-icons-outlined">play_arrow</span>
                Continuar Estudos
            `;
        } else {
            iniciarBtn.innerHTML = `
                <span class="material-icons-outlined">play_arrow</span>
                Iniciar Roadmap
            `;
        }
        
        // Limpar resposta anterior da Compass
        document.getElementById('compass-roadmap-response').innerHTML = '';
        
        // Mostrar modal
        this.showModal(document.getElementById('roadmap-detail-modal'));
    }

    createStepElement(step) {
        let iconClass = 'pending';
        let iconName = 'radio_button_unchecked';
        
        if (step.done) {
            iconClass = 'done';
            iconName = 'check_circle';
        } else if (step.current) {
            iconClass = 'current';
            iconName = 'play_circle';
        }
        
        return `
            <div class="roadmap-step ${step.done ? 'done' : ''} ${step.current ? 'current' : ''}">
                <div class="step-icon ${iconClass}">
                    <span class="material-icons-outlined">${iconName}</span>
                </div>
                <div class="step-content">
                    <div class="step-title">${step.skill}</div>
                    <div class="step-description">${step.description}</div>
                    <div class="step-tags">
                        ${step.tags.map(tag => `<span class="step-tag">${tag}</span>`).join('')}
                    </div>
                    ${step.estimatedHours ? `
                        <div style="margin-top: 8px; color: var(--text-light); font-size: 0.85rem;">
                            <span class="material-icons-outlined" style="font-size: 1rem; vertical-align: middle;">schedule</span>
                            ${step.estimatedHours}h estimadas
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    iniciarRoadmap() {
        if (!this.currentRoadmap) return;
        
        const roadmapId = this.currentRoadmap.id;
        
        if (!this.userProgress[roadmapId]) {
            // Iniciar novo roadmap
            this.userProgress[roadmapId] = {
                iniciado: true,
                progresso: 0,
                ultimaAtividade: "agora",
                tempoGasto: 0
            };
            
            this.mostrarNotificacao(`Roadmap "${this.currentRoadmap.title}" iniciado! 🚀`, 'success');
        } else {
            this.mostrarNotificacao(`Continuando seus estudos em "${this.currentRoadmap.title}" 📚`, 'info');
        }
        
        // Fechar modal e atualizar views
        this.closeModal(document.getElementById('roadmap-detail-modal'));
        this.renderMeuProgresso();
        this.renderRoadmaps();
    }

    perguntarCompassRoadmap() {
        if (!this.currentRoadmap) return;
        
        const response = this.generateCompassRoadmapResponse(this.currentRoadmap);
        const responseContainer = document.getElementById('compass-roadmap-response');
        
        // Animação de typing
        responseContainer.innerHTML = `
            <div class="compass-roadmap-msg">
                <div class="typing-animation">
                    <span></span><span></span><span></span>
                </div>
                Compass analisando roadmap...
            </div>
        `;
        
        setTimeout(() => {
            responseContainer.innerHTML = `
                <div class="compass-roadmap-msg">
                    ${response}
                </div>
            `;
        }, 2500);
    }

    generateCompassRoadmapResponse(roadmap) {
        const userSkills = this.userProfile.skills.map(s => s.toLowerCase());
        const progress = this.userProgress[roadmap.id];
        
        // Análise específica para cada roadmap focado em front-end
        const roadmapSkills = roadmap.steps.flatMap(step => step.tags.map(tag => tag.toLowerCase()));
        const matchingSkills = userSkills.filter(skill => 
            roadmapSkills.some(roadmapSkill => roadmapSkill.includes(skill) || skill.includes(roadmapSkill))
        );
        
        const matchPercentage = Math.round((matchingSkills.length / userSkills.length) * 100);
        
        // Respostas específicas por roadmap com foco em front-end
        switch(roadmap.id) {
            case 1: // Front-End Developer Completo
                if (progress?.iniciado) {
                    return `
                        <h5>Excelente Progresso em Front-End! 🎯</h5>
                        <p><strong>Você está no caminho certo!</strong> Com ${progress.progresso}% concluído, você já domina HTML/CSS e JavaScript. 
                        O próximo passo é dominar React Hooks - isso vai te diferenciar no mercado.</p>
                        
                        <p><strong>💡 Dica de carreira:</strong> Com suas skills atuais, você já pode aplicar para vagas júnior. 
                        Quando completar React, estará pronto para posições júnior/pleno em empresas que usam essa stack.</p>
                    `;
                }
                return `
                    <h5>Roadmap Perfeito para Seu Perfil! ⭐</h5>
                    <p><strong>Match perfeito!</strong> Este roadmap foi feito para desenvolvedores como você. 
                    Suas skills em ${matchingSkills.slice(0, 3).join(', ')} te dão uma vantagem inicial significativa.</p>
                    
                    <p><strong>⏱️ Tempo otimizado:</strong> Com sua base atual, você pode completar este roadmap em 
                    <strong>4-5 meses</strong> estudando 10h por semana. Foque especialmente em React e ferramentas modernas.</p>
                `;
                
            case 3: // Full-Stack MERN
                return `
                    <h5>Evolução Natural do Front-End! 🚀</h5>
                    <p><strong>Próximo nível!</strong> Como desenvolvedor front-end, este é o caminho natural para se tornar full-stack. 
                    Você já domina React, agora vai aprender Node.js e MongoDB para completar o stack MERN.</p>
                    
                    <p><strong>💰 Impacto salarial:</strong> Desenvolvedores full-stack MERN ganham em média 40-60% mais que front-end. 
                    <strong>📈 Recomendação:</strong> Complete primeiro o roadmap Front-End, depois inicie este em 3-4 meses.</p>
                `;
                
            case 6: // Mobile React Native
                return `
                    <h5>Expandindo para Mobile! 📱</h5>
                    <p><strong>Aproveite seu React!</strong> Como você já domina React, React Native será uma transição suave. 
                    Você usará 80% do conhecimento que já tem, apenas adaptando para mobile.</p>
                    
                    <p><strong>🎯 Estratégia:</strong> Este roadmap te permite criar apps para iOS e Android com uma só base de código. 
                    Perfeito para freelances ou startups que precisam de velocidade no desenvolvimento mobile.</p>
                `;
                
            case 2: // Back-End Node.js
                return `
                    <h5>Complemento Estratégico! 🔧</h5>
                    <p><strong>Amplie suas possibilidades!</strong> Aprender back-end com Node.js te permitirá criar aplicações completas. 
                    Como front-end, você já entende JavaScript - agora vai aplicar no servidor.</p>
                    
                    <p><strong>💼 Oportunidades:</strong> Com front-end + back-end Node.js, você pode trabalhar em projetos end-to-end 
                    e se posicionar para vagas mais sênior e melhor remuneradas.</p>
                `;
                
            default:
                return `
                    <h5>Roadmap Interessante para Expansão</h5>
                    <p>Este roadmap pode ser uma boa opção para diversificar suas habilidades no futuro. 
                    <strong>Recomendação:</strong> Foque primeiro em consolidar suas skills front-end, depois considere esta área.</p>
                    
                    <p><strong>📚 Timing ideal:</strong> Considere este roadmap após completar pelo menos 70% do roadmap Front-End 
                    para ter uma base sólida antes de expandir para outras áreas.</p>
                `;
        }
    }

    favoritarRoadmap() {
        if (!this.currentRoadmap) return;
        
        const btn = document.getElementById('favoritar-roadmap-btn');
        const icon = btn.querySelector('.material-icons-outlined');
        
        if (icon.textContent === 'bookmark_border') {
            icon.textContent = 'bookmark';
            btn.style.background = 'var(--primary-light)';
            btn.style.color = 'var(--primary-color)';
            this.mostrarNotificacao('Roadmap adicionado aos favoritos! ⭐', 'success');
        } else {
            icon.textContent = 'bookmark_border';
            btn.style.background = '';
            btn.style.color = '';
            this.mostrarNotificacao('Roadmap removido dos favoritos.', 'info');
        }
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

        document.body.appendChild(notificacao);

        // Mostrar notificação
        setTimeout(() => {
            notificacao.classList.add('show');
        }, 100);

        // Event listener para fechar
        notificacao.querySelector('.notification-close').addEventListener('click', () => {
            notificacao.classList.remove('show');
            setTimeout(() => {
                notificacao.remove();
            }, 300);
        });

        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.classList.remove('show');
                setTimeout(() => {
                    notificacao.remove();
                }, 300);
            }
        }, 5000);
    }
}

// Função de inicialização para compatibilidade com o sistema SPA
export function init() {
    console.log('🚀 Iniciando página de roadmaps...');
    
    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.roadmapsManager = new RoadmapsManager();
        });
    } else {
        window.roadmapsManager = new RoadmapsManager();
    }
}