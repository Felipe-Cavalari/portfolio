const body = document.querySelectorAll("body");

const observer = new IntersectionObserver((entries, self) => {
  entries.forEach((entry) => {
    if (self.unobserve) {
      let target = entry.target;

      gsap.to(target, {
        opacity: 1,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  });
});

body.forEach((section) => observer.observe(section));
