/* ==========================================================================
   CONFIGURACIÓN Y DATA DE CONTENIDOS
   ========================================================================== */

const DATA_SUCURSAL = {
    direccion: "Calle 39 No. 460 local 7, Col. Máximo Ancona, Mérida, Yucatán, México",
    telefono: "+52 999 243 5427",
    telefonoLimpio: "529992435427",
    web: "www.yucatan.world",
    webUrl: "https://www.yucatan.world",
    horarios: "Lun - Vie: 9:00 AM - 7:00 PM | Sáb: 10:00 AM - 2:00 PM"
};

const FALLBACK_IMAGE = 'img/imgFallida.jpg';

// Estado global de la aplicación
let currentLang = 'es';
let autoSlideInterval = null;

// Intersection Observer único para animaciones
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            scrollObserver.unobserve(entry.target); // Dejar de observar una vez animado
        }
    });
}, { threshold: 0.15 });

/* ==========================================================================
   INICIALIZACIÓN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    renderSucursal();
    initHeaderScroll();
    initMobileMenu();
    initLangSelector();
    initCotizarDelegation();
    observeElements();
    
    // Carga de datos asíncronos
    cargarDatosLanding();
});

/* ==========================================================================
   LÓGICA DE INTERACCIÓN Y EVENTOS
   ========================================================================== */

function observeElements(container = document) {
    container.querySelectorAll('[data-animate]').forEach(el => scrollObserver.observe(el));
}

function initHeaderScroll() {
    const header = document.getElementById('mainHeader');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobilePanel = document.getElementById('mobilePanel');

    const toggleMenu = (open) => mobilePanel?.classList.toggle('open', open);

    mobileToggle?.addEventListener('click', () => toggleMenu(true));
    mobileClose?.addEventListener('click', () => toggleMenu(false));
    
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

function initLangSelector() {
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.getAttribute('data-lang');
            
            langBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll(`[data-lang="${currentLang}"]`).forEach(b => b.classList.add('active'));

            aplicarIdiomaVisibilidad();
        });
    });
}

function aplicarIdiomaVisibilidad() {
    const esElements = document.querySelectorAll('.lang-es');
    const enElements = document.querySelectorAll('.lang-en');

    const displayEs = currentLang === 'es' ? 'inline-block' : 'none';
    const displayEn = currentLang === 'en' ? 'inline-block' : 'none';

    esElements.forEach(el => el.style.display = displayEs);
    enElements.forEach(el => el.style.display = displayEn);
}

function initCotizarDelegation() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-dest]');
        if (!btn) return;
        
        const destName = btn.getAttribute('data-dest');
        const destinoInput = document.getElementById('destino_interes');
        if (destinoInput) {
            destinoInput.value = destName;
        }
    });
}

/* ==========================================================================
   CARGA DE DATOS ASÍNCRONA
   ========================================================================== */

async function cargarDatosLanding() {
    try {
        const response = await fetch('api_slides.php');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        renderCarousel(data.slides || []);
        renderDestinos(data.destinos || []);
    } catch (error) {
        console.error('Error al cargar la información:', error);
        renderCarousel([]);
        renderDestinos([]);
    } finally {
        // Asegurar que el contenido inyectado respete el idioma activo
        aplicarIdiomaVisibilidad();
    }
}

/* ==========================================================================
   RENDERIZADO Y COMPONENTES
   ========================================================================== */

function renderSucursal() {
    const elDireccion = document.getElementById('sucursalDireccion');
    const elTel = document.getElementById('sucursalTelefono');
    const elWeb = document.getElementById('sucursalWeb');
    const elHorario = document.getElementById('sucursalHorarios');

    if (elDireccion) elDireccion.textContent = DATA_SUCURSAL.direccion;
    if (elTel) {
        elTel.textContent = DATA_SUCURSAL.telefono;
        elTel.setAttribute('href', `tel:+${DATA_SUCURSAL.telefonoLimpio}`);
    }
    if (elWeb) {
        elWeb.textContent = DATA_SUCURSAL.web;
        elWeb.setAttribute('href', DATA_SUCURSAL.webUrl);
    }
    if (elHorario) elHorario.textContent = DATA_SUCURSAL.horarios;
}

