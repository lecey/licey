/* ── Утилиты ── */
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function iconHTML(name, className) {
  return '<span class="' + (className || 'icon-svg') + '" aria-hidden="true">' + getIcon(name) + '</span>';
}

function photoSrc(path) {
  return siteConfig.photoFolder + '/' + path;
}

/* ── Плашки контактов (шапка / футер) ── */
function contactPillsHTML(contacts, showPhoneText) {
  var h = '';
  h += '<a href="' + esc(contacts.phoneHref) + '" class="contact-pill contact-pill--phone" aria-label="Позвонить">';
  h += iconHTML('phone', 'icon-svg icon-svg--pill');
  if (showPhoneText) h += '<span>' + esc(contacts.phone) + '</span>';
  h += '</a>';

  var social = contacts.social || [];
  for (var i = 0; i < social.length; i++) {
    var s = social[i];
    h += '<a href="' + esc(s.href) + '" class="contact-pill contact-pill--social" target="_blank" rel="noopener" aria-label="' + esc(s.label) + '">';
    h += iconHTML(s.icon, 'icon-svg icon-svg--social');
    h += '</a>';
  }
  return h;
}

/* ── Шапка ── */
function renderHeader() {
  var el = document.getElementById('site-header');
  if (!el) return;

  var logoInner = siteConfig.brand.logo
    ? '<img src="' + esc(siteConfig.brand.logo) + '" alt="' + esc(siteConfig.brand.logoAlt) + '" class="site-logo-img">'
    : '<span class="site-logo-mark" aria-hidden="true">M</span>';

  el.innerHTML =
    '<div class="header-inner">'
    + '<a href="#" class="site-logo">' + logoInner + '<span>' + esc(siteConfig.brand.name) + '</span></a>'
    + '<div class="header-contacts">' + contactPillsHTML(siteConfig.header, true) + '</div>'
    + '</div>';
}

/* ── Подвал ── */
function renderFooter() {
  var el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML =
    '<div class="wrap footer-inner">'
    + '<div class="footer-contacts">' + contactPillsHTML(siteConfig.footer, true) + '</div>'
    + '<p class="footer-copy">' + esc(siteConfig.footer.copyright) + '</p>'
    + '</div>';
}

/* ── Hero: заголовки ── */
function renderHeroTitles() {
  var el = document.getElementById('hero-titles');
  if (!el) return;
  el.innerHTML =
    '<h1 class="hero-title">' + esc(siteConfig.hero.title) + '</h1>'
    + '<p class="hero-subtitle">' + esc(siteConfig.hero.subtitle) + '</p>';
}

/* ── Hero: CSS Grid из конфига ── */
function buildGridCellCSS(selector, cell) {
  var colEnd = cell.col + cell.colSpan;
  var rowEnd = cell.row + cell.rowSpan;
  return selector + ' { grid-column: ' + cell.col + ' / ' + colEnd + '; grid-row: ' + cell.row + ' / ' + rowEnd + '; }';
}

function applyHeroGridLayout() {
  var layout = siteConfig.heroGridLayout;
  if (!layout) return;

  var css = '.hero-grid { display: grid; gap: 8px; }';

  css += '.hero-grid { grid-template-columns: repeat(' + layout.desktop.columns + ', 1fr); grid-template-rows: repeat(' + layout.desktop.rows + ', 1fr); }';
  var cells = layout.desktop.cells;
  for (var key in cells) {
    css += buildGridCellCSS('.hero-cell--' + key, cells[key]);
  }

  if (layout.tablet) {
    css += '@media (max-width: 960px) { .hero-grid { grid-template-columns: repeat(' + layout.tablet.columns + ', 1fr); grid-template-rows: repeat(' + layout.tablet.rows + ', 1fr); }';
    var tCells = layout.tablet.cells;
    for (var tk in tCells) {
      css += buildGridCellCSS('.hero-cell--' + tk, tCells[tk]);
    }
    css += '}';
  }

  if (layout.mobile) {
    css += '@media (max-width: 640px) { .hero-grid { grid-template-columns: repeat(' + layout.mobile.columns + ', 1fr); grid-template-rows: repeat(' + layout.mobile.rows + ', 1fr); }';
    var mCells = layout.mobile.cells;
    for (var mk in mCells) {
      css += buildGridCellCSS('.hero-cell--' + mk, mCells[mk]);
    }
    css += '}';
  }

  document.getElementById('hero-grid-styles').textContent = css;
}

