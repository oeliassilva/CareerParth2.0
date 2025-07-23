// anotacoes.js - Sistema Segundo Cérebro Moderno MANTENDO FUNCIONALIDADE + COMPASS IA

import { initCiclo } from './ciclo.js';
import { initCalendario } from './calendario.js';
import { initRelatorio } from './relatorio.js';

// Sistema de plugins modular MODERNIZADO
class BrainSystem {
    constructor() {
        this.plugins = new Map();
        this.activePlugin = null;
        this.pluginContainer = null;
        this.notifications = [];
        
        this.init();
    }
        debugPlugins() {
        console.log('🔍 === DEBUG DOS PLUGINS ===');
        console.log('Total de plugins registrados:', this.plugins.size);
        
        this.plugins.forEach((plugin, key) => {
            console.log(`Plugin: ${key}`, {
                name: plugin.name,
                active: plugin.active,
                template: plugin.template,
                hasInit: !!plugin.init
            });
        });
        
        console.log('🔍 === FIM DEBUG ===');
    }

        async init() {
            console.log('🧠 Inicializando Sistema Segundo Cérebro Modernizado...');
            
            this.setupModernHeader();
            this.setupContainer();
            this.setupEventListeners();
            this.registerDefaultPlugins();
            
            // CHAMADA INICIAL PARA RENDERIZAR AS NOTAS
            this.renderSidebarNotes(); 
            
            this.loadDefaultPlugin();
            this.setupModernAnimations();
            
            setTimeout(() => { this.initCompassIA(); }, 1000);
            
            console.log('✅ Sistema Segundo Cérebro Modernizado inicializado!');
            // ADICIONE ESTA LINHA DE DEBUG:
            this.debugPlugins();
        }

        // anotacoes.js -> COLE ESTE BLOCO DENTRO DA CLASSE BrainSystem

    // ==========================================================
    // SEÇÃO DE UTILITÁRIOS (RECUPERADA DA VERSÃO ANTIGA)
    // ==========================================================

