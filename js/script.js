document.addEventListener("DOMContentLoaded", function () {
    'use strict';
// slider
    let currentSlide = 0;
    const slides = document.querySelectorAll(".carusel__block");
    const dots = document.querySelectorAll('.carusel__dot');
    const btn = document.querySelector('.carusel__next');

    const initSlide = (num) => {
        slides.forEach((slide) => {
            slide.style.display = "none";
            dots.forEach((dot) => {
                dot.classList.remove("active-dots");
            });
        });
        slides[num].style.display = "block";
        dots[num].classList.add("active-dots");
    };

    const next = () => {
        currentSlide >= slides.length - 1 ? currentSlide = 0 : currentSlide++;
        initSlide(currentSlide);
    };

    btn.addEventListener('click', next);

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            initSlide(i);
            currentSlide = i;
        });
    });
    initSlide(currentSlide);

// black background boby
    let scrollbar = parseInt(window.innerWidth) - parseInt(document.documentElement.clientWidth) + 'px';
    const blackAdd = () => {
        body.style = `
                        overflow: hidden; 
                        padding-right: ${scrollbar};
                    `;
        body.classList.add('black-bg');
    }
    const blackRemove = () => {
        body.style = `
                        overflow: visible; 
                        padding-right: 0;
                    `;
        body.classList.remove('black-bg');
    }

// open filter list 
    const body = document.getElementsByTagName('body')[0];
    const listOpenBtn = document.getElementById('open-list');
    const blockList = document.getElementById('list-filter');

    const toggleMenuFilter = () => {
        blockList.classList.toggle('none');
        blockList.classList.contains('none') ? blackRemove() : blackAdd();
    }
    listOpenBtn.addEventListener('click', e => {
        e.stopPropagation();
        toggleMenuFilter();
    });
    window.addEventListener('click', e => {
        let target = e.target;
        let its_menu = target == blockList || blockList.contains(target);
        let menu_is_active = !blockList.classList.contains('none');

        if (!its_menu && menu_is_active) {
            toggleMenuFilter();
        }
    })
/* 
   filter list block
    min prise
*/ 
    let filterBtn = document.querySelectorAll('.drop-down__li');
    let cardProduct = document.querySelectorAll('.card');
    const valueBlock = document.querySelector('.drop-down__arrow');
    const productContainer = document.querySelector(".catalog__grid");

    filterBtn.forEach((el, i) => {
        el.addEventListener("click", (e) => {
            if (e.target.id === 'min-price') {
                dropdownTextAdd(el);
                const sorted = [...cardProduct].sort((a, b) => {
                    const priceElA = a.querySelector(".card__price");
                    const priceElB = b.querySelector(".card__price");
                    const getPrice = (el) => parseInt(el.innerHTML.replace(/ /g, ""));
                    return getPrice(priceElA) - getPrice(priceElB);
                });
                
                productContainer.innerHTML = null;
                sorted.forEach(el => productContainer.appendChild(el));
            }
            if (e.target.id === 'max-price') {
                dropdownTextAdd(el);
                const sorted = [...cardProduct].sort((a, b) => {
                    const priceElA = a.querySelector(".card__price");
                    const priceElB = b.querySelector(".card__price");
                    const getPrice = (el) => parseInt(el.innerHTML.replace(/ /g, ""));
                    return getPrice(priceElB) - getPrice(priceElA);
                });
                productContainer.innerHTML = null;
                sorted.forEach(el => productContainer.appendChild(el));
            }
            if (e.target.id === 'popular') {
                const id = e.target.id;
                popularNew(id)
                dropdownTextAdd(el);
            }
            if (e.target.id === 'new-card') {
                popularNew('new')
                dropdownTextAdd(el);
            }
            toggleMenuFilter();
        });
    })
