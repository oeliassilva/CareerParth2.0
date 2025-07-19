// curriculo-detalhe.js

// Função de inicialização que será chamada automaticamente
function initCurriculo() {
    console.log('📄 Página de Currículo carregada!');
    
    // Dados do currículo (simulando dados da plataforma)
    const resumeData = {
        personalInfo: {
            name: "Elias Silva",
            title: "Desenvolvedor em Transição | Engenharia de Software",
            email: "elias.silva@email.com",
            phone: "(61) 99999-9999",
            location: "Brasília, DF",
            linkedin: "linkedin.com/in/eliassilva",
            photo: "/assets/images/perfil-elias-silva.png"
        },
        summary: "Profissional em transição de carreira para a área de tecnologia, cursando Engenharia de Software e Ciência de Dados. Experiência em gestão de projetos e liderança de equipes, com forte aptidão para resolução de problemas complexos. Domínio em JavaScript, Python e tecnologias web modernas, com certificações AWS e Oracle. Busco oportunidades para aplicar conhecimentos técnicos em desenvolvimento de software e análise de dados.",
        skills: {
            programming: [
                { name: "JavaScript", level: 85 },
                { name: "Python", level: 78 },
                { name: "HTML5", level: 83 },
                { name: "CSS3", level: 81 }
            ],
            frameworks: ["React", "Node.js", "Bootstrap", "Streamlit", "Pandas", "NumPy", "Git", "MySQL"],
            tools: ["AWS", "Oracle DB", "Power BI", "Figma", "Jira", "Terraform", "Docker", "VS Code"]
        },
        lastUpdate: new Date().toLocaleDateString('pt-BR')
    };

    // Elementos DOM
    const downloadBtn = document.getElementById('download-pdf');
    const shareBtn = document.getElementById('share-resume');
    const editBtn = document.getElementById('edit-resume');
    const modal = document.getElementById('edit-modal');
    const modalClose = document.querySelector('.modal-close');

    // Inicialização
    function initialize() {
        setupHeader();
        populateData();
        setupEventListeners();
        animateSkillBars();
        
        console.log('✅ Currículo totalmente carregado!');
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

    // Popular dados do currículo
    function populateData() {
        // Atualizar data da última modificação
        const lastUpdateEl = document.getElementById('last-update');
        if (lastUpdateEl) {
            lastUpdateEl.textContent = resumeData.lastUpdate;
            console.log('📅 Data de atualização definida:', resumeData.lastUpdate);
        } else {
            console.warn('⚠️ Elemento last-update não encontrado');
        }

        // Popular informações pessoais se necessário
        // (já estão no HTML, mas poderiam ser populadas dinamicamente)
        console.log('📊 Dados do currículo populados');
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Download PDF
        if (downloadBtn) {
            downloadBtn.addEventListener('click', downloadResumePDF);
        }

        // Compartilhar
        if (shareBtn) {
            shareBtn.addEventListener('click', shareResume);
        }

        // Editar
        if (editBtn) {
            editBtn.addEventListener('click', openEditModal);
        }

        // Modal
        if (modalClose) {
            modalClose.addEventListener('click', closeEditModal);
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeEditModal();
            });
        }

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display === 'block') {
                closeEditModal();
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

        // Impressão com Ctrl+P
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                printResume();
            }
        });
    }

    // Animar barras de habilidades
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const softSkillCircles = document.querySelectorAll('.soft-skill-circle');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('skill-progress')) {
                        // Animar barra de progresso
                        const progress = element.getAttribute('data-progress');
                        setTimeout(() => {
                            element.style.width = progress + '%';
                            element.classList.add('animate');
                        }, 200);
                    } else if (element.classList.contains('soft-skill-circle')) {
                        // Animar círculo de soft skill
                        const percent = element.getAttribute('data-percent');
                        setTimeout(() => {
                            element.style.background = `conic-gradient(var(--primary-color) ${percent}%, var(--bg-light) 0%)`;
                        }, 200);
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
        softSkillCircles.forEach(circle => observer.observe(circle));
    }

    // Download do currículo em PDF
    function downloadResumePDF() {
        showLoadingState(downloadBtn, 'Gerando PDF...');
        
        // Simular geração de PDF
        setTimeout(() => {
            // Aqui seria implementada a geração real do PDF
            // Usando bibliotecas como jsPDF ou html2pdf
            generatePDF();
            resetButtonState(downloadBtn, 'download', 'Baixar PDF');
        }, 2000);
    }

    // Gerar PDF (simulado)
    function generatePDF() {
        try {
            // Esta seria a implementação real usando jsPDF ou html2pdf
            // Por enquanto, vamos simular o download
            
            const resumeContent = document.getElementById('resume-content');
            if (!resumeContent) return;

            // Simular download
            const link = document.createElement('a');
            link.href = '#'; // Aqui seria o blob URL do PDF
            link.download = 'curriculo-elias-silva.pdf';
            document.body.appendChild(link);
            // link.click(); // Descomentaria para download real
            document.body.removeChild(link);
            
            showNotification('PDF gerado com sucesso!', 'success');
            console.log('📄 PDF do currículo gerado!');
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            showNotification('Erro ao gerar PDF. Tente novamente.', 'error');
        }
    }

    // Implementação real de PDF usando html2pdf (para referência futura)
    function generateRealPDF() {
        // Esta função seria usada com a biblioteca html2pdf.js
        /*
        const element = document.getElementById('resume-content');
        const opt = {
            margin: 0.5,
            filename: 'curriculo-elias-silva.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
        */
    }

    // Compartilhar currículo
    function shareResume() {
        if (navigator.share) {
            // API Web Share (mobile)
            navigator.share({
                title: 'Currículo - Elias Silva',
                text: 'Confira meu currículo profissional',
                url: window.location.href
            }).then(() => {
                console.log('✅ Currículo compartilhado!');
            }).catch((error) => {
                console.log('❌ Erro ao compartilhar:', error);
                fallbackShare();
            });
        } else {
            // Fallback para desktop
            fallbackShare();
        }
    }

    // Compartilhamento alternativo
    function fallbackShare() {
        const url = window.location.href;
        
        // Copiar URL para clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                showNotification('Link copiado para a área de transferência!', 'success');
            }).catch(() => {
                showShareModal(url);
            });
        } else {
            showShareModal(url);
        }
    }

    // Modal de compartilhamento
    function showShareModal(url) {
        const shareOptions = [
            {
                name: 'WhatsApp',
                icon: 'message',
                url: `https://api.whatsapp.com/send?text=Confira meu currículo: ${encodeURIComponent(url)}`
            },
            {
                name: 'LinkedIn',
                icon: 'business',
                url: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
            },
            {
                name: 'Email',
                icon: 'email',
                url: `mailto:?subject=Currículo - Elias Silva&body=Confira meu currículo: ${encodeURIComponent(url)}`
            }
        ];

        // Criar modal dinâmico
        const modalHTML = `
            <div id="share-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Compartilhar Currículo</h3>
                        <button class="modal-close" onclick="closeShareModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${shareOptions.map(option => `
                                <a href="${option.url}" target="_blank" 
                                   style="display: flex; align-items: center; gap: 12px; padding: 12px; 
                                          text-decoration: none; color: var(--text-dark); border-radius: 8px; 
                                          background: var(--bg-light); transition: background 0.2s ease;"
                                   onmouseover="this.style.background='var(--primary-color)'; this.style.color='white';"
                                   onmouseout="this.style.background='var(--bg-light)'; this.style.color='var(--text-dark)';">
                                    <span class="material-icons-outlined">${option.icon}</span>
                                    ${option.name}
                                </a>
                            `).join('')}
                        </div>
                        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border-color);">
                            <input type="text" value="${url}" readonly 
                                   style="width: 100%; padding: 8px; border: 1px solid var(--border-color); 
                                          border-radius: 4px; font-size: 0.9rem;">
                            <button onclick="copyToClipboard('${url}')" 
                                    style="margin-top: 8px; width: 100%; padding: 8px; background: var(--primary-color); 
                                           color: white; border: none; border-radius: 4px; cursor: pointer;">
                                Copiar Link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.getElementById('share-modal').style.display = 'block';
    }

    // Abrir modal de edição
    function openEditModal() {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Fechar modal de edição
    function closeEditModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Fechar modal de compartilhamento
    window.closeShareModal = function() {
        const shareModal = document.getElementById('share-modal');
        if (shareModal) {
            shareModal.remove();
        }
    };

    // Copiar para clipboard
    window.copyToClipboard = function(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Link copiado!', 'success');
                closeShareModal();
            });
        } else {
            // Fallback para navegadores antigos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Link copiado!', 'success');
            closeShareModal();
        }
    };

    // Imprimir currículo
    function printResume() {
        window.print();
    }

    // Mostrar estado de carregamento
    function showLoadingState(button, text) {
        if (!button) return;
        
        button.disabled = true;
        button.innerHTML = `
            <div style="width: 16px; height: 16px; border: 2px solid transparent; 
                        border-top: 2px solid currentColor; border-radius: 50%; 
                        animation: spin 1s linear infinite; margin-right: 8px;"></div>
            ${text}
        `;
    }

    // Resetar estado do botão
    function resetButtonState(button, icon, text) {
        if (!button) return;
        
        button.disabled = false;
        button.innerHTML = `
            <span class="material-icons-outlined">${icon}</span>
            ${text}
        `;
    }

    // Mostrar notificação
    function showNotification(message, type = 'info') {
        // Criar notificação
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : 
                        type === 'error' ? '#dc3545' : 'var(--info-color)'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        notification.textContent = message;

        // Adicionar animação CSS
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Função para atualizar dados do currículo automaticamente
    function updateResumeFromCareerPath() {
        // Esta função integraria com a API do CareerPath para
        // buscar automaticamente:
        // - Novos contratos assinados
        // - Cursos concluídos
        // - Certificações obtidas
        // - Projetos atualizados
        // - Skills desenvolvidas

        console.log('🔄 Sincronizando dados do CareerPath...');
        
        // Simulação de atualização
        setTimeout(() => {
            console.log('✅ Currículo atualizado com dados do CareerPath!');
            
            // Atualizar timestamp
            const currentDate = new Date().toLocaleDateString('pt-BR');
            resumeData.lastUpdate = currentDate;
            
            const lastUpdateEl = document.getElementById('last-update');
            if (lastUpdateEl) {
                lastUpdateEl.textContent = currentDate;
            }
            
            showNotification('Currículo atualizado automaticamente!', 'success');
        }, 1000);
    }

    // Função para validar dados do currículo
    function validateResumeData() {
        const errors = [];
        
        // Validações básicas
        if (!resumeData.personalInfo.name) errors.push('Nome é obrigatório');
        if (!resumeData.personalInfo.email) errors.push('Email é obrigatório');
        if (!resumeData.summary || resumeData.summary.length < 50) {
            errors.push('Resumo profissional deve ter pelo menos 50 caracteres');
        }
        
        return errors;
    }

    // Função para calcular pontuação do currículo
    function calculateResumeScore() {
        let score = 0;
        const maxScore = 100;
        
        // Informações pessoais (20 pontos)
        if (resumeData.personalInfo.name) score += 5;
        if (resumeData.personalInfo.email) score += 5;
        if (resumeData.personalInfo.phone) score += 5;
        if (resumeData.personalInfo.linkedin) score += 5;
        
        // Resumo profissional (15 pontos)
        if (resumeData.summary && resumeData.summary.length > 100) score += 15;
        else if (resumeData.summary && resumeData.summary.length > 50) score += 10;
        
        // Habilidades técnicas (25 pontos)
        if (resumeData.skills.programming.length >= 3) score += 10;
        if (resumeData.skills.frameworks.length >= 5) score += 8;
        if (resumeData.skills.tools.length >= 5) score += 7;
        
        // Experiência (25 pontos)
        const experienceElements = document.querySelectorAll('.experience-item');
        if (experienceElements.length >= 3) score += 25;
        else if (experienceElements.length >= 2) score += 20;
        else if (experienceElements.length >= 1) score += 15;
        
        // Educação (10 pontos)
        const educationElements = document.querySelectorAll('.education-item');
        if (educationElements.length >= 1) score += 10;
        
        // Certificações (5 pontos)
        const certElements = document.querySelectorAll('.cert-item');
        if (certElements.length >= 2) score += 5;
        
        return Math.min(score, maxScore);
    }

    // Função para sugerir melhorias no currículo
    function suggestImprovements() {
        const suggestions = [];
        const score = calculateResumeScore();
        
        if (score < 60) {
            suggestions.push('Adicione mais informações de contato');
            suggestions.push('Expanda seu resumo profissional');
        }
        
        if (resumeData.skills.programming.length < 3) {
            suggestions.push('Adicione mais linguagens de programação');
        }
        
        const projectElements = document.querySelectorAll('.project-item');
        if (projectElements.length < 3) {
            suggestions.push('Inclua mais projetos para demonstrar suas habilidades');
        }
        
        const certElements = document.querySelectorAll('.cert-item');
        if (certElements.length < 3) {
            suggestions.push('Obtenha mais certificações para validar suas competências');
        }
        
        return suggestions;
    }

    // Função para exportar dados do currículo
    function exportResumeData() {
        const exportData = {
            ...resumeData,
            generatedAt: new Date().toISOString(),
            score: calculateResumeScore(),
            suggestions: suggestImprovements()
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
            type: 'application/json' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'curriculo-dados.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Função para integração com ATS (Applicant Tracking System)
    function optimizeForATS() {
        const atsKeywords = [
            'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'SQL',
            'Agile', 'Scrum', 'Git', 'API', 'Database', 'Frontend',
            'Backend', 'Full Stack', 'DevOps', 'Cloud', 'Machine Learning'
        ];
        
        const resumeText = document.getElementById('resume-content').textContent.toLowerCase();
        const foundKeywords = atsKeywords.filter(keyword => 
            resumeText.includes(keyword.toLowerCase())
        );
        
        const missingKeywords = atsKeywords.filter(keyword => 
            !resumeText.includes(keyword.toLowerCase())
        );
        
        console.log('🤖 Análise ATS:');
        console.log('✅ Palavras-chave encontradas:', foundKeywords);
        console.log('⚠️ Palavras-chave em falta:', missingKeywords);
        
        return {
            score: Math.round((foundKeywords.length / atsKeywords.length) * 100),
            found: foundKeywords,
            missing: missingKeywords
        };
    }

    // Função para gerar versões do currículo por área
    function generateSpecializedVersions() {
        const versions = {
            frontend: {
                title: 'Desenvolvedor Frontend',
                highlightedSkills: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Bootstrap'],
                summary: 'Desenvolvedor Frontend especializado em criar interfaces modernas e responsivas...'
            },
            backend: {
                title: 'Desenvolvedor Backend',
                highlightedSkills: ['Python', 'Node.js', 'API', 'Database', 'AWS'],
                summary: 'Desenvolvedor Backend com experiência em arquitetura de sistemas e APIs...'
            },
            fullstack: {
                title: 'Desenvolvedor Full Stack',
                highlightedSkills: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'SQL'],
                summary: 'Desenvolvedor Full Stack com conhecimento completo do ciclo de desenvolvimento...'
            },
            data: {
                title: 'Analista de Dados',
                highlightedSkills: ['Python', 'Pandas', 'NumPy', 'Power BI', 'SQL'],
                summary: 'Analista de Dados especializado em transformar dados em insights estratégicos...'
            }
        };
        
        return versions;
    }

    // Função para personalizar currículo para vaga específica
    function customizeForJob(jobDescription) {
        // Esta função analisaria a descrição da vaga e
        // sugeriria personalizações no currículo
        
        const keywords = extractKeywordsFromJob(jobDescription);
        const recommendations = [];
        
        keywords.forEach(keyword => {
            if (!document.getElementById('resume-content').textContent.toLowerCase().includes(keyword.toLowerCase())) {
                recommendations.push(`Considere adicionar "${keyword}" ao seu currículo`);
            }
        });
        
        return recommendations;
    }

    // Extrair palavras-chave de descrição de vaga
    function extractKeywordsFromJob(description) {
        const commonKeywords = [
            'agile', 'scrum', 'javascript', 'python', 'react', 'angular', 'vue',
            'node.js', 'express', 'mongodb', 'mysql', 'postgresql', 'aws', 'azure',
            'docker', 'kubernetes', 'ci/cd', 'git', 'api', 'rest', 'graphql',
            'typescript', 'sass', 'webpack', 'testing', 'jest', 'cypress'
        ];
        
        const lowerDescription = description.toLowerCase();
        return commonKeywords.filter(keyword => 
            lowerDescription.includes(keyword)
        );
    }

    // Função para tracking de visualizações do currículo
    function trackResumeView() {
        // Simular tracking de analytics
        const viewData = {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            url: window.location.href
        };
        
        console.log('📊 Visualização do currículo registrada:', viewData);
        
        // Em uma implementação real, enviaria para analytics
        // sendToAnalytics(viewData);
    }

    // Função para backup automático
    function autoBackup() {
        setInterval(() => {
            const backupData = {
                resumeData,
                timestamp: new Date().toISOString(),
                version: '1.0'
            };
            
            localStorage.setItem('resume-backup', JSON.stringify(backupData));
            console.log('💾 Backup automático realizado');
        }, 300000); // A cada 5 minutos
    }

    // Função para restaurar backup
    function restoreFromBackup() {
        try {
            const backup = localStorage.getItem('resume-backup');
            if (backup) {
                const backupData = JSON.parse(backup);
                console.log('🔄 Backup encontrado:', backupData.timestamp);
                return backupData.resumeData;
            }
        } catch (error) {
            console.error('❌ Erro ao restaurar backup:', error);
        }
        return null;
    }

    // Função para modo de apresentação
    function togglePresentationMode() {
        const body = document.body;
        if (body.classList.contains('presentation-mode')) {
            body.classList.remove('presentation-mode');
            showNotification('Modo de apresentação desativado', 'info');
        } else {
            body.classList.add('presentation-mode');
            showNotification('Modo de apresentação ativado', 'success');
        }
    }

    // Adicionar estilos do modo apresentação
    function addPresentationStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .presentation-mode .page-header,
            .presentation-mode .breadcrumb-nav,
            .presentation-mode .resume-actions {
                display: none !important;
            }
            
            .presentation-mode .resume-container {
                max-width: 100%;
                padding: 0;
            }
            
            .presentation-mode .resume-content {
                border-radius: 0;
                box-shadow: none;
            }
        `;
        document.head.appendChild(styles);
    }

    // Função global para fechar modal (para compatibilidade)
    window.closeEditModal = closeEditModal;

    // Atalhos de teclado
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'd':
                        e.preventDefault();
                        downloadResumePDF();
                        break;
                    case 's':
                        e.preventDefault();
                        shareResume();
                        break;
                    case 'e':
                        e.preventDefault();
                        openEditModal();
                        break;
                    case 'p':
                        e.preventDefault();
                        printResume();
                        break;
                    case 'f':
                        e.preventDefault();
                        togglePresentationMode();
                        break;
                }
            }
        });
    }

    // Verificar compatibilidade do navegador
    function checkBrowserSupport() {
        const features = {
            intersectionObserver: 'IntersectionObserver' in window,
            webShare: 'share' in navigator,
            clipboard: 'clipboard' in navigator,
            printSupport: 'print' in window
        };
        
        console.log('🌐 Suporte do navegador:', features);
        
        if (!features.intersectionObserver) {
            console.warn('⚠️ IntersectionObserver não suportado, animações podem não funcionar');
        }
        
        return features;
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initialize();
            addPresentationStyles();
            setupKeyboardShortcuts();
            checkBrowserSupport();
            trackResumeView();
            autoBackup();
        });
    } else {
        initialize();
        addPresentationStyles();
        setupKeyboardShortcuts();
        checkBrowserSupport();
        trackResumeView();
        autoBackup();
    }
}

// Chamar a função de inicialização
initCurriculo();