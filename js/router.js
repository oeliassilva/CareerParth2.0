// js/router.js (VERSÃO CORRETA FINAL)

const routes = {
    '#perfil': {
        template: '/templates/perfil.html', // COM a barra no início
        script: '/js/pages/perfil.js',     // COM a barra no início
        style: '/css/pages/perfil.css'      // COM a barra no início
    },
    '#anotacoes': {
        template: '/templates/anotacoes.html', // COM a barra no início
        script: '/js/pages/anotacoes.js',     // COM a barra no início
        style: '/css/pages/anotacoes.css'      // COM a barra no início
    },
    '#vagas': {
        template: '/templates/vagas.html', // COM a barra no início
        script: '/js/pages/vagas.js',     // COM a barra no início
        style: '/css/pages/vagas.css'      // COM a barra no início
    },
    '#compass': {
        template: '/templates/compass.html', // COM a barra no início
        script: '/js/pages/compass.js',     // COM a barra no início
        style: '/css/pages/compass.css'      // COM a barra no início
    },
        '#cursos': {
        template: '/templates/cursos.html', // COM a barra no início
        script: '/js/pages/cursos.js',     // COM a barra no início
        style: '/css/pages/cursos.css'      // COM a barra no início
    },
        '#comunidade': {
        template: '/templates/comunidade.html', // COM a barra no início
        script: '/js/pages/comunidade.js',     // COM a barra no início
        style: '/css/pages/comunidade.css'      // COM a barra no início
    },

        '#roadmaps': {
        template: '/templates/roadmaps.html', // COM a barra no início
        script: '/js/pages/roadmaps.js',     // COM a barra no início
        style: '/css/pages/roadmaps.css'      // COM a barra no início
    }
    
};

const loadPageStyle = (stylePath) => {
    const oldStyle = document.getElementById('page-style');
    if (oldStyle) {
        oldStyle.remove();
    }
    const link = document.createElement('link');
    link.id = 'page-style';
    link.rel = 'stylesheet';
    link.href = stylePath;
    document.head.appendChild(link);
};

const updateActiveSidebarLink = (path) => {
    document.querySelectorAll('.sidebar-menu li').forEach(li => {
        const link = li.querySelector('a');
        if (link && link.getAttribute('href') === path) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });
};

const router = async () => {
    const hash = window.location.hash || '#perfil';
    const appContent = document.getElementById('app-content');
    
    const path = Object.keys(routes).find(p => hash.startsWith(p)) || '#perfil';
    const route = routes[path];

    updateActiveSidebarLink(path);

    if (route && appContent) {
        if (route.style) {
            loadPageStyle(route.style);
        }

        try {
            const response = await fetch(route.template);
            if (!response.ok) throw new Error(`Template não encontrado: ${route.template}`);
            
            appContent.innerHTML = await response.text();

            const pageModule = await import(route.script);
            if (pageModule.init) {
                pageModule.init();
            }
        } catch (error) {
            console.error(`Erro fatal ao carregar a rota para ${path}:`, error);
            appContent.innerHTML = `<h1>Erro ao carregar página.</h1><p>Verifique o console (F12) para detalhes técnicos.</p><p><b>Possível causa:</b> O caminho para os arquivos no <b>router.js</b> está correto? Verifique se a estrutura de pastas corresponde.</p>`;
        }
    } else {
        appContent.innerHTML = '<h1>404 - Página Não Encontrada</h1>';
    }
};

export default router;