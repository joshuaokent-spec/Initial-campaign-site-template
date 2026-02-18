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

	// Volunteer form handler
	var volunteerForm = document.getElementById('volunteerForm');
	if (volunteerForm) {
		var volunteerMsg = document.getElementById('volunteerMsg');
		volunteerForm.addEventListener('submit', function (e) {
			e.preventDefault();
			var formData = new FormData(volunteerForm);
			var name = (formData.get('name') || '').toString().trim();
			var email = (formData.get('email') || '').toString().trim();
			if (!name || !email) {
				if (volunteerMsg) volunteerMsg.textContent = 'Please provide name and email.';
				return;
			}
			// store locally as placeholder for real backend
			try {
				var vols = JSON.parse(localStorage.getItem('volunteers') || '[]');
				vols.push({ name: name, email: email, phone: formData.get('phone') || '', interests: formData.get('interests') || '', ts: Date.now() });
				localStorage.setItem('volunteers', JSON.stringify(vols));
			} catch (err) {
				console.warn('storage failed', err);
			}
			if (volunteerMsg) volunteerMsg.textContent = 'Thanks — the team will follow up soon.';
			volunteerForm.reset();
		});
	}

	// Contact form handler
	var contactForm = document.getElementById('contactForm');
	if (contactForm) {
		var formStatus = document.getElementById('form-status');
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();
			
			// Clear previous errors
			document.querySelectorAll('.error-message').forEach(function(el) {
				el.classList.remove('show');
				el.textContent = '';
			});
			
			// Get form data
			var formData = new FormData(contactForm);
			var name = (formData.get('name') || '').toString().trim();
			var email = (formData.get('email') || '').toString().trim();
			var phone = (formData.get('phone') || '').toString().trim();
			var subject = (formData.get('subject') || '').toString().trim();
			var message = (formData.get('message') || '').toString().trim();
			var optin = contactForm.querySelector('input[name="optin"]').checked;
			
			// Validate required fields
			var hasErrors = false;
			if (!name) {
				document.getElementById('name-error').textContent = 'Please enter your name.';
				document.getElementById('name-error').classList.add('show');
				hasErrors = true;
			}
			if (!email || !isValidEmail(email)) {
				document.getElementById('email-error').textContent = 'Please enter a valid email.';
				document.getElementById('email-error').classList.add('show');
				hasErrors = true;
			}
			if (!subject) {
				document.getElementById('subject-error').textContent = 'Please select a subject.';
				document.getElementById('subject-error').classList.add('show');
				hasErrors = true;
			}
			if (!message) {
				document.getElementById('message-error').textContent = 'Please enter a message.';
				document.getElementById('message-error').classList.add('show');
				hasErrors = true;
			}
			
			if (hasErrors) return;
			
			// Store message locally as placeholder for real backend
			try {
				var messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
				messages.push({
					name: name,
					email: email,
					phone: phone,
					subject: subject,
					message: message,
					optin: optin,
					ts: Date.now()
				});
				localStorage.setItem('contactMessages', JSON.stringify(messages));
			} catch (err) {
				console.warn('storage failed', err);
			}
			
			// Show success message
			if (formStatus) {
				formStatus.textContent = 'Thanks for reaching out! We\'ll get back to you soon.';
				formStatus.classList.add('show', 'success');
			}
			
			// Reset form
			contactForm.reset();
			
			// Clear success message after 5 seconds
			setTimeout(function() {
				if (formStatus) {
					formStatus.classList.remove('show', 'success');
				}
			}, 5000);
		});
	}
});

// Helper function to validate email
function isValidEmail(email) {
	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