/* ── Hero: инфо-карточка ── */
function infoCardHTML(block) {
  var h = '<div class="info-card">';
  h += '<div class="info-card-icon" style="background:' + esc(block.iconBg) + ';color:' + esc(block.iconColor) + '">' + iconHTML(block.icon) + '</div>';
  h += '<div class="info-card-body">';
  h += '<p class="info-card-title">' + esc(block.title) + '</p>';
  if (block.lines) {
    for (var j = 0; j < block.lines.length; j++) {
      h += '<p class="info-card-text">' + esc(block.lines[j]) + '</p>';
    }
  }
  if (block.text) h += '<p class="info-card-text">' + esc(block.text) + '</p>';
  if (block.mapLink) {
    h += '<a href="' + esc(block.mapLink.href) + '" class="info-card-link" target="_blank" rel="noopener noreferrer">' + esc(block.mapLink.text) + '</a>';
  }
  if (block.rating) {
    h += '<p class="info-card-rating"><span class="rating-star">' + iconHTML('star', 'icon-svg icon-svg--sm') + '</span> ' + esc(block.rating);
    if (block.reviews) {
      h += ' · <a href="' + esc(block.reviewsLink || '#') + '" class="info-card-link" target="_blank" rel="noopener noreferrer">' + esc(block.reviews) + '</a>';
    }
    h += '</p>';
  }
  h += '</div></div>';
  return h;
}

/* ── Hero: сетка ── */
var galleryState = { scenes: [], current: 0, flatPhotos: [] };

function renderHeroGrid() {
  var el = document.getElementById('hero-grid');
  if (!el) return;

  var blocks = siteConfig.infoBlocks;
  var gallery = siteConfig.gallery || [];

  var h = '';
  h += '<div class="hero-cell hero-cell--schedule">' + infoCardHTML(blocks.schedule) + '</div>';
  h += '<div class="hero-cell hero-cell--address">' + infoCardHTML(blocks.address) + '</div>';
  h += '<div class="hero-cell hero-cell--rating">' + infoCardHTML(blocks.rating) + '</div>';

  if (gallery.length === 0) {
    h += '<div class="hero-cell hero-cell--main"><div class="gallery-empty">Фотографии появятся здесь</div></div>';
    h += '<div class="hero-cell hero-cell--sideTop"></div>';
    h += '<div class="hero-cell hero-cell--sideBottom"></div>';
  } else {
    var first = gallery[0];
    var nav = gallery.length > 1
      ? '<button class="scene-arrow scene-prev" aria-label="Предыдущая сцена">' + iconHTML('preview', 'icon-svg icon-svg--arrow') + '</button>'
      + '<button class="scene-arrow scene-next" aria-label="Следующая сцена">' + iconHTML('next', 'icon-svg icon-svg--arrow') + '</button>'
      + '<div class="scene-dots" id="scene-dots"></div>'
      : '';

    h += '<div class="hero-cell hero-cell--main">'
      + '<div class="scene-main-wrap">'
      + '<img class="scene-main" id="scene-main" src="' + esc(photoSrc(first.main)) + '" alt="Фотография центра" loading="eager">'
      + nav
      + '</div></div>';

    h += '<div class="hero-cell hero-cell--sideTop">'
      + '<img class="scene-side-img" id="scene-side-top" src="' + esc(photoSrc(first.sideTop)) + '" alt="" loading="lazy">'
      + '</div>';

    h += '<div class="hero-cell hero-cell--sideBottom">'
      + '<img class="scene-side-img" id="scene-side-bottom" src="' + esc(photoSrc(first.sideBottom)) + '" alt="" loading="lazy">'
      + '</div>';
  }

  el.innerHTML = h;
  initGallery(gallery);
}

