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