// add text to the drop-down list
    const dropdownTextAdd  = elem => {
        let text = elem.innerText;
        valueBlock.innerHTML = text;  
    }
    const popularNew = name => {
        let result = [];
        cardProduct.forEach(el => {
            if(el.classList.contains(name)) {
                result.push(el);
                result.forEach(item => {
                    productContainer.prepend(item);
                });
            }
        })
    }

// filter checkbox
    let checkBox = document.querySelectorAll('.filter__input');
    const countProducts = document.getElementById('count-products');

    const productCountActiv = () => {
        cardProduct.forEach((el, i) => {
            countProducts.innerHTML = i + 1;
        })
    };
    productCountActiv();

    checkBox.forEach((el, i) => {
        el.addEventListener('click', () => {
            check();
        });
    });

    const check = () => {
        let checkNew = document.getElementById('new').checked;
        let checkVailable = document.getElementById('available').checked;
        let checkSale = document.getElementById('sale').checked;
        let checkContract = document.getElementById('contract').checked;
        let checkExclusive = document.getElementById('exclusive').checked;

        let activeFilters = [];
        if (checkNew) {
            activeFilters.push('new');
        }
        if (checkVailable) {
            activeFilters.push('available');
        }
        if (checkSale) {
            activeFilters.push('sale');
        }
        if (checkContract) {
            activeFilters.push('contract');
        }
        if (checkExclusive) {
            activeFilters.push('exclusive');
        }

        activeFilters.length == 0 ? filter([""]) : filter(activeFilters);
        countProducts.innerHTML = document.querySelectorAll('.show').length;
    }

    const filter = primaryFilters => {
        let i;
        if (primaryFilters.length == 0) {
            primaryFilters.push("");
        }

        for (i = 0; i < cardProduct.length; i++) {
            let matchesFilter = false;
            removeClass(cardProduct[i], "show");
            for (let p in primaryFilters) {
                if (cardProduct[i].className.indexOf(primaryFilters[p]) > -1) {
                    matchesFilter = true;
                }
            }
            if (matchesFilter) {
                addClass(cardProduct[i], "show");
            }
        }

    }

// Show filtered elements
    const addClass = (element, name) => {
        let i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) == -1) {
                element.className += " " + arr2[i];
            }
        }
    }

// Hide elements that are not selected
    const removeClass = (element, name) => {
        let i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
                arr1.splice(arr1.indexOf(arr2[i]), 1);
            }
        }
        element.className = arr1.join(" ");
    }

    filter([]);

// open menu mobile
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.nav__ul');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        burger.classList.contains('active') ? blackAdd() : blackRemove();
    })
// open filter mobile
    const filterMobile = document.querySelector('.filter-mobile');
    const blockCheckbox = document.querySelector('.filter');
    const line = document.querySelector('.filter__line');

    filterMobile.addEventListener('click', () => {
        blockCheckbox.classList.add('active');
        blackAdd();
    })

    line.addEventListener('touchmove', () => {
        blackRemove();
        blockCheckbox.classList.remove('active');
    })
    line.addEventListener('touchend', () => {
        blockCheckbox.classList.remove('active');
        blackRemove();
    })

// open basket
    const basketClose = document.getElementById('basket-close');
    const basket = document.querySelector('.basket');
    const basketOpen = document.getElementById('open-backet');

    basketClose.addEventListener('click', () => {
        basket.classList.remove('active');
        burger.style.zIndex = 70;
        blackRemove();
    })
    basketOpen.addEventListener('click', () => {
        basket.classList.add('active');
        burger.style.zIndex = 0;
        blackAdd();
    })