function initGallery(gallery) {
  if (!gallery || gallery.length === 0) return;

  galleryState.scenes = gallery;
  galleryState.current = 0;
  galleryState.flatPhotos = [];

  for (var i = 0; i < gallery.length; i++) {
    galleryState.flatPhotos.push(gallery[i].main, gallery[i].sideTop, gallery[i].sideBottom);
  }

  if (gallery.length > 1) {
    var dotsEl = document.getElementById('scene-dots');
    var dotsH = '';
    for (var d = 0; d < gallery.length; d++) {
      dotsH += '<button class="scene-dot' + (d === 0 ? ' active' : '') + '" aria-label="Сцена ' + (d + 1) + '"></button>';
    }
    dotsEl.innerHTML = dotsH;

    var grid = document.getElementById('hero-grid');
    grid.querySelector('.scene-prev').addEventListener('click', function () { sceneMove(-1); });
    grid.querySelector('.scene-next').addEventListener('click', function () { sceneMove(1); });

    var dots = dotsEl.querySelectorAll('.scene-dot');
    for (var di = 0; di < dots.length; di++) {
      (function (idx) {
        dots[idx].addEventListener('click', function () { sceneGo(idx); });
      })(di);
    }

    var mainWrap = grid.querySelector('.scene-main-wrap');
    var startX = 0;
    mainWrap.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    mainWrap.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) sceneMove(dx < 0 ? 1 : -1);
    });
  }

  document.getElementById('scene-main').addEventListener('click', function () {
    openLightbox(galleryState.current * 3);
  });
  document.getElementById('scene-side-top').addEventListener('click', function () {
    openLightbox(galleryState.current * 3 + 1);
  });
  document.getElementById('scene-side-bottom').addEventListener('click', function () {
    openLightbox(galleryState.current * 3 + 2);
  });
}

function sceneMove(dir) {
  var next = galleryState.current + dir;
  if (next < 0) next = galleryState.scenes.length - 1;
  if (next >= galleryState.scenes.length) next = 0;
  sceneGo(next);
}

function sceneGo(index) {
  if (index < 0 || index >= galleryState.scenes.length) return;
  galleryState.current = index;
  var scene = galleryState.scenes[index];

  document.getElementById('scene-main').src = photoSrc(scene.main);
  document.getElementById('scene-side-top').src = photoSrc(scene.sideTop);
  document.getElementById('scene-side-bottom').src = photoSrc(scene.sideBottom);

  var dotsEl = document.getElementById('scene-dots');
  if (dotsEl) {
    var dots = dotsEl.children;
    for (var i = 0; i < dots.length; i++) {
      dots[i].className = i === index ? 'scene-dot active' : 'scene-dot';
    }
  }
}

/* ── CTA ── */
function renderCta() {
  var el = document.getElementById('cta-section');
  var cta = siteConfig.cta;
  if (!el || !cta) return;
  el.innerHTML =
    '<div class="wrap"><div class="cta-banner">'
    + '<p class="cta-text">' + esc(cta.text) + '</p>'
    + '<a href="' + esc(cta.phoneHref) + '" class="cta-phone">'
    + '<span class="cta-phone-icon">' + iconHTML('phone') + '</span>'
    + esc(cta.phone) + '</a>'
    + '</div></div>';
}

/* ── Программы ── */
function renderProgramsHeader() {
  var el = document.getElementById('programs-header');
  var s = siteConfig.programsSection;
  if (!el) return;
  el.innerHTML =
    '<h2 class="section-title">' + esc(s.title) + '</h2>'
    + '<p class="section-subtitle">' + esc(s.subtitle) + '</p>';
}

