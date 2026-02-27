/**
 * RakuUP（ラクアップ）楽天市場 運用代行サービス LP
 * インタラクション・フォーム送信・アニメーション
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initReadingProgress();
  initMobileNav();
  initFAQ();
  initScrollAnimations();
  initParticles();
  initSmoothScroll();
  initForm();
  initStepForm();
});


/* ========================================
   ヘッダー: スクロール時のスタイル変更
   ======================================== */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const updateHeader = () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}


/* ========================================
   読了プログレスバー
   ======================================== */
function initReadingProgress() {
  const bar = document.getElementById('reading-progress-bar');
  if (!bar) return;

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(progress, 100)}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}


/* ========================================
   モバイル固定ナビ：アクティブセクション追従
   ======================================== */
function initMobileNav() {
  const nav = document.getElementById('mobile-fixed-nav');
  if (!nav) return;

  const links = nav.querySelectorAll('a[href^="#"]:not(.mobile-nav-cta)');
  const sections = [];

  links.forEach(link => {
    const id = link.getAttribute('href').substring(1);
    const section = document.getElementById(id);
    if (section) sections.push({ link, section });
  });

  const updateActive = () => {
    const scrollPos = window.scrollY + 200;
    let activeLink = null;

    sections.forEach(({ link, section }) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        activeLink = link;
      }
    });

    links.forEach(l => l.classList.remove('active'));
    if (activeLink) activeLink.classList.add('active');
  };

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}


/* ========================================
   FAQ アコーディオン
   ======================================== */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // 他のアイテムを閉じる
      document.querySelectorAll('.faq-item.active').forEach(activeItem => {
        if (activeItem !== item) {
          activeItem.classList.remove('active');
          activeItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // 現在のアイテムをトグル
      item.classList.toggle('active');
      button.setAttribute('aria-expanded', !isActive);
    });
  });
}


/* ========================================
   スクロールアニメーション（簡易 AOS）
   ======================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 少し遅延を追加して順番にアニメーション
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach((el, index) => {
    // 同じ親の中で順番に遅延を設定
    const parent = el.closest('.problems-grid, .service-grid, .cases-grid, .voices-grid, .faq-list');
    if (parent) {
      const siblings = parent.querySelectorAll('[data-aos]');
      const siblingIndex = Array.from(siblings).indexOf(el);
      el.dataset.aosDelay = siblingIndex * 80;
    }
    observer.observe(el);
  });
}


/* ========================================
   パーティクル（Hero背景）
   ======================================== */
function initParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  const particleCount = 20;
  const colors = [
    'rgba(230, 57, 70, 0.3)',
    'rgba(255, 140, 66, 0.3)',
    'rgba(255, 255, 255, 0.15)',
    'rgba(230, 57, 70, 0.15)',
  ];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 6 + 2;
    const x = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}%`;
    particle.style.bottom = '-10px';
    particle.style.background = color;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    container.appendChild(particle);
  }
}


/* ========================================
   スムーズスクロール
   ======================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('site-header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}


/* ========================================
   フォーム送信（Web3Forms）
   ======================================== */
function initForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const successEl = document.getElementById('form-success');
  const privacyCheckbox = document.getElementById('privacy-agree');
  if (!form || !submitBtn || !successEl) return;

  // プライバシーポリシー同意チェックボックスの連動
  if (privacyCheckbox) {
    privacyCheckbox.addEventListener('change', () => {
      submitBtn.disabled = !privacyCheckbox.checked;
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // プライバシーポリシー同意チェック
    if (privacyCheckbox && !privacyCheckbox.checked) {
      alert('個人情報の取り扱いに同意してください。');
      return;
    }

    // バリデーション
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // ボタン状態変更
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // 送信成功
        form.style.display = 'none';
        successEl.style.display = 'block';

        // 成功メッセージにスクロール
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        throw new Error('送信に失敗しました');
      }
    } catch (error) {
      alert('送信に失敗しました。お手数ですが時間をおいてもう一度お試しください。');
      submitBtn.disabled = false;
      submitBtn.textContent = '▶ 無料の店舗診断を申し込む';
    }
  });
}


/* ========================================
   ステップフォーム（3段階）
   ======================================== */
function initStepForm() {
  const nextBtns = document.querySelectorAll('.step-next-btn');
  const prevBtns = document.querySelectorAll('.step-prev-btn');

  if (!nextBtns.length) return;

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentStep = btn.closest('.step-form-step');
      const nextStepId = btn.dataset.next;
      const nextStep = document.getElementById(`step-${nextStepId}`);

      // STEP 1のバリデーション：月商が選択されているか
      if (currentStep.id === 'step-1') {
        const select = currentStep.querySelector('select');
        if (select && !select.value) {
          select.focus();
          select.reportValidity();
          return;
        }
      }

      if (currentStep && nextStep) {
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
        // フォーム本体の先頭にスクロール
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
          const headerHeight = document.getElementById('site-header')?.offsetHeight || 0;
          const targetPosition = contactForm.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentStep = btn.closest('.step-form-step');
      const prevStepId = btn.dataset.prev;
      const prevStep = document.getElementById(`step-${prevStepId}`);

      if (currentStep && prevStep) {
        currentStep.classList.remove('active');
        prevStep.classList.add('active');
        // フォーム本体の先頭にスクロール
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
          const headerHeight = document.getElementById('site-header')?.offsetHeight || 0;
          const targetPosition = contactForm.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    });
  });
}

