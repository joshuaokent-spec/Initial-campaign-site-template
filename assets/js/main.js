document.addEventListener("DOMContentLoaded", function () {
  setCurrentYear();
  setupHeaderState();
  setupNavigation();
  setActiveNavLink();
  setupFormButtons();
  setupDonationButtons();
  setupRevealAnimations();
  setupThankYouPage();
});

function setCurrentYear() {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function setupHeaderState() {
  var header = document.querySelector(".site-header");
  if (!header) {
    return;
  }

  function syncHeaderState() {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  }

  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });
}

function setupNavigation() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (!toggle || !nav) {
    return;
  }

  function closeNav() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open", !expanded);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNav();
      toggle.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!nav.classList.contains("open")) {
      return;
    }

    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      closeNav();
    }
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 700) {
      closeNav();
    }
  });
}

function setActiveNavLink() {
  var links = document.querySelectorAll("#site-nav a[href]");
  if (!links.length) {
    return;
  }

  var path = window.location.pathname.split("/").pop();
  if (!path) {
    path = "index.html";
  }

  links.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function setupFormButtons() {
  var forms = document.querySelectorAll('form[action*="formspree.io"]');

  forms.forEach(function (form) {
    var button = form.querySelector('button[type="submit"]');
    if (!button) {
      return;
    }

    var defaultLabel = button.textContent;
    var pendingLabel = form.getAttribute("data-pending-label") || "Sending...";

    form.addEventListener("submit", function () {
      button.disabled = true;
      button.textContent = pendingLabel;
      button.setAttribute("aria-busy", "true");

      window.setTimeout(function () {
        button.disabled = false;
        button.textContent = defaultLabel;
        button.removeAttribute("aria-busy");
      }, 5000);
    });
  });
}

function setupDonationButtons() {
  var buttons = document.querySelectorAll("[data-donation-amount]");
  var status = document.getElementById("donationStatus");

  if (!buttons.length || !status) {
    return;
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      createCheckoutSession(button, status);
    });
  });
}

async function createCheckoutSession(button, status) {
  var amount = Number(button.getAttribute("data-donation-amount"));
  var allButtons = document.querySelectorAll("[data-donation-amount]");

  allButtons.forEach(function (item) {
    item.disabled = true;
  });

  showStatus(
    status,
    "Connecting to secure checkout. If this preview is not configured for donations yet, you will see setup guidance instead of a broken link.",
    "success"
  );

  try {
    var response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amount
      })
    });

    var data = await response.json();

    if (!response.ok || !data.url) {
      throw new Error(data.error || "Donation checkout is not configured yet.");
    }

    window.location.href = data.url;
    return;
  } catch (error) {
    showStatus(
      status,
      "Secure checkout is not configured on this preview yet. Run the optional Node server in the `server` folder or replace these buttons with your hosted checkout links before launch.",
      "error"
    );
  }

  allButtons.forEach(function (item) {
    item.disabled = false;
  });
}

function showStatus(node, message, tone) {
  if (!node) {
    return;
  }

  node.textContent = message;
  node.classList.add("show");
  node.classList.remove("success", "error");
  node.classList.add(tone);
}

function setupRevealAnimations() {
  var selectors = [
    ".page-header .container > *",
    ".hero-copy > *",
    ".hero-media",
    ".visual-card",
    ".card",
    ".issue",
    ".quote",
    ".stat-card",
    ".section-panel",
    ".info-card",
    ".events-list > *",
    ".cta-inner > *",
    ".form",
    ".contact-form"
  ];

  var revealTargets = document.querySelectorAll(selectors.join(","));
  if (!revealTargets.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealTargets.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  revealTargets.forEach(function (item, index) {
    item.setAttribute("data-reveal", "");
    item.style.transitionDelay = Math.min(index * 45, 220) + "ms";
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealTargets.forEach(function (item) {
    observer.observe(item);
  });
}

function setupThankYouPage() {
  var title = document.querySelector("[data-thank-you-title]");
  var message = document.querySelector("[data-thank-you-message]");
  var detail = document.querySelector("[data-thank-you-detail]");

  if (!title || !message || !detail) {
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var type = params.get("type") || "general";

  var copy = {
    general: {
      title: "Thanks for showing up",
      message: "Your message made it through, and the campaign will follow up as soon as possible.",
      detail: "In the meantime, you can review the platform, sign up to volunteer, or keep an eye on the events page for the next public conversation."
    },
    contact: {
      title: "Thanks for reaching out",
      message: "Your note has been sent to the campaign, and a response will be on the way soon.",
      detail: "For the fastest follow-up, keep an eye on the email address you used in the form. Press and event requests are reviewed alongside general campaign messages."
    },
    volunteer: {
      title: "Thanks for volunteering",
      message: "Your volunteer interest has been recorded, and the campaign can follow up with next steps based on your selected interests.",
      detail: "Volunteer work ranges from outreach and event support to helping shape how this campaign shows up in the community."
    },
    updates: {
      title: "Thanks for signing up",
      message: "You are on the list for campaign updates, event announcements, and new ways to get involved.",
      detail: "The strongest next step is to share the site, bring a friend to the next public event, or explore the issues page so you know the campaign's priorities."
    },
    donation: {
      title: "Thanks for contributing",
      message: "Your contribution helps power outreach, organizing, and a campaign built around public trust instead of private influence.",
      detail: "Small-dollar support helps keep the message grounded in ordinary people. Thank you for helping move the campaign forward."
    }
  };

  var selected = copy[type] || copy.general;
  title.textContent = selected.title;
  message.textContent = selected.message;
  detail.textContent = selected.detail;
  document.title = selected.title + " | Joshua Kent for Michigan House of Representatives";
}
