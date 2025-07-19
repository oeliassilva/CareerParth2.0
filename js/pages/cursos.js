// js/pages/cursos.js

export function init() {
    // Simulação de cursos parceiros
    const cursos = [
        {
            id: 1,
            title: "React Completo",
            partner: "Alura",
            area: "Front-End",
            description: "Aprenda React do básico ao avançado, criando aplicações modernas e performáticas.",
            skills: ["React", "JavaScript", "Hooks", "SPA"]
        },
        {
            id: 2,
            title: "Node.js e Express na Prática",
            partner: "Rocketseat",
            area: "Back-End",
            description: "Construa APIs robustas e escaláveis com Node.js e Express.",
            skills: ["Node.js", "Express", "API REST", "JavaScript"]
        },
        {
            id: 3,
            title: "AWS Foundations",
            partner: "AWS Academy",
            area: "Cloud",
            description: "Fundamentos essenciais para quem quer iniciar na nuvem AWS.",
            skills: ["AWS", "Cloud", "S3", "EC2"]
        },
        {
            id: 4,
            title: "Python Essencial",
            partner: "DIO",
            area: "Dados",
            description: "Domine a linguagem Python para análise de dados e automação.",
            skills: ["Python", "Automação", "Análise de Dados"]
        },
        {
            id: 5,
            title: "Infraestrutura como Código com Terraform",
            partner: "Udemy",
            area: "DevOps",
            description: "Implemente e gerencie infraestruturas modernas usando Terraform.",
            skills: ["Terraform", "IaC", "Cloud", "DevOps"]
        }
    ];

    // Simulação de perfil do usuário
    const userProfile = {
        skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Git', 'Python'],
        certifications: [
            'AWS Cloud Practitioner',
            'AWS Machine Learning Engineer',
            'Oracle Certified Professional',
            'Python'
        ]
    };

    // Função para simular resposta da Compass IA
    function perguntarCompassSobreCurso(curso) {
        // Exemplo de lógica simples: se o usuário já tem todas as skills do curso, diz que já domina
        const missing = curso.skills.filter(skill => !userProfile.skills.includes(skill));
        if (missing.length === 0) {
            return `Você já domina todas as habilidades abordadas neste curso! Que tal buscar um desafio mais avançado?`;
        }
        return `Este curso vai te ajudar a desenvolver: <b>${missing.join(', ')}</b>. Ótima escolha para evoluir seu perfil!`;
    }

    // Renderiza lista de cursos
    function renderCursosList(lista) {
        const container = document.getElementById('cursos-list-container');
        container.innerHTML = '';
        if (lista.length === 0) {
            container.innerHTML = '<p>Nenhum curso encontrado com os filtros selecionados.</p>';
            return;
        }
        lista.forEach(curso => {
            container.innerHTML += `
                <div class="curso-card" data-curso-id="${curso.id}">
                    <div class="curso-card-header">
                        <h4>${curso.title}</h4>
                        <span class="curso-partner">${curso.partner}</span>
                    </div>
                    <div class="curso-card-body">
                        <span class="curso-area">${curso.area}</span>
                        <p>${curso.description}</p>
                        <div class="curso-skills">
                            ${curso.skills.map(skill => `<span class="curso-skill">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        // Evento de clique para abrir detalhe
        document.querySelectorAll('.curso-card').forEach(card => {
            card.addEventListener('click', () => {
                const cursoId = parseInt(card.getAttribute('data-curso-id'));
                showCursoDetail(cursoId);
            });
        });
    }

    // Filtro
    function applyFiltersAndRender() {
        const areaSelect = document.getElementById('area-filter-select');
        const searchInput = document.getElementById('curso-search-input');
        const area = areaSelect.value;
        const search = searchInput.value.toLowerCase().trim();
        let filtered = cursos;
        if (area !== 'all') {
            filtered = filtered.filter(curso => curso.area === area);
        }
        if (search) {
            filtered = filtered.filter(curso =>
                curso.title.toLowerCase().includes(search) ||
                curso.skills.some(skill => skill.toLowerCase().includes(search))
            );
        }
        renderCursosList(filtered);
        hideCursoDetail();
    }

    // Detalhe do curso
    function showCursoDetail(cursoId) {
        const curso = cursos.find(c => c.id === cursoId);
        if (!curso) return;
        document.getElementById('curso-detail-title').textContent = curso.title;
        document.getElementById('curso-detail-partner').textContent = curso.partner;
        document.getElementById('curso-detail-area').textContent = curso.area;
        document.getElementById('curso-detail-description').textContent = curso.description;
        document.getElementById('curso-detail-skills').innerHTML = curso.skills.map(skill => `<li>${skill}</li>`).join('');
        document.getElementById('compass-curso-response').innerHTML = '';
        document.getElementById('curso-detail-view').style.display = 'block';
        document.getElementById('cursos-list-container').style.display = 'none';
        document.querySelector('.cursos-filter-bar').style.display = 'none';

        // Botão Compass IA
        document.getElementById('perguntar-compass-btn').onclick = function() {
            const resposta = perguntarCompassSobreCurso(curso);
            document.getElementById('compass-curso-response').innerHTML = `<div class="compass-curso-msg">${resposta}</div>`;
        };
    }

    function hideCursoDetail() {
        document.getElementById('curso-detail-view').style.display = 'none';
        document.getElementById('cursos-list-container').style.display = 'flex';
        document.querySelector('.cursos-filter-bar').style.display = 'flex';
    }

    // Eventos
    document.getElementById('area-filter-select').addEventListener('change', applyFiltersAndRender);
    document.getElementById('curso-search-input').addEventListener('input', applyFiltersAndRender);
    document.getElementById('back-to-cursos-btn').addEventListener('click', hideCursoDetail);

    // Inicial
    applyFiltersAndRender();
}