    loadData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Erro ao carregar dados da chave ${key}:`, error);
            return null;
        }
    }

    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Erro ao salvar dados da chave ${key}:`, error);
        }
    }

    formatTime(totalSeconds) {
        if (isNaN(totalSeconds) || totalSeconds < 0) return "00:00:00";
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    getLocalDateString(date = new Date()) {
        return date.toISOString().split('T')[0];
    }

    showConfirmModal(title, message, onConfirm) {
        // Usando o confirm nativo do navegador como na versão antiga
        if (window.confirm(`${title}\n${message}`)) {
            if (onConfirm && typeof onConfirm === 'function') {
                onConfirm();
            }
        }
    }

    navigateToHome() {
    // Limpa a hash da URL
    window.location.hash = '#anotacoes';
    
    // Mostra a welcome screen
    this.showWelcomeScreen();
    
    // Remove indicadores ativos
    this.updateActivePlugin(null);
    this.updateActiveNote();
    
    // Notificação
    this.showNotification('🏠 Página inicial carregada', 'info');
}
    // anotações.js -> Dentro da classe BrainSystem

    // ==========================================================
    // FUNÇÃO PARA RENDERIZAR AS NOTAS NA SIDEBAR DINAMICAMENTE
    // ==========================================================
    renderSidebarNotes() {
        console.log('🔄 Renderizando notas na sidebar...');
        const notesTree = document.querySelector('.notes-tree');
        if (!notesTree) return;

        // Obter todas as notas existentes
        const allNoteSlugs = Object.keys(this.getNoteContent('all')); // Precisamos ajustar getNoteContent
        const notesByFolder = {};

        // Agrupar notas por pasta
        allNoteSlugs.forEach(slug => {
            const path = this.getNotePath(slug);
            const folderName = path.split('/').pop(); // Pega o último nome do caminho como pasta
            if (!notesByFolder[folderName]) {
                notesByFolder[folderName] = [];
            }
            notesByFolder[folderName].push({
                slug: slug,
                title: this.getNoteTitle(slug)
            });
        });

        let html = '';
        for (const folderName in notesByFolder) {
            html += `
                <div class="folder-item">
                    <div class="folder-header collapsed" data-folder="${folderName.toLowerCase()}">
                        <span class="folder-icon material-icons-outlined">folder</span>
                        <span class="folder-name">${folderName}</span>
                        <span class="folder-toggle material-icons-outlined">expand_more</span>
                    </div>
                    <ul class="notes-in-folder collapsed">
            `;
            
            notesByFolder[folderName].forEach(note => {
                html += `
                    <li class="note-item">
                        <a href="#anotacoes/editor/${note.slug}">
                            <span class="note-icon material-icons-outlined">description</span>
                            <span class="note-name">${note.title}</span>
                        </a>
                    </li>
                `;
            });

            html += '</ul></div>';
        }

        // Adicionar botões de ação no final
        html += `
            <div class="new-note-section">
                <button class="new-note-btn" onclick="brainSystemInstance.createNewNote()">
                    <span class="material-icons-outlined">add</span>
                    <span>Nova Nota</span>
                </button>
                <button class="ai-note-btn" onclick="brainSystemInstance.createAINote()">
                    <span class="material-icons-outlined">auto_awesome</span>
                    <span>Nota com IA</span>
                </button>
            </div>
        `;

        notesTree.innerHTML = html;
        this.updateActiveNote(); // Garante que a nota ativa seja destacada
    }

    // anotacoes.js -> Adicione esta NOVA função dentro da classe BrainSystem

// anotações.js -> SUBSTITUA a função handleMarkdownFormatting inteira por esta

    handleMarkdownFormatting(event) {
        // Só acionar a formatação ao pressionar a tecla ESPAÇO
        if (event.key !== ' ') return;

        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const node = range.startContainer;

        if (node.nodeType !== Node.TEXT_NODE) return;

        const textContent = node.textContent;
        // Pega o texto do início da linha até o cursor
        const currentLine = textContent.substring(0, range.startOffset);
        
        let replacementHtml = null;
        let textToReplace = null;
        
        // Mapeamento de sintaxe para HTML
        const formatMap = {
            '#': { text: '# ', html: '<h1></h1>' },
            '##': { text: '## ', html: '<h2></h2>' },
            '###': { text: '### ', html: '<h3></h3>' },
            '####': { text: '#### ', html: '<h4></h4>' },
            '#####': { text: '##### ', html: '<h5></h5>' },
            '######': { text: '###### ', html: '<h6></h6>' },
            '*': { text: '* ', html: '<li></li>' },
            '-': { text: '- ', html: '<li></li>' }
        };

        const trimmedLine = currentLine.trim();
        if (formatMap[trimmedLine]) {
            textToReplace = formatMap[trimmedLine].text;
            replacementHtml = formatMap[trimmedLine].html;
        }

        if (replacementHtml) {
            event.preventDefault(); // Impede que o espaço seja inserido

            // Seleciona e apaga a sintaxe Markdown (ex: "### ")
            range.setStart(node, currentLine.indexOf(trimmedLine));
            range.setEnd(node, range.startOffset);
            range.deleteContents();
            
            // Insere o novo elemento HTML formatado (ex: <h3>)
            const newElement = document.createRange().createContextualFragment(replacementHtml);
            const childElement = newElement.firstChild;
            range.insertNode(childElement);
            
            // Move o cursor para dentro do novo elemento para o usuário continuar digitando
            range.selectNodeContents(childElement);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

// anotações.js -> dentro da classe BrainSystem

    // NOVO: Abre o modal para pedir o tópico da nota de IA
    openAINoteModal() {
        console.log('✨ Abrindo modal de nota com IA...');
        const modal = document.getElementById('ai-note-modal');
        if (modal) {
            this.showModal(modal); // Reutilizando sua função de modal existente
            // Focar no input após animação
            setTimeout(() => {
                const topicInput = document.getElementById('ai-note-topic');
                if (topicInput) topicInput.focus();
            }, 300);
        }
    }

    // NOVO: Processa a criação da nota após o clique no modal
    processAndCreateAINote() {
        const topicInput = document.getElementById('ai-note-topic');
        if (!topicInput || !topicInput.value.trim()) {
            this.showNotification('⚠️ Por favor, digite um tema para a nota', 'warning');
            return;
        }
        
        const topic = topicInput.value.trim();
        console.log(`🤖 Criando nota sobre: ${topic}`);

        this.closeModal();
        this.showNotification('🤖 Criando nota com IA...', 'info');

        // Simular criação
        setTimeout(() => {
            const noteSlug = this.generateNoteSlug(topic);
            window.location.hash = `#anotacoes/editor/${noteSlug}`;
            this.handleRouting(); // Usar seu roteador para carregar o plugin
            this.renderSidebarNotes();
            this.showNotification('📝 Nota criada com sucesso!', 'success');
        }, 1500);
    }

    // NOVO: Gera um nome amigável para a URL
    generateNoteSlug(topic) {
        return topic
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .substring(0, 50);
    }

    setupModernHeader() {
        const header = document.querySelector('.page-header');
        if (header) {
            // Configurar header moderno igual ao das vagas
            header.style.setProperty('background', 'linear-gradient(135deg, #0D253F 0%, #1A3A5C 100%)', 'important');
            header.style.setProperty('color', '#ffffff', 'important');
            header.style.setProperty('position', 'relative', 'important');
            header.style.setProperty('z-index', '1000', 'important');
            header.style.setProperty('border-radius', '16px', 'important');
            header.style.setProperty('margin-bottom', '32px', 'important');
            header.style.setProperty('box-shadow', '0 4px 20px rgba(0, 0, 0, 0.15)', 'important');
            
            // Efeito de scroll modernizado
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    header.style.setProperty('background', '#0A1B2F', 'important');
                    header.style.setProperty('box-shadow', '0 4px 20px rgba(13, 37, 63, 0.4)', 'important');
                } else {
                    header.style.setProperty('background', 'linear-gradient(135deg, #0D253F 0%, #1A3A5C 100%)', 'important');
                    header.style.setProperty('box-shadow', '0 2px 12px rgba(13, 37, 63, 0.3)', 'important');
                }
            });
            
            console.log('✅ Header modernizado configurado!');
        }
    }

    setupModernAnimations() {
        // Animar entrada dos cards da sidebar
        const pluginItems = document.querySelectorAll('.plugin-item');
        pluginItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });

        // Animar seções da sidebar
        const sections = document.querySelectorAll('.plugin-section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 150);
        });

        // Animar welcome screen
        const welcomeContent = document.querySelector('.welcome-content');
        if (welcomeContent) {
            welcomeContent.style.opacity = '0';
            welcomeContent.style.transform = 'translateY(30px)';
            welcomeContent.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                welcomeContent.style.opacity = '1';
                welcomeContent.style.transform = 'translateY(0)';
            }, 300);
        }

        console.log('✨ Animações modernas ativadas!');
    }

    setupContainer() {
        this.pluginContainer = document.querySelector('.brain-content-area');
        this.welcomeScreen = document.getElementById('welcome-screen');
    }

    setupEventListeners() {
        // Plugin Manager
        const pluginManagerBtn = document.getElementById('plugin-manager-btn');
        if (pluginManagerBtn) {
            pluginManagerBtn.addEventListener('click', () => this.openPluginManager());
        }

        // NOVO: Event listener para o botão Home
        const homeBtn = document.getElementById('home-btn');
        if (homeBtn) {
            homeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🏠 Navegando para Home (Welcome Screen)');
                
                // Efeito visual no botão
                homeBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    homeBtn.style.transform = 'scale(1)';
                }, 150);
                
                // Navegar para a tela inicial
                this.navigateToHome();
            });
        }


        // Plugin Navigation com efeitos modernos
        document.addEventListener('click', (e) => {
            const pluginLink = e.target.closest('.plugin-item a, .note-item a');
            if (pluginLink) {
                e.preventDefault();
                
                // Efeito visual moderno
                const item = pluginLink.closest('.plugin-item, .note-item');
                if (item) {
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.transform = 'scale(1)';
                    }, 150);
                }
                
                const href = pluginLink.getAttribute('href');
                this.navigateToPlugin(href);
            }
        });

        // Folder Toggle com animação moderna
        document.addEventListener('click', (e) => {
            const folderHeader = e.target.closest('.folder-header');
            if (folderHeader) {
                this.toggleFolderModern(folderHeader);
            }
        });

        // Modal Close
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-close')) {
                this.closeModal();
            }
            if (e.target.matches('.modal') || e.target.matches('.modal-overlay')) {
                this.closeModal();
            }
        });

        // AI Chat
        const aiInput = document.getElementById('ai-input');
        const sendBtn = document.getElementById('send-ai-message');
        
        if (aiInput && sendBtn) {
            sendBtn.addEventListener('click', () => this.sendAIMessage());
            aiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendAIMessage();
            });
        }

        // Close AI Chat
        const closeAIChat = document.querySelector('.close-ai-chat');
        if (closeAIChat) {
            closeAIChat.addEventListener('click', () => this.closeAIChat());
        }

        // Quick Actions
        this.setupQuickActions();

        // Hash change
        window.addEventListener('hashchange', () => {
            if (window.location.hash.startsWith('#anotacoes')) {
                this.handleRouting();
            }
        });
    }

    // NOVA FUNÇÃO: Inicializar Compass IA
    initCompassIA() {
        console.log('🤖 Inicializando Compass IA...');
        
        // Event listeners do Compass IA
        this.setupCompassEventListeners();
        
        // Popular insights se a seção existir
        setTimeout(() => {
            this.populateInitialInsights();
        }, 500);
    }

    // NOVA FUNÇÃO: Event listeners do Compass IA
    setupCompassEventListeners() {
        document.addEventListener('click', (e) => {
            // Botão de análise do cérebro
            if (e.target.closest('#compass-brain-analyze')) {
                this.startBrainAnalysis();
            }
            
            if (e.target.closest('#create-ai-note-btn')) {
                this.processAndCreateAINote();
            }

            // Compass IA - Fechar Análise
            if (e.target.closest('#close-compass-analysis')) {
                this.closeCompassAnalysis();
            }
            
            // Botão de chat do cérebro
            if (e.target.closest('#compass-brain-chat')) {
                this.openAIChat();
            }
            
            // Tabs de análise
            if (e.target.closest('.analysis-tab')) {
                const tab = e.target.closest('.analysis-tab');
                this.switchAnalysisTab(tab.dataset.tab);
            }
            
            // ATUALIZADO: AI Note Modal - Chips de sugestão (novo seletor)
            if (e.target.closest('.ai-chip')) {
                const chip = e.target.closest('.ai-chip');
                const topic = chip.dataset.topic;
                const input = document.getElementById('ai-note-topic');
                if (input) {
                    input.value = topic;
                    // Adicionar efeito visual
                    chip.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        chip.style.transform = '';
                    }, 150);
                }
            }
            
            // Fechar Modais
            if (e.target.matches('.modal-close, .ai-modal-close') || 
                (e.target.matches('.modal, .modal-overlay') && !e.target.closest('.modal-content, .ai-modal-container'))) {
                this.closeModal();
            }

            // Sugestões do chat
            if (e.target.closest('.suggestion-btn')) {
                const suggestion = e.target.textContent.trim();
                this.sendQuickMessage(suggestion);
            }
        });
    }

        setupGlobalFunctions() {
        window.createNewNote = () => this.createNewNote();
        window.createAINote = () => this.openAINoteModal();
        window.analyzeKnowledge = () => this.startBrainAnalysis();
        window.openTaskManager = () => this.navigateToPlugin('#anotacoes/tarefas');
        window.startStudySession = () => this.navigateToPlugin('#anotacoes/tracker-ciclo');
        window.askCompassIA = () => this.openAIChat();
        window.closeAINoteModal = () => this.closeModal();
        window.brainSystem = this;
    }

    setupInitialState() {
        // Pastas começam recolhidas
        document.querySelectorAll('.folder-header').forEach(header => {
            header.classList.add('collapsed');
            const notesList = header.parentElement.querySelector('.notes-in-folder');
            if (notesList) notesList.classList.add('collapsed');
            const toggle = header.querySelector('.folder-toggle');
            if (toggle) toggle.style.transform = 'rotate(-90deg)';
        });

        // Sidebar começa expandida
        const sidebar = document.getElementById('plugins-sidebar');
        if (sidebar) sidebar.classList.remove('collapsed');
    }

    loadDefaultScreen() {
        const hash = window.location.hash;
        if (hash && hash.includes('/editor')) {
            this.loadMarkdownEditor();
        } else {
            this.showWelcomeScreen();
        }
    }

    // === SIDEBAR ===
    toggleSidebar() {
        const sidebar = document.getElementById('plugins-sidebar');
        const toggleBtn = document.getElementById('sidebar-toggle-btn');
        const floatingBtn = document.getElementById('sidebar-toggle-floating');
        
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
            const isCollapsed = sidebar.classList.contains('collapsed');
            
            // Mostrar/ocultar botão flutuante
            if (floatingBtn) {
                floatingBtn.style.display = isCollapsed ? 'flex' : 'none';
            }
            
            // Mudar ícone do botão principal
            if (toggleBtn) {
                const icon = toggleBtn.querySelector('.material-icons-outlined');
                if (icon) {
                    icon.textContent = isCollapsed ? 'chevron_right' : 'chevron_left';
                }
            }
            
            localStorage.setItem('sidebar_collapsed', isCollapsed);
            this.showNotification(isCollapsed ? '📱 Menu oculto' : '📋 Menu visível', 'info');
        }
    }

    toggleFolder(folderHeader) {
        const notesList = folderHeader.parentElement.querySelector('.notes-in-folder');
        const toggleIcon = folderHeader.querySelector('.folder-toggle');
        
        folderHeader.classList.toggle('collapsed');
        if (notesList) notesList.classList.toggle('collapsed');
        
        if (toggleIcon) {
            const isCollapsed = folderHeader.classList.contains('collapsed');
            toggleIcon.style.transform = isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
        }
    }

    // NOVA FUNÇÃO: Popular insights iniciais
    populateInitialInsights() {
        const compassContent = document.getElementById('compass-brain-content');
        if (compassContent && compassContent.style.display !== 'none') {
            this.populateBrainInsights();
        }
    }

    // NOVA FUNÇÃO: Análise do segundo cérebro
    startBrainAnalysis() {
        console.log('🧠 Iniciando análise do segundo cérebro...');
        
        // Mostrar insights na seção principal
        const compassContent = document.getElementById('compass-brain-content');
        if (compassContent) {
            compassContent.style.display = 'block';
            setTimeout(() => {
                this.populateBrainInsights();
            }, 500);
        }
        
        // Mostrar modal detalhado
        const modal = document.getElementById('compass-brain-modal');
        if (modal) {
            this.showModal(modal);
            this.simulateBrainAnalysis();
        }
        
        this.showNotification('🧠 Análise do segundo cérebro iniciada!', 'success');
    }

        closeCompassAnalysis() {
        console.log('📊 Fechando análise...');
        
        const compassContent = document.getElementById('compass-brain-content');
        if (compassContent) {
            compassContent.style.transition = 'all 0.3s ease';
            compassContent.style.opacity = '0';
            compassContent.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                compassContent.style.display = 'none';
                compassContent.style.opacity = '1';
                compassContent.style.transform = 'translateY(0)';
            }, 300);
        }
        
        this.showNotification('📊 Análise fechada', 'info');
    }

    // NOVA FUNÇÃO: Simular análise
    simulateBrainAnalysis() {
        const loading = document.getElementById('compass-brain-loading');
        const result = document.getElementById('compass-brain-result');
        
        if (loading) loading.style.display = 'block';
        if (result) result.style.display = 'none';
        
        setTimeout(() => {
            this.generateBrainResults();
            if (loading) loading.style.display = 'none';
            if (result) result.style.display = 'block';
        }, 3000);
    }

    // NOVA FUNÇÃO: Gerar resultados
    generateBrainResults() {
        // Overview
        const knowledgeStatus = document.getElementById('compass-knowledge-status');
        if (knowledgeStatus) {
            knowledgeStatus.innerHTML = `
                <div class="analysis-item">
                    <strong>📊 Score Geral:</strong> 82/100 - Perfil intermediário avançado
                </div>
                <div class="analysis-item">
                    <strong>🎯 Área Principal:</strong> Cloud Computing (92% de domínio)
                </div>
            `;
        }

        const focusAreas = document.getElementById('compass-focus-areas');
        if (focusAreas) {
            focusAreas.innerHTML = `
                <div class="analysis-item">
                    <strong>🔥 Urgente:</strong> Machine Learning fundamentals
                </div>
                <div class="analysis-item">
                    <strong>⚡ Impacto Alto:</strong> DevOps e CI/CD
                </div>
            `;
        }
    }

