document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------
    // 1. Skills
    // -----------------------------------------------------
    const skillsData = {
        'backend-skills': [
            { name: 'Java (Spring Boot)', level: 80 },
            { name: 'JavaScript (Node.js)', level: 85 },
            { name: 'TypeScript (NestJs)', level: 85 },
            { name: 'SQL y NoSQL', level: 90 },
        ],
        'frontend-skills': [
            { name: 'HTML, CSS, JS (Puro)', level: 90 },
            { name: 'Angular', level: 80 },
            { name: 'React', level: 70 },
            { name: 'Tailwind CSS (UI)', level: 60 },
        ],
        'devops-skills': [
            { name: 'Git (Control de Versiones)', level: 90 },
            { name: 'Docker (Contenedores)', level: 80 },
            { name: 'SCRUM, Kanban', level: 85 },
            { name: 'Inglés B1', level: 75 },
        ],
    };

    // -----------------------------------------------------
    // 2. FUNCIÓN PARA INYECTAR Y ANIMAR LAS HABILIDADES
    // -----------------------------------------------------
    const injectSkills = () => {
        Object.keys(skillsData).forEach(containerId => {
            const container = document.getElementById(containerId);
            if (!container) return;

            let html = '';
            skillsData[containerId].forEach(skill => {
                html += `
                            <div class="mb-4">
                                <div class="flex justify-between items-center text-sm font-medium">
                                    <span>${skill.name}</span>
                                    <span class="text-amber-500 skill-percent" data-level="${skill.level}">0%</span>
                                </div>
                                <div class="skill-bar">
                                    <div class="skill-level" data-width="${skill.level}%" style="width: 0%;"></div>
                                </div>
                            </div>
                        `;
            });
            container.innerHTML = html;
        });
    };

    const animateSkills = (target) => {
        const skillBars = target.querySelectorAll('.skill-level');
        const skillPercents = target.querySelectorAll('.skill-percent');

        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });

      
        skillPercents.forEach(span => {
            const targetLevel = parseInt(span.getAttribute('data-level'), 10);
            let currentLevel = 0;
            const increment = targetLevel / 50; 
            const interval = 30; 

            const timer = setInterval(() => {
                currentLevel += increment;
                if (currentLevel >= targetLevel) {
                    clearInterval(timer);
                    span.textContent = `${targetLevel}%`;
                } else {
                    span.textContent = `${Math.floor(currentLevel)}%`;
                }
            }, interval);
        });
    };


    // -----------------------------------------------------
    // 3. OBSERVER PARA ANIMACIÓN AL HACER SCROLL
    // -----------------------------------------------------
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                if (entry.target.id === 'habilidades') {
                    animateSkills(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); 

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));


    // -----------------------------------------------------
    // 4. LÓGICA DE NAVEGACIÓN ACTIVA
    // -----------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);


    // -----------------------------------------------------
    // 5. MENÚ MÓVIL
    // -----------------------------------------------------
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const allNavLinks = document.querySelectorAll('.nav-link');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

  
    injectSkills(); 
    lucide.createIcons(); 
    updateActiveLink(); 
});