/* Main JS for navigation and small UI behaviors */

document.addEventListener('DOMContentLoaded', function () {
	// Fill current year in footer
	var yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Mobile nav toggle
	var navToggle = document.querySelector('.nav-toggle');
	var siteNav = document.getElementById('site-nav');
	if (navToggle && siteNav) {
		navToggle.addEventListener('click', function () {
			var expanded = this.getAttribute('aria-expanded') === 'true';
			this.setAttribute('aria-expanded', String(!expanded));
			siteNav.classList.toggle('open');
		});

		// Close nav on Escape
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				navToggle.setAttribute('aria-expanded', 'false');
				siteNav.classList.remove('open');
			}
		});
	}

	// Newsletter form:
	// Intentionally no JavaScript submit handler here.
	// This allows the browser to submit the form directly to Formspree.

	// Volunteer form:
	// Intentionally no JavaScript submit handler here.
	// This allows the browser to submit the form directly to Formspree.

	// Contact form:
	// Intentionally no JavaScript submit handler here.
	// This allows the browser to submit the form directly to Formspree.
});

// Helper function to validate email
function isValidEmail(email) {
	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}