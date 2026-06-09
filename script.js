// Dados dos cursos (sem botões)
const cursosData = [
    { icon: "fab fa-html5", name: "Desenvolvimento Web", description: "Aprenda HTML, CSS e JavaScript criando sites profissionais e responsivos." },
    { icon: "fab fa-js", name: "JavaScript Moderno", description: "Domine ES6+, assincronismo, promises e frameworks modernos." },
    { icon: "fab fa-python", name: "Python para Iniciantes", description: "Introdução à programação com Python, lógica e primeiros projetos." },
    { icon: "fas fa-database", name: "Banco de Dados", description: "SQL, modelagem de dados e integração com aplicações." },
    { icon: "fab fa-react", name: "Full Stack", description: "Front-end e back-end completos com React e Node.js." },
    { icon: "fas fa-brain", name: "Inteligência Artificial", description: "Machine Learning e IA aplicada com Python e TensorFlow." }
];

// Dados dos diferenciais
const diferenciaisData = [
    { icon: "fas fa-chalkboard-teacher", title: "Professores especialistas", description: "Mentores atuantes no mercado tech com vasta experiência." },
    { icon: "fas fa-certificate", title: "Certificado reconhecido", description: "Certificação válida em todo território nacional." },
    { icon: "fas fa-laptop-code", title: "Projetos práticos", description: "Construa um portfólio completo durante o curso." },
    { icon: "fas fa-headset", title: "Suporte ao aluno", description: "Atendimento personalizado e plantão de dúvidas." },
    { icon: "fas fa-video", title: "Aulas online e presenciais", description: "Flexibilidade total para seu aprendizado." },
    { icon: "fas fa-users", title: "Comunidade exclusiva", description: "Networking e suporte entre alunos e professores." }
];

// Dados dos depoimentos
const depoimentosData = [
    { name: "Beatriz Polassi", course: "Desenvolvimento Web", comment: "Curso excelente! Em 6 meses consegui minha primeira vaga como dev junior.", stars: 5 },
    { name: "Davi Senna", course: "JavaScript Moderno", comment: "Metodologia prática e professores incríveis. Recomendo demais!", stars: 5 },
    { name: "Julia Fernandes", course: "Full Stack", comment: "Melhor escola de tecnologia que já estudei. Projetos reais que preparam para o mercado.", stars: 5 }
];

// Renderizar cursos (sem botão)
function renderCursos() {
    const container = document.getElementById('cursosGrid');
    if (!container) return;
    
    container.innerHTML = cursosData.map(curso => `
        <div class="card">
            <div class="card-icon">
                <i class="${curso.icon}"></i>
            </div>
            <h3>${curso.name}</h3>
            <p>${curso.description}</p>
        </div>
    `).join('');
}

// Renderizar diferenciais
function renderDiferenciais() {
    const container = document.getElementById('diferenciaisGrid');
    if (!container) return;
    
    container.innerHTML = diferenciaisData.map(diferencial => `
        <div class="card">
            <div class="card-icon">
                <i class="${diferencial.icon}"></i>
            </div>
            <h3>${diferencial.title}</h3>
            <p>${diferencial.description}</p>
        </div>
    `).join('');
}

// Renderizar depoimentos
function renderDepoimentos() {
    const container = document.getElementById('depoimentosGrid');
    if (!container) return;
    
    container.innerHTML = depoimentosData.map(depoimento => {
        const stars = '★'.repeat(depoimento.stars) + '☆'.repeat(5 - depoimento.stars);
        return `
            <div class="depoimento-card">
                <div class="depoimento-header">
                    <div class="depoimento-foto">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="depoimento-info">
                        <h4>${depoimento.name}</h4>
                        <p>${depoimento.course}</p>
                        <div class="stars">${stars}</div>
                    </div>
                </div>
                <p class="depoimento-texto">"${depoimento.comment}"</p>
            </div>
        `;
    }).join('');
}

// Menu Mobile
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Scroll Suave e Menu Ativo
function initScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, #hero, .cta-final');
    
    function updateActiveSection() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Fechar menu mobile
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                }
            }
        });
    });
}

// Animações ao rolar
function initScrollAnimations() {
    const cards = document.querySelectorAll('.card, .depoimento-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    cards.forEach(card => observer.observe(card));
}

// Validação do Formulário
function initFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const telefone = document.getElementById('telefone');
            const mensagem = document.getElementById('mensagem');
            
            let isValid = true;
            
            if (!nome.value.trim()) {
                showError(nome, 'Nome é obrigatório');
                isValid = false;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'E-mail inválido');
                isValid = false;
            }
            
            if (!telefone.value.trim()) {
                showError(telefone, 'Telefone é obrigatório');
                isValid = false;
            }
            
            if (!mensagem.value.trim()) {
                showError(mensagem, 'Mensagem é obrigatória');
                isValid = false;
            }
            
            if (isValid) {
                alert('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
            }
        });
        
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = '#334155';
            });
        });
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(field, message) {
    field.style.borderColor = '#EF4444';
    alert(`❌ ${message}`);
}

// Botões de navegação
function initButtons() {
    const scrollCursosBtn = document.getElementById('scrollCursosBtn');
    const scrollContatoBtn = document.getElementById('scrollContatoBtn');
    const ctaMatriculaBtn = document.getElementById('ctaMatriculaBtn');
    const matriculaBtns = document.querySelectorAll('.btn-matricula, .btn-matricula-mobile');
    
    if (scrollCursosBtn) {
        scrollCursosBtn.addEventListener('click', () => {
            document.querySelector('#cursos').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (scrollContatoBtn) {
        scrollContatoBtn.addEventListener('click', () => {
            document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (ctaMatriculaBtn) {
        ctaMatriculaBtn.addEventListener('click', () => {
            document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    matriculaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('#contato').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Header efeito ao scroll
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.98)';
            header.style.borderBottom = '1px solid rgba(59, 130, 246, 0.3)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.borderBottom = '1px solid rgba(59, 130, 246, 0.2)';
        }
    });
}

// Newsletter
function initNewsletter() {
    const newsletterBtn = document.querySelector('.newsletter-form button');
    const newsletterInput = document.querySelector('.newsletter-form input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', () => {
            if (newsletterInput.value.trim() && isValidEmail(newsletterInput.value)) {
                alert('📧 Inscrito com sucesso! Você receberá nossas novidades.');
                newsletterInput.value = '';
            } else {
                alert('⚠️ Por favor, insira um e-mail válido.');
            }
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderCursos();
    renderDiferenciais();
    renderDepoimentos();
    initMobileMenu();
    initScroll();
    initScrollAnimations();
    initFormValidation();
    initButtons();
    initHeaderScroll();
    initNewsletter();
});