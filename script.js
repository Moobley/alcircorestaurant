// Al Circo Ristorante Pizzeria - JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile bottom action bar (localized per page lang)
    (function buildActionBar() {
        const lang = document.documentElement.lang || 'es';
        const labels = {
            es: { call: 'Chiama', whatsapp: 'WhatsApp', menu: 'Menú', where: 'Dónde estamos', nav: 'Acciones rápidas' },
            it: { call: 'Chiama', whatsapp: 'WhatsApp', menu: 'Menu', where: 'Dove siamo', nav: 'Azioni rapide' },
            en: { call: 'Call', whatsapp: 'WhatsApp', menu: 'Menu', where: 'Where we are', nav: 'Quick actions' },
            fr: { call: 'Appeler', whatsapp: 'WhatsApp', menu: 'Menu', where: 'Où nous sommes', nav: 'Actions rapides' },
            de: { call: 'Anrufen', whatsapp: 'WhatsApp', menu: 'Menü', where: 'Wo wir sind', nav: 'Schnellzugriff' }
        };
        const t = labels[lang] || labels.es;
        const icons = {
            call: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
            whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>',
            menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
            where: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>'
        };
        const actions = [
            { href: 'tel:+34928765949', icon: icons.call, label: t.call },
            { href: 'https://api.whatsapp.com/send?phone=34608171862', icon: icons.whatsapp, label: t.whatsapp, external: true },
            { href: '#menu', icon: icons.menu, label: t.menu },
            { href: '#contatti', icon: icons.where, label: t.where }
        ];
        const bar = document.createElement('nav');
        bar.className = 'mobile-action-bar';
        bar.setAttribute('role', 'navigation');
        bar.setAttribute('aria-label', t.nav);
        actions.forEach(function(action) {
            const a = document.createElement('a');
            a.href = action.href;
            a.innerHTML = action.icon + '<span>' + action.label + '</span>';
            if (action.external) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
            bar.appendChild(a);
        });
        document.body.appendChild(bar);
    })();

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: reduceMotion ? 'auto' : 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (navLink) {
                const linkPosition = navLink.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop;
                
                if (scrollPosition >= linkPosition && scrollPosition < linkPosition + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    // Add active class to CSS
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu a.active {
            color: var(--primary-red);
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
    
    // Load menu from data/menu.json
    const menuContainer = document.getElementById('menu-categories');
    if (menuContainer) {
        const lang = document.documentElement.lang || 'es';

        const modalLabels = {
            es: { close: 'Cerrar', dialog: 'Detalle del plato' },
            it: { close: 'Chiudi', dialog: 'Dettaglio piatto' },
            en: { close: 'Close', dialog: 'Dish details' },
            fr: { close: 'Fermer', dialog: 'Détail du plat' },
            de: { close: 'Schließen', dialog: 'Gerichtdetails' }
        };

        fetch('data/menu.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Menu data could not be loaded');
                }
                return response.json();
            })
            .then(data => {
                menuContainer.innerHTML = '';

                data.categories.forEach((category, categoryIndex) => {
                    const categoryEl = document.createElement('div');
                    categoryEl.className = 'menu-category';

                    const collapseId = 'menu-category-' + categoryIndex;

                    const categoryToggle = document.createElement('button');
                    categoryToggle.type = 'button';
                    categoryToggle.className = 'menu-category-toggle';
                    categoryToggle.setAttribute('aria-expanded', 'false');
                    categoryToggle.setAttribute('aria-controls', collapseId);

                    const categoryTitle = document.createElement('span');
                    categoryTitle.className = 'menu-category-title';
                    categoryTitle.textContent = category.name[lang] || category.name.it;
                    categoryToggle.appendChild(categoryTitle);

                    const chevron = document.createElement('span');
                    chevron.className = 'menu-category-chevron';
                    chevron.setAttribute('aria-hidden', 'true');
                    chevron.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
                    categoryToggle.appendChild(chevron);

                    categoryEl.appendChild(categoryToggle);

                    const collapse = document.createElement('div');
                    collapse.id = collapseId;
                    collapse.className = 'menu-category-collapse';

                    categoryToggle.addEventListener('click', function() {
                        const expanded = categoryToggle.getAttribute('aria-expanded') === 'true';
                        categoryToggle.setAttribute('aria-expanded', String(!expanded));
                        collapse.classList.toggle('is-open', !expanded);
                    });

                    const renderItem = (item) => {
                        const itemEl = document.createElement('div');
                        itemEl.className = 'menu-item';

                        const itemImage = document.createElement('img');
                        itemImage.className = 'menu-item-image';
                        itemImage.src = item.image;
                        itemImage.alt = item.name[lang] || item.name.it;
                        itemImage.loading = 'lazy';
                        itemImage.onerror = () => {
                            itemImage.src = 'images/menu/placeholder.png';
                            itemImage.onerror = null;
                        };
                        itemEl.appendChild(itemImage);

                        const itemName = document.createElement('div');
                        itemName.className = 'menu-item-name';
                        itemName.textContent = item.name[lang] || item.name.it;
                        itemEl.appendChild(itemName);

                        const itemDescription = document.createElement('p');
                        itemDescription.className = 'menu-item-description';
                        itemDescription.textContent = item.description[lang] || item.description.it;
                        itemEl.appendChild(itemDescription);

                        const itemPrice = document.createElement('div');
                        itemPrice.className = 'menu-item-price';
                        if (item.price !== null && item.price !== undefined) {
                            const formatted = '€ ' + item.price.toFixed(2).replace('.', ',');
                            itemPrice.textContent = item.priceFrom ? 'Da ' + formatted : formatted;
                        }
                        itemEl.appendChild(itemPrice);

                        const itemBadges = document.createElement('div');
                        itemBadges.className = 'menu-item-badges';
                        (item.badges || []).forEach(badge => {
                            const badgeEl = document.createElement('span');
                            badgeEl.className = 'badge badge-' + badge;
                            badgeEl.textContent = badge;
                            itemBadges.appendChild(badgeEl);
                        });
                        itemEl.appendChild(itemBadges);

                        itemEl.tabIndex = 0;
                        itemEl.setAttribute('role', 'button');
                        itemEl.setAttribute('aria-haspopup', 'dialog');
                        itemEl.dataset.name = item.name[lang] || item.name.it;
                        itemEl.dataset.description = item.description[lang] || item.description.it;
                        itemEl.dataset.image = item.image;
                        itemEl.dataset.price = (item.price !== null && item.price !== undefined) ? String(item.price) : '';
                        itemEl.dataset.priceFrom = item.priceFrom ? 'true' : '';
                        itemEl.dataset.badges = JSON.stringify(item.badges || []);
                        itemEl.addEventListener('click', function() { openMenuModal(itemEl); });
                        itemEl.addEventListener('keydown', function(e) {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openMenuModal(itemEl);
                            }
                        });

                        return itemEl;
                    };

                    if (category.items) {
                        const itemsGrid = document.createElement('div');
                        itemsGrid.className = 'menu-items-grid';
                        category.items.forEach(item => itemsGrid.appendChild(renderItem(item)));
                        collapse.appendChild(itemsGrid);
                    } else {
                        category.subcategories.forEach(sub => {
                            const subTitle = document.createElement('h4');
                            subTitle.className = 'menu-subcategory-title';
                            subTitle.textContent = sub.name[lang] || sub.name.it;
                            collapse.appendChild(subTitle);

                            const itemsGrid = document.createElement('div');
                            itemsGrid.className = 'menu-items-grid';
                            sub.items.forEach(item => itemsGrid.appendChild(renderItem(item)));
                            collapse.appendChild(itemsGrid);
                        });
                    }

                    categoryEl.appendChild(collapse);
                    menuContainer.appendChild(categoryEl);
                });
            })
            .catch(error => {
                console.error('Error loading menu:', error);
                menuContainer.innerHTML = '<p class="menu-error">Menu temporarily unavailable.</p>';
            });

        function openMenuModal(itemEl) {
            const t = modalLabels[lang] || modalLabels.es;
            const overlay = document.createElement('div');
            overlay.className = 'menu-modal';
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.setAttribute('aria-label', t.dialog);

            const dialog = document.createElement('div');
            dialog.className = 'menu-modal-dialog';

            const closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.className = 'menu-modal-close';
            closeBtn.setAttribute('aria-label', t.close);
            closeBtn.innerHTML = '&times;';
            dialog.appendChild(closeBtn);

            const img = document.createElement('img');
            img.className = 'menu-modal-image';
            img.src = itemEl.dataset.image;
            img.alt = itemEl.dataset.name;
            img.onerror = () => {
                img.src = 'images/menu/placeholder.png';
                img.onerror = null;
            };
            dialog.appendChild(img);

            const name = document.createElement('div');
            name.className = 'menu-modal-name';
            name.textContent = itemEl.dataset.name;
            dialog.appendChild(name);

            const desc = document.createElement('p');
            desc.className = 'menu-modal-description';
            desc.textContent = itemEl.dataset.description;
            dialog.appendChild(desc);

            const price = document.createElement('div');
            price.className = 'menu-modal-price';
            if (itemEl.dataset.price !== '') {
                const formatted = '€ ' + parseFloat(itemEl.dataset.price).toFixed(2).replace('.', ',');
                price.textContent = itemEl.dataset.priceFrom === 'true' ? 'Da ' + formatted : formatted;
            }
            dialog.appendChild(price);

            const badges = document.createElement('div');
            badges.className = 'menu-modal-badges';
            JSON.parse(itemEl.dataset.badges || '[]').forEach(badge => {
                const badgeEl = document.createElement('span');
                badgeEl.className = 'badge badge-' + badge;
                badgeEl.textContent = badge;
                badges.appendChild(badgeEl);
            });
            dialog.appendChild(badges);

            overlay.appendChild(dialog);
            document.body.appendChild(overlay);

            const close = () => {
                overlay.remove();
                document.body.classList.remove('menu-modal-open');
                document.removeEventListener('keydown', onKeydown);
                itemEl.focus();
            };
            const onKeydown = (e) => {
                if (e.key === 'Escape') {
                    close();
                    return;
                }
                if (e.key !== 'Tab') return;
                const focusables = dialog.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusables.length === 0) {
                    e.preventDefault();
                    closeBtn.focus();
                    return;
                }
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            };
            closeBtn.addEventListener('click', close);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) close();
            });
            document.addEventListener('keydown', onKeydown);
            document.body.classList.add('menu-modal-open');
            closeBtn.focus();
        }
    }
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    imageObserver.unobserve(image);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
