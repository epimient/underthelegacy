document.addEventListener('DOMContentLoaded', () => {

  const isES = document.documentElement.lang === 'es';

  const i18n = {
    sending: isES ? 'Enviando...' : 'Sending...',
    error: isES ? 'Algo salió mal. Intenta de nuevo.' : 'Something went wrong. Please try again.',
    noFormat: isES ? 'Ningún formato seleccionado' : 'No format selected',
    wishlistInquiry: isES ? 'Consulta de Lista: ' : 'Wishlist Inquiry: ',
    wishlistTitle: isES ? 'Lista: ' : 'Wishlist: '
  };

  // =============================================
  // APPS SCRIPT ENDPOINT
  // =============================================
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwl6Cf1XBv_3qyRLTmi2_M4WdNKWXjsA5ZX9MRhBse1bjlQeFvUv3P_4wARfY_kE7jj/exec';

  // =============================================
  // REUSABLE FORM SUBMISSION
  // =============================================
  function submitForm(form, successCallback) {
    const data = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : '';

    // Loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = i18n.sending;
    }

    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: data,
      mode: 'no-cors'
    })
      .then(() => {
        form.reset();
        if (successCallback) {
          successCallback(form);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert(i18n.error);
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = originalBtnText;
        }
      });
  }

  // =============================================
  // CONTACT FORM
  // =============================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Pre-fill subject from URL params (wishlist redirect)
    const params = new URLSearchParams(window.location.search);
    const product = params.get('product') || params.get('subject');
    if (product) {
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      if (subjectInput) {
        subjectInput.value = i18n.wishlistInquiry + decodeURIComponent(product);
      }
      if (messageInput) {
        messageInput.focus();
      }
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      submitForm(this, function (form) {
        form.classList.add('d-none');
        const successDiv = document.getElementById('formSuccess');
        if (successDiv) {
          successDiv.classList.remove('d-none');
        }
      });
    });
  }

  // =============================================
  // CONTACT POPUP TOGGLE
  // =============================================
  const chatButton = document.getElementById('chatButton');
  const contactPopup = document.getElementById('contactPopup');
  const chatClose = document.getElementById('chatClose');

  if (chatButton && contactPopup) {
    chatButton.addEventListener('click', () => {
      contactPopup.classList.toggle('open');
    });
    if (chatClose) {
      chatClose.addEventListener('click', () => {
        contactPopup.classList.remove('open');
      });
    }
    document.addEventListener('click', (e) => {
      if (contactPopup.classList.contains('open') &&
          !contactPopup.contains(e.target) &&
          e.target !== chatButton &&
          !chatButton.contains(e.target)) {
        contactPopup.classList.remove('open');
      }
    });
  }

  // =============================================
  // NEWSLETTER FORM
  // =============================================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      submitForm(this, function (form) {
        form.classList.add('d-none');
        const successDiv = document.getElementById('newsletterSuccess');
        if (successDiv) {
          successDiv.classList.remove('d-none');
        }
      });
    });
  }

  // =============================================
  // ALBUM WAITLIST MODAL
  // =============================================
  const waitlistModal = document.getElementById('waitlistModal');
  if (waitlistModal) {
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
      waitlistForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const checks = this.querySelectorAll('.form-check-input:checked');
        const formats = Array.from(checks).map(c => c.value).join(', ');
        document.getElementById('waitlistProduct').value = formats || i18n.noFormat;
        submitForm(this, function (form) {
          form.classList.add('d-none');
          const successDiv = document.getElementById('waitlistSuccess');
          if (successDiv) {
            successDiv.classList.remove('d-none');
          }
        });
      });
    }

    waitlistModal.addEventListener('hidden.bs.modal', () => {
      const form = document.getElementById('waitlistForm');
      const successDiv = document.getElementById('waitlistSuccess');
      if (form) {
        form.reset();
        form.classList.remove('d-none');
      }
      if (successDiv) {
        successDiv.classList.add('d-none');
      }
    });
  }

  // =============================================
  // MERCH FILTER
  // =============================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;

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

  // =============================================
  // WISHLIST MODAL (Merch Page)
  // =============================================
  const wishlistModal = document.getElementById('wishlistModal');
  if (wishlistModal) {
    // When a wishlist button is clicked, set the product name in the modal
    document.querySelectorAll('.wishlist-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const productName = btn.dataset.product;
        const productInput = wishlistModal.querySelector('#wishlistProduct');
        const modalTitle = wishlistModal.querySelector('#wishlistModalLabel');
        if (productInput) productInput.value = productName;
        if (modalTitle) modalTitle.textContent = i18n.wishlistTitle + productName;
      });
    });

    // Handle wishlist form submission
    const wishlistForm = document.getElementById('wishlistForm');
    if (wishlistForm) {
      wishlistForm.addEventListener('submit', function (e) {
        e.preventDefault();
        submitForm(this, function (form) {
          form.classList.add('d-none');
          const successDiv = document.getElementById('wishlistSuccess');
          if (successDiv) {
            successDiv.classList.remove('d-none');
          }
        });
      });
    }

    // Reset modal when closed
    wishlistModal.addEventListener('hidden.bs.modal', () => {
      const form = document.getElementById('wishlistForm');
      const successDiv = document.getElementById('wishlistSuccess');
      if (form) {
        form.reset();
        form.classList.remove('d-none');
      }
      if (successDiv) {
        successDiv.classList.add('d-none');
      }
    });
  }

  // =============================================
  // SHOWS TABS
  // =============================================
  const showTabs = document.querySelectorAll('.show-tab-btn');
  const showPanels = document.querySelectorAll('.show-tab-panel');

  if (showTabs.length > 0 && showPanels.length > 0) {
    showTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        showTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.dataset.tab;

        showPanels.forEach(panel => {
          if (panel.dataset.panel === target) {
            panel.style.display = 'block';
          } else {
            panel.style.display = 'none';
          }
        });
      });
    });
  }

  // =============================================
  // VIDEO GALLERY — Visual Rituals
  // =============================================
  const videoCards = document.querySelectorAll('.vcard');
  const videoModalEl = document.getElementById('videoModal');

  if (videoCards.length > 0 && videoModalEl) {
    let videoModal = null;

    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        const videoId = card.dataset.videoId;
        const iframe = videoModalEl.querySelector('iframe');

        if (!videoModal) {
          videoModal = new bootstrap.Modal(videoModalEl);
        }

        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        videoModal.show();
      });
    });

    videoModalEl.addEventListener('hidden.bs.modal', () => {
      const iframe = videoModalEl.querySelector('iframe');
      iframe.src = '';
    });
  }

  // =============================================
  // POSTER ZOOM — Past Shows
  // =============================================
  const pastShowImgs = document.querySelectorAll('.past-show-img');
  const posterModalEl = document.getElementById('posterModal');

  if (pastShowImgs.length > 0 && posterModalEl) {
    let posterModal = null;

    pastShowImgs.forEach(wrapper => {
      wrapper.addEventListener('click', () => {
        const img = wrapper.querySelector('img');
        const modalImg = posterModalEl.querySelector('.poster-zoom-img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        if (!posterModal) {
          posterModal = new bootstrap.Modal(posterModalEl);
        }
        posterModal.show();
      });
    });
  }

  // =============================================
  // FORMAT GALLERY — Auto-rotate + Click (Album)
  // =============================================
  const formatGallery = document.querySelector('.format-gallery');
  const formatImgs = document.querySelectorAll('.format-img');
  const formatOrder = ['ep', 'cd', 'cassette'];

  if (formatImgs.length > 0) {
    let currentIndex = 0;
    let autoTimer;

    function fadeTo(format) {
      const current = document.querySelector('.format-img.format-active');
      const next = document.querySelector(`.format-img[data-format="${format}"]`);
      if (!next || current === next) return;

      const duration = 500;
      const start = performance.now();

      next.classList.add('format-active');
      next.style.opacity = '0';

      function animate(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);

        if (current) current.style.opacity = `${1 - progress}`;
        next.style.opacity = `${progress}`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          if (current) {
            current.classList.remove('format-active');
            current.style.opacity = '';
          }
          next.style.opacity = '';
        }
      }

      requestAnimationFrame(animate);
      currentIndex = formatOrder.indexOf(format);
    }

    function nextFormat() {
      const next = (currentIndex + 1) % formatOrder.length;
      fadeTo(formatOrder[next]);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(nextFormat, 3500);
    }

    if (formatGallery) {
      formatGallery.addEventListener('click', () => {
        nextFormat();
        resetAuto();
      });
    }

    autoTimer = setInterval(nextFormat, 3500);
  }

  // =============================================
  // LYRICS MODAL
  // =============================================
  const lyrics = {
    "invocation": null,
    "from-the-deep": null,
    "velvet-dust": null,
    "haunted-by-shadows": null,
    "the-eternal": `Verse 1\nThe moon is bleeding\nThe skies are red\nI walk among\nThe restless dead\nA sacred vow\nAnd death returns\nDown goes the scalpel\nAs tears burst forth\n\nPre-Chorus\nI'm in Your presence now\nAnd it is so divine\nI know you can't resist\n\nChorus\nEvery knee will bow\nEvery knee will bow\nEvery knee will bow\nBefore Him`
  };

  const lyricsIcons = document.querySelectorAll('.track-lyrics-icon');
  const lyricsModalEl = document.getElementById('lyricsModal');

  if (lyricsIcons.length > 0 && lyricsModalEl) {
    let lyricsModal = null;

    lyricsIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.stopPropagation();
        const song = icon.dataset.song;
        const track = icon.closest('.track');
        const titleEl = track.querySelector('.track-title');
        const title = titleEl ? titleEl.textContent : song;
        const textEl = lyricsModalEl.querySelector('#lyricsModalText');
        const titleElModal = lyricsModalEl.querySelector('#lyricsModalTitle');

        titleElModal.textContent = title;

        if (lyrics[song]) {
          textEl.className = 'lyrics-text';
          textEl.textContent = lyrics[song];
        } else {
          textEl.className = 'lyrics-placeholder';
          textEl.textContent = isES ? 'Letra próximamente' : 'Lyrics coming soon';
        }

        if (!lyricsModal) {
          lyricsModal = new bootstrap.Modal(lyricsModalEl);
        }
        lyricsModal.show();
      });
    });

    lyricsModalEl.addEventListener('hidden.bs.modal', () => {
      const textEl = lyricsModalEl.querySelector('#lyricsModalText');
      textEl.textContent = '';
    });
  }

  // =============================================
  // BANDCAMP MODAL — All Tracks
  // =============================================
  const bandcampTracks = {
    "the-eternal": "676422717",
    "invocation": null,
    "from-the-deep": null,
    "velvet-dust": null,
    "haunted-by-shadows": null
  };

  const playIcons = document.querySelectorAll('.track-play-icon');
  const bandcampModal = document.getElementById('bandcampModal');

  if (playIcons.length > 0 && bandcampModal) {
    let bcModal = null;

    playIcons.forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.stopPropagation();
        const track = icon.closest('.track');
        const trackId = track ? track.dataset.track : null;
        const bcId = trackId ? bandcampTracks[trackId] : null;

        if (bcId) {
          const iframe = bandcampModal.querySelector('iframe');
          iframe.src = `https://bandcamp.com/EmbeddedPlayer/v=2/track=${bcId}/size=large/bgcol=333333/linkcol=8c304c/tracklist=false/artwork=small/`;
          if (!bcModal) bcModal = new bootstrap.Modal(bandcampModal);
          bcModal.show();
        }
      });
    });

    bandcampModal.addEventListener('hidden.bs.modal', () => {
      const iframe = bandcampModal.querySelector('iframe');
      iframe.src = '';
    });
  }

});