function renderPrograms() {
  var el = document.getElementById('programs-grid');
  var programs = siteConfig.programs;
  if (!el) return;

  var h = '';
  for (var i = 0; i < programs.length; i++) {
    var p = programs[i];
    h += '<article class="p-card">';
    h += '<div class="p-card-top">';
    h += '<div class="p-card-icon" style="background:' + esc(p.iconColor) + '">' + iconHTML(p.icon) + '</div>';
    if (p.ageBadge) h += '<span class="p-card-badge">' + esc(p.ageBadge) + '</span>';
    h += '</div>';
    h += '<h3 class="p-card-title">' + esc(p.title) + '</h3>';
    h += '<div class="p-card-prices">';
    for (var j = 0; j < p.prices.length; j++) {
      h += '<span>' + esc(p.prices[j]) + '</span>';
    }
    h += '</div>';
    if (p.description) {
      if (Array.isArray(p.description)) {
        // Если description — массив
        h += '<div class="p-card-description">';
        for (var k = 0; k < p.description.length; k++) {
          h += '<p>' + esc(p.description[k]) + '</p>';
        }
        h += '</div>';
      } else {
        // Если description — строка (для обратной совместимости)
        h += '<p class="p-card-desc">' + esc(p.description) + '</p>';
      }
    }
    h += '</article>';
  }
  el.innerHTML = h;
}

/* ── Промо ── */
function renderPromo() {
  var el = document.getElementById('promo-section');
  var promo = siteConfig.promo;
  if (!el || !promo) return;

  // Проверяем, является ли иконка логотипом (заканчивается на .svg)
  var iconHtml = '';
  if (promo.icon && promo.icon.endsWith('.svg')) {
    iconHtml = '<img src="assets/' + promo.icon + '" alt="' + esc(promo.title) + '" class="promo-logo">';
  } else {
    iconHtml = iconHTML(promo.icon);
  }

  el.innerHTML =
    '<div class="wrap"><div class="promo-banner">'
    + '<div class="promo-icon">' + iconHtml + '</div>'
    + '<div class="promo-content">'
    + '<p class="promo-title">' + esc(promo.title) + '</p>'
    + '<p class="promo-subtitle">' + esc(promo.subtitle) + '</p>'
    + '</div>'
    + '<a href="' + esc(promo.href) + '" class="promo-btn" target="_blank" rel="noopener noreferrer">'
    + esc(promo.buttonText) + iconHTML('arrow-right', 'icon-svg icon-svg--btn') + '</a>'
    + '</div></div>';
}

/* ── Лайтбокс ── */
var lb = { current: 0 };

function openLightbox(photoIndex) {
  lb.current = photoIndex || 0;
  document.getElementById('lightbox').classList.add('open');
  updateLightboxImg();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxMove(dir) {
  var next = lb.current + dir;
  if (next < 0 || next >= galleryState.flatPhotos.length) return;
  lb.current = next;
  updateLightboxImg();
}

function updateLightboxImg() {
  document.getElementById('lightbox-img').src = photoSrc(galleryState.flatPhotos[lb.current]);
  document.getElementById('lightbox-counter').textContent = (lb.current + 1) + ' / ' + galleryState.flatPhotos.length;
  document.getElementById('lb-prev').style.display = lb.current > 0 ? '' : 'none';
  document.getElementById('lb-next').style.display = lb.current < galleryState.flatPhotos.length - 1 ? '' : 'none';
}

/* ── Инициализация ── */
document.addEventListener('DOMContentLoaded', function () {
  document.title = siteConfig.meta.title;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', siteConfig.meta.description);

  applyHeroGridLayout();
  renderHeader();
  renderFooter();
  renderHeroTitles();
  renderHeroGrid();
  renderCta();
  renderProgramsHeader();
  renderPrograms();
  renderPromo();

  var scrollBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', function () {
    scrollBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  scrollBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
  });
  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', function () { lightboxMove(-1); });
  document.getElementById('lb-next').addEventListener('click', function () { lightboxMove(1); });

  var lbEl = document.getElementById('lightbox');
  var lbStartX = 0;
  lbEl.addEventListener('touchstart', function (e) { lbStartX = e.touches[0].clientX; }, { passive: true });
  lbEl.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - lbStartX;
    if (Math.abs(dx) > 50) lightboxMove(dx < 0 ? 1 : -1);
  });

  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxMove(-1);
    if (e.key === 'ArrowRight') lightboxMove(1);
  });
});