function renderCarousel(slides = []) {
    const container = document.getElementById('carouselContainer');
    if (!container) return;

    if (!Array.isArray(slides) || slides.length === 0) {
        container.innerHTML = '<p class="text-center">No hay promociones disponibles.</p>';
        return;
    }

    container.innerHTML = slides.map((slide, idx) => {
        const rutaImg = slide.imagen || FALLBACK_IMAGE;
        return `
            <div class="slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${rutaImg}'), url('${FALLBACK_IMAGE}');">
                <div class="slide-overlay"></div>
                <div class="contenedor slide-content">
                    <span class="badge-promo"><i class="fas ${slide.badgeIcon || 'fa-star'}"></i> 
                        <span class="lang-es">${slide.badge?.es || ''}</span>
                        <span class="lang-en">${slide.badge?.en || ''}</span>
                    </span>
                    <h1>
                        <span class="lang-es">${slide.titulo?.es || ''}</span>
                        <span class="lang-en">${slide.titulo?.en || ''}</span>
                    </h1>
                    <p>
                        <span class="lang-es">${slide.descripcion?.es || ''}</span>
                        <span class="lang-en">${slide.descripcion?.en || ''}</span>
                    </p>
                    <a href="#contacto" class="btn btn-accent btn-slide">
                        <i class="fas fa-paper-plane"></i> 
                        <span class="lang-es">${slide.btnTexto?.es || ''}</span>
                        <span class="lang-en">${slide.btnTexto?.en || ''}</span>
                    </a>
                </div>
            </div>
        `;
    }).join('');

    iniciarLogicaCarousel();
}

function renderDestinos(destinos = []) {
    const grid = document.getElementById('gridDestinos');
    if (!grid) return;

    if (!Array.isArray(destinos) || destinos.length === 0) {
        grid.innerHTML = '<p class="text-center">No hay destinos disponibles por el momento.</p>';
        return;
    }

    grid.innerHTML = destinos.map(dest => {
        const titulo = dest.titulo || '';
        const tagEs = typeof dest.tag === 'object' ? (dest.tag?.es || '') : (dest.tag || '');
        const tagEn = typeof dest.tag === 'object' ? (dest.tag?.en || '') : (dest.tag || '');
        
        const rawInfo = dest.info?.es || dest.info?.en || '';
        const infoLimpia = rawInfo.replace(/<\/?[^>]+(>|$)/g, '');

        const mensajeTexto = `Hola, me interesa recibir información sobre el paquete a ${titulo} (${infoLimpia})`;
        const urlWa = `https://wa.me/529961010862?text=${encodeURIComponent(mensajeTexto)}`;

        return `
            <article class="card-destino" data-animate>
                <div class="card-media">
                    <img src="${dest.imagen || FALLBACK_IMAGE}" alt="${titulo}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';">
                    <span class="tag-flight">
                        <span class="lang-es">${tagEs}</span>
                        <span class="lang-en">${tagEn}</span>
                    </span>
                </div>
                <div class="card-body">
                    <h3>${titulo}</h3>
                    <p class="route-info"><i class="fas fa-star"></i> 
                        <span class="lang-es">${dest.info?.es || ''}</span>
                        <span class="lang-en">${dest.info?.en || ''}</span>
                    </p>
                    <a href="${urlWa}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
                         <i class="fas fa-heart"></i>
                        <span class="lang-es">Lo quiero !</span>
                        <span class="lang-en">I love it !</span>
                    </a>
                </div>
            </article>
        `;
    }).join('');

    // Observar únicamente las nuevas cards generadas
    observeElements(grid);
}

function iniciarLogicaCarousel() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('carouselDots');
    let currentSlide = 0;

    if (slides.length === 0) return;

    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.dot');

    const updateCarousel = () => {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    };

    const goToSlide = (index) => {
        currentSlide = index;
        updateCarousel();
        resetAutoSlide();
    };

    const startAutoSlide = () => { 
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000); 
    };

    const resetAutoSlide = () => { 
        clearInterval(autoSlideInterval); 
        startAutoSlide(); 
    };

    // Usar cloneNode o reasignar onclick para prevenir duplicación de listeners si se re-renderiza
    if (nextBtn) nextBtn.onclick = () => { nextSlide(); resetAutoSlide(); };
    if (prevBtn) prevBtn.onclick = () => { prevSlide(); resetAutoSlide(); };

    startAutoSlide();
}