// product quantity counter
    
    const productsBasket = document.querySelector('.basket__container');
    const blockCountTotal = document.getElementById('total-count');
    const totalPrice = document.getElementById('totalPrice');
    const headerCountProduct = document.getElementById('open-backet');
    let arr = [];
    
    productsBasket.addEventListener('click', ({ target }) => {
        const product = target.closest('.card-basket');
        const total = product.querySelector('.basket-price');
        const countEl = product.querySelector('.count__number');
        let count = parseInt(countEl.textContent);
        let allSum = 0;
        if (target.classList.contains('count__minus')) {
            if (count > 1) {
                count--;
            }
        } else if (target.classList.contains('count__plus')) {
            count++;
        }  else if (target.classList.contains('card-basket__product')) {
            product.remove();
            numtotal();
            sumTotal();
            checkEmpty();
        }
        countEl.textContent = count;
        blockCountTotal.textContent = count;
        allSum = parseInt(product.dataset.price) * count;
        total.textContent = allSum;
        totalPrice.innerHTML = addSpaces(totalPrice.textContent.replace(/\s/g, ''));
        numtotal();
        sumTotal();
        checkEmpty();
    });

    const numtotal = () => {
        let count = 0;
        document.querySelectorAll('.count__number').forEach(item => {
            count += +item.textContent
            blockCountTotal.innerHTML = count;
            basketOpen.innerHTML = count;
        })
    }
    const sumTotal = () => {
        let sum = 0;
        document.querySelectorAll('.basket-price').forEach(item => {
            sum += +item.textContent;
            totalPrice.innerHTML = addSpaces(parseInt(sum));
        })
    }

// adding spaces to the price
    function addSpaces(nStr){
        if(typeof nStr == 'number'){
            nStr = String(nStr);
        }
     return nStr.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    }
    totalPrice.innerHTML = addSpaces(totalPrice.textContent.replace(/\s/g, ''));
    
// add product basket
    productContainer.addEventListener('click', ({ target }) => {
        if (target.classList.contains('card__wrap')) {
            let i = parseInt(headerCountProduct.textContent)
            headerCountProduct.innerHTML =  ++i;
        }
    })

    document.querySelectorAll('.card__wrap').forEach(item => {
        item.addEventListener('click', ({target}) => {
            const price = target.parentNode.querySelector('.card__price').textContent;
            const src = target.parentElement.parentElement.querySelector('.card__pictur').getAttribute('src');
            const title = target.parentElement.parentElement.querySelector('.card__title').textContent;
            const product = `
                            <div class="card-basket flex align-center flex-between" data-price=${price}>
                                <div class="card-basket__info flex align-center flex-between">
                                    <div class="card-basket__block"> 
                                        <img class="card-basket__product" src=${src} alt=${title}>
                                    </div>
                                    <div class="card-basket__wrapper">
                                        <p class="card-basket__name">${title}</p>
                                        <div class="card-basket__price">
                                            <span class="basket-price">${price}</span> ₽
                                        </div>
                                    </div>
                                </div>
                                <div class="count flex align-center flex-between">
                                    <div class="count__minus"> </div>
                                    <div class="count__number">1</div>
                                    <div class="count__plus"> </div>
                                </div>
                                <div class="card-basket__remove">
                                    <img class="card-basket__product" src="img/icons/close.svg" alt="close">
                                </div>
                            </div>
                        `;
            
            arr.push(product);
            
            productsBasket.innerHTML = [...arr].join('');
            totalPrice.innerHTML = addSpaces(totalPrice.textContent.replace(/\s/g, ''));
            totalCount();
    });
    })
//calculating the price and quantity of goods in the basket    
    const totalCount = () => {
        let count = 0;
        [...document.querySelectorAll('.card-basket')].forEach((el, i) => {
            count += +el.dataset.price;
            totalPrice.innerHTML = addSpaces(count);
            blockCountTotal.innerHTML= ++i;
        })
    }

    const checkEmpty = () => {
        let arr = [...document.querySelectorAll('.card-basket')];
        if (arr.length == 0) {
            clearBasket();
        }

    }

// delete basket 
    const deletBascet = document.querySelector('.basket__clear');
    
    deletBascet.addEventListener('click', () => {
        clearBasket();
    })

    const clearBasket = () => {
        productsBasket.innerHTML = '';
        totalPrice.innerHTML = 0;
        blockCountTotal.innerHTML = 0;
        basketOpen.innerHTML = 0;
    }
})
