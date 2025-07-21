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

    async init() {
        console.log('🧠 Inicializando Sistema Segundo Cérebro Modernizado...');
        
        this.setupModernHeader();
        this.setupContainer();
        this.setupEventListeners();
        this.registerDefaultPlugins();
        this.loadDefaultPlugin();
        this.setupModernAnimations();
        
        // Inicializar Compass IA após tudo estar pronto
        setTimeout(() => {
            this.initCompassIA();
        }, 1000);
        
        console.log('✅ Sistema Segundo Cérebro Modernizado inicializado!');
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
            
            // Botão de chat do cérebro
            if (e.target.closest('#compass-brain-chat')) {
                this.openAIChat();
            }
            
            // Tabs de análise
            if (e.target.closest('.analysis-tab')) {
                const tab = e.target.closest('.analysis-tab');
                this.switchAnalysisTab(tab.dataset.tab);
            }
            
            // Botão de nota com IA
            if (e.target.closest('.ai-note-btn')) {
                this.createAINote();
            }
            
            // Sugestões do chat
            if (e.target.closest('.suggestion-btn')) {
                const suggestion = e.target.textContent.trim();
                this.sendQuickMessage(suggestion);
            }
        });
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

    // NOVA FUNÇÃO: Popular insights do cérebro
    populateBrainInsights() {
        const knowledgeMap = document.getElementById('knowledge-map-analysis');
        if (knowledgeMap) {
            knowledgeMap.innerHTML = `
                <div class="analysis-item">
                    <strong>Domínios:</strong> 3 áreas principais com 47 notas
                </div>
                <div class="analysis-item">
                    <strong>Cloud:</strong> 92% de domínio (área forte)
                </div>
            `;
        }

        const learningPatterns = document.getElementById('learning-patterns-analysis');
        if (learningPatterns) {
            learningPatterns.innerHTML = `
                <div class="analysis-item">
                    <strong>Horário ótimo:</strong> 14h-18h
                </div>
                <div class="analysis-item">
                    <strong>Duração ideal:</strong> 45min
                </div>
            `;
        }
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
    createAINote() {
        console.log('✨ Criando nota com IA...');
        this.showNotification('🤖 Criando nota com IA...', 'info');
        
        setTimeout(() => {
            window.location.hash = '#anotacoes/editor/nota-ia';
            this.showNotification('📝 Nota com IA criada!', 'success');
        }, 1500);
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
    showModal(modal) {
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
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
        // Definir funções globais para os botões de ação rápida
        window.createNewNote = () => this.createNewNote();
        window.createAINote = () => this.createAINote();
        window.analyzeKnowledge = () => this.startBrainAnalysis();
        window.openTaskManager = () => this.openTaskManager();
        window.startStudySession = () => this.startStudySession();
        window.askCompassIA = () => this.askCompassIA();
        window.showMarkdownHelp = () => this.showMarkdownHelp();
        window.exportMarkdown = () => this.exportMarkdown();
        window.sendQuickMessage = (message) => this.sendQuickMessage(message);
    }

    registerDefaultPlugins() {
        // Registrar plugins padrão (MANTÉM EXATAMENTE IGUAL)
        this.registerPlugin('markdown-editor', {
            name: 'Editor Markdown',
            icon: 'edit_note',
            template: null,
            init: () => this.initMarkdownEditor(),
            active: true
        });

        this.registerPlugin('task-manager', {
            name: 'Gerenciador de Tarefas',
            icon: 'task_alt',
            template: 'templates/tarefas.html',
            init: null,
            active: true
        });

        this.registerPlugin('study-cycle', {
            name: 'Ciclo de Estudos',
            icon: 'track_changes',
            template: 'templates/ciclo.html',
            init: initCiclo,
            libs: ['https://cdn.jsdelivr.net/npm/chart.js'],
            active: true
        });

        this.registerPlugin('reports', {
            name: 'Relatórios',
            icon: 'analytics',
            template: 'templates/relatorio.html',
            init: initRelatorio,
            libs: [
                'https://cdn.jsdelivr.net/npm/chart.js',
                'https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js'
            ],
            active: true
        });

        this.registerPlugin('calendar', {
            name: 'Calendário',
            icon: 'calendar_today',
            template: 'templates/calendario.html',
            init: initCalendario,
            active: true
        });

        // Plugins futuros (inativos por enquanto)
        this.registerPlugin('pomodoro-timer', {
            name: 'Timer Pomodoro',
            icon: 'timer',
            template: 'templates/pomodoro.html',
            init: null,
            active: false
        });

        this.registerPlugin('ai-assistant', {
            name: 'Assistente IA',
            icon: 'smart_toy',
            template: 'templates/compass-ia.html',
            init: null,
            active: false
        });

        this.registerPlugin('flashcards', {
            name: 'Flashcards IA',
            icon: 'quiz',
            template: 'templates/flashcards.html',
            init: null,
            active: false
        });
    }

    registerPlugin(id, config) {
        this.plugins.set(id, {
            id,
            ...config,
            loaded: false
        });
    }

    async navigateToPlugin(href) {
        const pathParts = href.substring(1).split('/');
        const pluginKey = this.getPluginKeyFromPath(pathParts);
        
        if (!pluginKey) {
            this.showWelcomeScreen();
            return;
        }

        const plugin = this.plugins.get(pluginKey);
        if (!plugin) {
            this.showNotification('Plugin não encontrado', 'error');
            return;
        }

        if (!plugin.active) {
            this.showNotification('Este plugin ainda não está disponível', 'warning');
            return;
        }

        await this.loadPlugin(plugin);
        this.updateActivePlugin(pluginKey);
    }

    getPluginKeyFromPath(pathParts) {
        const subpage = pathParts[1];
        
        // Se for uma rota de editor com nota específica
        if (subpage === 'editor') {
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

        return routeMap[subpage] || null;
    }

    async loadPlugin(plugin) {
        try {
            this.showPluginLoadingModern();

            // Para o editor markdown, usar HTML inline
            if (plugin.id === 'markdown-editor') {
                this.pluginContainer.innerHTML = this.getMarkdownEditorHTML();
            } else if (plugin.template) {
                const response = await fetch(plugin.template);
                if (!response.ok) throw new Error(`Template não encontrado: ${plugin.template}`);
                
                const content = await response.text();
                this.pluginContainer.innerHTML = content;
            }

            // Carregar bibliotecas externas
            if (plugin.libs && plugin.libs.length > 0) {
                await this.loadLibraries(plugin.libs);
            }

            // Carregar script comum se necessário
            if (plugin.id !== 'markdown-editor') {
                await this.loadScript('js/pages/comum.js');
            }

            // Executar inicialização do plugin
            if (plugin.init && typeof plugin.init === 'function') {
                plugin.init();
            }

            plugin.loaded = true;
            this.activePlugin = plugin.id;
            
            // Atualizar nota ativa na sidebar
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

    loadDefaultPlugin() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#anotacoes')) {
            this.handleRouting();
        } else {
            this.showWelcomeScreen();
        }
    }

    handleRouting() {
        const hash = window.location.hash;
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
        
        this.navigateToPlugin('#anotacoes/editor/nova-nota');
        this.showNotification('Nova nota criada!', 'success');
    }

    openTaskManager() {
        this.navigateToPlugin('#anotacoes/tarefas');
    }

    startStudySession() {
        this.navigateToPlugin('#anotacoes/tracker-ciclo');
        this.showNotification('Sessão de estudos iniciada!', 'success');
    }

    askCompassIA() {
        this.openAIChat();
    }

    // Editor Markdown (MANTÉM EXATAMENTE IGUAL)
    getMarkdownEditorHTML() {
        return `
            <div class="markdown-editor-container">
                <div class="editor-toolbar">
                    <div class="toolbar-section">
                        <button class="toolbar-btn" data-action="bold" title="Negrito (Ctrl+B)">
                            <span class="material-icons-outlined">format_bold</span>
                        </button>
                        <button class="toolbar-btn" data-action="italic" title="Itálico (Ctrl+I)">
                            <span class="material-icons-outlined">format_italic</span>
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
                            <span>Salvar</span>
                        </button>
                    </div>
                </div>

                <div class="note-header">
                    <input type="text" class="note-title" id="note-title" placeholder="Título da nota..." value="">
                    <div class="note-meta">
                        <span class="note-path" id="note-path">📁 /Minhas Notas</span>
                        <span class="note-status" id="note-status">● Rascunho</span>
                    </div>
                </div>

                <div class="editor-main">
                    <div class="editor-panel">
                        <div class="editor-header">
                            <span class="panel-title">📝 Editor</span>
                            <div class="editor-stats">
                                <span id="word-count">0 palavras</span>
                                <span id="char-count">0 caracteres</span>
                            </div>
                        </div>
                        <textarea class="markdown-textarea" id="markdown-input" placeholder="# Começe a escrever sua nota aqui...

## Dicas de Markdown:
- **Negrito** ou __negrito__
- *Itálico* ou _itálico_
- [Link](https://exemplo.com)
- \`código inline\`

### Lista:
- Item 1
- Item 2
- Item 3

### Citação:
> Esta é uma citação

**Atalhos úteis:**
- Ctrl+B: Negrito
- Ctrl+I: Itálico
- Ctrl+S: Salvar"></textarea>
                    </div>

                    <div class="preview-panel">
                        <div class="preview-header">
                            <span class="panel-title">👁️ Visualização</span>
                        </div>
                        <div class="markdown-preview" id="markdown-preview">
                            <div class="preview-placeholder">
                                <span class="material-icons-outlined">preview</span>
                                <p>A visualização aparecerá aqui conforme você digita...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="editor-footer">
                    <div class="editor-info">
                        <span>Markdown Editor</span>
                        <span class="separator">•</span>
                        <span id="cursor-position">Linha 1, Coluna 1</span>
                    </div>
                    <div class="editor-actions">
                        <button class="footer-btn" onclick="brainSystemInstance.showMarkdownHelp()">
                            <span class="material-icons-outlined">help</span>
                            <span>Ajuda</span>
                        </button>
                        <button class="footer-btn" onclick="brainSystemInstance.exportMarkdown()">
                            <span class="material-icons-outlined">download</span>
                            <span>Exportar</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    initMarkdownEditor() {
        console.log('🖊️ Inicializando Editor Markdown Modernizado...');
        
        const textarea = document.getElementById('markdown-input');
        const preview = document.getElementById('markdown-preview');
        const titleInput = document.getElementById('note-title');
        
        if (!textarea) {
            console.error('Textarea do editor não encontrada');
            return;
        }

        // Configurar nota baseada na URL
        this.setupNoteFromURL();

        // Event listeners do editor
        textarea.addEventListener('input', () => {
            this.updatePreview();
            this.updateStats();
        });

        textarea.addEventListener('keydown', (e) => {
            this.handleEditorShortcuts(e);
        });

        textarea.addEventListener('click', () => {
            this.updateCursorPosition();
        });

        if (titleInput) {
            titleInput.addEventListener('input', () => {
                this.updateNoteTitle();
            });
        }

        // Toolbar buttons
        document.querySelectorAll('.toolbar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.dataset.action;
                this.handleToolbarAction(action);
            });
        });

        // Inicializar preview
        this.updatePreview();
        this.updateStats();

        console.log('✅ Editor Markdown modernizado inicializado!');
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

    setupNoteFromURL() {
        const hash = window.location.hash;
        const pathParts = hash.substring(1).split('/');
        
        if (pathParts.length >= 3) {
            const noteName = pathParts[2];
            const noteTitle = this.getNoteTitle(noteName);
            const noteContent = this.getNoteContent(noteName);
            const notePath = this.getNotePath(noteName);

            const titleInput = document.getElementById('note-title');
            const textarea = document.getElementById('markdown-input');
            const pathElement = document.getElementById('note-path');

            if (titleInput) titleInput.value = noteTitle;
            if (textarea) textarea.value = noteContent;
            if (pathElement) pathElement.textContent = `📁 ${notePath}`;
        }
    }

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
            'nota-ia': 'Nota Criada com Compass IA'
        };
        return titles[noteName] || 'Nova Nota';
    }

    getNoteContent(noteName) {
        const contents = {
            'aws-fundamentos': `# AWS - Fundamentos

## O que é AWS?
Amazon Web Services (AWS) é uma plataforma de serviços de computação em nuvem oferecida pela Amazon.

## Principais Serviços:

### Computação
- **EC2** (Elastic Compute Cloud): Servidores virtuais
- **Lambda**: Computação serverless
- **ECS**: Container service

### Armazenamento
- **S3** (Simple Storage Service): Armazenamento de objetos
- **EBS** (Elastic Block Store): Armazenamento em bloco

### Banco de Dados
- **RDS**: Banco relacional gerenciado
- **DynamoDB**: Banco NoSQL

## Conceitos Importantes

### Regiões e Zonas de Disponibilidade
- **Região**: Localização geográfica
- **AZ**: Data centers isolados dentro de uma região

### Modelo de Responsabilidade Compartilhada
- AWS cuida da segurança **da** nuvem
- Cliente cuida da segurança **na** nuvem`,

            'python-pandas': `# Python - Pandas

## Introdução
Pandas é uma biblioteca Python para manipulação e análise de dados.

## Estruturas de Dados

### Series
\`\`\`python
import pandas as pd

# Criar uma Series
s = pd.Series([1, 2, 3, 4, 5])
print(s)
\`\`\`

### DataFrame
\`\`\`python
# Criar um DataFrame
df = pd.DataFrame({
    'Nome': ['João', 'Maria', 'Pedro'],
    'Idade': [25, 30, 35],
    'Cidade': ['SP', 'RJ', 'BH']
})
\`\`\`

## Operações Básicas

### Leitura de dados
\`\`\`python
# Ler CSV
df = pd.read_csv('arquivo.csv')
\`\`\``,

            'nota-ia': `# Machine Learning - Sugestão da IA
*Nota criada com assistência do Compass IA*

## 🎯 Por que esta nota?
Com base na análise do seu perfil, identifiquei que você tem conhecimento sólido em Python e AWS, mas uma lacuna em Machine Learning.

## 📚 Conceitos Fundamentais

### O que é Machine Learning?
- Subcampo da IA que permite sistemas aprenderem automaticamente
- Usa algoritmos para encontrar padrões em dados
- Aplicações: reconhecimento de imagem, recomendações, predições

### Tipos Principais
1. **Supervisionado**: Aprende com exemplos rotulados
2. **Não-supervisionado**: Encontra padrões ocultos
3. **Por reforço**: Aprende através de recompensas

## 🔗 Conexão com seus conhecimentos

### Python + ML
- **pandas**: Preparação e limpeza de dados
- **scikit-learn**: Biblioteca principal para ML
- **matplotlib/seaborn**: Visualização de resultados

### AWS + ML
- **SageMaker**: Platform completa para ML
- **Lambda**: Deploy de modelos simples
- **S3**: Armazenamento de datasets

## ✅ Próximos passos sugeridos
- [ ] Instalar scikit-learn: \`pip install scikit-learn\`
- [ ] Fazer tutorial com dataset Iris
- [ ] Implementar primeiro classificador
- [ ] Explorar SageMaker para deploy

---
*💡 Dica da IA: Comece com problemas simples e evolua gradualmente!*`
        };
        
        return contents[noteName] || `# ${this.getNoteTitle(noteName)}

Comece a escrever sua nota aqui...

## Seção 1
Conteúdo da seção...`;
    }

    getNotePath(noteName) {
        const paths = {
            'aws-fundamentos': '/Minhas Notas/Cloud',
            'azure-intro': '/Minhas Notas/Cloud',
            'serverless-concepts': '/Minhas Notas/Cloud',
            'nodejs-express': '/Minhas Notas/Back-End',
            'api-rest-design': '/Minhas Notas/Back-End',
            'database-modeling': '/Minhas Notas/Back-End',
            'python-pandas': '/Minhas Notas/Dados e IA',
            'machine-learning-intro': '/Minhas Notas/Dados e IA',
            'data-visualization': '/Minhas Notas/Dados e IA',
            'nota-ia': '/Minhas Notas/Geradas por IA'
        };
        return paths[noteName] || '/Minhas Notas';
    }

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

    markdownToHTML(markdown) {
        let html = markdown;

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold
        html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
        html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
        html = html.replace(/_(.*?)_/gim, '<em>$1</em>');

        // Code blocks
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>');
        
        // Inline code
        html = html.replace(/`(.*?)`/gim, '<code>$1</code>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');

        // Lists
        html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
        html = html.replace(/^- (.*$)/gim, '<li>$1</li>');

        // Blockquotes
        html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

        // Line breaks
        html = html.replace(/\n\n/gim, '</p><p>');
        html = html.replace(/\n/gim, '<br>');

        // Wrap in paragraphs
        html = '<p>' + html + '</p>';

        // Fix list wrapping
        html = html.replace(/<p>(<li>.*<\/li>)<\/p>/gim, '<ul>$1</ul>');
        html = html.replace(/<\/li><br><li>/gim, '</li><li>');

        return html;
    }

    updateStats() {
        const textarea = document.getElementById('markdown-input');
        const wordCount = document.getElementById('word-count');
        const charCount = document.getElementById('char-count');
        
        if (!textarea) return;

        const text = textarea.value;
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

    handleToolbarAction(action) {
        const textarea = document.getElementById('markdown-input');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let replacement = '';

        switch (action) {
            case 'bold':
                replacement = `**${selectedText || 'texto em negrito'}**`;
                break;
            case 'italic':
                replacement = `*${selectedText || 'texto em itálico'}*`;
                break;
            case 'heading1':
                replacement = `# ${selectedText || 'Título 1'}`;
                break;
            case 'heading2':
                replacement = `## ${selectedText || 'Título 2'}`;
                break;
            case 'list':
                replacement = `- ${selectedText || 'Item da lista'}`;
                break;
            case 'save':
                this.saveNote();
                return;
        }

        if (replacement) {
            textarea.value = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
            textarea.focus();
            this.updatePreview();
            this.updateStats();
            this.updateNoteTitle();
        }
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
        const textarea = document.getElementById('markdown-input');
        const status = document.getElementById('note-status');
        
        if (!titleInput || !textarea) return;

        // Simular salvamento
        const noteData = {
            title: titleInput.value || 'Nota sem título',
            content: textarea.value,
            timestamp: new Date().toISOString()
        };

        // Salvar no localStorage (temporário)
        const notes = JSON.parse(localStorage.getItem('brain_notes') || '{}');
        const noteId = this.getCurrentNoteId();
        notes[noteId] = noteData;
        localStorage.setItem('brain_notes', JSON.stringify(notes));

        // Atualizar status
        if (status) {
            status.textContent = '● Salvo';
            status.style.color = '#28a745';
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
                    <div class="message-text">Entendi! Com base no seu perfil, posso ajudar com sugestões personalizadas. Em breve terei funcionalidades completas!</div>
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

    closeModal() {
        // Fechar modais tradicionais
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });

        // Fechar modais do Compass IA
        const overlayModals = document.querySelectorAll('.modal-overlay');
        overlayModals.forEach(modal => {
            modal.style.opacity = '0';
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });

        // Restaurar scroll
        document.body.style.overflow = '';
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

// Inicializar sistema MODERNIZADO
let brainSystemInstance = null;

export function init() {
    if (!brainSystemInstance) {
        brainSystemInstance = new BrainSystem();
    }
    return brainSystemInstance;
}

// Função global para inicialização
window.initBrainSystem = () => {
    return init();
};

// Expor instância globalmente para uso no HTML
window.brainSystemInstance = brainSystemInstance;