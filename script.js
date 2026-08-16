/* ==========================================================================
   CONFIGURACIÓN Y DATA DE CONTENIDOS (FÁCILMENTE EDITABLE)
   ========================================================================== */

// 1. Carrusel / Slider
const DATA_SLIDES = [
    {
        badge: { es: "Oferta Especial", en: "Special Offer" },
        badgeIcon: "fa-fire",
        titulo: { es: "Descubre la Magia de <em>CDMX</em>", en: "Discover the Magic of <em>CDMX</em>" },
        descripcion: { 
            es: "Paquetes de fin de semana con hospedaje en zonas exclusivas y tours culturales.", 
            en: "Weekend packages including luxury hotel stay and tour experiences." 
        },
        btnTexto: { es: "Solicitar Oferta", en: "Claim Deal" },
        destinoTag: "CDMX - Oferta Especial",
        imagen: "img/cdmx.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1920&q=80"
    },
    {
        badge: { es: "Tradición & Tequila", en: "Tradition & Tequila" },
        badgeIcon: "fa-glass-cheers",
        titulo: { es: "Siente el Alma de <em>Guadalajara</em>", en: "Feel the Soul of <em>Guadalajara</em>" },
        descripcion: { 
            es: "Recorridos por tequila, charrería y la arquitectura histórica de Jalisco.", 
            en: "Tours through tequila region, charrería and historic architecture." 
        },
        btnTexto: { es: "Cotizar Viaje", en: "Quote Trip" },
        destinoTag: "Guadalajara - Ruta Tequila",
        imagen: "img/guadalajara.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1920&q=80"
    },
    {
        badge: { es: "Negocios & Naturaleza", en: "Business & Nature" },
        badgeIcon: "fa-mountain",
        titulo: { es: "Conecta con <em>Monterrey</em>", en: "Connect with <em>Monterrey</em>" },
        descripcion: { 
            es: "La combinación perfecta entre innovación urbana y aventuras de montaña.", 
            en: "The perfect mix between urban innovation and mountain adventures." 
        },
        btnTexto: { es: "Ver Paquetes", en: "View Packages" },
        destinoTag: "Monterrey - Escapada Urbana",
        imagen: "img/monterrey.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=1920&q=80"
    },
    {
        badge: { es: "Ruta Gastronómica", en: "Culinary Tour" },
        badgeIcon: "fa-utensils",
        titulo: { es: "Vive la Cultura de <em>Oaxaca</em>", en: "Experience the Culture of <em>Oaxaca</em>" },
        descripcion: { 
            es: "Tradición, gastronomía única y artesanías en un tour inolvidable.", 
            en: "Tradition, unique gastronomy, and crafts on an unforgettable tour." 
        },
        btnTexto: { es: "Más Información", en: "More Info" },
        destinoTag: "Oaxaca - Tour Cultural",
        imagen: "img/oaxaca.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&w=1920&q=80"
    },
    {
        badge: { es: "Playa & Sol", en: "Beach & Sun" },
        badgeIcon: "fa-sun",
        titulo: { es: "Escape a <em>Puerto Vallarta</em>", en: "Escape to <em>Puerto Vallarta</em>" },
        descripcion: { 
            es: "Resorts todo incluido para disfrutar en familia o en pareja.", 
            en: "All-inclusive resorts to enjoy with family or as a couple." 
        },
        btnTexto: { es: "Cotizar Paquete", en: "Quote Package" },
        destinoTag: "Puerto Vallarta - All Inclusive",
        imagen: "img/vallarta.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1920&q=80"
    },
    {
        badge: { es: "Aventura Ecoturística", en: "Eco-Adventure" },
        badgeIcon: "fa-tree",
        titulo: { es: "Explora la Selva de <em>Chiapas</em>", en: "Explore the Jungle of <em>Chiapas</em>" },
        descripcion: { 
            es: "Maravíllate con el Cañón del Sumidero y las cascadas de agua azul.", 
            en: "Marvel at the Sumidero Canyon and pristine blue waterfalls." 
        },
        btnTexto: { es: "Reservar Ahora", en: "Book Now" },
        destinoTag: "Chiapas - Ruta Aventura",
        imagen: "img/tuxtla.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1920&q=80"
    }
];

