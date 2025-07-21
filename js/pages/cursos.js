// js/pages/cursos.js - Versão Modernizada

class CursosManager {
    constructor() {
        this.cursos = [];
        this.cursosRecomendados = [];
        this.userProfile = this.loadUserProfile();
        this.currentFilters = {
            area: 'all',
            search: ''
        };
        this.init();
    }

    init() {
        console.log('🚀 Sistema de Cursos inicializando...');
        
        this.loadCursos();
        this.setupEventListeners();
        this.renderCursos();
        // Removido: this.generateRecommendations();
        
        console.log('✅ Sistema de Cursos inicializado!');
    }

    loadUserProfile() {
        // Simula dados do perfil do usuário
        return {
            skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Git', 'Python'],
            interests: ['Front-End', 'Cloud', 'IA'],
            level: 'Júnior',
            certifications: [
                'AWS Cloud Practitioner',
                'Oracle Certified Professional',
                'Python Certification'
            ],
            completedCourses: ['JavaScript Básico', 'HTML/CSS Fundamentals'],
            careerGoals: ['Full-Stack Developer', 'Cloud Architect']
        };
    }

    loadCursos() {
        // Base de dados expandida de cursos
        this.cursos = [
            {
                id: 1,
                title: "React Completo - Do Zero ao Avançado",
                partner: "Alura",
                area: "Front-End",
                description: "Domine React criando aplicações modernas e performáticas. Aprenda hooks, context API, Redux e muito mais.",
                skills: ["React", "JavaScript", "Hooks", "Redux", "SPA"],
                duration: "45 horas",
                rating: 4.9,
                reviews: 1500,
                level: "Intermediário",
                price: "R$ 89,90",
                image: "https://via.placeholder.com/300x160/FF6B47/FFFFFF?text=React",
                instructor: "João Silva",
                modules: [
                    "Fundamentos do React",
                    "Components e Props",
                    "State e Lifecycle",
                    "Hooks Avançados",
                    "Context API",
                    "Redux Toolkit",
                    "Testes com Jest",
                    "Deploy e Performance"
                ]
            },
            {
                id: 2,
                title: "Node.js e Express na Prática",
                partner: "Rocketseat",
                area: "Back-End",
                description: "Construa APIs robustas e escaláveis com Node.js, Express e MongoDB. Inclui autenticação, testes e deploy.",
                skills: ["Node.js", "Express", "MongoDB", "API REST", "JWT"],
                duration: "40 horas",
                rating: 4.8,
                reviews: 980,
                level: "Intermediário",
                price: "R$ 79,90",
                image: "https://via.placeholder.com/300x160/0D253F/FFFFFF?text=Node.js",
                instructor: "Maria Santos"
            },
            {
                id: 3,
                title: "AWS Cloud Practitioner Certification",
                partner: "AWS Academy",
                area: "Cloud",
                description: "Prepare-se para a certificação AWS Cloud Practitioner. Fundamentos de cloud computing e serviços AWS.",
                skills: ["AWS", "Cloud Computing", "S3", "EC2", "RDS"],
                duration: "60 horas",
                rating: 4.7,
                reviews: 2300,
                level: "Iniciante",
                price: "Gratuito",
                image: "https://via.placeholder.com/300x160/FF9500/FFFFFF?text=AWS",
                instructor: "AWS Training"
            },
            {
                id: 4,
                title: "Python para Ciência de Dados",
                partner: "DIO",
                area: "Dados",
                description: "Aprenda Python aplicado à análise de dados, machine learning e visualização com pandas, numpy e matplotlib.",
                skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
                duration: "50 horas",
                rating: 4.6,
                reviews: 850,
                level: "Intermediário",
                price: "R$ 69,90",
                image: "https://via.placeholder.com/300x160/306998/FFFFFF?text=Python",
                instructor: "Ana Costa"
            },
            {
                id: 5,
                title: "DevOps com Docker e Kubernetes",
                partner: "Udemy",
                area: "DevOps",
                description: "Domine containerização e orquestração. Aprenda Docker, Kubernetes, CI/CD e infraestrutura como código.",
                skills: ["Docker", "Kubernetes", "CI/CD", "DevOps", "Terraform"],
                duration: "55 horas",
                rating: 4.8,
                reviews: 1200,
                level: "Avançado",
                price: "R$ 99,90",
                image: "https://via.placeholder.com/300x160/2496ED/FFFFFF?text=DevOps",
                instructor: "Carlos Oliveira"
            },
            {
                id: 6,
                title: "Flutter - Desenvolvimento Mobile",
                partner: "Cod3r",
                area: "Mobile",
                description: "Crie apps nativos para iOS e Android com Flutter. Aprenda Dart, widgets, navegação e integração com APIs.",
                skills: ["Flutter", "Dart", "Mobile", "iOS", "Android"],
                duration: "48 horas",
                rating: 4.7,
                reviews: 670,
                level: "Intermediário",
                price: "R$ 89,90",
                image: "https://via.placeholder.com/300x160/02569B/FFFFFF?text=Flutter",
                instructor: "Pedro Lima"
            },
            {
                id: 7,
                title: "TypeScript do Zero ao Avançado",
                partner: "Alura",
                area: "Front-End",
                description: "Aprenda TypeScript para criar aplicações JavaScript mais robustas e seguras. Inclui integração com React e Node.js.",
                skills: ["TypeScript", "JavaScript", "Types", "Interfaces", "Generics"],
                duration: "35 horas",
                rating: 4.9,
                reviews: 1100,
                level: "Intermediário",
                price: "R$ 79,90",
                image: "https://via.placeholder.com/300x160/3178C6/FFFFFF?text=TypeScript",
                instructor: "Roberto Silva"
            },
            {
                id: 8,
                title: "Inteligência Artificial com Python",
                partner: "Coursera",
                area: "IA",
                description: "Fundamentos de IA e Machine Learning. Aprenda algoritmos, redes neurais e deep learning com TensorFlow.",
                skills: ["Python", "Machine Learning", "TensorFlow", "Deep Learning", "AI"],
                duration: "65 horas",
                rating: 4.8,
                reviews: 950,
                level: "Avançado",
                price: "R$ 129,90",
                image: "https://via.placeholder.com/300x160/FF6F00/FFFFFF?text=AI",
                instructor: "Dra. Lucia Martins"
            },
            {
                id: 9,
                title: "Vue.js 3 Composition API",
                partner: "Vue Mastery",
                area: "Front-End",
                description: "Domine Vue.js 3 e a Composition API. Crie SPAs modernas com reatividade, roteamento e gerenciamento de estado.",
                skills: ["Vue.js", "Composition API", "JavaScript", "SPA", "Pinia"],
                duration: "38 horas",
                rating: 4.6,
                reviews: 480,
                level: "Intermediário",
                price: "R$ 84,90",
                image: "https://via.placeholder.com/300x160/4FC08D/FFFFFF?text=Vue.js",
                instructor: "Marcos Fernandes"
            },
            {
                id: 10,
                title: "Full-Stack JavaScript MEAN Stack",
                partner: "Rocketseat",
                area: "Full-Stack",
                description: "Desenvolva aplicações completas com MongoDB, Express, Angular e Node.js. Do banco de dados ao deploy.",
                skills: ["MongoDB", "Express", "Angular", "Node.js", "Full-Stack"],
                duration: "70 horas",
                rating: 4.7,
                reviews: 820,
                level: "Avançado",
                price: "R$ 149,90",
                image: "https://via.placeholder.com/300x160/DD0031/FFFFFF?text=MEAN",
                instructor: "Diego Fernandes"
            }
        ];
    }

