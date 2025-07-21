// js/pages/compass.js - Versão Funcional Completa

class CompassIA {
    constructor() {
        this.chatHistory = [];
        this.isTyping = false;
        this.userProfile = this.loadUserProfile();
        this.conversationContext = [];
        this.isListening = false;
        
        // Aguardar DOM carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('🚀 Compass IA iniciando...');
        
        this.setupElements();
        this.setupEventListeners();
        this.setupAnimations();
        this.loadChatHistory();
        this.showWelcomeMessage();
        
        console.log('✅ Compass IA inicializado com sucesso!');
    }

    setupElements() {
        // Verificar se todos os elementos existem
        this.elements = {
            chatForm: document.getElementById('compass-chat-form'),
            chatInput: document.getElementById('compass-chat-input'),
            chatHistory: document.getElementById('compass-chat-history'),
            voiceBtn: document.getElementById('voice-input'),
            clearBtn: document.getElementById('clear-chat'),
            exportBtn: document.getElementById('export-chat'),
            exportModal: document.getElementById('export-modal'),
            closeModal: document.getElementById('close-export-modal')
        };

        // Log dos elementos encontrados
        Object.keys(this.elements).forEach(key => {
            if (!this.elements[key]) {
                console.warn(`Elemento não encontrado: ${key}`);
            }
        });
    }

