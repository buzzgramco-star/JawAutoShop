/* ============================================================
   JAW AUTO SERVICE — Main JavaScript
   Scroll Animations, Navigation, Interactions
   ============================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------
     STICKY HEADER
  -------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* --------------------------------------------------------
     HAMBURGER / MOBILE MENU
  -------------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('open');
      if (isOpen) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        hamburger.classList.add('open');
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --------------------------------------------------------
     INTERSECTION OBSERVER — SCROLL ANIMATIONS
  -------------------------------------------------------- */
  const animatedEls = document.querySelectorAll('.animate-on-scroll');

  if (animatedEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatedEls.forEach(el => observer.observe(el));
  }

  /* --------------------------------------------------------
     SMOOTH SCROLL — ANCHOR LINKS
  -------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------------
     ACTIVE NAV LINK
  -------------------------------------------------------- */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* --------------------------------------------------------
     COUNTER ANIMATION (Testimonials / Stats pages)
  -------------------------------------------------------- */
  const statNums = document.querySelectorAll('[data-count]');

  if (statNums.length > 0) {
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800;
      const start = performance.now();

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOut(progress);
        const current = Math.round(eased * target);
        el.textContent = current.toLocaleString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      };

      requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNums.forEach(el => counterObserver.observe(el));
  }

  /* --------------------------------------------------------
     FORM ENHANCEMENTS
  -------------------------------------------------------- */
  const forms = document.querySelectorAll('.luxury-form, form');
  forms.forEach(form => {
    // Float label feel — add filled class
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      const updateState = () => {
        if (input.value) {
          input.classList.add('has-value');
        } else {
          input.classList.remove('has-value');
        }
      };
      input.addEventListener('input', updateState);
      input.addEventListener('change', updateState);
      updateState();
    });
  });

  /* --------------------------------------------------------
     HERO PARALLAX (subtle)
  -------------------------------------------------------- */
  const heroBg = document.querySelector('.hero .hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      heroBg.style.transform = `translateY(${rate}px)`;
    }, { passive: true });
  }

})();
