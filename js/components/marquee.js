// ============================================
// Initialize Skills Marquee
// ============================================
import { allSkills } from '../data/skills.js';

export function initMarquee() {
  const marquee1 = document.getElementById('marquee-1');
  const marquee2 = document.getElementById('marquee-2');
  
  if (!marquee1 || !marquee2) return;
  
  // Split skills into two rows
  const row1Skills = allSkills.slice(0, 8);
  const row2Skills = allSkills.slice(8).concat(allSkills.slice(0, 8 - (allSkills.length - 8)));
  
  // Create skill items (duplicate for seamless loop)
  const createSkillItems = (skills) => {
    return skills.map(skill => `
      <div class="skill-item">
        <img src="${skill.icon}" alt="${skill.name}" onerror="this.style.display='none'">
        <span>${skill.name}</span>
      </div>
    `).join('');
  };
  
  // Duplicate items for seamless infinite scroll
  const row1HTML = createSkillItems(row1Skills);
  const row2HTML = createSkillItems(row2Skills);
  
  marquee1.innerHTML = row1HTML + row1HTML;
  marquee2.innerHTML = row2HTML + row2HTML;
}