// CÓDIGO EDITADO PARA O PERFIL FRONT-END

populateBrainInsights() {
    // 1. Mapa de Conhecimento (-- EDITADO --)
    // Adaptado para refletir as habilidades de front-end do usuário.
    const knowledgeMap = document.getElementById('knowledge-map-analysis');
    if (knowledgeMap) {
        knowledgeMap.innerHTML = `
            <div class="analysis-item">
                <strong><span class="material-icons-outlined" style="font-size: 1rem; vertical-align: middle;">code</span> Front-End (HTML/CSS/JS):</strong> 83% de domínio (base sólida)
            </div>
            <div class="analysis-item">
                <strong><span class="material-icons-outlined" style="font-size: 1rem; vertical-align: middle;">build_circle</span> Ferramentas (Git/GitHub):</strong> 76% de domínio (ótimo controle)
            </div>
            <div class="analysis-item">
                <strong><span class="material-icons-outlined" style="font-size: 1rem; vertical-align: middle;">layers</span> React:</strong> 68% de domínio (principal área para foco)
            </div>
            <div class="analysis-item">
                <strong><span class="material-icons-outlined" style="font-size: 1rem; vertical-align: middle;">dns</span> Back-End (Node.js):</strong> 62% de domínio (conhecimento complementar)
            </div>
        `;
    }

    // 2. Padrões de Aprendizado (Mantido)
    // Essas informações são pessoais e continuam válidas.
    const learningPatterns = document.getElementById('learning-patterns-analysis');
    if (learningPatterns) {
        learningPatterns.innerHTML = `
            <div class="analysis-item">
                <strong>Horário ótimo:</strong> 14h-18h (82% de produtividade)
            </div>
            <div class="analysis-item">
                <strong>Duração ideal:</strong> 45min por sessão
            </div>
            <div class="analysis-item">
                <strong>Padrão semanal:</strong> Terças e quintas são seus dias mais produtivos
            </div>
            <div class="analysis-item">
                <strong>Técnica preferida:</strong> Pomodoro + anotações markdown
            </div>
        `;
    }

    // 3. Otimização de Estudos (Mantido)
    // Dicas de estudo genéricas que ainda se aplicam.
    const studyOptimization = document.getElementById('study-optimization-analysis');
    if (studyOptimization) {
        studyOptimization.innerHTML = `
            <div class="analysis-item">
                <strong><span class="material-icons-outlined" style="font-size: 1rem; vertical-align: middle;">timer</span> Técnica Pomodoro:</strong> Use intervalos de 25min com pausas de 5min
            </div>
            <div class="analysis-item">
                <strong><span class="material-icons-outlined" style="font-size: 1rem; vertical-align: middle;">update</span> Revisão Espaçada:</strong> Revise em 1 dia, 1 semana, 1 mês
            </div>
            <div class="analysis-item">
                <strong><span class="material-icons-outlined" style="font-size: 1rem; vertical-align: middle;">model_training</span> Prática Ativa:</strong> 70% teoria + 30% hands-on
            </div>
            <div class="analysis-item">
                <strong><span class="material-icons-outlined" style="font-size: 1rem; vertical-align: middle;">lightbulb</span> Ambiente Ideal:</strong> Local silencioso, sem distrações
            </div>
        `;
    }

    // 4. Próximos Tópicos (-- EDITADO --)
    // Recomendações totalmente novas e focadas na carreira de front-end.
    const nextTopics = document.getElementById('next-topics-analysis');
    if (nextTopics) {
        nextTopics.innerHTML = `
            <div class="analysis-item">
                <strong>🔥 URGENTE:</strong> Dominar Ecossistema React (Estado com Redux/Zustand, Testes com Jest)
            </div>
            <div class="analysis-item">
                <strong>⚡ ALTA PRIORIDADE:</strong> Aprofundar em TypeScript e Acessibilidade (a11y)
            </div>
            <div class="analysis-item">
                <strong>🎯 IMPORTANTE:</strong> Explorar Storybook para criação de catálogos de componentes de UI
            </div>
            <div class="analysis-item">
                <strong>🚀 EVOLUÇÃO:</strong> Implementar um Pipeline de CI/CD para Front-end com GitHub Actions
            </div>
            <div class="analysis-item">
                <strong>💎 DIFERENCIAL:</strong> Aprender GraphQL com Apollo Client para consumo de APIs
            </div>
        `;
    }
    
    console.log('✅ Análises do Compass IA populadas com recomendações para Front-End!');
}

    // NOVA FUNÇÃO: Alternar tabs
    switchAnalysisTab(tabName) {
        document.querySelectorAll('.analysis-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        const activePanel = document.getElementById(`${tabName}-panel`);
        
        if (activeTab) activeTab.classList.add('active');
        if (activePanel) activePanel.classList.add('active');
    }

    // NOVA FUNÇÃO: Criar nota com IA
// anotações.js -> dentro da classe BrainSystem

    // ALTERADO: Em vez de criar a nota direto, esta função agora abre o modal.
    createAINote() {
        // A lógica de criação foi movida para processAndCreateAINote()
        this.openAINoteModal();
    }

    // NOVA FUNÇÃO: Enviar mensagem rápida
    sendQuickMessage(message) {
        const input = document.getElementById('ai-input');
        if (input) {
            input.value = message;
            this.sendAIMessage();
        }
    }

    // NOVA FUNÇÃO: Mostrar modal
// SUBSTITUA a função showModal() existente por esta versão:

    showModal(modal) {
        if (modal) {
            // Mostrar o modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Aplicar animação
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Focar no input após animação
            setTimeout(() => {
                const topicInput = document.getElementById('ai-note-topic');
                if (topicInput) {
                    topicInput.focus();
                }
            }, 300);
        }
    }

    toggleFolderModern(folderHeader) {
        const folder = folderHeader.parentElement;
        const notesList = folder.querySelector('.notes-in-folder');
        const toggleIcon = folderHeader.querySelector('.folder-toggle');
        
        // Animação do ícone
        if (toggleIcon) {
            toggleIcon.style.transform = folderHeader.classList.contains('collapsed') 
                ? 'rotate(0deg)' 
                : 'rotate(-90deg)';
        }
        
        folderHeader.classList.toggle('collapsed');
        notesList.classList.toggle('collapsed');
        
        // Efeito visual no folder
        folderHeader.style.background = folderHeader.classList.contains('collapsed') 
            ? 'var(--bg-light)' 
            : 'transparent';
    }

    setupQuickActions() {
        console.log('🔧 Configurando ações rápidas...');
        
        // Definir funções globais para os botões de ação rápida
        window.createNewNote = () => {
            console.log('📝 Ação: Nova Nota');
            this.createNewNote();
        };
        
        window.createAINote = () => {
            console.log('🤖 Ação: Nota com IA');
            this.createAINote();
        };
        
        window.analyzeKnowledge = () => {
            console.log('🧠 Ação: Analisar Conhecimento');
            this.startBrainAnalysis();
        };
        
        window.openTaskManager = () => {
            console.log('📋 Ação: Abrir Gerenciador de Tarefas');
            this.openTaskManager();
        };
        
        window.startStudySession = () => {
            console.log('🎯 Ação: Iniciar Sessão de Estudos');
            this.startStudySession();
        };
        
        window.askCompassIA = () => {
            console.log('💬 Ação: Perguntar à IA');
            this.askCompassIA();
        };
        
        window.showMarkdownHelp = () => this.showMarkdownHelp();
        window.exportMarkdown = () => this.exportMarkdown();
        window.sendQuickMessage = (message) => this.sendQuickMessage(message);
        
        console.log('✅ Ações rápidas configuradas!');
    }

// anotacoes.js -> SUBSTITUA A FUNÇÃO INTEIRA

// anotacoes.js -> SUBSTITUA A FUNÇÃO INTEIRA

    registerDefaultPlugins() {
        console.log('Registrando plugins com caminhos finais...');
        
        // Editor não precisa de template
        this.registerPlugin('markdown-editor', {
            name: 'Editor Markdown',
            icon: 'edit_note',
            template: null,
            init: () => this.initMarkdownEditor(),
            active: true
        });

        // CORREÇÃO FINAL: Caminhos relativos simples, a partir do anotacoes.html
        const pluginConfigs = {
            'task-manager': { name: 'Gerenciador de Tarefas', icon: 'task_alt', template: 'templates/tarefas.html', init: null },
            'study-cycle': { name: 'Ciclo de Estudos', icon: 'track_changes', template: 'templates/ciclo.html', init: initCiclo, libs: ['https://cdn.jsdelivr.net/npm/chart.js'] },
            'reports': { name: 'Relatórios', icon: 'analytics', template: 'templates/relatorio.html', init: initRelatorio, libs: ['https://cdn.jsdelivr.net/npm/chart.js', 'https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js'] },
            'calendar': { name: 'Calendário', icon: 'calendar_today', template: 'templates/calendario.html', init: initCalendario },
            'pomodoro-timer': { name: 'Timer Pomodoro', icon: 'timer', template: 'templates/pomodoro.html', init: null, active: false },
            'ai-assistant': { name: 'Assistente IA', icon: 'smart_toy', template: 'templates/compass-ia.html', init: null, active: false },
            'flashcards': { name: 'Flashcards IA', icon: 'quiz', template: 'templates/flashcards.html', init: null, active: false }
        };

        for (const [id, config] of Object.entries(pluginConfigs)) {
            this.registerPlugin(id, {
                ...config,
                active: config.active !== false // Define como ativo por padrão, a menos que seja explicitamente falso
            });
        }
    }

    registerPlugin(id, config) {
        this.plugins.set(id, {
            id,
            ...config,
            loaded: false
        });
    }

    async navigateToPlugin(href) {
        console.log('🚀 NavigateToPlugin chamado com:', href);
        
        const pathParts = href.substring(1).split('/');
        const pluginKey = this.getPluginKeyFromPath(pathParts);
        
        console.log('🔑 Plugin key encontrada:', pluginKey);
        console.log('📋 Path parts:', pathParts);
        
        if (!pluginKey) {
            console.log('❌ Nenhum plugin encontrado, mostrando Welcome Screen');
            this.showWelcomeScreen();
            return;
        }

        const plugin = this.plugins.get(pluginKey);
        if (!plugin) {
            console.error('❌ Plugin não encontrado no registro:', pluginKey);
            this.showNotification('Plugin não encontrado', 'error');
            return;
        }

        if (!plugin.active) {
            console.warn('⚠️ Plugin inativo:', plugin.name);
            this.showNotification('Este plugin ainda não está disponível', 'warning');
            return;
        }

        console.log('✅ Carregando plugin:', plugin.name);
        await this.loadPlugin(plugin);
        this.updateActivePlugin(pluginKey);
    }

 // anotações.js -> dentro da função getPluginKeyFromPath

    getPluginKeyFromPath(pathParts) {
        console.log('🔍 Analisando path parts:', pathParts);
        
        const subpage = pathParts[1];
        console.log('📄 Subpage detectada:', subpage);
        
        // Se não tem subpage ou é vazio, volta para home
        if (!subpage || subpage === '') {
            console.log('🏠 Sem subpage, retornando null para Welcome Screen');
            return null;
        }
        
        if (subpage === 'editor') {
            console.log('📝 Detectado editor, retornando markdown-editor');
            return 'markdown-editor';
        }
        
        const routeMap = {
            'tarefas': 'task-manager',
            'tracker-ciclo': 'study-cycle',
            'tracker-relatorio': 'reports',
            'tracker-calendario': 'calendar',
            'pomodoro': 'pomodoro-timer',
            'compass-ia': 'ai-assistant',
            'flashcards': 'flashcards'
        };

        const pluginKey = routeMap[subpage] || null;
        console.log(`🎯 Mapeamento de '${subpage}' para:`, pluginKey);
        
        return pluginKey;
    }

    // anotacoes.js -> dentro da classe BrainSystem

    async loadPlugin(plugin) {
        // Verifica se o plugin a ser carregado é válido
        if (!plugin || !plugin.id) {
            console.error("Tentativa de carregar um plugin inválido.");
            this.showWelcomeScreen(); // Volta para a tela inicial em caso de erro
            return;
        }

        try {
            // 1. Mostra uma tela de "carregando" para o usuário
            this.showPluginLoadingModern();

            // 2. Carrega o HTML do plugin
            // Se for o editor, ele usa o HTML gerado pela função getMarkdownEditorHTML
            if (plugin.id === 'markdown-editor') {
                this.pluginContainer.innerHTML = this.getMarkdownEditorHTML();
            } 
            // Para outros plugins, ele busca o template de um arquivo externo
            else if (plugin.template) {
                const response = await fetch(plugin.template);
                if (!response.ok) {
                    throw new Error(`Template não encontrado: ${plugin.template}`);
                }
                const content = await response.text();
                this.pluginContainer.innerHTML = content;
            }

            // 3. Carrega bibliotecas externas (como Chart.js), se o plugin precisar
            if (plugin.libs && plugin.libs.length > 0) {
                await this.loadLibraries(plugin.libs);
            }

            // 4. **CORREÇÃO PRINCIPAL**: Carregar script comum se necessário
            if (plugin.id !== 'markdown-editor') {
                await this.loadScript('js/pages/comum.js');
            }

            // 5. Inicializa o script específico do plugin
            // É aqui que a função initMarkdownEditor() é chamada para o editor
            if (plugin.init && typeof plugin.init === 'function') {
                plugin.init();
            }

            // 6. Atualiza o estado interno e a interface do usuário
            plugin.loaded = true;
            this.activePlugin = plugin.id;
            
            // 7. Destaca a nota ou plugin ativo na sidebar (resolvendo um dos seus problemas)
            this.updateActiveNote();

        } catch (error) {
            console.error('Erro ao carregar plugin:', error);
            this.showNotification(`Erro ao carregar ${plugin.name}`, 'error');
            this.showWelcomeScreen();
        }
    }

    async loadLibraries(libs) {
        const promises = libs.map(lib => this.loadScript(lib));
        await Promise.all(promises);
    }

    loadScript(src) {
        if (document.querySelector(`script[src="${src}"]`)) {
            return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = () => reject(new Error(`Falha ao carregar: ${src}`));
            document.body.appendChild(script);
        });
    }

    showPluginLoadingModern() {
        this.pluginContainer.innerHTML = `
            <div class="plugin-loading">
                <div class="loading-spinner"></div>
                <span style="font-size: 1.1rem; font-weight: 600; color: var(--text-dark);">Carregando plugin...</span>
                <small style="color: var(--text-light);">Aguarde um momento</small>
            </div>
        `;
    }

    showWelcomeScreen() {
        if (this.welcomeScreen) {
            this.pluginContainer.innerHTML = this.welcomeScreen.outerHTML;
            this.setupQuickActions(); // Re-setup quick actions
            
            // Reaplica animações
            setTimeout(() => this.setupModernAnimations(), 100);
        }
        this.updateActivePlugin(null);
    }

    updateActivePlugin(pluginId) {
        // Atualizar indicador visual na sidebar com animação
        document.querySelectorAll('.plugin-item').forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link) {
                link.style.transform = 'scale(1)';
            }
        });

        // Também remover active das notas
        document.querySelectorAll('.note-item').forEach(item => {
            item.classList.remove('active');
        });

        if (pluginId) {
            const activeItem = document.querySelector(`[data-plugin="${pluginId}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
                
                // Efeito visual moderno
                const link = activeItem.querySelector('a');
                if (link) {
                    link.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        link.style.transform = 'scale(1)';
                    }, 200);
                }
            }
        }
    }
// anotações.js -> SUBSTITUA a função loadDefaultPlugin por esta

    loadDefaultPlugin() {
        const hash = window.location.hash;
        // Se existe uma hash válida, segue a rota
        if (hash && hash.startsWith('#anotacoes')) {
            this.handleRouting();
        } else {
            // EM VEZ DE CARREGAR O EXPLORADOR, MOSTRA A WELCOME SCREEN
            this.showWelcomeScreen();
        }
    }
    handleRouting() {
        const hash = window.location.hash;
        console.log('🔍 Roteamento chamado para:', hash);
        
        // Se a hash é apenas '#anotacoes' ou vazia, mostra a welcome screen
        if (!hash || hash === '#anotacoes' || hash === '#') {
            console.log('📍 Navegando para Welcome Screen');
            this.showWelcomeScreen();
            return;
        }
        
        // CORREÇÃO: Verificar se é uma rota válida antes de navegar
        const pathParts = hash.substring(1).split('/');
        if (pathParts[0] !== 'anotacoes') {
            console.log('❌ Rota inválida, voltando para Welcome Screen');
            this.showWelcomeScreen();
            return;
        }
        
        // Se chegou até aqui, é uma rota válida do sistema
        console.log('✅ Navegando para plugin:', hash);
        this.navigateToPlugin(hash);
    }

    // Quick Actions com efeitos modernos
    createNewNote() {
        // Efeito visual
        const btn = event?.target.closest('.quick-action-btn');
        if (btn) {
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        }
        
        // Gerar slug único para nova nota
        const timestamp = Date.now();
        const newNoteSlug = `nova-nota-${timestamp}`;
        
        // Navegar para nova nota
        this.navigateToPlugin(`#anotacoes/editor/${newNoteSlug}`);
        
        // Renderizar sidebar DEPOIS de navegar
        setTimeout(() => {
            this.renderSidebarNotes();
        }, 100);
        
        this.showNotification('Nova nota criada!', 'success');
    }

    openTaskManager() {
        console.log('📋 Abrindo gerenciador de tarefas...');
        this.navigateToPlugin('#anotacoes/tarefas');
        this.showNotification('Gerenciador de tarefas aberto!', 'success');
    }

    startStudySession() {
        console.log('🎯 Iniciando sessão de estudos...');
        this.navigateToPlugin('#anotacoes/tracker-ciclo');
        this.showNotification('Sessão de estudos iniciada!', 'success');
    }

    askCompassIA() {
        this.openAIChat();
    }

    // Editor Markdown (MANTÉM EXATAMENTE IGUAL)
    // anotações.js -> Substitua a função getMarkdownEditorHTML inteira

    getMarkdownEditorHTML() {
        return `
            <div class="markdown-editor-container">
                <div class="editor-toolbar">
                    </div>

                <div class="note-header">
                    <input type="text" class="note-title" id="note-title" placeholder="Título da nota...">
                    <div class="note-meta">
                        <span class="note-path" id="note-path">📁 /Minhas Notas</span>
                        <span class="note-status" id="note-status">● Rascunho</span>
                    </div>
                </div>

                <div class="editor-main-wysiwyg">
                    <div class="editor-header">
                        <span class="panel-title">📝 Editor</span>
                        <div class="editor-stats">
                            <span id="word-count">0 palavras</span>
                            <span id="char-count">0 caracteres</span>
                        </div>
                    </div>
                    <div 
                        class="markdown-editor-live" 
                        id="markdown-editor" 
                        contenteditable="true" 
                        spellcheck="false"
                        placeholder="Comece a escrever aqui... Use # para títulos.">
                    </div>
                </div>
                 <div class="markdown-editor-container">
                <div class="editor-toolbar">
                    <div class="toolbar-section">
                        <button class="toolbar-btn" data-action="bold" title="Negrito (Ctrl+B)">
                            <span class="material-icons-outlined">format_bold</span>
                        </button>
                        <button class="toolbar-btn" data-action="italic" title="Itálico (Ctrl+I)">
                            <span class="material-icons-outlined">format_italic</span>
                        </button>
                        
                        <button class="toolbar-btn" data-action="highlight" title="Marcar Texto">
                            <span class="material-icons-outlined">border_color</span>
                        </button>

                        <button class="toolbar-btn" data-action="heading1" title="Título 1">H1</button>
                        <button class="toolbar-btn" data-action="heading2" title="Título 2">H2</button>
                        <button class="toolbar-btn" data-action="list" title="Lista">
                            <span class="material-icons-outlined">format_list_bulleted</span>
                        </button>
                    </div>
                    <div class="toolbar-actions">
                        <button class="toolbar-btn save-btn" data-action="save" title="Salvar (Ctrl+S)">
                            <span class="material-icons-outlined">save</span>
                            Salvar
                        </button>
                    </div>
                </div>

                <div class="editor-footer">
                    </div>
            </div>
        `;
    }

        // anotações.js -> Adicione esta nova função à sua classe

    // NOVO: Processa o markdown em tempo real no editor
    processMarkdownRealTime() {
        const editor = document.getElementById('markdown-editor');
        if (!editor) return;

        // Salvar posição do cursor de forma mais robusta
        const selection = window.getSelection();
        let cursorPosition = 0;
        
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            cursorPosition = range.startOffset;
        }
        
        // Obter o texto puro
        const plainText = editor.innerText || editor.textContent || '';
        
        // Processar markdown
        const html = this.markdownToHTML(plainText);
        
        // Só atualizar se o HTML realmente mudou
        if (editor.innerHTML !== html) {
            editor.innerHTML = html;
            
            // Restaurar cursor na posição correta
            try {
                const textNode = this.findTextNodeAtPosition(editor, cursorPosition);
                if (textNode) {
                    const range = document.createRange();
                    const selection = window.getSelection();
                    
                    range.setStart(textNode.node, Math.min(textNode.offset, textNode.node.textContent.length));
                    range.collapse(true);
                    
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            } catch (e) {
                console.warn("Não foi possível restaurar cursor:", e);
            }
        }
    }

    // ADICIONE ESTA NOVA FUNÇÃO após a processMarkdownRealTime():
    findTextNodeAtPosition(element, position) {
        let currentPos = 0;
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            const nodeLength = node.textContent.length;
            if (currentPos + nodeLength >= position) {
                return {
                    node: node,
                    offset: position - currentPos
                };
            }
            currentPos += nodeLength;
        }
        
        // Se não encontrou, retorna o último nó
        const lastNode = walker.currentNode;
        return lastNode ? {
            node: lastNode,
            offset: lastNode.textContent.length
        } : null;
    }

    // anotacoes.js -> DENTRO DA CLASSE BrainSystem

    initMarkdownEditor() {
        console.log('🖊️ Inicializando Editor Estilo Obsidian (V3 - Escape de Títulos)...');

        const editor = document.getElementById('markdown-editor'); 
        const titleInput = document.getElementById('note-title');

        if (!editor || !titleInput) {
            console.error('Elementos essenciais do editor não foram encontrados.');
            return;
        }

        this.setupNoteFromURL();

        // --- EVENT LISTENERS PRINCIPAIS ---

        editor.addEventListener('keyup', (e) => {
            this.handleMarkdownFormatting(e);
        });
        
        editor.addEventListener('input', () => {
            this.updateStats();
            this.updateNoteTitle();
        });

        // O 'keydown' é onde vamos adicionar a nova lógica
        editor.addEventListener('keydown', (e) => {
            // Lógica de atalhos (continua igual)
            this.handleEditorShortcuts(e);

            // =====================================================================
            // NOVO: Lógica para "escapar" de blocos de título ao pressionar Enter
            // =====================================================================
            if (e.key === 'Enter') {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;

                const range = selection.getRangeAt(0);
                const currentNode = range.startContainer;

                // Encontra o elemento de título mais próximo (H1, H2, etc.)
                const headingElement = currentNode.closest('h1, h2, h3, h4, h5, h6');

                // Se o cursor estiver dentro de um elemento de título...
                if (headingElement) {
                    e.preventDefault(); // Previne a ação padrão do navegador (criar outro H2)

                    // Cria um novo parágrafo (<p>) com um <br> para garantir que a linha seja criada
                    const newParagraph = document.createElement('p');
                    newParagraph.innerHTML = '<br>';

                    // Insere o novo parágrafo logo após o título atual
                    headingElement.parentNode.insertBefore(newParagraph, headingElement.nextSibling);

                    // Move o cursor para o início do novo parágrafo
                    const newRange = document.createRange();
                    newRange.setStart(newParagraph, 0);
                    newRange.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                }
            }
        });

        editor.addEventListener('click', () => {
            this.updateCursorPosition();
        });
        editor.addEventListener('keyup', () => {
            this.updateCursorPosition();
        });

        titleInput.addEventListener('input', () => this.updateNoteTitle());

        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.dataset.action;
                this.handleToolbarAction(action);
            });
        });

        // --- ESTADO INICIAL ---
        this.updateStats();
        this.updateCursorPosition();

        console.log('✅ Editor Estilo Obsidian (V3) inicializado!');
    }

    // Sistema de Notificações Modernizado
    showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <span class="material-icons-outlined">${this.getNotificationIcon(type)}</span>
                <span style="font-weight: 600;">${message}</span>
            </div>
        `;

        // Efeito de entrada
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        container.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transition = 'all 0.3s ease';
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);

        // Auto remove após 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check_circle',
            warning: 'warning',
            error: 'error',
            info: 'info'
        };
        return icons[type] || 'info';
    }

// anotações.js -> SUBSTITUA a função setupNoteFromURL inteira por esta

    setupNoteFromURL() {
        const hash = window.location.hash;
        const pathParts = hash.substring(1).split('/');
        
        // O slug da nota é a terceira parte da URL (ex: #anotacoes/editor/SLUG)
        const noteName = pathParts.length >= 3 ? pathParts[2] : 'nova-nota';
        console.log(`📄 Carregando nota com slug: ${noteName}`);

        // Busca os elementos do NOVO editor
        const titleInput = document.getElementById('note-title');
        const editor = document.getElementById('markdown-editor'); // Alvo correto!
        const pathElement = document.getElementById('note-path');
        
        if (!titleInput || !editor || !pathElement) {
            console.error("Elementos do editor não encontrados. Abortando carregamento de nota.");
            return;
        }

        // Busca o título, conteúdo e caminho da nota
        const noteTitle = this.getNoteTitle(noteName);
        let noteContent = this.getNoteContent(noteName);
        const notePath = this.getNotePath(noteName);

        // Caso especial para "nova-nota" para garantir que venha em branco
        if (noteName === 'nova-nota') {
            noteContent = `# Nova Nota\n\nComece a escrever sua nota aqui...`;
        }

        // Preenche o editor com os dados corretos
        titleInput.value = noteTitle;
        pathElement.textContent = `📁 ${notePath}`;
        
        // FORMA CORRETA de preencher o novo editor
        // Usamos innerText para evitar problemas com formatação HTML inicial
        editor.innerText = noteContent;

        // Após preencher, chama a renderização para formatar o conteúdo inicial
        setTimeout(() => {
            this.processMarkdownRealTime();
            this.updateStats();
            // Define o status como Rascunho para notas novas ou carregadas
            const status = document.getElementById('note-status');
            if (status) {
                status.textContent = '● Rascunho';
                status.style.color = 'var(--text-light)';
            }
        }, 10); 
    }

