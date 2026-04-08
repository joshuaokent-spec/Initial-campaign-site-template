/* Main JS for navigation, forms, and small UI behaviors */

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

	// Simple newsletter handler
	var newsletterForm = document.getElementById('newsletterForm');
	if (newsletterForm) {
		var newsletterMsg = document.getElementById('newsletterMsg');
		newsletterForm.addEventListener('submit', function (e) {
			e.preventDefault();
			var email = newsletterForm.querySelector('input[type="email"]').value.trim();
			if (!email) {
				if (newsletterMsg) newsletterMsg.textContent = 'Please enter a valid email.';
				return;
			}

			// Simulate submission
			try {
				var subs = JSON.parse(localStorage.getItem('newsletterSubs') || '[]');
				subs.push({ email: email, ts: Date.now() });
				localStorage.setItem('newsletterSubs', JSON.stringify(subs));
			} catch (err) {
				console.warn('storage failed', err);
			}

			if (newsletterMsg) newsletterMsg.textContent = 'Thanks — you are signed up!';
			newsletterForm.reset();
		});
	}

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