// 2. Catálogo de Destinos
const DATA_DESTINOS = [
    {
        titulo: "CDMX",
        tag: "Modernidad",
        info: { es: "Cultura, Gastronomía y Compras", en: "Culture, Cuisine & Shopping" },
        imagen: "img/cdmx.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80"
    },
    {
        titulo: "Guadalajara",
        tag: "Tradición",
        info: { es: "Tequila, Mariachi y Negocios", en: "Tequila, Mariachi & Business" },
        imagen: "img/guadalajara.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80"
    },
    {
        titulo: "Monterrey",
        tag: "Progreso",
        info: { es: "Montañas, Parques y Modernidad", en: "Mountains, Parks & Modernity" },
        imagen: "img/monterrey.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=800&q=80"
    },
    {
        titulo: "Oaxaca",
        tag: "Cultura",
        info: { es: "Mezcal, Tradición y Arte", en: "Mezcal, Tradition & Art" },
        imagen: "img/oaxaca.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?auto=format&fit=crop&w=800&q=80"
    },
    {
        titulo: "Puerto Vallarta",
        tag: "Playa",
        info: { es: "Atardeceres, Playa y Relax", en: "Sunsets, Beach & Relaxation" },
        imagen: "img/vallarta.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=800&q=80"
    },
    {
        titulo: "Chiapas",
        tag: "Aventura",
        info: { es: "Cañón del Sumidero y Selva", en: "Sumidero Canyon & Jungle" },
        imagen: "img/tuxtla.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80"
    }
];

// 3. Información Sucursal
const DATA_SUCURSAL = {
    direccion: "Calle 39 No. 460 local 7, Col. Máximo Ancona, Mérida, Yucatán, México",
    telefono: "+52 999 243 5427",
    telefonoLimpio: "529992435427",
    web: "www.yucatan.world",
    webUrl: "https://www.yucatan.world",
    horarios: "Lun - Vie: 9:00 AM - 7:00 PM | Sáb: 10:00 AM - 2:00 PM"
};


/* ==========================================================================
   RENDERIZADO Y LÓGICA DE INTERACCIÓN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // RENDER 1: Carrusel / Banners
    renderCarousel();

    // RENDER 2: Destinos
    renderDestinos();

    // RENDER 3: Datos de Sucursal
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
   FUNCIONES AUXILIARES DE RENDERIZADO
   ========================================================================== */

function renderCarousel() {
    const container = document.getElementById('carouselContainer');
    if (!container) return;

    container.innerHTML = DATA_SLIDES.map((slide, idx) => `
        <div class="slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${slide.imagen}'), url('${slide.imagenFallback}');">
            <div class="slide-overlay"></div>
            <div class="contenedor slide-content">
                <span class="badge-promo"><i class="fas ${slide.badgeIcon}"></i> 
                    <span class="lang-es">${slide.badge.es}</span>
                    <span class="lang-en">${slide.badge.en}</span>
                </span>
                <h1>
                    <span class="lang-es">${slide.titulo.es}</span>
                    <span class="lang-en">${slide.titulo.en}</span>
                </h1>
                <p>
                    <span class="lang-es">${slide.descripcion.es}</span>
                    <span class="lang-en">${slide.descripcion.en}</span>
                </p>
                <a href="#contacto" class="btn btn-accent btn-slide" data-dest="${slide.destinoTag}">
                    <i class="fas fa-paper-plane"></i> 
                    <span class="lang-es">${slide.btnTexto.es}</span>
                    <span class="lang-en">${slide.btnTexto.en}</span>
                </a>
            </div>
        </div>
    `).join('');

    iniciarLogicaCarousel();
}

function renderDestinos() {
    const grid = document.getElementById('gridDestinos');
    if (!grid) return;

    grid.innerHTML = DATA_DESTINOS.map(dest => `
        <article class="card-destino" data-animate>
            <div class="card-media">
                <img src="${dest.imagen}" alt="${dest.titulo}" onerror="this.src='${dest.imagenFallback}'">
                <span class="tag-flight">${dest.tag}</span>
            </div>
            <div class="card-body">
                <h3>${dest.titulo}</h3>
                <p class="route-info"><i class="fas fa-star"></i> 
                    <span class="lang-es">${dest.info.es}</span>
                    <span class="lang-en">${dest.info.en}</span>
                </p>
                <a href="#contacto" class="btn btn-outline" data-dest="${dest.titulo}">
                    <span class="lang-es">Cotizar Viaje</span>
                    <span class="lang-en">Quote Trip</span>
                </a>
            </div>
        </article>
    `).join('');
}

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