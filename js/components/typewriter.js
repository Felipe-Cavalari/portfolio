// ============================================
// Typewriter Effect
// ============================================
const typewriterTexts = [
  "Software Developer",
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

export function typeWriter() {
  const typewriterElement = document.getElementById("typewriter");
  if (!typewriterElement) return;
  
  const currentText = typewriterTexts[textIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typewriterTexts.length;
    typeSpeed = 500; // Pause before new word
  }
  
  setTimeout(typeWriter, typeSpeed);
}