// anotações.js

    // ALTERADO: Adicione a nova nota no objeto 'titles'
    getNoteTitle(noteName) {
        const titles = {
            'aws-fundamentos': 'AWS - Fundamentos',
            'azure-intro': 'Azure - Introdução',
            'serverless-concepts': 'Conceitos de Serverless',
            'nodejs-express': 'Node.js + Express',
            'api-rest-design': 'Design de APIs REST',
            'database-modeling': 'Modelagem de Banco',
            'python-pandas': 'Python - Pandas',
            'machine-learning-intro': 'ML - Introdução',
            'data-visualization': 'Visualização de Dados',
            'nota-ia': 'Nota Criada com Compass IA',
            // NOVO: Adicione esta linha
            'aws-cloud-practitioner': 'AWS Cloud Practitioner - Guia Completo'
        };
        // Se for uma nova nota com timestamp
        if (noteName.startsWith('nova-nota-')) {
            return 'Nova Nota';
        }
        return titles[noteName] || 'Nova Nota';    }

    // ALTERADO: Adicione a nova nota no objeto 'contents'
    getNoteContent(noteName) {
        const contents = {
            'aws-fundamentos': `...`, // seu conteúdo existente
            'python-pandas': `...`, // seu conteúdo existente
            'nota-ia': `...`, // seu conteúdo existente

            // NOVO: Adicione esta chave e todo o conteúdo abaixo
            'aws-cloud-practitioner': `# AWS Cloud Practitioner - Guia Completo
*Nota criada com assistência do Compass IA*

## 🎯 Sobre o Exame AWS Cloud Practitioner

O **AWS Certified Cloud Practitioner** é a certificação de entrada da Amazon Web Services, ideal para quem está começando na nuvem. É uma excelente porta de entrada para o mundo AWS!

### 📋 Detalhes do Exame
- **Código:** CLF-C02
- **Duração:** 90 minutos
- **Questões:** 65 questões múltipla escolha
- **Pontuação:** 100-1000 (mínimo 700 para passar)
- **Custo:** $100 USD
- **Validade:** 3 anos

## 📚 Domínios do Exame

### 1. Conceitos de Nuvem (24%)
- **Definição de nuvem AWS**
- **Proposta de valor da nuvem AWS**
- **Princípios de design da nuvem**

### 2. Segurança e Conformidade (30%)
- **Modelo de responsabilidade compartilhada**
- **Conceitos de segurança da nuvem AWS**
- **Recursos de gerenciamento de acesso**

### 3. Tecnologia (34%)
- **Métodos de implantação e operação na nuvem AWS**
- **Infraestrutura global da AWS**
- **Serviços principais da AWS**

### 4. Cobrança e Preços (12%)
- **Modelos de preços da AWS**
- **Estruturas de cobrança**
- **Recursos de gerenciamento de cobrança**

## 🎓 Como Passar no Exame - Dicas Estratégicas

### 📖 1. Estude com o Melhor Conteúdo
**Recomendação GOLD:** Treinamento da **Escola da Nuvem** - **Professor:** Anderson Albuquerque (referência nacional em AWS!)
- **Qualidade:** Conteúdo atualizado e didático excepcional
- **Prático:** Laboratórios hands-on inclusos
- **Suporte:** Comunidade ativa e mentoria

---

## 💡 Dica Final do Compass IA

A certificação AWS Cloud Practitioner é sua porta de entrada para um universo de oportunidades! Com dedicação, o treinamento excepcional da Escola da Nuvem com o professor Anderson Albuquerque, e prática constante, você conseguirá não apenas passar no exame, mas construir uma base sólida para sua jornada na nuvem.

**Lembre-se:** O conhecimento é o melhor investimento que você pode fazer em si mesmo! 🚀

*Boa sorte nos estudos! ☁️✨*`
        };
            // ALTERAÇÃO AQUI
        if (noteName === 'all') {
            return contents;
        }
        
        return contents[noteName] || `# ${this.getNoteTitle(noteName)}\n\nComece a escrever sua nota aqui...`;
    }        
  

    // ALTERADO: Adicione o caminho da nova nota
    getNotePath(noteName) {
        const paths = {
            'aws-fundamentos': '/Minhas Notas/Cloud',
            'azure-intro': '/Minhas Notas/Cloud',
            // ... (seus outros paths)
            'nota-ia': '/Minhas Notas/Geradas por IA',
            // NOVO: Adicione esta linha
            'aws-cloud-practitioner': '/Minhas Notas/Geradas por IA' 
        };
        // Se for uma nova nota com timestamp
        if (noteName.startsWith('nova-nota-')) {
            return '/Minhas Notas/Recentes';
        }
        return paths[noteName] || '/Minhas Notas';    }

    updatePreview() {
        const textarea = document.getElementById('markdown-input');
        const preview = document.getElementById('markdown-preview');
        
        if (!textarea || !preview) return;

        const markdown = textarea.value;
        if (!markdown.trim()) {
            preview.innerHTML = `
                <div class="preview-placeholder">
                    <span class="material-icons-outlined">preview</span>
                    <p>A visualização aparecerá aqui conforme você digita...</p>
                </div>
            `;
            return;
        }

        const html = this.markdownToHTML(markdown);
        preview.innerHTML = html;
    }

    // anotações.js -> Ajuste sua função markdownToHTML

        markdownToHTML(markdown) {
        let html = markdown;
        
        // IMPORTANTE: Processar em ordem específica para evitar conflitos
        
        // 1. Headers (sem <br> no final)
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
        
        // 2. Bold e Italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // 3. Code inline
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // 4. Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        
        // 5. Quebras de linha por último
        html = html.replace(/\n/g, '<br>');
        
        return html;
    }

    updateStats() {
        const editor = document.getElementById('markdown-editor'); // Alvo correto
        const wordCount = document.getElementById('word-count');
        const charCount = document.getElementById('char-count');
        
        if (!editor) return;

        const text = editor.innerText; // Lê de .innerText
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;

        if (wordCount) wordCount.textContent = `${words} palavras`;
        if (charCount) charCount.textContent = `${chars} caracteres`;
    }

    updateCursorPosition() {
        const textarea = document.getElementById('markdown-input');
        const cursorPos = document.getElementById('cursor-position');
        
        if (!textarea || !cursorPos) return;

        const text = textarea.value;
        const cursor = textarea.selectionStart;
        const lines = text.substring(0, cursor).split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;

        cursorPos.textContent = `Linha ${line}, Coluna ${column}`;
    }

    updateNoteTitle() {
        const status = document.getElementById('note-status');
        
        if (status) {
            status.textContent = '● Modificado';
            status.style.color = '#ffc107';
        }
    }

