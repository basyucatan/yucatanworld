/* ==========================================================================
   CONFIGURACIÓN Y DATA DE CONTENIDOS (FÁCILMENTE EDITABLE)
   ========================================================================== */

// Información Sucursal
const DATA_SUCURSAL = {
    direccion: "Calle 39 No. 460 local 7, Col. Máximo Ancona, Mérida, Yucatán, México",
    telefono: "+52 999 243 5427",
    telefonoLimpio: "529992435427",
    web: "www.yucatan.world",
    webUrl: "https://www.yucatan.world",
    horarios: "Lun - Vie: 9:00 AM - 7:00 PM | Sáb: 10:00 AM - 2:00 PM"
};

const FALLBACK_IMAGE = 'img/imgFallida.jpg';

/* ==========================================================================
   INICIALIZACIÓN Y LÓGICA DE INTERACCIÓN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Carga inicial de datos desde el endpoint PHP
    cargarDatosLanding();

    // RENDER Datos de Sucursal
    renderSucursal();

    // Lógica del Header Sticky
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // Lógica Menú Móvil
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobilePanel = document.getElementById('mobilePanel');

    mobileToggle?.addEventListener('click', () => mobilePanel?.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobilePanel?.classList.remove('open'));
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => mobilePanel?.classList.remove('open'));
    });

    // Lógica Idioma ES / EN
    let currentLang = 'es';
    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.getAttribute('data-lang');
            
            langBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll(`[data-lang="${currentLang}"]`).forEach(b => b.classList.add('active'));

            const esElements = document.querySelectorAll('.lang-es');
            const enElements = document.querySelectorAll('.lang-en');

            if (currentLang === 'en') {
                esElements.forEach(el => el.style.display = 'none');
                enElements.forEach(el => el.style.display = 'inline-block');
            } else {
                enElements.forEach(el => el.style.display = 'none');
                esElements.forEach(el => el.style.display = 'inline-block');
            }
        });
    });

    // Vincular botones "Cotizar" para rellenar destino
    vincularBotonesCotizar();

    // Observer Animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animated');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
});

/* ==========================================================================
   CARGA DE DATOS ASÍNCRONA
   ========================================================================== */

async function cargarDatosLanding() {
    try {
        const response = await fetch('api_slides.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        renderCarousel(data.slides || []);
        renderDestinos(data.destinos || []);
    } catch (error) {
        console.error('Error al cargar la información:', error);
        renderCarousel([]);
        renderDestinos([]);
    }
}

/* ==========================================================================
   FUNCIONES AUXILIARES DE RENDERIZADO
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

    const listaSlides = Array.isArray(slides) ? slides : [];

    if (listaSlides.length === 0) {
        container.innerHTML = '<p class="text-center">No hay promociones disponibles.</p>';
        return;
    }

    container.innerHTML = listaSlides.map((slide, idx) => {
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
                    <a href="#contacto" class="btn btn-accent btn-slide" data-dest="${slide.destinoTag || ''}">
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

    const listaDestinos = Array.isArray(destinos) ? destinos : [];

    if (listaDestinos.length === 0) {
        grid.innerHTML = '<p class="text-center">No hay destinos disponibles por el momento.</p>';
        return;
    }

    grid.innerHTML = listaDestinos.map(dest => `
        <article class="card-destino" data-animate>
            <div class="card-media">
                <img src="${dest.imagen || FALLBACK_IMAGE}" alt="${dest.titulo || ''}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';">
                <span class="tag-flight">${dest.tag || ''}</span>
            </div>
            <div class="card-body">
                <h3>${dest.titulo || ''}</h3>
                <p class="route-info"><i class="fas fa-star"></i> 
                    <span class="lang-es">${dest.info?.es || ''}</span>
                    <span class="lang-en">${dest.info?.en || ''}</span>
                </p>
                <a href="#contacto" class="btn btn-outline" data-dest="${dest.titulo || ''}">
                    <span class="lang-es">Cotizar Viaje</span>
                    <span class="lang-en">Quote Trip</span>
                </a>
            </div>
        </article>
    `).join('');

    // Re-vincular elementos recién creados con el Observer de animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('animated');
        });
    }, { threshold: 0.15 });

    grid.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

function iniciarLogicaCarousel() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('carouselDots');
    let currentSlide = 0;
    let autoSlideInterval;

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

    const startAutoSlide = () => { autoSlideInterval = setInterval(nextSlide, 5000); };
    const resetAutoSlide = () => { clearInterval(autoSlideInterval); startAutoSlide(); };

    nextBtn?.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    prevBtn?.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    startAutoSlide();
}

function vincularBotonesCotizar() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-dest]');
        if (btn) {
            const destName = btn.getAttribute('data-dest');
            const destinoInput = document.getElementById('destino_interes');
            if (destinoInput) {
                destinoInput.value = destName;
            }
        }
    });
}