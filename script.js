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
const sections = document.querySelectorAll("section[id]");
const nav = document.getElementById("web-navbar");
const navLinks = nav.querySelectorAll("a");

const observer = new IntersectionObserver(
  (entries, self) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = nav.querySelector(`a[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("bg-[#3B82F6]"));
        if (link) {
          link.classList.add("bg-[#3B82F6]");
        }

        if (self.unobserve) {
          let target = entry.target;

          gsap.to(target, {
            opacity: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: "power2.in",
          });
        }
      }
    });
  },
  {
    threshold: 0.5,
  }
);

sections.forEach((section) => observer.observe(section));

// Código para a section de Skills
const skillsData = {
  frontend: [
    {
      name: "HTML",
      class: "frontend-skill",
      icon: "/assets/svg/skills/HTML5.svg",
      description:
        "Linguagem de marcação usada para estruturar o conteúdo da web.",
    },
    {
      name: "CSS",
      class: "frontend-skill",
      icon: "/assets/svg/skills/CSS.svg",
      description: "Estiliza e define o layout de páginas HTML.",
    },
    {
      name: "JavaScript",
      class: "frontend-skill",
      icon: "/assets/svg/skills/js.svg",
      description: "Linguagem de programação para interatividade no navegador.",
    },
    {
      name: "Tailwind",
      class: "frontend-skill",
      icon: "/assets/svg/skills/tailwind.svg",
      description:
        "Framework CSS utilitário para construir interfaces modernas e responsivas.",
    },
    {
      name: "React",
      class: "frontend-skill",
      icon: "/assets/svg/skills/react.svg",
      description:
        "Biblioteca JavaScript para construir interfaces de usuário reativas.",
    },
    {
      name: "NextJs",
      class: "frontend-skill",
      icon: "/assets/svg/skills/nextjs.svg",
      description:
        "Framework React para aplicações web otimizadas e server-side rendering.",
    },
  ],
  backend: [
    {
      name: "Python",
      class: "backend-skill",
      icon: "/assets/svg/skills/python.svg",
      description:
        "Linguagem de programação versátil para automações, APIs e ciência de dados.",
    },
    {
      name: "Node.js",
      class: "backend-skill",
      icon: "/assets/svg/skills/nodejs.svg",
      description:
        "Ambiente de execução JavaScript para desenvolvimento de aplicações back-end.",
    },
    {
      name: "Express JS",
      class: "backend-skill",
      icon: "/assets/svg/skills/expressjs.svg",
      description: "Framework minimalista para criar APIs com Node.js.",
    },
    {
      name: "Fastify",
      class: "backend-skill",
      icon: "/assets/svg/skills/fastify.svg",
      description:
        "Framework Node.js de alto desempenho para construção de APIs.",
    },
    {
      name: "NestJS",
      class: "backend-skill",
      icon: "/assets/svg/skills/nestjs.svg",
      description:
        "Framework Node.js baseado em TypeScript para construir APIs escaláveis e modulares.",
    },
  ],
  mobile: [
    {
      name: "Swift",
      class: "mobile-skill",
      icon: "/assets/svg/skills/swift.svg",
      description: "Linguagem de programação da Apple para apps iOS e macOS.",
    },
  ],
  ai: [
    {
      name: "OpenAI",
      class: "ai-skill",
      icon: "/assets/svg/skills/openAi.svg",
      description:
        "Plataforma de inteligência artificial por trás de modelos como ChatGPT.",
    },
    {
      name: "Ollama",
      class: "ai-skill",
      icon: "/assets/svg/skills/ollama.svg",
      description:
        "Ferramenta para rodar modelos de IA localmente em sua máquina.",
    },
  ],
  design: [
    {
      name: "Figma",
      class: "design-skill",
      icon: "/assets/svg/skills/figma.svg",
      description:
        "Ferramenta de design colaborativo para criação de interfaces digitais.",
    },
    {
      name: "CapCut",
      class: "design-skill",
      icon: "/assets/svg/skills/capcut.svg",
      description:
        "Editor de vídeo intuitivo para conteúdo digital e redes sociais.",
    },
    {
      name: "Photoshop",
      class: "design-skill",
      icon: "/assets/svg/skills/photoshop.svg",
      description:
        "Software profissional para edição e manipulação de imagens.",
    },
  ],
};

const categoryButtons = document.querySelectorAll(".category-btn");
const skillsContainer = document.getElementById("skills-container");
const mainTitle = document.getElementById("skill-main-title");
const subTitle = document.getElementById("sub-title");

function renderSkills(category) {
  // Atualizar visual do botão selecionado
  categoryButtons.forEach((btn) => {
    btn.classList.remove("bg-white/5", "text-[#3B82F6]", "font-bold");
    if (btn.dataset.category === category) {
      btn.classList.add("bg-white/5", "text-[#3B82F6]", "font-bold");
    }
  });

  // Limpar skills antigas
  skillsContainer.innerHTML = "";

  const skills = skillsData[category];

  skills.forEach((skill) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `skill-tag flex flex-col items-center gap-2 hover:cursor-pointer `;
    button.innerHTML = `<img src='${skill.icon}' class='w-24 hover:scale-105 transition' /> ${skill.name}`;
    button.addEventListener("click", () => {
      mainTitle.textContent = `${skill.name}`;
      subTitle.textContent = `${skill.description}`;
    });
    skillsContainer.appendChild(button);
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

// Listener para botões de categoria
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedCategory = btn.dataset.category;
    renderSkills(selectedCategory);
  });
});

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    renderSkills(category);
  });
});

renderSkills("frontend");

// Efeito de blur no mouse
const spotlight = document.querySelector(".blur-spotlight");

document.addEventListener("mousemove", (e) => {
  spotlight.style.top = `${e.clientY}px`;
  spotlight.style.left = `${e.clientX}px`;
});

const menuCheckbox = document.getElementById("menu-checkbox");
const menu = document.getElementById("mobile-menu");

function toggleMenu() {
  menuCheckbox.checked = false;
  menu.classList.add("-translate-y-full");
}

// Mostrar ou esconder o menu com base no checkbox
menuCheckbox.addEventListener("change", () => {
  if (menuCheckbox.checked) {
    menu.classList.remove("-translate-y-full");
  } else {
    menu.classList.add("-translate-y-full");
  }
});
