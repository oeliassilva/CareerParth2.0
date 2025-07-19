// js/pages/comunidade.js

export function init() {
    // Simulação de feed da comunidade
    let perguntas = [
        {
            id: 1,
            user: {
                nome: "Elias Silva",
                avatar: "/assets/images/perfil-elias-silva.png"
            },
            texto: "Alguém recomenda um curso de Terraform para quem está começando?",
            tags: ["DevOps", "Terraform", "Iniciante"],
            respostas: [
                {
                    nome: "Ana Souza",
                    avatar: "/assets/images/avatar-ana.png",
                    texto: "Eu fiz o da Udemy e gostei bastante! Tem muitos exemplos práticos."
                }
            ]
        },
        {
            id: 2,
            user: {
                nome: "Carlos Lima",
                avatar: "/assets/images/avatar-carlos.png"
            },
            texto: "Qual a melhor forma de estudar para a certificação AWS Cloud Practitioner?",
            tags: ["AWS", "Certificação", "Cloud"],
            respostas: [
                {
                    nome: "Elias Silva",
                    avatar: "/assets/images/perfil-elias-silva.png",
                    texto: "Recomendo o curso oficial da AWS Academy e muitos simulados!"
                },
                {
                    nome: "João Pedro",
                    avatar: "/assets/images/avatar-joao.png",
                    texto: "Foca nos tópicos de billing e segurança, caem bastante na prova."
                }
            ]
        }
    ];

    // Renderiza o feed
    function renderFeed() {
        const container = document.getElementById('comunidade-feed-container');
        container.innerHTML = '';
        if (perguntas.length === 0) {
            container.innerHTML = '<p>Nenhuma dúvida ainda. Seja o primeiro a perguntar!</p>';
            return;
        }
        perguntas.forEach(pergunta => {
            container.innerHTML += `
                <div class="comunidade-question-card" data-id="${pergunta.id}">
                    <div class="comunidade-question-header">
                        <img src="${pergunta.user.avatar}" alt="Avatar" class="comunidade-avatar">
                        <span class="comunidade-user-name">${pergunta.user.nome}</span>
                    </div>
                    <div class="comunidade-question-text">${pergunta.texto}</div>
                    <div class="comunidade-tags">
                        ${pergunta.tags.map(tag => `<span class="comunidade-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="comunidade-respostas">
                        ${pergunta.respostas.map(resp => `
                            <div class="comunidade-resposta">
                                <img src="${resp.avatar}" alt="Avatar" class="comunidade-avatar">
                                <span class="comunidade-user-name">${resp.nome}</span>
                                <span class="comunidade-resposta-text">${resp.texto}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="comunidade-responder-bar">
                        <input type="text" class="resposta-input" placeholder="Responder...">
                        <button class="responder-btn">Enviar</button>
                    </div>
                </div>
            `;
        });

        // Eventos de resposta
        document.querySelectorAll('.comunidade-question-card').forEach(card => {
            const perguntaId = parseInt(card.getAttribute('data-id'));
            const input = card.querySelector('.resposta-input');
            const btn = card.querySelector('.responder-btn');
            btn.onclick = () => {
                const texto = input.value.trim();
                if (!texto) return;
                // Simula resposta do usuário logado (Elias)
                perguntas = perguntas.map(p => {
                    if (p.id === perguntaId) {
                        p.respostas.push({
                            nome: "Elias Silva",
                            avatar: "/assets/images/perfil-elias-silva.png",
                            texto
                        });
                    }
                    return p;
                });
                renderFeed();
            };
        });
    }

    // Postar nova pergunta
    document.getElementById('postar-pergunta-btn').onclick = () => {
        const input = document.getElementById('nova-pergunta-input');
        const texto = input.value.trim();
        if (!texto) return;
        perguntas.unshift({
            id: Date.now(),
            user: {
                nome: "Elias Silva",
                avatar: "/assets/images/perfil-elias-silva.png"
            },
            texto,
            tags: [],
            respostas: []
        });
        input.value = '';
        renderFeed();
    };

    renderFeed();
}