// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// Year in footer
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Newsletter form (demo only - replace with real service integration)
const form = document.querySelector("#newsletterForm");
const msg = document.querySelector("#newsletterMsg");
if (form && msg) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "Thanks — you’re signed up! (Demo form)";
    form.reset();
  });
}
