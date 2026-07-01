const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".desktop-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const navLinks = [...document.querySelectorAll(".desktop-nav a")];
const linkedSections = navLinks
  .map((link) => [link, document.querySelector(link.getAttribute("href"))])
  .filter(([, section]) => section);

function setActiveLink() {
  const scrollPosition = window.scrollY + 110;
  let active = "#home";

  linkedSections.forEach(([link, section]) => {
    if (section.offsetTop <= scrollPosition) active = link.getAttribute("href");
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === active);
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();
