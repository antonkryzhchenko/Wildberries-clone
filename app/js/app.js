import {Splide} from '@splidejs/splide';

document.addEventListener('DOMContentLoaded', () => {

// Slider Start
    const splideSettings = {
        type: "loop",
        gap: "40px",
        classes: {
        arrow: "splide__arrow",
        },
        pagination: true,
        breakpoints: {
        560: {
            pagination: true,
            arrows: false,
            classes: {
            pagination: "splide__pagination",
            },
        },
        },
    };

    new Splide('.splide', splideSettings).mount();

// Slider End

// Cards Start

const api = 'https://6318bbd2f6b281877c7515fc.mockapi.io/Wildberries-clone';
const cards = document.querySelector('#cards');
const search = document.querySelector('#search');
const modalWindow = document.getElementById('#modal-window');
const closeBtn = document.getElementsByClassName('modal-close')[0];
let products = JSON.parse(localStorage.getItem('products')) ?? [];

function saveData(data) {
    localStorage.setItem('products', JSON.stringify(data));
};

if (products.length === 0) {
    fetch(api)
        .then((response) => response.json())
        .then((data) => {
            products = data;
            saveData(products);
            renderCard(products);
            console.log(products);
        })
}

    search.addEventListener('input', ({target}) => {
        let tempArray = products.filter((el) => 
            (el.description)
                .toLowerCase()
                .includes(target.value)
        );
        renderCard(tempArray);
    })

function renderCard(array) {
    cards.innerHTML = '';
    array.forEach((products) => {
        cards.innerHTML += cardCreate(products);
    });
}

function cardCreate(products) {
    return `<div class="card" style="width: 18rem;">
    <div class="products__cards-title">
    <img src="${products.avatar}" class="products__cards-img card-img-top" alt="picture">
        <div class="products__block">
            <div class="products__block-text">
                <p>Быстрый просмотр</p>
            </div>
                </div>
</div>
    <div class="card-body">
        <h5 class="card-title">${products.description}</h5>
        <p class="products__cards-text card-text">$${products.cost}</p>
        <a href="#" class="products__cards-btn btn btn-primary">Добавить в корзину</a>
    </div>
    </div>
    
    <div id="modal-window" class="modal">
    <span class="modal-close">&times;</span>
    <div class="modal__content">
        <img src="${products.avatar}" alt="picture" class="modal__content-img">
        <h5 class="modal__content-title">${products.description}</h5>
        <p class="modal__content-text">$${products.cost}</p>
    </div>
</div>`;
}

if (products.length) {
    renderCard(products);
}

cards.addEventListener('click', () => {
    modalWindow.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modalWindow.style.display = 'none';
});

// Cards End

});