// js/pages/comunidade.js - Versão Modernizada

class ComunidadeManager {
    constructor() {
        this.posts = [];
        this.filtroAtivo = 'todas';
        this.tags = [];
        this.userProfile = this.loadUserProfile();
        this.init();
    }

    init() {
        console.log('🚀 Sistema da Comunidade inicializando...');
        
        this.loadMockPosts();
        this.setupEventListeners();
        this.renderPosts();
        
        console.log('✅ Sistema da Comunidade inicializado!');
    }

    loadUserProfile() {
        // Simula dados do perfil do usuário (mesmo do cursos.js)
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

    loadMockPosts() {
        this.posts = [
            {
                id: 1,
                titulo: "Como implementar autenticação JWT em React?",
                conteudo: "Estou desenvolvendo minha primeira aplicação React e preciso implementar autenticação com JWT. Já tenho a API pronta, mas estou com dúvidas sobre como armazenar o token e gerenciar o estado de autenticação no front-end. Alguém pode me dar dicas de boas práticas?",
                categoria: "Front-End",
                nivel: "Intermediário",
                tags: ["React", "JWT", "Autenticação", "JavaScript"],
                autor: {
                    nome: "Steve Jobs",
                    avatar: "/assets/images/perfil-elias-silva.png",
                    nivel: "Júnior"
                },
                tempo: "há 2 horas",
                likes: 12,
                respostas: 5,
                visualizacoes: 89,
                liked: false,
                destacado: true,
                compassResponse: null,
                respostasLista: [
                    {
                        autor: {
                            nome: "Ana Souza",
                            avatar: "/assets/images/ana-souza.jpg"
                        },
                        conteudo: "Recomendo usar React Context para gerenciar o estado de autenticação. Para armazenar o token, você pode usar localStorage ou sessionStorage dependendo se quer manter a sessão após fechar o browser.",
                        tempo: "há 1 hora"
                    },
                    {
                        autor: {
                            nome: "Carlos Lima",
                            avatar: "/assets/images/avatar-carlos.jpg"
                        },
                        conteudo: "Cuidado com localStorage para tokens sensíveis. Uma alternativa mais segura é usar httpOnly cookies. Dá uma olhada na biblioteca 'react-query' para gerenciar o estado das requisições autenticadas.",
                        tempo: "há 45 min"
                    }
                ]
            },
            {
                id: 2,
                titulo: "Melhor estratégia para estudar AWS Cloud Practitioner?",
                conteudo: "Pessoal, estou me preparando para a certificação AWS Cloud Practitioner e queria saber qual a melhor estratégia de estudos. Já tenho alguma experiência com cloud, mas é minha primeira certificação AWS. Quanto tempo vocês dedicaram e quais recursos foram mais úteis?",
                categoria: "Certificações",
                nivel: "Iniciante",
                tags: ["AWS", "Certificação", "Cloud", "Estudos"],
                autor: {
                    nome: "Maria Paula",
                    avatar: "/assets/images/maria-paula.jpg",
                    nivel: "Pleno"
                },
                tempo: "há 4 horas",
                likes: 8,
                respostas: 3,
                visualizacoes: 156,
                liked: true,
                destacado: false,
                compassResponse: {
                    titulo: "Análise Personalizada da Compass IA",
                    conteudo: "Baseado no seu perfil, recomendo focar em 3 pilares: 1) Curso oficial AWS Academy (40h de estudo), 2) Prática hands-on com Free Tier (criar EC2, S3, RDS básicos), 3) Simulados focados em billing e security. Com seu background, 6-8 semanas de estudo dedicado devem ser suficientes."
                },
                respostasLista: [
                    {
                        autor: {
                            nome: "João Santos",
                            avatar: "/assets/images/avatar-joao.png"
                        },
                        conteudo: "Passei ano passado! Recomendo muito o curso da AWS Academy + simulados do ExamTopics. Foquei bastante em billing e IAM que caem muito na prova.",
                        tempo: "há 2 horas"
                    }
                ]
            },
            {
                id: 3,
                titulo: "Transição de carreira: Como sair do suporte técnico para desenvolvimento?",
                conteudo: "Trabalho há 3 anos em suporte técnico de TI e sempre tive interesse em programação. Já fiz alguns cursos online de Python e JavaScript, mas me sinto perdido sobre como fazer essa transição. Devo buscar uma vaga júnior direto ou fazer mais cursos primeiro? Como mostrar que tenho potencial mesmo sem experiência profissional em dev?",
                categoria: "Carreira",
                nivel: "Iniciante",
                tags: ["Carreira", "Transição", "Desenvolvimento", "Python", "JavaScript"],
                autor: {
                    nome: "Roberto Santos",
                    avatar: "/assets/images/avatar-roberto.png",
                    nivel: "Iniciante"
                },
                tempo: "há 6 horas",
                likes: 15,
                respostas: 8,
                visualizacoes: 234,
                liked: false,
                destacado: false,
                compassResponse: null,
                respostasLista: [
                    {
                        autor: {
                            nome: "Fernanda Costa",
                            avatar: "/assets/images/avatar-fernanda.jpg"
                        },
                        conteudo: "Fiz uma transição similar! Minha dica: monte um portfólio sólido no GitHub com pelo menos 3-4 projetos bem documentados. Sua experiência em suporte é valiosa - você entende o usuário final!",
                        tempo: "há 3 horas"
                    },
                    {
                        autor: {
                            nome: "Lucas Mendes",
                            avatar: "/assets/images/avatar-lucas.png"
                        },
                        conteudo: "Além do portfólio, considere contribuir com projetos open source. Mostra que você consegue trabalhar em equipe e seguir padrões de código. LinkedIn atualizado também é essencial!",
                        tempo: "há 1 hora"
                    }
                ]
            },
            {
                id: 4,
                titulo: "Docker vs Kubernetes: Quando usar cada um?",
                conteudo: "Estou estudando DevOps e me confundo com Docker e Kubernetes. Entendo que Docker é para containerização, mas quando exatamente preciso do Kubernetes? Para projetos pequenos/médios, o Docker Compose não seria suficiente?",
                categoria: "DevOps",
                nivel: "Intermediário",
                tags: ["Docker", "Kubernetes", "DevOps", "Containers"],
                autor: {
                    nome: "Camila Rodrigues",
                    avatar: "/assets/images/avatar-camila.png",
                    nivel: "Intermediário"
                },
                tempo: "há 8 horas",
                likes: 6,
                respostas: 2,
                visualizacoes: 98,
                liked: false,
                destacado: false,
                compassResponse: null,
                respostasLista: []
            },
            {
                id: 5,
                titulo: "Freelance: Como precificar projetos de desenvolvimento web?",
                conteudo: "Comecei a fazer freelas de desenvolvimento web (principalmente React) e sempre fico na dúvida sobre precificação. Como vocês calculam o valor? Por hora, por projeto, ou por funcionalidade? E como lidar com mudanças de escopo durante o desenvolvimento?",
                categoria: "Freelance",
                nivel: "Intermediário",
                tags: ["Freelance", "Precificação", "React", "Web Development"],
                autor: {
                    nome: "Daniel Oliveira",
                    avatar: "/assets/images/avatar-daniel.png",
                    nivel: "Pleno"
                },
                tempo: "há 1 dia",
                likes: 23,
                respostas: 12,
                visualizacoes: 456,
                liked: true,
                destacado: true,
                compassResponse: null,
                respostasLista: [
                    {
                        autor: {
                            nome: "Paula Ferreira",
                            avatar: "/assets/images/avatar-paula.png"
                        },
                        conteudo: "Trabalho com valor por projeto, mas sempre com escopo muito bem definido. Para mudanças, tenho uma cláusula de 20% de margem incluída no orçamento inicial.",
                        tempo: "há 18 horas"
                    }
                ]
            }
        ];
    }

    setupEventListeners() {
        // Form de nova postagem
        const form = document.getElementById('novaPostagemForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.criarNovoPost();
            });
        }