    setupEventListeners() {
        // Chat form submit
        if (this.elements.chatForm) {
            this.elements.chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleUserMessage();
            });
        }

        // Enter key no input
        if (this.elements.chatInput) {
            this.elements.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleUserMessage();
                }
            });
        }

        // Voice input
        if (this.elements.voiceBtn) {
            this.elements.voiceBtn.addEventListener('click', () => {
                this.handleVoiceInput();
            });
        }

        // Quick actions
        this.setupQuickActions();

        // Example cards
        this.setupExampleCards();

        // Clear chat
        if (this.elements.clearBtn) {
            this.elements.clearBtn.addEventListener('click', () => {
                this.clearChat();
            });
        }

        // Export chat
        if (this.elements.exportBtn) {
            this.elements.exportBtn.addEventListener('click', () => {
                this.showExportModal();
            });
        }

        // Export modal
        this.setupExportModal();
    }

    setupQuickActions() {
        const quickActions = document.querySelectorAll('.quick-action-btn');
        quickActions.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                if (question && this.elements.chatInput) {
                    this.elements.chatInput.value = question;
                    this.handleUserMessage();
                }
            });
        });
        console.log(`✅ ${quickActions.length} ações rápidas configuradas`);
    }

    setupExampleCards() {
        const exampleCards = document.querySelectorAll('.example-card');
        exampleCards.forEach(card => {
            card.addEventListener('click', () => {
                const question = card.getAttribute('data-question');
                if (question && this.elements.chatInput) {
                    this.elements.chatInput.value = question;
                    this.handleUserMessage();
                }
            });
        });
        console.log(`✅ ${exampleCards.length} cards de exemplo configurados`);
    }

    setupExportModal() {
        // Close modal
        if (this.elements.closeModal) {
            this.elements.closeModal.addEventListener('click', () => {
                this.hideExportModal();
            });
        }

        // Click outside modal
        if (this.elements.exportModal) {
            this.elements.exportModal.addEventListener('click', (e) => {
                if (e.target === this.elements.exportModal) {
                    this.hideExportModal();
                }
            });
        }

        // Export buttons
        const exportBtns = document.querySelectorAll('.export-btn');
        exportBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const format = btn.getAttribute('data-format');
                this.exportChat(format);
            });
        });
        console.log(`✅ ${exportBtns.length} botões de exportação configurados`);
    }

    setupAnimations() {
        // Animar sidebar cards
        const sidebarCards = document.querySelectorAll('.sidebar-card');
        sidebarCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(30px)';
            card.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 150);
        });

        // Animar progress bars
        setTimeout(() => {
            const progressFills = document.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                const targetWidth = fill.style.width;
                fill.style.width = '0%';
                fill.style.transition = 'width 1s ease-out';
                
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 200);
            });
        }, 1000);
    }

    loadUserProfile() {
        return {
            nome: "Elias Silva",
            skills: {
                'JavaScript': 85,
                'HTML': 83,
                'CSS': 81,
                'React': 60,
                'Python': 75,
                'Git': 80,
                'TypeScript': 45
            },
            certifications: [
                'AWS Cloud Practitioner',
                'Oracle Certified Professional',
                'Python Certification',
                'JavaScript Certification'
            ],
            softSkills: ['Liderança', 'Trabalho em Equipe', 'Pensamento Analítico', 'Pensamento Criativo', 'Resiliência', 'Empatia'],
            cursos: [
                'JavaScript Moderno',
                'React Completo',
                'Python Essencial',
                'AWS Foundations'
            ],
            vagas_interesse: [
                { titulo: 'Desenvolvedor Front-End Jr.', empresa: 'Itaú', match: 85 },
                { titulo: 'Desenvolvedor Back-End Jr.', empresa: 'iFood', match: 72 },
                { titulo: 'Desenvolvedor Full-Stack Jr.', empresa: 'Nubank', match: 78 }
            ],
            projetos: [
                'Landing Page para Escola da Nuvem',
                'Calculadora de investimento com Python',
                'Dashboard de Investimento com Python'
            ]
        };
    }

    handleUserMessage() {
        if (!this.elements.chatInput) return;
        
        const message = this.elements.chatInput.value.trim();
        if (!message) return;
        
        this.sendMessage(message);
        this.elements.chatInput.value = '';
    }

    sendMessage(message) {
        // Adicionar mensagem do usuário
        this.addMessage(message, 'user');
        this.conversationContext.push({ role: 'user', message: message });
        
        // Mostrar indicador de digitação
        this.showTypingIndicator();
        
        // Simular delay de processamento
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'ia');
            this.conversationContext.push({ role: 'ia', message: response });
            this.saveChatHistory();
        }, 1000 + Math.random() * 1500);
    }

    generateResponse(question) {
        const q = question.toLowerCase();
        const profile = this.userProfile;

        console.log('🤖 Gerando resposta para:', question);

        // Análise de vagas específicas
        if (q.includes('analise') && q.includes('vaga')) {
            if (q.includes('itaú')) {
                return this.analyzeJobMatch('Itaú', 'Desenvolvedor Front-End Jr.');
            }
            if (q.includes('ifood')) {
                return this.analyzeJobMatch('iFood', 'Desenvolvedor Back-End Jr.');
            }
        }

        // Match de vagas
        if (q.includes('vaga') && (q.includes('combina') || q.includes('compatí') || q.includes('perfil'))) {
            return this.getJobRecommendations();
        }

        // Dicas de carreira
        if (q.includes('dica') && q.includes('carreira')) {
            return this.getCareerAdvice();
        }

        // Cursos recomendados
        if (q.includes('curso') && (q.includes('deveria') || q.includes('recomend') || q.includes('estudar'))) {
            return this.getCourseRecommendations();
        }

        // Análise de perfil
        if (q.includes('analise') && q.includes('perfil') && q.includes('feedback')) {
            return this.getProfileAnalysis();
        }

        // Conhecimento específico
        if (q.includes('o que eu sei sobre') || q.includes('conhecimento')) {
            const tech = this.extractTechnology(q);
            return this.getKnowledgeAnalysis(tech);
        }

        // Melhorar match
        if (q.includes('melhorar') && q.includes('match')) {
            return this.getMatchImprovementTips();
        }

        // Explicações técnicas
        if (q.includes('explique') || q.includes('conceito') || q.includes('como funciona')) {
            return this.provideTechnicalExplanation(q);
        }

        // Progressão de carreira
        if (q.includes('progressão') && q.includes('carreira')) {
            return this.getCareerProgression();
        }

        // Saudações
        if (q.includes('olá') || q.includes('oi') || q.includes('hello') || q.includes('ola')) {
            return `Olá, ${profile.nome}! 👋 Eu sou a Compass IA, sua assistente de carreira inteligente. Estou aqui para te ajudar a alcançar seus objetivos profissionais. Como posso te auxiliar hoje?`;
        }

        // Agradecimentos
        if (q.includes('obrigad') || q.includes('valeu') || q.includes('thanks')) {
            return `Por nada, ${profile.nome}! 😊 Estou sempre aqui para te ajudar. Há mais alguma coisa que você gostaria de saber sobre sua carreira?`;
        }

        // Resposta padrão
        return this.getSmartDefaultResponse(q);
    }

    analyzeJobMatch(empresa, cargo) {
        if (empresa === 'Itaú' && cargo === 'Desenvolvedor Front-End Jr.') {
            return `
                <div class="ia-response">
                    <h4>🎯 Análise da Vaga: ${cargo} - ${empresa}</h4>
                    <p><strong>Match atual: 85%</strong> - Excelente compatibilidade!</p>
                    
                    <h5>✅ Seus pontos fortes:</h5>
                    <ul>
                        <li><strong>JavaScript (85%)</strong> - Domínio sólido</li>
                        <li><strong>HTML (83%)</strong> - Muito bom</li>
                        <li><strong>CSS (81%)</strong> - Bom nível</li>
                        <li><strong>React (60%)</strong> - Conhecimento relevante</li>
                        <li><strong>Git (80%)</strong> - Essencial para equipe</li>
                    </ul>
                    
                    <h5>📈 Para 100% de match:</h5>
                    <ul>
                        <li>Aprenda <strong>TypeScript</strong> (muito valorizado)</li>
                        <li>Estude <strong>Testes automatizados</strong> (Jest/Testing Library)</li>
                        <li>Pratique <strong>Redux/Context API</strong></li>
                        <li>Domine <strong>Sass/Styled Components</strong></li>
                    </ul>
                    
                    <p><strong>💡 Dica:</strong> O Itaú valoriza Clean Code. Destaque projetos com código bem documentado!</p>
                </div>
            `;
        }

        if (empresa === 'iFood' && cargo === 'Desenvolvedor Back-End Jr.') {
            return `
                <div class="ia-response">
                    <h4>🎯 Análise da Vaga: ${cargo} - ${empresa}</h4>
                    <p><strong>Match atual: 72%</strong> - Boa compatibilidade!</p>
                    
                    <h5>✅ Seus pontos fortes:</h5>
                    <ul>
                        <li><strong>Python (75%)</strong> - Boa base</li>
                        <li><strong>Git (80%)</strong> - Controle de versão</li>
                        <li><strong>Pensamento analítico</strong> - Soft skill valorizada</li>
                    </ul>
                    
                    <h5>📈 Para melhorar o match:</h5>
                    <ul>
                        <li>Aprenda <strong>Django/Flask</strong></li>
                        <li>Estude <strong>APIs REST</strong></li>
                        <li>Pratique <strong>Bancos de dados</strong> (PostgreSQL/MongoDB)</li>
                        <li>Conheça <strong>Docker</strong> e containerização</li>
                    </ul>
                    
                    <p><strong>💡 Dica:</strong> iFood usa muito microserviços. Foque em arquitetura distribuída!</p>
                </div>
            `;
        }

        return `Análise detalhada da vaga ${cargo} na ${empresa} ainda não disponível. Posso analisar as vagas do Itaú ou iFood!`;
    }

    getJobRecommendations() {
        return `
            <div class="ia-response">
                <h4>🚀 Vagas Mais Compatíveis</h4>
                
                <div class="job-item">
                    <h5>1. Desenvolvedor Front-End Jr. - Itaú</h5>
                    <p><strong>Match: 85%</strong> - Suas skills de JavaScript e React são perfeitas!</p>
                </div>
                
                <div class="job-item">
                    <h5>2. Desenvolvedor Full-Stack Jr. - Nubank</h5>
                    <p><strong>Match: 78%</strong> - Combina JavaScript front-end e Python back-end.</p>
                </div>
                
                <div class="job-item">
                    <h5>3. Desenvolvedor Back-End Jr. - iFood</h5>
                    <p><strong>Match: 72%</strong> - Foca no seu conhecimento Python.</p>
                </div>
                
                <p><strong>💡 Quer detalhes?</strong> Pergunte: "Analise a vaga do Itaú"</p>
            </div>
        `;
    }

    getCareerAdvice() {
        return `
            <div class="ia-response">
                <h4>💼 Dicas Personalizadas de Carreira</h4>
                
                <h5>🎯 Baseado no seu perfil:</h5>
                <ul>
                    <li><strong>Foque em React</strong> - Sua maior oportunidade (60% → 85%)</li>
                    <li><strong>Aprenda TypeScript</strong> - 90% das vagas pedem</li>
                    <li><strong>Construa portfolio</strong> - GitHub bem organizado</li>
                    <li><strong>Networking</strong> - Participe de comunidades tech</li>
                </ul>
                
                <h5>📈 Roadmap 6 meses:</h5>
                <ol>
                    <li><strong>Mês 1-2:</strong> TypeScript + React avançado</li>
                    <li><strong>Mês 3-4:</strong> Projeto full-stack completo</li>
                    <li><strong>Mês 5-6:</strong> Certificação AWS + job applications</li>
                </ol>
                
                <p><strong>🔥 Seu diferencial:</strong> Liderança + habilidades técnicas sólidas!</p>
            </div>
        `;
    }

    getCourseRecommendations() {
        return `
            <div class="ia-response">
                <h4>📚 Cursos Recomendados</h4>
                
                <h5>🎯 Alta Prioridade:</h5>
                <ul>
                    <li><strong>TypeScript do Zero ao Avançado</strong> - Rocketseat</li>
                    <li><strong>React + Next.js</strong> - Udemy</li>
                    <li><strong>Testes Automatizados</strong> - Testing Library</li>
                </ul>
                
                <h5>📈 Crescimento:</h5>
                <ul>
                    <li><strong>AWS Cloud Practitioner</strong> - Certificação oficial</li>
                    <li><strong>Node.js + API REST</strong> - Back-end</li>
                    <li><strong>Docker Essentials</strong> - DevOps básico</li>
                </ul>
                
                <h5>🎨 Bonus (Front-end):</h5>
                <ul>
                    <li><strong>Figma para Devs</strong> - Design skills</li>
                    <li><strong>Styled Components</strong> - CSS-in-JS</li>
                </ul>
                
                <p><strong>💡 Comece por:</strong> TypeScript - vai aumentar seu match em 15%!</p>
            </div>
        `;
    }

    getProfileAnalysis() {
        const profile = this.userProfile;
        const skillsCount = Object.keys(profile.skills).length;
        const avgSkillLevel = Object.values(profile.skills).reduce((a, b) => a + b, 0) / skillsCount;
        
        return `
            <div class="ia-response">
                <h4>📊 Análise Completa do Perfil</h4>
                
                <h5>🎯 Visão Geral:</h5>
                <ul>
                    <li><strong>Skills Técnicas:</strong> ${skillsCount} tecnologias</li>
                    <li><strong>Nível Médio:</strong> ${Math.round(avgSkillLevel)}% - Júnior Avançado</li>
                    <li><strong>Certificações:</strong> ${profile.certifications.length} validadas</li>
                    <li><strong>Projetos:</strong> ${profile.projetos.length} no portfolio</li>
                </ul>
                
                <h5>💪 Pontos Fortes:</h5>
                <ul>
                    <li><strong>JavaScript (85%)</strong> - Base sólida</li>
                    <li><strong>Soft Skills</strong> - Liderança em destaque</li>
                    <li><strong>Versatilidade</strong> - Front + Back-end</li>
                </ul>
                
                <h5>🚀 Oportunidades:</h5>
                <ul>
                    <li><strong>React:</strong> 60% → 85% (maior impacto)</li>
                    <li><strong>TypeScript:</strong> 45% → 80% (essencial)</li>
                    <li><strong>Testes:</strong> 0% → 70% (diferencial)</li>
                </ul>
                
                <p><strong>🎯 Veredicto:</strong> Perfil promissor! Você está pronto para posições júnior-pleno.</p>
            </div>
        `;
    }

    getKnowledgeAnalysis(tech) {
        const profile = this.userProfile;
        const skillLevel = profile.skills[tech] || 0;
        
        let analysis = '';
        if (skillLevel >= 80) {
            analysis = 'Nível avançado - você domina bem esta tecnologia!';
        } else if (skillLevel >= 60) {
            analysis = 'Nível intermediário - você tem uma boa base.';
        } else if (skillLevel >= 40) {
            analysis = 'Nível básico - ainda há muito para aprender.';
        } else {
            analysis = 'Conhecimento inicial - comece pelos fundamentos.';
        }

        return `
            <div class="ia-response">
                <h4>🧠 Seu Conhecimento: ${tech}</h4>
                
                <div class="knowledge-meter">
                    <p><strong>Nível atual: ${skillLevel}%</strong></p>
                    <div style="background: #f0f0f0; border-radius: 10px; height: 10px; margin: 10px 0;">
                        <div style="background: linear-gradient(90deg, #FF6B47, #FF8A6B); height: 100%; width: ${skillLevel}%; border-radius: 10px; transition: width 1s ease;"></div>
                    </div>
                    <p>${analysis}</p>
                </div>
                
                <h5>📈 Próximos Passos:</h5>
                ${this.getNextStepsForTech(tech, skillLevel)}
                
                <p><strong>💡 Dica:</strong> Pratique com projetos reais para fixar o conhecimento!</p>
            </div>
        `;
    }

    getNextStepsForTech(tech, level) {
        const steps = {
            'JavaScript': {
                low: '<ul><li>ES6+ features</li><li>DOM manipulation</li><li>Async/await</li></ul>',
                medium: '<ul><li>Advanced concepts (closures, prototypes)</li><li>Design patterns</li><li>Performance optimization</li></ul>',
                high: '<ul><li>Framework development</li><li>V8 engine internals</li><li>Advanced algorithms</li></ul>'
            },
            'React': {
                low: '<ul><li>JSX e componentes</li><li>Props e state</li><li>Event handling</li></ul>',
                medium: '<ul><li>Hooks avançados</li><li>Context API</li><li>Performance (React.memo)</li></ul>',
                high: '<ul><li>Custom hooks</li><li>Concurrent features</li><li>Server components</li></ul>'
            },
            'Python': {
                low: '<ul><li>Sintaxe básica</li><li>Estruturas de dados</li><li>Funções e classes</li></ul>',
                medium: '<ul><li>Django/Flask</li><li>APIs REST</li><li>Testing (pytest)</li></ul>',
                high: '<ul><li>Async programming</li><li>Performance tuning</li><li>Microservices</li></ul>'
            }
        };

        const techSteps = steps[tech] || steps['JavaScript'];
        
        if (level < 50) return techSteps.low;
        if (level < 80) return techSteps.medium;
        return techSteps.high;
    }

    getMatchImprovementTips() {
        return `
            <div class="ia-response">
                <h4>🎯 Como Melhorar Seu Match</h4>
                
                <h5>⚡ Ações Imediatas (1-2 semanas):</h5>
                <ul>
                    <li><strong>Atualize GitHub</strong> - READMEs + screenshots</li>
                    <li><strong>Organize portfolio</strong> - Mostre seus melhores projetos</li>
                    <li><strong>LinkedIn otimizado</strong> - Skills + recomendações</li>
                </ul>
                
                <h5>📈 Médio Prazo (1-3 meses):</h5>
                <ul>
                    <li><strong>TypeScript</strong> - +15% match geral</li>
                    <li><strong>Testes automatizados</strong> - +12% match</li>
                    <li><strong>Projeto complexo</strong> - Full-stack app</li>
                </ul>
                
                <h5>🚀 Longo Prazo (3-6 meses):</h5>
                <ul>
                    <li><strong>Certificação AWS</strong> - Cloud em alta</li>
                    <li><strong>Open Source</strong> - Contribuições no GitHub</li>
                    <li><strong>Blog técnico</strong> - Demonstre conhecimento</li>
                </ul>
                
                <p><strong>🎯 Meta:</strong> Chegar a 90%+ de match em 6 meses!</p>
            </div>
        `;
    }

    provideTechnicalExplanation(question) {
        if (question.includes('javascript')) {
            return `
                <div class="ia-response">
                    <h4>📚 JavaScript - Conceitos Importantes</h4>
                    
                    <h5>🔥 Conceitos Avançados:</h5>
                    <ul>
                        <li><strong>Closures:</strong> Funções que "lembram" do escopo onde foram criadas</li>
                        <li><strong>Hoisting:</strong> Comportamento de elevação de declarações</li>
                        <li><strong>Event Loop:</strong> Como JS processa código assíncrono</li>
                        <li><strong>Prototypes:</strong> Sistema de herança do JavaScript</li>
                    </ul>
                    
                    <h5>⚡ ES6+ Features:</h5>
                    <ul>
                        <li><strong>Arrow Functions:</strong> Sintaxe mais limpa</li>
                        <li><strong>Destructuring:</strong> Extrair valores facilmente</li>
                        <li><strong>Promises/Async-Await:</strong> Programação assíncrona moderna</li>
                        <li><strong>Modules:</strong> Import/export para organização</li>
                    </ul>
                    
                    <p><strong>💡 Quer saber mais?</strong> Pergunte sobre algum conceito específico!</p>
                </div>
            `;
        }

        return `
            <div class="ia-response">
                <h4>🎓 Explicação Técnica</h4>
                <p>Posso explicar conceitos sobre:</p>
                <ul>
                    <li><strong>JavaScript</strong> - Closures, async/await, prototypes</li>
                    <li><strong>React</strong> - Hooks, Context API, Virtual DOM</li>
                    <li><strong>Python</strong> - POO, decorators, generators</li>
                    <li><strong>Web Development</strong> - HTTP, APIs, databases</li>
                </ul>
                <p>Seja mais específico: "Explique closures em JavaScript"</p>
            </div>
        `;
    }

    getCareerProgression() {
        return `
            <div class="ia-response">
                <h4>🚀 Progressão de Carreira - 2 Anos</h4>
                
                <h5>📅 6 meses - Júnior Sênior:</h5>
                <ul>
                    <li><strong>Skills:</strong> TypeScript + React avançado</li>
                    <li><strong>Portfolio:</strong> 3 projetos full-stack</li>
                    <li><strong>Certificação:</strong> AWS Cloud Practitioner</li>
                    <li><strong>Salário:</strong> R$ 4.500 - R$ 6.500</li>
                </ul>
                
                <h5>📅 1 ano - Desenvolvedor Pleno:</h5>
                <ul>
                    <li><strong>Responsabilidades:</strong> Liderar features</li>
                    <li><strong>Skills:</strong> Arquitetura + mentoria</li>
                    <li><strong>Especialização:</strong> Front-end expert</li>
                    <li><strong>Salário:</strong> R$ 7.000 - R$ 11.000</li>
                </ul>
                
                <h5>📅 2 anos - Tech Lead:</h5>
                <ul>
                    <li><strong>Gestão:</strong> Time de 3-5 devs</li>
                    <li><strong>Arquitetura:</strong> Decisões técnicas</li>
                    <li><strong>Processos:</strong> Code review + padrões</li>
                    <li><strong>Salário:</strong> R$ 12.000 - R$ 20.000</li>
                </ul>
                
                <p><strong>🎯 Seu diferencial:</strong> Liderança natural + base técnica sólida!</p>
            </div>
        `;
    }

    extractTechnology(question) {
        const q = question.toLowerCase();
        const profile = this.userProfile;
        
        // Procurar tecnologias conhecidas no perfil
        for (let tech in profile.skills) {
            if (q.includes(tech.toLowerCase())) {
                return tech;
            }
        }
        
        // Fallback para tecnologias comuns
        if (q.includes('javascript') || q.includes('js')) return 'JavaScript';
        if (q.includes('python')) return 'Python';
        if (q.includes('react')) return 'React';
        if (q.includes('typescript') || q.includes('ts')) return 'TypeScript';
        
        return 'JavaScript'; // default
    }

    getSmartDefaultResponse(question) {
                    const responses = [
            `Interessante! Como sua assistente de carreira, posso te ajudar com análises de vagas, dicas de carreira, recomendações de cursos e muito mais. O que você gostaria de saber?`,
            
            `Estou aqui para te ajudar a crescer profissionalmente! Posso analisar vagas, explicar conceitos técnicos, ou dar dicas personalizadas. Como posso te auxiliar?`,
            
            `Ótima pergunta! Tenho acesso ao seu perfil e posso te dar insights sobre carreira, tecnologias e mercado. O que você quer explorar?`,
            
            `Como sua assistente de carreira, posso te ajudar com várias coisas! Quer dicas de carreira, análise de vagas ou recomendações de estudo?`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(message, type) {
        if (!this.elements.chatHistory) {
            console.error('Chat history element not found');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `compass-message ${type}`;
        messageDiv.innerHTML = message;
        
        this.elements.chatHistory.appendChild(messageDiv);
        this.elements.chatHistory.scrollTop = this.elements.chatHistory.scrollHeight;
        
        // Adicionar ao histórico
        this.chatHistory.push({ 
            message, 
            type, 
            timestamp: new Date().toISOString()
        });

        console.log(`💬 Mensagem ${type} adicionada:`, message.substring(0, 50) + '...');
    }

    showTypingIndicator() {
        if (this.isTyping || !this.elements.chatHistory) return;
        
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-avatar">
                <div class="avatar-icon">🤖</div>
            </div>
            <div class="typing-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span class="typing-text">Compass está pensando...</span>
            </div>
        `;
        
        this.elements.chatHistory.appendChild(typingDiv);
        this.elements.chatHistory.scrollTop = this.elements.chatHistory.scrollHeight;
        
        console.log('⌨️ Indicador de digitação ativado');
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
            console.log('⌨️ Indicador de digitação removido');
        }
        this.isTyping = false;
    }

    showWelcomeMessage() {
        // Só mostra se não há histórico ou o histórico está vazio
        if (this.chatHistory.length === 0) {
            setTimeout(() => {
                const welcomeMessage = `
                    <div class="ia-welcome">
                        <h4>👋 Olá, ${this.userProfile.nome}!</h4>
                        <p>Eu sou a <strong>Compass IA</strong>, sua assistente inteligente de carreira. Estou aqui para te ajudar a:</p>
                        <ul>
                            <li>🎯 Analisar compatibilidade com vagas</li>
                            <li>💼 Dar dicas personalizadas de carreira</li>
                            <li>📚 Recomendar cursos e certificações</li>
                            <li>🧠 Ser seu segundo cérebro de conhecimento</li>
                            <li>🎓 Ensinar conceitos técnicos 24/7</li>
                        </ul>
                        <p><strong>💡 Dica:</strong> Use as ações rápidas abaixo ou pergunte qualquer coisa!</p>
                    </div>
                `;
                this.addMessage(welcomeMessage, 'ia');
            }, 1000);
        }
    }

    handleVoiceInput() {
        if (this.isListening) {
            console.log('🎤 Já está ouvindo...');
            return;
        }

        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('❌ Seu navegador não suporta reconhecimento de voz. Tente Chrome ou Edge.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'pt-BR';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        this.isListening = true;
        
        // Atualizar visual do botão
        if (this.elements.voiceBtn) {
            const icon = this.elements.voiceBtn.querySelector('.material-icons-outlined');
            if (icon) {
                icon.textContent = 'mic';
                icon.style.color = '#ff6b47';
                this.elements.voiceBtn.style.animation = 'pulse 1s infinite';
            }
        }

        recognition.onstart = () => {
            console.log('🎤 Reconhecimento de voz iniciado');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log('🎤 Texto reconhecido:', transcript);
            
            if (this.elements.chatInput) {
                this.elements.chatInput.value = transcript;
                // Auto-enviar após um breve delay
                setTimeout(() => {
                    this.handleUserMessage();
                }, 500);
            }
        };

        recognition.onerror = (event) => {
            console.error('🎤 Erro no reconhecimento:', event.error);
            alert('❌ Erro no reconhecimento de voz. Tente novamente.');
        };

        recognition.onend = () => {
            console.log('🎤 Reconhecimento de voz finalizado');
            this.isListening = false;
            
            // Restaurar visual do botão
            if (this.elements.voiceBtn) {
                const icon = this.elements.voiceBtn.querySelector('.material-icons-outlined');
                if (icon) {
                    icon.textContent = 'mic';
                    icon.style.color = '';
                    this.elements.voiceBtn.style.animation = '';
                }
            }
        };

        recognition.start();
    }

    clearChat() {
        if (!confirm('🗑️ Tem certeza que deseja limpar toda a conversa?')) {
            return;
        }

        if (this.elements.chatHistory) {
            this.elements.chatHistory.innerHTML = '';
        }
        
        this.chatHistory = [];
        this.conversationContext = [];
        this.saveChatHistory();
        
        console.log('🗑️ Chat limpo');
        
        // Mostrar confirmação
        setTimeout(() => {
            this.addMessage('💫 Conversa limpa! Como posso te ajudar agora?', 'ia');
        }, 300);
    }

    showExportModal() {
        if (!this.elements.exportModal) {
            console.error('Export modal not found');
            return;
        }

        if (this.chatHistory.length === 0) {
            alert('📝 Não há conversa para exportar!');
            return;
        }

        this.elements.exportModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('📤 Modal de exportação aberto');
    }

    hideExportModal() {
        if (this.elements.exportModal) {
            this.elements.exportModal.style.display = 'none';
            document.body.style.overflow = '';
            console.log('📤 Modal de exportação fechado');
        }
    }

    exportChat(format) {
        if (this.chatHistory.length === 0) {
            alert('📝 Não há conversa para exportar!');
            return;
        }

        const date = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
        const time = new Date().toLocaleTimeString('pt-BR');
        
        console.log(`📤 Exportando chat em formato: ${format}`);

        switch (format) {
            case 'txt':
                this.exportAsText(date, time);
                break;
            case 'md':
                this.exportAsMarkdown(date, time);
                break;
            case 'pdf':
                this.exportAsPDF(date, time);
                break;
            default:
                console.error('Formato não suportado:', format);
        }

        this.hideExportModal();
    }

    exportAsText(date, time) {
        let content = `COMPASS IA - CONVERSA EXPORTADA\n`;
        content += `${'='.repeat(50)}\n`;
        content += `Data: ${date} às ${time}\n`;
        content += `Usuário: ${this.userProfile.nome}\n`;
        content += `Total de mensagens: ${this.chatHistory.length}\n`;
        content += `${'='.repeat(50)}\n\n`;

        this.chatHistory.forEach((msg, index) => {
            const role = msg.type === 'user' ? 'VOCÊ' : 'COMPASS IA';
            const timestamp = new Date(msg.timestamp).toLocaleTimeString('pt-BR');
            
            content += `[${timestamp}] ${role}:\n`;
            const cleanMessage = this.stripHTML(msg.message);
            content += `${cleanMessage}\n\n`;
            content += `${'-'.repeat(30)}\n\n`;
        });

        content += `Exportado em: ${new Date().toLocaleString('pt-BR')}\n`;
        content += `CareerPath - Compass IA\n`;

        this.downloadFile(content, `compass-ia-conversa-${date}.txt`, 'text/plain');
    }

    exportAsMarkdown(date, time) {
        let content = `# 🤖 Compass IA - Conversa Exportada\n\n`;
        content += `**📅 Data:** ${date} às ${time}  \n`;
        content += `**👤 Usuário:** ${this.userProfile.nome}  \n`;
        content += `**💬 Mensagens:** ${this.chatHistory.length}  \n`;
        content += `**🚀 Sistema:** Compass IA - CareerPath  \n\n`;
        content += `---\n\n`;

        this.chatHistory.forEach((msg, index) => {
            const role = msg.type === 'user' ? '👤 **Você**' : '🤖 **Compass IA**';
            const timestamp = new Date(msg.timestamp).toLocaleTimeString('pt-BR');
            
            content += `## ${role} - ${timestamp}\n\n`;
            content += `${msg.message}\n\n`;
            content += `---\n\n`;
        });

        content += `> *Exportado em ${new Date().toLocaleString('pt-BR')}*  \n`;
        content += `> *CareerPath - Compass IA*\n`;

        this.downloadFile(content, `compass-ia-conversa-${date}.md`, 'text/markdown');
    }

    exportAsPDF(date, time) {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('❌ Bloqueador de popup ativo. Permita popups para exportar PDF.');
            return;
        }
        
        let htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Compass IA - Conversa ${date}</title>
                <style>
                    body { 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                        margin: 20px; 
                        line-height: 1.6; 
                        color: #333;
                    }
                    .header { 
                        text-align: center; 
                        border-bottom: 3px solid #FF6B47; 
                        padding-bottom: 20px; 
                        margin-bottom: 30px; 
                    }
                    .header h1 {
                        color: #0D253F;
                        margin-bottom: 10px;
                    }
                    .message { 
                        margin: 20px 0; 
                        padding: 15px; 
                        border-radius: 8px; 
                        border-left: 4px solid;
                        page-break-inside: avoid;
                    }
                    .user { 
                        background: #f0f8ff; 
                        border-left-color: #2196f3; 
                    }
                    .ia { 
                        background: #fff8f0; 
                        border-left-color: #ff9800; 
                    }
                    .timestamp { 
                        font-size: 0.85em; 
                        color: #666; 
                        margin-bottom: 8px; 
                        font-weight: 500;
                    }
                    .role { 
                        font-weight: bold; 
                        margin-bottom: 10px; 
                        color: #0D253F;
                    }
                    .footer { 
                        text-align: center; 
                        margin-top: 40px; 
                        padding-top: 20px; 
                        border-top: 1px solid #ddd; 
                        color: #666; 
                        font-size: 0.9em;
                    }
                    @media print { 
                        body { margin: 15px; }
                        .header { page-break-after: avoid; }
                    }
                    h4, h5 { color: #0D253F; margin-top: 15px; }
                    ul, ol { margin: 10px 0; padding-left: 20px; }
                    li { margin: 5px 0; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🤖 Compass IA</h1>
                    <h2>Conversa Exportada</h2>
                    <p><strong>📅 Data:</strong> ${date} às ${time}</p>
                    <p><strong>👤 Usuário:</strong> ${this.userProfile.nome}</p>
                    <p><strong>💬 Total:</strong> ${this.chatHistory.length} mensagens</p>
                </div>
        `;

        this.chatHistory.forEach((msg, index) => {
            const role = msg.type === 'user' ? '👤 Você' : '🤖 Compass IA';
            const timestamp = new Date(msg.timestamp).toLocaleTimeString('pt-BR');
            const className = msg.type === 'user' ? 'user' : 'ia';
            
            htmlContent += `
                <div class="message ${className}">
                    <div class="timestamp">${timestamp}</div>
                    <div class="role">${role}</div>
                    <div>${msg.message}</div>
                </div>
            `;
        });

        htmlContent += `
                <div class="footer">
                    <p><strong>Exportado em:</strong> ${new Date().toLocaleString('pt-BR')}</p>
                    <p>CareerPath - Compass IA</p>
                    <p>Sua assistente inteligente de carreira</p>
                </div>
            </body>
            </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        printWindow.onload = () => {
            setTimeout(() => {
                printWindow.print();
            }, 250);
        };
    }

    stripHTML(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    downloadFile(content, filename, mimeType) {
        try {
            const blob = new Blob([content], { type: mimeType + ';charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);
            
            console.log(`📥 Arquivo baixado: ${filename}`);
        } catch (error) {
            console.error('Erro ao baixar arquivo:', error);
            alert('❌ Erro ao baixar arquivo. Tente novamente.');
        }
    }

    saveChatHistory() {
        try {
            const historyData = {
                chatHistory: this.chatHistory,
                conversationContext: this.conversationContext,
                savedAt: new Date().toISOString()
            };
            
            localStorage.setItem('compass-chat-data', JSON.stringify(historyData));
            console.log('💾 Histórico salvo:', this.chatHistory.length, 'mensagens');
        } catch (error) {
            console.warn('⚠️ Erro ao salvar histórico:', error);
        }
    }

    loadChatHistory() {
        try {
            const savedData = localStorage.getItem('compass-chat-data');
            if (!savedData) {
                console.log('📝 Nenhum histórico encontrado');
                return;
            }

            const data = JSON.parse(savedData);
            
            if (data.chatHistory && Array.isArray(data.chatHistory)) {
                this.chatHistory = data.chatHistory;
                
                // Restaurar mensagens na tela
                this.chatHistory.forEach(msg => {
                    this.addMessageToDOM(msg.message, msg.type);
                });
                
                console.log('📥 Histórico carregado:', this.chatHistory.length, 'mensagens');
            }
            
            if (data.conversationContext && Array.isArray(data.conversationContext)) {
                this.conversationContext = data.conversationContext;
            }
            
        } catch (error) {
            console.warn('⚠️ Erro ao carregar histórico:', error);
            this.chatHistory = [];
            this.conversationContext = [];
        }
    }

    addMessageToDOM(message, type) {
        if (!this.elements.chatHistory) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `compass-message ${type}`;
        messageDiv.innerHTML = message;
        
        this.elements.chatHistory.appendChild(messageDiv);
        this.elements.chatHistory.scrollTop = this.elements.chatHistory.scrollHeight;
    }

    // Métodos utilitários para integração com outros módulos
    updateUserProfile(newData) {
        this.userProfile = { ...this.userProfile, ...newData };
        console.log('👤 Perfil atualizado:', Object.keys(newData));
    }

    getConversationStats() {
        return {
            totalMessages: this.chatHistory.length,
            userMessages: this.chatHistory.filter(msg => msg.type === 'user').length,
            iaMessages: this.chatHistory.filter(msg => msg.type === 'ia').length,
            firstMessage: this.chatHistory.length > 0 ? this.chatHistory[0].timestamp : null,
            lastMessage: this.chatHistory.length > 0 ? this.chatHistory[this.chatHistory.length - 1].timestamp : null
        };
    }

    // Método para análise de sentimento simples
    analyzeSentiment(message) {
        const positiveWords = ['obrigado', 'ótimo', 'excelente', 'bom', 'legal', 'incrível', 'perfeito', 'obrigada'];
        const negativeWords = ['ruim', 'péssimo', 'terrível', 'difícil', 'problema', 'erro', 'complicado'];
        
        const words = message.toLowerCase().split(/\s+/);
        let score = 0;
        
        words.forEach(word => {
            if (positiveWords.some(pw => word.includes(pw))) score += 1;
            if (negativeWords.some(nw => word.includes(nw))) score -= 1;
        });
        
        if (score > 0) return 'positive';
        if (score < 0) return 'negative';
        return 'neutral';
    }

    // Método para sugestões contextuais
    getContextualSuggestions() {
        const recent = this.conversationContext.slice(-3);
        const suggestions = [];

        const hasJobTalk = recent.some(msg => 
            msg.message.toLowerCase().includes('vaga') || 
            msg.message.toLowerCase().includes('emprego')
        );

        const hasCareerTalk = recent.some(msg => 
            msg.message.toLowerCase().includes('carreira') || 
            msg.message.toLowerCase().includes('crescimento')
        );

        const hasSkillTalk = recent.some(msg => 
            msg.message.toLowerCase().includes('skill') || 
            msg.message.toLowerCase().includes('tecnologia')
        );

        if (hasJobTalk) {
            suggestions.push('Como melhorar meu match?', 'Outras vagas similares?');
        }
        
        if (hasCareerTalk) {
            suggestions.push('Próximos passos na carreira?', 'Certificações importantes?');
        }
        
        if (hasSkillTalk) {
            suggestions.push('Cursos recomendados?', 'Roadmap de estudos?');
        }

        return suggestions.length > 0 ? suggestions : [
            'Analise meu perfil',
            'Vagas compatíveis',
            'Dicas de carreira'
        ];
    }

    // Método para debuggar
    debug() {
        console.log('🔍 DEBUG - Compass IA');
        console.log('Elements:', this.elements);
        console.log('Chat History:', this.chatHistory.length, 'mensagens');
        console.log('User Profile:', this.userProfile);
        console.log('Is Typing:', this.isTyping);
        console.log('Is Listening:', this.isListening);
    }
}

// Auto-inicialização
(function() {
    console.log('🚀 Iniciando sistema Compass IA...');
    
    function initCompass() {
        if (typeof window.compassIA === 'undefined') {
            window.compassIA = new CompassIA();
            console.log('✅ Compass IA inicializado globalmente');
        }
    }

    // Aguardar DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCompass);
    } else {
        initCompass();
    }
})();

// Expor classe e instância globalmente
window.CompassIA = CompassIA;