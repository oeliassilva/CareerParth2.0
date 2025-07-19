document.addEventListener("DOMContentLoaded", () => {

    // Função para animar o círculo de progresso
    const animateMatchScore = () => {
        const circle = document.querySelector('.progress-circle-fill');
        if (!circle) return;

        const progressCircle = circle.closest('.progress-circle');
        // Adicionada uma verificação para garantir que o elemento pai foi encontrado
        if (!progressCircle) {
            console.error("Elemento .progress-circle não encontrado.");
            return;
        }

        const percentage = progressCircle.dataset.percentage;
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        circle.style.strokeDashoffset = offset;
    };

    // Função para animar a entrada dos cards
    const animateCardsOnScroll = () => {
        const cards = document.querySelectorAll('.card');
        if (cards.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // O delay da transição agora é aplicado a cada card individualmente
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
            observer.observe(card);
        });
    };

    // Função para interatividade entre skills e cursos
    const setupSkillCourseInteraction = () => {
        const gapSkills = document.querySelectorAll('.skill-tag.gap');
        const courseCards = document.querySelectorAll('.course-card');

        if (gapSkills.length === 0 || courseCards.length === 0) return;

        gapSkills.forEach(skill => {
            skill.addEventListener('click', () => {
                const skillName = skill.dataset.skill;

                courseCards.forEach(card => card.classList.remove('highlight'));
                
                const relevantCourses = document.querySelectorAll(`.course-card[data-for-skill="${skillName}"]`);
                if (relevantCourses.length > 0) {
                     relevantCourses.forEach(course => {
                        course.classList.add('highlight');
                    });
                    // Rola a tela suavemente até o primeiro curso destacado
                    relevantCourses[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    };

    // Inicializa todas as funcionalidades
    animateMatchScore();
    animateCardsOnScroll();
    setupSkillCourseInteraction();
});