// js/pages/roadmaps.js

export function init() {
    // Simulação de roadmaps
    const roadmaps = [
        {
            id: 1,
            title: "Front-End Developer",
            area: "Front-End",
            steps: [
                { skill: "HTML", desc: "Estruturação de páginas web", done: true },
                { skill: "CSS", desc: "Estilização e responsividade", done: true },
                { skill: "JavaScript", desc: "Lógica, DOM e ES6+", done: true },
                { skill: "React", desc: "Componentização e hooks", done: false },
                { skill: "Testes", desc: "Testes unitários e integração", done: false }
            ]
        },
        {
            id: 2,
            title: "Back-End Developer",
            area: "Back-End",
            steps: [
                { skill: "Node.js", desc: "APIs e servidores", done: false },
                { skill: "SQL", desc: "Banco de dados relacional", done: false },
                { skill: "Docker", desc: "Containers e deploy", done: false },
                { skill: "Git", desc: "Controle de versão", done: true }
            ]
        },
        {
            id: 3,
            title: "Cloud Specialist",
            area: "Cloud",
            steps: [
                { skill: "AWS", desc: "Serviços essenciais da AWS", done: false },
                { skill: "Terraform", desc: "Infraestrutura como código", done: false },
                { skill: "CI/CD", desc: "Pipelines de automação", done: false }
            ]
        }
    ];

    // Renderiza lista de roadmaps
    function renderRoadmapsList() {
        const container = document.getElementById('roadmaps-list-container');
        container.innerHTML = '';
        roadmaps.forEach(roadmap => {
            // Calcula progresso
            const total = roadmap.steps.length;
            const done = roadmap.steps.filter(s => s.done).length;
            const percent = Math.round((done / total) * 100);
            container.innerHTML += `
                <div class="roadmap-card" data-roadmap-id="${roadmap.id}">
                    <div class="roadmap-card-header">
                        <h4>${roadmap.title}</h4>
                        <span class="roadmap-area">${roadmap.area}</span>
                    </div>
                    <div class="roadmap-progress-bar">
                        <div class="roadmap-progress" style="width:${percent}%;"></div>
                    </div>
                    <span class="roadmap-progress-label">${percent}% concluído</span>
                </div>
            `;
        });
        // Evento de clique para abrir detalhe
        document.querySelectorAll('.roadmap-card').forEach(card => {
            card.addEventListener('click', () => {
                const roadmapId = parseInt(card.getAttribute('data-roadmap-id'));
                showRoadmapDetail(roadmapId);
            });
        });
    }

    // Detalhe do roadmap
    function showRoadmapDetail(roadmapId) {
        const roadmap = roadmaps.find(r => r.id === roadmapId);
        if (!roadmap) return;
        document.getElementById('roadmap-detail-title').textContent = roadmap.title;
        document.getElementById('roadmap-detail-area').textContent = roadmap.area;
        document.getElementById('roadmap-detail-steps').innerHTML = roadmap.steps.map(step => `
            <li class="roadmap-step ${step.done ? 'done' : ''}">
                <span class="material-icons-outlined">${step.done ? 'check_circle' : 'radio_button_unchecked'}</span>
                <strong>${step.skill}</strong> — ${step.desc}
            </li>
        `).join('');
        document.getElementById('roadmap-detail-view').style.display = 'block';
        document.getElementById('roadmaps-list-container').style.display = 'none';
    }

    function hideRoadmapDetail() {
        document.getElementById('roadmap-detail-view').style.display = 'none';
        document.getElementById('roadmaps-list-container').style.display = 'flex';
    }

    document.getElementById('back-to-roadmaps-btn').onclick = hideRoadmapDetail;

    renderRoadmapsList();
}