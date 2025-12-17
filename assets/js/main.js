document.addEventListener('DOMContentLoaded', () => {
  // Merch page filter logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Set active button style
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;

        // Show/hide cards based on category
        productCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  // Dynamic Contact Form Logic
  const params = new URLSearchParams(window.location.search);
  const product = params.get('product') || params.get('subject');

  if (product) {
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (subjectInput) {
      subjectInput.value = `Wishlist Inquiry: ${decodeURIComponent(product)}`;
    }

    // Optional: Focus the message field so they can start typing immediately
    if (messageInput) {
      messageInput.focus();
    }
  }
  // Contact Form AJAX Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);
      const action = form.action;
      const successDiv = document.getElementById('formSuccess');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerText = 'Sending...';

      fetch(action, {
        method: 'POST',
        body: data,
        // Google Apps Script usually requires 'no-cors' to avoid CORS errors from browser
        // forcing an opaque response that we treat as success.
        mode: 'no-cors'
      })
        .then(() => {
          // Success
          form.classList.add('d-none');
          if (successDiv) {
            successDiv.classList.remove('d-none');
          }
          form.reset();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Something went wrong. Please try again.');
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText;
        });
    });
  }
});