        // Tags input
        const tagsInput = document.getElementById('tagsInput');
        if (tagsInput) {
            tagsInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.adicionarTag();
                }
            });
        }

        // Filtros
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                this.aplicarFiltro(chip.dataset.filter);
            });
        });

        // Compass IA - Post específico
        const compassBtn = document.getElementById('pedirAjudaCompass');
        if (compassBtn) {
            compassBtn.addEventListener('click', () => {
                this.ajudaCompassNovoPost();
            });
        }

        // Compass IA - Global
        const compassGlobalBtn = document.getElementById('compassGlobalBtn');
        if (compassGlobalBtn) {
            compassGlobalBtn.addEventListener('click', () => {
                this.abrirCompassGlobal();
            });
        }

        // Event listeners para trending topics
        document.querySelectorAll('.trending-item').forEach(item => {
            item.addEventListener('click', () => {
                const topicText = item.querySelector('h5').textContent;
                this.filtrarPorTopico(topicText);
            });
        });
    }

    criarNovoPost() {
        const titulo = document.getElementById('tituloPost')?.value.trim();
        const categoria = document.getElementById('categoriaPost')?.value;
        const nivel = document.getElementById('nivelPost')?.value;
        const conteudo = document.getElementById('conteudoPost')?.value.trim();

        if (!titulo || !categoria || !nivel || !conteudo) {
            this.mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'warning');
            return;
        }

        const novoPost = {
            id: Date.now(),
            titulo,
            conteudo,
            categoria,
            nivel,
            tags: [...this.tags],
            autor: {
                nome: "Elias Silva",
                avatar: "/assets/images/perfil-elias-silva.png",
                nivel: "Júnior"
            },
            tempo: "agora",
            likes: 0,
            respostas: 0,
            visualizacoes: 1,
            liked: false,
            destacado: false,
            compassResponse: null,
            respostasLista: []
        };

        this.posts.unshift(novoPost);
        this.limparFormulario();
        this.renderPosts();

        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Feedback visual
        this.mostrarNotificacao('Post publicado com sucesso! 🎉', 'success');
    }

    limparFormulario() {
        const form = document.getElementById('novaPostagemForm');
        if (form) {
            form.reset();
        }
        this.tags = [];
        this.renderTags();
    }

    adicionarTag() {
        const input = document.getElementById('tagsInput');
        if (!input) return;

        const tag = input.value.trim();

        if (tag && !this.tags.includes(tag) && this.tags.length < 5) {
            this.tags.push(tag);
            input.value = '';
            this.renderTags();
        } else if (this.tags.length >= 5) {
            this.mostrarNotificacao('Máximo de 5 tags permitidas', 'warning');
        }
    }

    renderTags() {
        const container = document.getElementById('tagPreview');
        if (!container) return;

        container.innerHTML = this.tags.map(tag => `
            <div class="tag-item">
                ${tag}
                <span class="tag-remove" onclick="window.comunidadeManager.removerTag('${tag}')">×</span>
            </div>
        `).join('');
    }

    removerTag(tag) {
        this.tags = this.tags.filter(t => t !== tag);
        this.renderTags();
    }

    aplicarFiltro(filtro) {
        // Atualizar UI dos filtros
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.classList.remove('active');
        });
        
        const activeChip = document.querySelector(`[data-filter="${filtro}"]`);
        if (activeChip) {
            activeChip.classList.add('active');
        }

        this.filtroAtivo = filtro;
        this.renderPosts();
        
        this.mostrarNotificacao(`Filtro "${filtro}" aplicado`, 'info');
    }

    getPostsFiltrados() {
        let postsFiltrados = [...this.posts];

        switch (this.filtroAtivo) {
            case 'todas':
                break;
            case 'sem-resposta':
                postsFiltrados = postsFiltrados.filter(post => post.respostas === 0);
                break;
            case 'compass':
                postsFiltrados = postsFiltrados.filter(post => post.compassResponse);
                break;
            default:
                postsFiltrados = postsFiltrados.filter(post => post.categoria === this.filtroAtivo);
        }

        return postsFiltrados;
    }

    renderPosts() {
        const container = document.getElementById('feedContainer');
        if (!container) return;

        const postsFiltrados = this.getPostsFiltrados();

        if (postsFiltrados.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <span class="material-icons-outlined">forum</span>
                    <h3>Nenhum post encontrado</h3>
                    <p>Tente ajustar os filtros ou seja o primeiro a postar nesta categoria!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = postsFiltrados.map(post => this.createPostCard(post)).join('');
        this.setupPostListeners();
    }

    createPostCard(post) {
        const compassSection = post.compassResponse ? `
            <div class="compass-response">
                <h5>${post.compassResponse.titulo}</h5>
                <p>${post.compassResponse.conteudo}</p>
            </div>
        ` : '';

        const respostasSection = post.respostasLista.length > 0 ? `
            <div class="respostas-section">
                ${post.respostasLista.map(resposta => `
                    <div class="resposta-item">
                        <div class="resposta-header">
                            <img src="${resposta.autor.avatar}" alt="Avatar" class="resposta-avatar">
                            <span class="resposta-user">${resposta.autor.nome}</span>
                            <span class="resposta-time">${resposta.tempo}</span>
                        </div>
                        <div class="resposta-content">${resposta.conteudo}</div>
                    </div>
                `).join('')}
                
                <div class="nova-resposta">
                    <img src="/assets/images/perfil-elias-silva.png" alt="Seu avatar" class="resposta-avatar">
                    <input type="text" class="resposta-input" placeholder="Adicione sua resposta..." data-post-id="${post.id}">
                    <button class="btn btn-primary" onclick="window.comunidadeManager.adicionarResposta(${post.id})" style="padding: 8px 16px; font-size: 0.9rem;">
                        <span class="material-icons-outlined" style="font-size: 1rem;">send</span>
                        Responder
                    </button>
                </div>
            </div>
        ` : `
            <div class="nova-resposta">
                <img src="/assets/images/perfil-elias-silva.png" alt="Seu avatar" class="resposta-avatar">
                <input type="text" class="resposta-input" placeholder="Seja o primeiro a responder..." data-post-id="${post.id}">
                <button class="btn btn-primary" onclick="window.comunidadeManager.adicionarResposta(${post.id})" style="padding: 8px 16px; font-size: 0.9rem;">
                    <span class="material-icons-outlined" style="font-size: 1rem;">send</span>
                    Responder
                </button>
            </div>
        `;

        return `
            <article class="post-card ${post.destacado ? 'destacado' : ''} ${post.compassResponse ? 'compass-respondido' : ''}">
                <div class="post-header">
                    <div class="post-user-info">
                        <img src="${post.autor.avatar}" alt="Avatar" class="post-avatar">
                        <div class="post-user-details">
                            <h5>${post.autor.nome}</h5>
                            <span>${post.autor.nivel} • ${post.tempo}</span>
                        </div>
                    </div>
                    <div class="post-meta">
                        <div class="post-category">${post.categoria}</div>
                        <span>${post.nivel}</span>
                    </div>
                </div>

                <div class="post-content">
                    <h4>${post.titulo}</h4>
                    <p>${post.conteudo}</p>

                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                    </div>
                </div>

                ${compassSection}

                <div class="post-actions">
                    <div class="post-stats">
                        <div class="stat-item ${post.liked ? 'liked' : ''}" onclick="window.comunidadeManager.toggleLike(${post.id})">
                            <span class="material-icons-outlined">${post.liked ? 'favorite' : 'favorite_border'}</span>
                            <span>${post.likes}</span>
                        </div>
                        <div class="stat-item">
                            <span class="material-icons-outlined">comment</span>
                            <span>${post.respostas}</span>
                        </div>
                        <div class="stat-item">
                            <span class="material-icons-outlined">visibility</span>
                            <span>${post.visualizacoes}</span>
                        </div>
                    </div>

                    <div class="post-actions-btn">
                        <button class="action-btn" onclick="window.comunidadeManager.perguntarCompass(${post.id})">
                            <span class="material-icons-outlined">auto_awesome</span>
                            Compass
                        </button>
                        <button class="action-btn" onclick="window.comunidadeManager.compartilharPost(${post.id})">
                            <span class="material-icons-outlined">share</span>
                            Compartilhar
                        </button>
                    </div>
                </div>

                ${respostasSection}
            </article>
        `;
    }

    setupPostListeners() {
        // Listeners específicos dos posts já estão sendo configurados via onclick
        // Este método pode ser expandido para listeners mais complexos
        document.querySelectorAll('.resposta-input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const postId = parseInt(input.dataset.postId);
                    this.adicionarResposta(postId);
                }
            });
        });
    }

    toggleLike(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            this.renderPosts();
            
            const emoji = post.liked ? '❤️' : '💔';
            this.mostrarNotificacao(`Post ${post.liked ? 'curtido' : 'descurtido'}! ${emoji}`, 'info');
        }
    }

    adicionarResposta(postId) {
        const input = document.querySelector(`[data-post-id="${postId}"]`);
        if (!input) return;

        const conteudo = input.value.trim();
        if (!conteudo) {
            this.mostrarNotificacao('Digite uma resposta antes de enviar', 'warning');
            return;
        }

        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.respostasLista.push({
                autor: {
                    nome: "Elias Silva",
                    avatar: "/assets/images/perfil-elias-silva.png"
                },
                conteudo,
                tempo: "agora"
            });
            post.respostas++;
            
            this.renderPosts();
            this.mostrarNotificacao('Resposta adicionada! 💬', 'success');
        }
    }

    perguntarCompass(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        if (post.compassResponse) {
            this.mostrarNotificacao('A Compass IA já respondeu a este post! 🤖', 'info');
            return;
        }

        this.mostrarNotificacao('Compass IA analisando... 🤖', 'info');

        // Simular processamento da IA
        setTimeout(() => {
            const response = this.generateCompassResponse(post);
            post.compassResponse = response;
            this.renderPosts();
            this.mostrarNotificacao('Compass IA respondeu! ✨', 'success');
        }, 2500);
    }

    generateCompassResponse(post) {
        // Respostas baseadas na categoria e conteúdo
        const responses = {
            'Front-End': {
                titulo: "Análise Front-End da Compass IA",
                conteudo: "Baseado no seu perfil e na dúvida apresentada, recomendo focar em padrões de componentes reutilizáveis e state management. Considere usar TypeScript para maior robustez e testes automatizados com Jest/Testing Library."
            },
            'Back-End': {
                titulo: "Sugestão Back-End da Compass IA",
                conteudo: "Para esta arquitetura, sugiro implementar padrões RESTful com documentação OpenAPI. Considere usar middleware para validação e logging. Para escalabilidade, avalie implementar cache com Redis."
            },
            'DevOps': {
                titulo: "Estratégia DevOps da Compass IA",
                conteudo: "Para este cenário, recomendo começar com Docker para containerização e depois evoluir para Kubernetes conforme a demanda. Implemente CI/CD com GitHub Actions ou GitLab CI."
            },
            'Carreira': {
                titulo: "Orientação de Carreira da Compass IA",
                conteudo: "Baseado no seu perfil atual, sugiro focar em construir um portfólio sólido e networking ativo. Participe de projetos open source e considere mentorias para acelerar seu crescimento."
            },
            'Certificações': {
                titulo: "Plano de Estudos da Compass IA",
                conteudo: "Para esta certificação, recomendo 8-10 semanas de estudo estruturado. Combine teoria (40%), prática hands-on (40%) e simulados (20%). Foque nos tópicos que você demonstrou menos domínio."
            },
            'Freelance': {
                titulo: "Estratégia Freelance da Compass IA",
                conteudo: "Para precificação, considere seu custo/hora + margem + complexidade do projeto. Sempre defina escopo claro e tenha contratos bem estruturados. Builds um pipeline de clientes consistente."
            }
        };

        return responses[post.categoria] || {
            titulo: "Sugestão Personalizada da Compass IA",
            conteudo: "Baseado na análise do seu post e perfil, recomendo pesquisar mais sobre as tecnologias mencionadas e praticar com projetos hands-on. A comunidade CareerPath tem ótimos recursos para te ajudar!"
        };
    }

    compartilharPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        // Simular compartilhamento
        if (navigator.share) {
            navigator.share({
                title: post.titulo,
                text: post.conteudo.substring(0, 100) + '...',
                url: window.location.href
            });
        } else {
            // Fallback para navegadores que não suportam Web Share API
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.mostrarNotificacao('Link copiado para a área de transferência! 📋', 'success');
            });
        }
    }

    ajudaCompassNovoPost() {
        const titulo = document.getElementById('tituloPost')?.value.trim();
        const conteudo = document.getElementById('conteudoPost')?.value.trim();
        const categoria = document.getElementById('categoriaPost')?.value;

        if (!titulo && !conteudo) {
            this.mostrarNotificacao('Digite pelo menos um título ou descrição para a Compass analisar', 'warning');
            return;
        }

        // Simular análise da Compass
        this.mostrarNotificacao('Compass IA analisando sua dúvida... 🤖', 'info');

        setTimeout(() => {
            const sugestao = this.generatePostSuggestion(titulo, conteudo, categoria);
            this.mostrarCompassSugestao(sugestao);
        }, 2000);
    }

    generatePostSuggestion(titulo, conteudo, categoria) {
        const sugestoes = {
            'Front-End': "Sugiro detalhar qual versão do React você está usando e se já tentou alguma abordagem específica. Adicione tags como 'Context API', 'Hooks' ou 'Redux' para atrair respostas mais direcionadas.",
            'Back-End': "Recomendo especificar a linguagem/framework e versão. Inclua detalhes sobre a arquitetura atual e o que já foi tentado.",
            'DevOps': "Adicione informações sobre o ambiente (AWS, Azure, GCP) e escala do projeto. Isso ajudará a comunidade a dar respostas mais precisas.",
            'Carreira': "Mencione sua área de interesse específica e tempo de experiência. Isso ajudará outros profissionais a compartilhar experiências similares.",
            'Certificações': "Inclua seu nível atual de conhecimento e prazo desejado para a certificação. A comunidade pode sugerir cronogramas realistas."
        };

        return sugestoes[categoria] || "Tente ser mais específico sobre o contexto e o que você já tentou. Isso ajudará a comunidade a dar respostas mais úteis!";
    }

    mostrarCompassSugestao(sugestao) {
        // Criar modal simples para mostrar sugestão
        const modal = document.createElement('div');
        modal.className = 'modal-overlay show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>
                        <span class="material-icons-outlined">auto_awesome</span>
                        Sugestão da Compass IA
                    </h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="compass-response" style="margin: 0;">
                    <h5>Como melhorar seu post</h5>
                    <p>${sugestao}</p>
                </div>
                <div style="margin-top: 20px; text-align: right;">
                    <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">
                        Entendi, obrigado!
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listener para fechar modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    abrirCompassGlobal() {
        // Criar modal para pergunta global à Compass
        const modal = document.createElement('div');
        modal.className = 'modal-overlay show';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>
                        <span class="material-icons-outlined">psychology</span>
                        Perguntar à Compass IA
                    </h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div style="margin-bottom: 20px;">
                    <label class="form-label">O que você gostaria de saber?</label>
                    <textarea class="form-textarea" id="compassGlobalQuestion" placeholder="Ex: Como devo estruturar meus estudos para me tornar um desenvolvedor full-stack?" style="min-height: 100px;"></textarea>
                </div>
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">
                        Cancelar
                    </button>
                    <button class="btn btn-primary" id="enviarPerguntaCompass">
                        <span class="material-icons-outlined">send</span>
                        Enviar Pergunta
                    </button>
                </div>
                <div id="compassGlobalResponse" style="margin-top: 20px;"></div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        modal.querySelector('#enviarPerguntaCompass').addEventListener('click', () => {
            this.processarPerguntaGlobalCompass(modal);
        });
    }

    processarPerguntaGlobalCompass(modal) {
        const pergunta = modal.querySelector('#compassGlobalQuestion').value.trim();
        if (!pergunta) {
            this.mostrarNotificacao('Digite uma pergunta para a Compass IA', 'warning');
            return;
        }

        const responseContainer = modal.querySelector('#compassGlobalResponse');
        
        // Mostrar loading
        responseContainer.innerHTML = `
            <div class="compass-response">
                <div class="typing-animation">
                    <span></span><span></span><span></span>
                </div>
                Compass analisando sua pergunta...
            </div>
        `;

        // Simular processamento
        setTimeout(() => {
            const resposta = this.generateGlobalCompassResponse(pergunta);
            responseContainer.innerHTML = `
                <div class="compass-response">
                    <h5>Resposta da Compass IA</h5>
                    <p>${resposta}</p>
                </div>
            `;
        }, 3000);
    }

    generateGlobalCompassResponse(pergunta) {
        const palavrasChave = pergunta.toLowerCase();
        
        if (palavrasChave.includes('full-stack') || palavrasChave.includes('fullstack')) {
            return "Para se tornar full-stack, recomendo esta jornada: 1) Domine HTML/CSS/JS primeiro, 2) Aprenda React para front-end, 3) Node.js + Express para back-end, 4) Banco de dados (PostgreSQL ou MongoDB), 5) Deploy e DevOps básico. Tempo estimado: 8-12 meses com dedicação consistente.";
        }
        
        if (palavrasChave.includes('carreira') || palavrasChave.includes('transição')) {
            return "Para transição de carreira em tech: 1) Identifique a área de maior interesse, 2) Construa um portfólio sólido no GitHub, 3) Network ativo no LinkedIn e comunidades, 4) Considere freelances para ganhar experiência, 5) Estude as tecnologias mais demandadas no mercado atual.";
        }
        
        if (palavrasChave.includes('salário') || palavrasChave.includes('quanto ganha')) {
            return "Salários em tech variam muito por região e experiência. Júnior: R$ 3-6k, Pleno: R$ 6-12k, Sênior: R$ 12k+. Dicas para aumentar: especialize-se em tecnologias de alta demanda, desenvolva soft skills, contribua com projetos open source e mantenha-se atualizado.";
        }
        
        if (palavrasChave.includes('curso') || palavrasChave.includes('estudar')) {
            return "Para escolher cursos eficazes: 1) Identifique seu objetivo específico, 2) Verifique a reputação do instrutor/plataforma, 3) Procure cursos com projetos práticos, 4) Leia avaliações recentes, 5) Considere cursos que oferecem certificação reconhecida pelo mercado.";
        }

        return "Essa é uma excelente pergunta! Baseado na análise, recomendo pesquisar mais sobre o tema específico e verificar os recursos disponíveis na nossa plataforma. A comunidade CareerPath também tem muitos profissionais experientes que podem te ajudar com insights práticos.";
    }

    filtrarPorTopico(topico) {
        // Filtrar posts por tópico trending
        const categoria = this.detectarCategoriaPorTopico(topico);
        if (categoria) {
            this.aplicarFiltro(categoria);
        }
    }

    detectarCategoriaPorTopico(topico) {
        const mapeamento = {
            'React': 'Front-End',
            'Vue.js': 'Front-End',
            'AWS': 'Certificações',
            'TypeScript': 'Front-End',
            'JavaScript': 'Front-End',
            'Salários': 'Carreira',
            'IA': 'IA'
        };

        for (const [palavra, categoria] of Object.entries(mapeamento)) {
            if (topico.includes(palavra)) {
                return categoria;
            }
        }
        return null;
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

    // Método para atualizar estatísticas dinamicamente
    atualizarEstatisticas() {
        const stats = {
            membros: 2847 + Math.floor(Math.random() * 10),
            postsHoje: 156 + Math.floor(Math.random() * 20),
            respostasHoje: 834 + Math.floor(Math.random() * 50),
            taxaResposta: 94 + Math.floor(Math.random() * 6)
        };

        // Atualizar se os elementos existirem
        const elementos = document.querySelectorAll('.stat-value');
        if (elementos.length >= 4) {
            elementos[0].textContent = stats.membros.toLocaleString();
            elementos[1].textContent = stats.postsHoje;
            elementos[2].textContent = stats.respostasHoje;
            elementos[3].textContent = stats.taxaResposta + '%';
        }
    }
}

// Função de inicialização para compatibilidade com o sistema SPA
export function init() {
    console.log('🚀 Iniciando página da comunidade...');
    
    // Aguardar DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.comunidadeManager = new ComunidadeManager();
        });
    } else {
        window.comunidadeManager = new ComunidadeManager();
    }

    // Atualizar estatísticas a cada 30 segundos
    setInterval(() => {
        if (window.comunidadeManager) {
            window.comunidadeManager.atualizarEstatisticas();
        }
    }, 30000);
}