    setupEventListeners() {
        // Filtros
        document.getElementById('area-filter-select').addEventListener('change', (e) => {
            this.currentFilters.area = e.target.value;
            this.renderCursos();
        });

        document.getElementById('curso-search-input').addEventListener('input', (e) => {
            this.currentFilters.search = e.target.value.toLowerCase().trim();
            this.renderCursos();
        });

        // Botão de recomendações da Compass
        document.getElementById('perguntar-recomendacoes-btn').addEventListener('click', () => {
            this.handleCompassRecommendations();
        });

        // Voltar para lista
        document.getElementById('back-to-cursos-btn').addEventListener('click', () => {
            this.hideCursoDetail();
        });

        // Compass IA no detalhe
        document.getElementById('perguntar-compass-btn').addEventListener('click', () => {
            this.handleCompassQuestion();
        });

        // Ações secundárias
        document.getElementById('acessar-curso-btn').addEventListener('click', () => {
            this.handleAcessarCurso();
        });

        document.getElementById('favoritar-curso-btn').addEventListener('click', () => {
            this.handleFavoritarCurso();
        });
    }

    handleCompassRecommendations() {
        const btn = document.getElementById('perguntar-recomendacoes-btn');
        const section = document.getElementById('compass-recomendacoes-section');
        
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
        }, 2500);
    }

    generateCompassRecommendations() {
        // Análise mais inteligente baseada no perfil de front-end
        const frontEndCursos = this.cursos.filter(curso => 
            curso.area === 'Front-End' || 
            curso.skills.some(skill => 
                ['React', 'JavaScript', 'TypeScript', 'Vue.js', 'HTML', 'CSS'].includes(skill)
            )
        );
        
        // Selecionar 3 cursos estratégicos
        const recomendados = [
            frontEndCursos.find(c => c.title.includes('TypeScript')), // Evolução natural
            frontEndCursos.find(c => c.title.includes('React')),      // Especialização
            this.cursos.find(c => c.area === 'Full-Stack')           // Expansão
        ].filter(Boolean).slice(0, 3);
        
        // Renderizar recomendações
        const container = document.getElementById('compass-recomendacoes-container');
        container.innerHTML = recomendados
            .map(curso => this.createCursoCard(curso))
            .join('');
        
        // Explicação da Compass
        const reasoning = document.getElementById('compass-reasoning');
        reasoning.textContent = `Baseado no seu perfil em desenvolvimento front-end, selecionei cursos que vão te levar do nível júnior para pleno. TypeScript é essencial para posições mais seniores, React aprofundado te dará vantagem competitiva, e Full-Stack abrirá novas oportunidades de carreira.`;
        
        this.setupCardListeners();
    }

    generateRecommendations() {
        // Remover geração automática de recomendações
        // Agora é feita apenas quando solicitado via Compass IA
    }

    renderCursosRecomendados() {
        // Método removido - recomendações agora são via Compass IA
    }

    generateRecommendations() {
        // Algoritmo simples de recomendação baseado no perfil
        const userSkills = this.userProfile.skills.map(s => s.toLowerCase());
        const userInterests = this.userProfile.interests.map(i => i.toLowerCase());
        
        this.cursosRecomendados = this.cursos
            .map(curso => {
                let score = 0;
                
                // Pontuação por área de interesse
                if (userInterests.includes(curso.area.toLowerCase())) {
                    score += 30;
                }
                
                // Pontuação por skills relacionadas
                curso.skills.forEach(skill => {
                    if (userSkills.includes(skill.toLowerCase())) {
                        score += 10;
                    }
                });
                
                // Pontuação por nível
                if (curso.level === this.userProfile.level) {
                    score += 15;
                }
                
                // Penalização se já fez curso similar
                if (this.userProfile.completedCourses.some(completed => 
                    completed.toLowerCase().includes(curso.title.toLowerCase().split(' ')[0]))) {
                    score -= 20;
                }
                
                return { ...curso, recommendationScore: score };
            })
            .filter(curso => curso.recommendationScore > 0)
            .sort((a, b) => b.recommendationScore - a.recommendationScore)
            .slice(0, 3);
        
        this.renderCursosRecomendados();
    }

    renderCursosRecomendados() {
        const container = document.getElementById('cursos-recomendados-container');
        
        if (this.cursosRecomendados.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="material-icons-outlined">auto_awesome</span>
                    <h3>Personalizando recomendações...</h3>
                    <p>Complete seu perfil para receber sugestões personalizadas</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.cursosRecomendados
            .map(curso => this.createCursoCard(curso, true))
            .join('');
        
        this.setupCardListeners();
    }

    renderCursos() {
        const filtered = this.filterCursos();
        const container = document.getElementById('cursos-list-container');
        const emptyState = document.getElementById('empty-state');
        
        if (filtered.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        container.style.display = 'grid';
        emptyState.style.display = 'none';
        
        container.innerHTML = filtered
            .map(curso => this.createCursoCard(curso))
            .join('');
        
        this.setupCardListeners();
    }

    filterCursos() {
        let filtered = [...this.cursos];
        
        // Filtro por área
        if (this.currentFilters.area !== 'all') {
            filtered = filtered.filter(curso => curso.area === this.currentFilters.area);
        }
        
        // Filtro por busca
        if (this.currentFilters.search) {
            filtered = filtered.filter(curso =>
                curso.title.toLowerCase().includes(this.currentFilters.search) ||
                curso.description.toLowerCase().includes(this.currentFilters.search) ||
                curso.skills.some(skill => skill.toLowerCase().includes(this.currentFilters.search)) ||
                curso.partner.toLowerCase().includes(this.currentFilters.search)
            );
        }
        
        return filtered;
    }

    createCursoCard(curso, isRecommended = false) {
        const recommendationBadge = isRecommended ? 
            `<div class="recommendation-badge">
                <span class="material-icons-outlined">auto_awesome</span>
                Recomendado
            </div>` : '';
        
        return `
            <div class="curso-card" data-curso-id="${curso.id}">
                ${recommendationBadge}
                <div class="curso-card-header">
                    <h4>${curso.title}</h4>
                    <span class="curso-partner">${curso.partner}</span>
                </div>
                <div class="curso-card-body">
                    <div class="curso-area">${curso.area}</div>
                    <p>${curso.description}</p>
                    
                    <div class="curso-meta">
                        <div class="meta-item">
                            <span class="material-icons-outlined">schedule</span>
                            <span>${curso.duration}</span>
                        </div>
                        <div class="meta-item">
                            <span class="material-icons-outlined">star</span>
                            <span>${curso.rating} (${curso.reviews})</span>
                        </div>
                        <div class="meta-item">
                            <span class="material-icons-outlined">trending_up</span>
                            <span>${curso.level}</span>
                        </div>
                    </div>
                    
                    <div class="curso-skills">
                        ${curso.skills.slice(0, 4).map(skill => 
                            `<span class="curso-skill">${skill}</span>`
                        ).join('')}
                        ${curso.skills.length > 4 ? 
                            `<span class="curso-skill-more">+${curso.skills.length - 4}</span>` : ''
                        }
                    </div>
                    
                    <div class="curso-price">
                        <strong>${curso.price}</strong>
                    </div>
                </div>
            </div>
        `;
    }

    setupCardListeners() {
        document.querySelectorAll('.curso-card').forEach(card => {
            card.addEventListener('click', () => {
                const cursoId = parseInt(card.getAttribute('data-curso-id'));
                this.showCursoDetail(cursoId);
            });
        });
    }

    showCursoDetail(cursoId) {
        const curso = this.cursos.find(c => c.id === cursoId);
        if (!curso) return;
        
        // Preencher dados básicos
        document.getElementById('curso-detail-title').textContent = curso.title;
        document.getElementById('curso-detail-partner').textContent = curso.partner;
        document.getElementById('curso-detail-area').textContent = curso.area;
        document.getElementById('curso-detail-duration').textContent = curso.duration;
        document.getElementById('curso-detail-rating').textContent = `${curso.rating} (${curso.reviews} avaliações)`;
        document.getElementById('curso-detail-description').textContent = curso.description;
        
        // Preencher skills
        const skillsList = document.getElementById('curso-detail-skills');
        skillsList.innerHTML = curso.skills.map(skill => `<li>${skill}</li>`).join('');
        
        // Limpar resposta anterior da Compass
        document.getElementById('compass-curso-response').innerHTML = '';
        
        // Mostrar/esconder seções
        document.getElementById('curso-detail-view').style.display = 'block';
        document.getElementById('cursos-list-container').style.display = 'none';
        document.getElementById('compass-recomendacoes-section').style.display = 'none';
        document.querySelector('.cursos-filter-bar').style.display = 'none';
        document.querySelectorAll('.cursos-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Armazenar curso atual
        this.currentCurso = curso;
        
        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    hideCursoDetail() {
        document.getElementById('curso-detail-view').style.display = 'none';
        document.getElementById('cursos-list-container').style.display = 'grid';
        document.querySelector('.cursos-filter-bar').style.display = 'flex';
        document.querySelectorAll('.cursos-section').forEach(section => {
            section.style.display = 'block';
        });
        
        // Mostrar seção de recomendações se já foi gerada
        const compassSection = document.getElementById('compass-recomendacoes-section');
        if (compassSection.innerHTML.trim() !== '') {
            compassSection.style.display = 'block';
        }
        
        this.currentCurso = null;
    }

    handleCompassQuestion() {
        if (!this.currentCurso) return;
        
        const response = this.generateCompassResponse(this.currentCurso);
        const responseContainer = document.getElementById('compass-curso-response');
        
        // Animação de typing
        responseContainer.innerHTML = `
            <div class="compass-curso-msg">
                <div class="typing-animation">
                    <span></span><span></span><span></span>
                </div>
                Compass está analisando...
            </div>
        `;
        
        setTimeout(() => {
            responseContainer.innerHTML = `
                <div class="compass-curso-msg">
                    ${response}
                </div>
            `;
        }, 2000);
    }

    generateCompassResponse(curso) {
        const userSkills = this.userProfile.skills.map(s => s.toLowerCase());
        const missingSkills = curso.skills.filter(skill => 
            !userSkills.includes(skill.toLowerCase())
        );
        
        const hasAllSkills = missingSkills.length === 0;
        const hasPartialSkills = curso.skills.some(skill => 
            userSkills.includes(skill.toLowerCase())
        );
        
        // Análise personalizada baseada no perfil
        if (hasAllSkills) {
            return `
                🎯 <b>Análise Compass:</b> Você já domina todas as habilidades principais deste curso! 
                Este seria um ótimo curso para <b>aprofundar conhecimentos</b> e aprender boas práticas avançadas.
                <br><br>
                💡 <b>Recomendação:</b> Considere buscar cursos mais avançados ou especializações na área de <b>${curso.area}</b>.
            `;
        }
        
        if (hasPartialSkills) {
            return `
                🚀 <b>Análise Compass:</b> Este curso é <b>perfeito para você</b>! Você já tem uma base sólida e este curso vai te ajudar a desenvolver: <b>${missingSkills.join(', ')}</b>.
                <br><br>
                📈 <b>Impacto na carreira:</b> Completar este curso aumentaria significativamente suas chances em vagas de <b>${curso.area}</b>.
                <br><br>
                ⭐ <b>Match com seu perfil:</b> 85% - Altamente recomendado!
            `;
        }
        
        return `
            🌟 <b>Análise Compass:</b> Este curso abriria novas possibilidades na sua carreira! Você desenvolveria habilidades completamente novas: <b>${missingSkills.slice(0, 3).join(', ')}</b>.
            <br><br>
            🎯 <b>Sugestão:</b> Como você tem experiência em <b>${this.userProfile.skills.slice(0, 2).join(' e ')}</b>, a transição seria mais suave. 
            <br><br>
            📊 <b>Tempo estimado:</b> Com sua base atual, você poderia dominar o conteúdo em cerca de <b>${Math.ceil(parseInt(curso.duration) * 0.8)} horas</b>.
        `;
    }

    handleAcessarCurso() {
        if (!this.currentCurso) return;
        
        // Simular redirecionamento
        const confirmation = confirm(
            `Você será redirecionado para o curso "${this.currentCurso.title}" no site da ${this.currentCurso.partner}. Deseja continuar?`
        );
        
        if (confirmation) {
            // Aqui seria o redirecionamento real
            console.log(`Redirecionando para: ${this.currentCurso.title}`);
            alert('Funcionalidade em desenvolvimento! Em breve você poderá acessar diretamente os cursos.');
        }
    }

    handleFavoritarCurso() {
        if (!this.currentCurso) return;
        
        const btn = document.getElementById('favoritar-curso-btn');
        const icon = btn.querySelector('.material-icons-outlined');
        
        if (icon.textContent === 'favorite_border') {
            icon.textContent = 'favorite';
            btn.style.background = 'var(--primary-light)';
            btn.style.color = 'var(--primary-color)';
            alert('Curso adicionado aos favoritos! ❤️');
        } else {
            icon.textContent = 'favorite_border';
            btn.style.background = '';
            btn.style.color = '';
            alert('Curso removido dos favoritos.');
        }
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando página de cursos...');
    window.cursosManager = new CursosManager();
});

// Exportar para uso em outros módulos
export function init() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.cursosManager = new CursosManager();
        });
    } else {
        window.cursosManager = new CursosManager();
    }
}