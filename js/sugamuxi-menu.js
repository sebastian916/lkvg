document.addEventListener('DOMContentLoaded', function () {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 40);
            }
        }
        setTimeout(typeWriter, 300);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const patrimonioItems = document.querySelectorAll('.patrimonio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');

            patrimonioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 30);
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 30);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 250);
                    }
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const viewButtons = document.querySelectorAll('.view-details-btn');
    const closeButtons = document.querySelectorAll('.close-details-btn');

    viewButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const cardFlip = this.closest('.card-flip');
            cardFlip.classList.add('flipped');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const cardFlip = this.closest('.card-flip');
            cardFlip.classList.remove('flipped');
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.card-flip') && !e.target.closest('.filter-btn')) {
            const flippedCards = document.querySelectorAll('.card-flip.flipped');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });
});

const fadeElements = document.querySelectorAll('.patrimonio-item, .stat-card, .proyecto-card, .timeline-item');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.style.opacity = '0';
    fadeObserver.observe(element);
});

// Scroll listener removed - handled by global.js
// Smooth scroll removed - handled by global.js

document.querySelectorAll('.card-flip').forEach(card => {
    card.addEventListener('mouseenter', function () {
        if (!this.classList.contains('flipped')) {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        }
    });

    card.addEventListener('mouseleave', function () {
        if (!this.classList.contains('flipped')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Auto-active link removed (conflicts with global page-based nav).

document.querySelectorAll('.card-img').forEach(img => {
    img.addEventListener('error', function () {
        const category = this.closest('.patrimonio-item').getAttribute('data-category');
        const title = this.closest('.card-front').querySelector('.card-title').textContent;
        const placeholder = document.createElement('div');
        placeholder.className = 'patrimonio-placeholder';
        const icons = {
            'arqueologico': 'fas fa-monument',
            'arquitectonico': 'fas fa-building',
            'natural': 'fas fa-tree',
            'inmaterial': 'fas fa-music',
            'gastronomico': 'fas fa-utensils'
        };

        placeholder.innerHTML = `
            <i class="${icons[category] || 'fas fa-landmark'}" style="font-size: 3.5rem; margin-bottom: 15px; color: #e67e22;"></i>
            <h4>${title}</h4>
            <p>Imagen del patrimonio cultural no disponible</p>
            <small>Documentación estudiantil en proceso</small>
        `;

        placeholder.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
            color: #666;
            text-align: center;
            padding: 25px;
            border: 2px dashed #e67e22;
        `;

        this.style.display = 'none';
        this.parentElement.appendChild(placeholder);
    });

    if (!img.complete || img.naturalWidth === 0) {
        img.dispatchEvent(new Event('error'));
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.textContent.replace('+', ''));
                const duration = 1800;
                const increment = target / (duration / 14);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        statNumber.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current) + '+';
                    }
                }, 14);

                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.4 });

    statNumbers.forEach(stat => observer.observe(stat));
});

document.addEventListener('DOMContentLoaded', function () {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(' + (index % 2 === 0 ? '-40px' : '40px') + ')';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 0.7s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(item);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.card-front').forEach(card => {
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.style.cssText = `
            position: absolute;
            top: 15px;
            left: 15px;
            background: rgba(255, 255, 255, 0.95);
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.1rem;
            color: #e67e22;
            transition: all 0.3s ease;
            z-index: 10;
        `;

        favoriteBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.transform = 'scale(1.2)';
                this.style.background = '#e67e22';
                icon.style.color = 'white';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 250);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.background = 'rgba(255, 255, 255, 0.95)';
                icon.style.color = '#e67e22';
            }
        });

        card.querySelector('.card-image').appendChild(favoriteBtn);
    });
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const flippedCards = document.querySelectorAll('.card-flip.flipped');
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
        });
    }
});

window.addEventListener('beforeunload', function () {
    localStorage.removeItem('patrimonio_favorites');
});