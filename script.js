// Animação de maquina de escrever com GSAP

const text = "Software Developer.";
const element = document.getElementById("typewriter");
setTimeout(() => {
  gsap.to(
    {},
    {
      duration: 0.1,
      repeat: text.length - 1,
      repeatDelay: 0.03,
      onRepeat: function () {
        const currentLength = element.textContent.length;
        element.textContent = text.slice(0, currentLength + 1);
      },
    }
  );
}, 1000);
// Animação de bouncing com GSAP no icone da Hero Secton
const heroIcon = document.getElementById("hero-arrow-icon");

gsap.to(heroIcon, {
  y: 10, // quanto vai "quicar" (px)
  duration: 0.5, // duração do movimento
  ease: "sine.inOut", // suavidade do bounce
  repeat: -1, // repetir infinitamente
  yoyo: true, // volta à posição original
});

// Efeito de hover no Hero Section da Frase "Me conheça"
const heroTitle = document.getElementById("hero-arrow-title");

// Anima ao entrar no hover
heroIcon.addEventListener("mouseenter", () => {
  heroTitle.classList.remove("hidden");
  gsap.to(heroTitle, {
    opacity: 1,
    duration: 0.7,
    ease: "power2.in",
    pointerEvents: "auto",
  });
});

// Anima ao sair do hover
heroIcon.addEventListener("mouseleave", () => {
  heroTitle.classList.add("hidden");
  gsap.to(heroTitle, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    pointerEvents: "auto",
  });
});

// Código para interatividade do header do Web
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const nav = document.getElementById("web-navbar");
  const navLinks = nav.querySelectorAll("a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = nav.querySelector(`a[href="#${id}"]`);

        if (entry.isIntersecting) {
          // Remove o destaque de todos
          navLinks.forEach((link) => link.classList.remove("bg-[#3B82F6]"));

          // Adiciona o destaque ao atual
          if (link) {
            link.classList.add("bg-[#3B82F6]");
          }
        }
      });
    },
    {
      threshold: 0.5, // 50% da seção precisa estar visível
    }
  );

  sections.forEach((section) => observer.observe(section));
});

// Código para a section de Skills
const skillsData = {
  frontend: [
    { name: "HTML", class: "frontend-skill", icon: "🌐" },
    { name: "CSS", class: "frontend-skill", icon: "🎨" },
    { name: "JavaScript", class: "frontend-skill", icon: "⚡" },
    { name: "React", class: "frontend-skill", icon: "⚛️" },
  ],
  backend: [
    { name: "Python", class: "backend-skill", icon: "🐍" },
    { name: "Node.js", class: "backend-skill", icon: "🟢" },
    { name: "Django", class: "backend-skill", icon: "🧩" },
  ],
  mobile: [
    { name: "Flutter", class: "mobile-skill", icon: "📱" },
    { name: "React Native", class: "mobile-skill", icon: "📲" },
    { name: "Swift", class: "mobile-skill", icon: "🍎" },
  ],
  ai: [
    { name: "TensorFlow", class: "ai-skill", icon: "🧠" },
    { name: "PyTorch", class: "ai-skill", icon: "🔥" },
    { name: "Scikit-Learn", class: "ai-skill", icon: "📊" },
  ],
};

const skillsContainer = document.getElementById("skills-container");
const categoryButtons = document.querySelectorAll(".category-btn");
const mainTitle = document.getElementById("main-title");
const subTitle = document.getElementById("sub-title");

function renderSkills(category) {
  // Limpar skills antigas
  skillsContainer.innerHTML = "";

  const skills = skillsData[category];

  skills.forEach((skill) => {
    const a = document.createElement("a");
    a.href = "#";
    a.className = `skill-tag inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded ${skill.class}`;
    a.innerHTML = `<span>${skill.icon}</span> ${skill.name}`;
    a.addEventListener("click", () => {
      mainTitle.textContent = `Você selecionou: ${skill.name}`;
      subTitle.textContent = `Categoria: ${
        category.charAt(0).toUpperCase() + category.slice(1)
      }`;
    });
    skillsContainer.appendChild(a);
  });

  // Animar entrada com GSAP
  gsap.from(".skill-tag", {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.5,
    ease: "power2.out",
  });
}

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    renderSkills(category);
  });
});

renderSkills("frontend");
