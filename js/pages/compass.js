// js/pages/compass.js

export function init() {
    console.log('🚀 Compass IA carregado!');
    
    // Configurar header fixo para esta página
    if (window.setupPageHeader) {
        window.setupPageHeader();
    } else {
        // Fallback caso a função global não esteja disponível
        console.log('⚠️ setupPageHeader não encontrado, aplicando manualmente...');
        setTimeout(() => {
            const header = document.querySelector('.page-header');
            if (header) {
                header.style.setProperty('background-color', '#0D253F', 'important');
                header.style.setProperty('color', '#ffffff', 'important');
                header.style.setProperty('position', 'sticky', 'important');
                header.style.setProperty('top', '0', 'important');
                header.style.setProperty('z-index', '1000', 'important');
                header.style.setProperty('padding', '16px 24px', 'important');
                header.style.setProperty('margin-bottom', '0', 'important');
                header.style.setProperty('box-shadow', '0 2px 12px rgba(13, 37, 63, 0.3)', 'important');
                header.style.setProperty('font-size', '2em', 'important');
                header.style.setProperty('font-weight', '600', 'important');
                header.style.setProperty('display', 'flex', 'important');
                header.style.setProperty('align-items', 'center', 'important');
                header.style.setProperty('gap', '15px', 'important');
                
                // Ícones e spans em branco
                const icons = header.querySelectorAll('.material-icons-outlined, span');
                icons.forEach(el => {
                    el.style.setProperty('color', '#ffffff', 'important');
                    el.style.setProperty('font-weight', '600', 'important');
                });
                
                // Efeito de scroll
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 10) {
                        header.style.setProperty('background-color', '#0A1B2F', 'important');
                        header.style.setProperty('box-shadow', '0 4px 20px rgba(13, 37, 63, 0.4)', 'important');
                    } else {
                        header.style.setProperty('background-color', '#0D253F', 'important');
                        header.style.setProperty('box-shadow', '0 2px 12px rgba(13, 37, 63, 0.3)', 'important');
                    }
                });
                
                console.log('✅ Header do Compass configurado manualmente!');
            } else {
                console.error('❌ Header .page-header não encontrado! Verifique se foi adicionado no HTML.');
            }
        }, 100);
    }

    // Elementos do chat
    const chatHistory = document.getElementById('compass-chat-history');
    const chatForm = document.getElementById('compass-chat-form');
    const chatInput = document.getElementById('compass-chat-input');
    const quickActions = document.querySelectorAll('.compass-quick-actions button');

    // Simulação de perfil do usuário (pode importar de outro módulo depois)
    const userProfile = {
        nome: "Elias Silva",
        skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Git', 'Python'],
        certifications: [
            'AWS Cloud Practitioner',
            'AWS Machine Learning Engineer',
            'Oracle Certified Professional',
            'Python'
        ],
        softSkills: ['Liderança', 'Trabalho em Equipe', 'Pens. Analítico', 'Pens. Criativo', 'Resiliência', 'Empatia'],
        cursos: [
            'JavaScript Moderno', 'React Completo', 'Python Essencial', 'AWS Foundations'
        ]
    };

    // Respostas simuladas da IA
    function getCompassResponse(question) {
        const q = question.toLowerCase();

        if (q.includes('vaga') && q.includes('combina')) {
            return `Com base no seu perfil, as vagas que mais combinam com você são: <b>Dev. Front-End Jr. (Itaú)</b> e <b>Dev. Back-End Jr. (iFood)</b>.`;
        }
        if (q.includes('dica de carreira')) {
            return `Dica de carreira: Invista em projetos práticos e mantenha seu portfólio atualizado. Networking também é fundamental!`;
        }
        if (q.includes('curso')) {
            return `Sugestão de cursos para você: <ul><li>React Completo</li><li>Python Essencial</li><li>Infraestrutura como Código com Terraform</li></ul>`;
        }
        if (q.includes('professor') || q.includes('dúvida') || q.includes('pergunta')) {
            return `Estou aqui para tirar suas dúvidas! Pergunte sobre tecnologia, carreira, ou qualquer tema do seu interesse.`;
        }
        if (q.includes('o que eu sei sobre python')) {
            return `Você já possui conhecimento em <b>Python</b> e concluiu o curso "Python Essencial". Também possui a certificação "Python".`;
        }
        if (q.includes('match') && q.includes('vaga')) {
            return `Para conquistar a vaga dos sonhos, foque em aprimorar as habilidades que ainda faltam para o match perfeito. Quer analisar uma vaga específica?`;
        }
        if (q.includes('olá') || q.includes('oi')) {
            return `Olá! Eu sou a Compass IA, sua assistente de carreira. Como posso te ajudar hoje?`;
        }
        // Resposta padrão
        return `Compass IA: Ainda não tenho uma resposta pronta para isso, mas estou aprendendo mais a cada dia!`;
    }

    function addMessage(message, sender = 'user') {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'compass-message ' + (sender === 'user' ? 'user' : 'ia');
        msgDiv.innerHTML = message;
        chatHistory.appendChild(msgDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // Event listeners
    if (chatForm) {
        chatForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const question = chatInput.value.trim();
            if (!question) return;
            
            addMessage(question, 'user');
            chatInput.value = '';
            
            // Simula delay de resposta da IA
            setTimeout(() => {
                const response = getCompassResponse(question);
                addMessage(response, 'ia');
            }, 600);
        });
    }

    // Botões de ação rápida
    quickActions.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            if (question && chatInput) {
                chatInput.value = question;
                if (chatForm) {
                    chatForm.dispatchEvent(new Event('submit'));
                }
            }
        });
    });

    // Mensagem de boas-vindas
    setTimeout(() => {
        addMessage('Olá! Eu sou a Compass IA, sua assistente de carreira. Como posso te ajudar hoje?', 'ia');
    }, 500);

    console.log('✅ Compass IA totalmente inicializado!');
}