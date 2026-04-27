const ORDER_EMAIL = 'contact@jazzitorecords.pl';
const SET_PRICE = 99;

function initOrderSlider(){
    const slides = Array.from(document.querySelectorAll('.order-slide'));
    const prev = document.getElementById('prevSlide');
    const next = document.getElementById('nextSlide');
    const dotsWrap = document.getElementById('sliderDots');

    if(!slides.length || !dotsWrap) return;

    let current = 0;
    let timer = null;

    const dots = slides.map((_, index)=>{
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Pokaż zdjęcie ${index + 1}`);
        dot.addEventListener('click',()=>{
            setSlide(index);
            restartAuto();
        });
        dotsWrap.appendChild(dot);
        return dot;
    });

    function setSlide(index){
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');

        current = (index + slides.length) % slides.length;

        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function nextSlide(){
        setSlide(current + 1);
    }

    function prevSlide(){
        setSlide(current - 1);
    }

    function restartAuto(){
        clearInterval(timer);
        timer = setInterval(nextSlide, 3500);
    }

    prev?.addEventListener('click',()=>{
        prevSlide();
        restartAuto();
    });

    next?.addEventListener('click',()=>{
        nextSlide();
        restartAuto();
    });

    dots[0].classList.add('active');
    restartAuto();
}

function initOrderForm(){
    const form = document.getElementById('jazzitoOrderForm');
    const totalPrice = document.getElementById('totalPrice');
    const quantity = form?.elements?.quantity;

    if(!form || !quantity || !totalPrice) return;

    function updateTotal(){
        const qty = Number(quantity.value) || 1;
        totalPrice.textContent = `${qty * SET_PRICE} PLN`;
    }

    quantity.addEventListener('change', updateTotal);
    updateTotal();

    form.addEventListener('submit',(event)=>{
        event.preventDefault();

        const data = new FormData(form);
        const qty = Number(data.get('quantity')) || 1;
        const total = qty * SET_PRICE;

        const subject = `Zamówienie — Jazzito Records x3 EP — ${data.get('name')}`;
        const body = [
            'Dzień dobry,',
            '',
            'Chcę zamówić zestaw x3 EP Jazzito Records.',
            '',
            `Imię i nazwisko: ${data.get('name')}`,
            `E-mail: ${data.get('email')}`,
            `Telefon: ${data.get('phone') || '-'}`,
            `Ilość zestawów: ${qty}`,
            `Szacunkowa wartość: ${total} PLN`,
            '',
            'Adres dostawy:',
            `${data.get('address')}`,
            '',
            'Uwagi:',
            `${data.get('notes') || '-'}`,
            '',
            'Pozdrawiam'
        ].join('\n');

        window.location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

document.addEventListener('DOMContentLoaded',()=>{
    initOrderSlider();
    initOrderForm();
});