// anotacoes.js -> SUBSTITUA a função handleToolbarAction inteira por esta

    // anotacoes.js -> SUBSTITUA a função handleToolbarAction inteira por esta

    handleToolbarAction(action) {
        const editor = document.getElementById('markdown-editor');
        if (!editor) return;

        editor.focus();

        // Comandos padrão que já possuem comportamento de toggle na maioria dos navegadores
        const standardCommands = ['bold', 'italic', 'underline', 'strikethrough'];

        if (standardCommands.includes(action)) {
            document.execCommand(action, false, null);
        } else {
            // Lógica para ações personalizadas
            switch (action) {
                case 'heading1':
                    document.execCommand('formatBlock', false, 'H1');
                    break;
                case 'heading2':
                    document.execCommand('formatBlock', false, 'H2');
                    break;
                case 'list':
                    document.execCommand('insertUnorderedList', false, null);
                    break;
                
                // LÓGICA DE TOGGLE ATUALIZADA PARA O MARCADOR DE TEXTO
                case 'highlight':
                    const selection = window.getSelection();
                    if (selection.isCollapsed) {
                        this.showNotification('Selecione um texto para marcar/desmarcar', 'warning');
                        return;
                    }

                    // Pega o nó pai comum a toda a seleção
                    let parentNode = selection.getRangeAt(0).commonAncestorContainer;
                    if (parentNode.nodeType !== 1) { // Se não for um elemento, pega o elemento pai
                        parentNode = parentNode.parentElement;
                    }

                    // Verifica se o texto selecionado ou seus pais já estão dentro de uma tag <mark>
                    const existingMark = parentNode.closest('mark');

                    if (existingMark) {
                        // SE JÁ ESTIVER MARCADO: Remove a formatação (unwrap)
                        const parent = existingMark.parentNode;
                        // Pega todo o conteúdo de dentro do <mark>
                        while (existingMark.firstChild) {
                            // Insere o conteúdo antes do próprio <mark>
                            parent.insertBefore(existingMark.firstChild, existingMark);
                        }
                        // Remove a tag <mark> agora vazia
                        parent.removeChild(existingMark);

                    } else {
                        // SE NÃO ESTIVER MARCADO: Aplica a formatação (lógica original)
                        const range = selection.getRangeAt(0);
                        const markNode = document.createElement('mark');
                        range.surroundContents(markNode);
                    }
                    break;

                case 'save':
                    this.saveNote();
                    break;
            }
        }

        // Atualiza o status da nota para "Modificado"
        this.updateNoteTitle();
    }

    handleEditorShortcuts(e) {
        if (e.ctrlKey) {
            switch (e.key) {
                case 'b':
                    e.preventDefault();
                    this.handleToolbarAction('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    this.handleToolbarAction('italic');
                    break;
                case 's':
                    e.preventDefault();
                    this.saveNote();
                    break;
            }
        }
    }

    saveNote() {
        const titleInput = document.getElementById('note-title');
        const editor = document.getElementById('markdown-editor'); // Alvo correto
        const status = document.getElementById('note-status');
        
        if (!titleInput || !editor) return;

        // Simular salvamento
        const noteData = {
            title: titleInput.value || 'Nota sem título',
            content: editor.innerText, // Lê de .innerText
            timestamp: new Date().toISOString()
        };

        // ... (resto da lógica de salvar no localStorage continua igual)
        const notes = JSON.parse(localStorage.getItem('brain_notes') || '{}');
        const noteId = this.getCurrentNoteId();
        notes[noteId] = noteData;
        localStorage.setItem('brain_notes', JSON.stringify(notes));

        if (status) {
            status.textContent = '● Salvo';
            status.style.color = 'var(--success-color)';
        }

        this.showNotification('Nota salva com sucesso!', 'success');
    }

    getCurrentNoteId() {
        const hash = window.location.hash;
        const pathParts = hash.substring(1).split('/');
        return pathParts[2] || 'nova-nota';
    }

    updateActiveNote() {
        // Atualizar indicador visual na sidebar para notas
        document.querySelectorAll('.note-item').forEach(item => {
            item.classList.remove('active');
        });

        const currentNoteId = this.getCurrentNoteId();
        const activeNoteItem = document.querySelector(`[href*="${currentNoteId}"]`)?.closest('.note-item');
        if (activeNoteItem) {
            activeNoteItem.classList.add('active');
        }
    }

    showMarkdownHelp() {
        this.showNotification('Guia de Markdown: Use **negrito**, *itálico*, # títulos, - listas', 'info');
    }

    exportMarkdown() {
        const titleInput = document.getElementById('note-title');
        const textarea = document.getElementById('markdown-input');
        
        if (!textarea) return;

        const title = titleInput?.value || 'nota';
        const content = textarea.value;
        
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Nota exportada!', 'success');
    }

    // AI Chat MODERNIZADO
    openAIChat() {
        const aiOverlay = document.getElementById('ai-chat-overlay');
        if (aiOverlay) {
            aiOverlay.style.display = 'flex';
            aiOverlay.style.opacity = '0';
            aiOverlay.style.transform = 'translateY(100%)';
            
            // Animação de entrada
            setTimeout(() => {
                aiOverlay.style.transition = 'all 0.3s ease';
                aiOverlay.style.opacity = '1';
                aiOverlay.style.transform = 'translateY(0)';
            }, 10);
            
            const aiInput = document.getElementById('ai-input');
            if (aiInput) {
                setTimeout(() => aiInput.focus(), 300);
            }
        }
    }

    closeAIChat() {
        const aiOverlay = document.getElementById('ai-chat-overlay');
        if (aiOverlay) {
            aiOverlay.style.transform = 'translateY(100%)';
            aiOverlay.style.opacity = '0';
            
            setTimeout(() => {
                aiOverlay.style.display = 'none';
            }, 300);
        }
    }

    sendAIMessage() {
        const input = document.getElementById('ai-input');
        const messages = document.getElementById('ai-chat-messages');
        
        if (!input || !input.value.trim()) return;

        const message = input.value.trim();

        // Adicionar mensagem do usuário
        const userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        userMessage.innerHTML = `
            <div class="message-content">${message}</div>
        `;
        
        messages.appendChild(userMessage);

        // Simular resposta da IA
        setTimeout(() => {
            const aiResponse = document.createElement('div');
            aiResponse.className = 'ai-message';
            aiResponse.innerHTML = `
                <div class="message-avatar">
                    <span class="material-icons-outlined">smart_toy</span>
                </div>
                <div class="message-content">
                    <div class="message-text">Olá Steve! Ainda estou sendo implementada pela CareerPath. Em breve terei funcionalidades completas!</div>
                </div>
            `;
            messages.appendChild(aiResponse);
            messages.scrollTop = messages.scrollHeight;
        }, 1000);

        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    }

    // Plugin Manager MODERNIZADO
    openPluginManager() {
        const modal = document.getElementById('plugin-manager-modal');
        if (modal) {
            modal.style.display = 'block';
            modal.style.opacity = '0';
            
            setTimeout(() => {
                modal.style.transition = 'opacity 0.3s ease';
                modal.style.opacity = '1';
            }, 10);
            
            this.populatePluginManager();
        }
    }

// SUBSTITUA a função closeModal() existente por esta versão:

    closeModal() {
        // Fechar modais modernos (com overlay)
        const overlayModals = document.querySelectorAll('.modal-overlay.show');
        overlayModals.forEach(modal => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });

        // Fechar modais tradicionais
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (!modal.classList.contains('modal-overlay')) {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });

        // Restaurar scroll
        document.body.style.overflow = '';
        
        // Limpar input
        const topicInput = document.getElementById('ai-note-topic');
        if (topicInput) {
            topicInput.value = '';
        }
    }

    populatePluginManager() {
        const installedTab = document.getElementById('installed-tab');
        if (installedTab) {
            let html = '<div class="plugin-grid">';
            
            this.plugins.forEach(plugin => {
                const statusClass = plugin.active ? 'success' : 'inactive';
                const statusText = plugin.active ? 'Ativo' : 'Inativo';
                
                html += `
                    <div class="plugin-card ${statusClass}">
                        <div class="plugin-card-header">
                            <span class="material-icons-outlined">${plugin.icon}</span>
                            <h4>${plugin.name}</h4>
                        </div>
                        <div class="plugin-card-status">
                            Status: ${statusText}
                        </div>
                        <div class="plugin-card-actions">
                            <button class="btn-toggle" data-plugin="${plugin.id}">
                                ${plugin.active ? 'Desativar' : 'Ativar'}
                            </button>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            installedTab.innerHTML = html;
        }
    }

    // Storage & Sync (MANTÉM IGUAL)
    saveData(key, data) {
        try {
            localStorage.setItem(`brain_system_${key}`, JSON.stringify(data));
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
        }
    }

    loadData(key) {
        try {
            const data = localStorage.getItem(`brain_system_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            return null;
        }
    }
}



let brainSystemInstance = null;

export function init() {
    if (!brainSystemInstance) {
        brainSystemInstance = new BrainSystem();
        window.brainSystemInstance = brainSystemInstance;

        // =====================================================================
        // CRIA A "PONTE" PARA AS FUNÇÕES GLOBAIS QUE OS PLUGINS ESPERAM
        // =====================================================================
        console.log("Expondo funções do sistema para os plugins...");
        window.loadData = (key) => brainSystemInstance.loadData(key);
        window.saveData = (key, data) => brainSystemInstance.saveData(key, data);
        window.formatTime = (seconds) => brainSystemInstance.formatTime(seconds);
        window.getLocalDateString = (date) => brainSystemInstance.getLocalDateString(date);
        window.showConfirmModal = (title, message, onConfirm) => brainSystemInstance.showConfirmModal(title, message, onConfirm);
        window.showAlertModal = (title, message) => brainSystemInstance.showNotification(`${title}: ${message}`, 'warning');
        
        // Adicionando referências que podem estar faltando em outros arquivos
        const COLORS = ['#FF6B47', '#667eea', '#764ba2', '#28a745', '#17a2b8', '#ffc107'];
        window.COLORS = COLORS;
    }
    return brainSystemInstance;
}

// Função global para inicialização
window.initBrainSystem = () => {
    return init();
};