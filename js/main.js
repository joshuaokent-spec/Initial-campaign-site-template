// Mobile navigation
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Year in footer
const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Newsletter form (demo only for now)
const newsletterForm = document.querySelector("#newsletterForm");
const newsletterMsg = document.querySelector("#newsletterMsg");

if (newsletterForm && newsletterMsg) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    newsletterMsg.textContent = "Thanks — you’re signed up! (Demo form)";
    newsletterForm.reset();
  });
}

// Volunteer form (demo only for now)
const volunteerForm = document.querySelector("#volunteerForm");
const volunteerMsg = document.querySelector("#volunteerMsg");

if (volunteerForm && volunteerMsg) {
  volunteerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = volunteerForm.querySelector("#name")?.value.trim();
    const email = volunteerForm.querySelector("#email")?.value.trim();

    if (!name || !email) {
      volunteerMsg.textContent = "Please provide your name and email.";
      return;
    }

    volunteerMsg.textContent = "Thanks — the campaign team will follow up soon.";
    volunteerForm.reset();
  });
}

// Contact form (demo only for now)
const contactForm = document.querySelector("#contactForm");
const contactStatus = document.querySelector("#form-status");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.querySelector("#contact-name")?.value.trim();
    const email = contactForm.querySelector("#contact-email")?.value.trim();
    const subject = contactForm.querySelector("#contact-subject")?.value.trim();
    const message = contactForm.querySelector("#contact-message")?.value.trim();

    if (!name || !email || !subject || !message) {
      contactStatus.textContent = "Please complete all required fields before submitting.";
      return;
    }

    contactStatus.textContent = "Thank you — your message has been received. (Demo form)";
    contactForm.reset();
  });
}