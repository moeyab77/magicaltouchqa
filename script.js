const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-navigation');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const updateActiveNavigation = () => {
  let activeId = 'home';
  const fromTop = window.scrollY + 150;

  sections.forEach((section) => {
    if (section.offsetTop <= fromTop) activeId = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
};

window.addEventListener('scroll', updateActiveNavigation, { passive: true });
updateActiveNavigation();

document.getElementById('year').textContent = new Date().getFullYear();

const quoteForm = document.getElementById('quote-form');
quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(quoteForm);
  const name = formData.get('name')?.toString().trim() || '';
  const phone = formData.get('phone')?.toString().trim() || '';
  const service = formData.get('service')?.toString().trim() || '';
  const details = formData.get('details')?.toString().trim() || '';

  const message = [
    'Hello Magical Touch Trading,',
    '',
    'I would like to request a quote.',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Project details: ${details || 'Not provided'}`
  ].join('\n');

  window.open(`https://wa.me/97455815650?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});