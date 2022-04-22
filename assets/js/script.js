// Variáveis
let cart = [];
let modalQt = 1;
let modalKey = 0;

// Utilitários;
const i = (el) => document.getElementById(el);
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// Listagem das Comidas:
foodJson.forEach((item, index) => {

    // Clona a estrutura .food-item;
    let foodItem = c('.models .food-item').cloneNode(true);

    // Adiciona os elementos clonados de 'foodItem' em 'food-area';
    c('.food-area').append(foodItem);

    // Define uma chave pra cada item clicado;
    foodItem.setAttribute('data-key', index);
    
    // Preenche as informações em .food-item;    
    foodItem.querySelector('.food-item--img img').src = item.img;
    foodItem.querySelector('.food-item--price')
    foodItem.querySelector('.food-item--price').innerHTML = `R$ ${item.price[2].toFixed(2).toString().replace(".",",")}`;
    foodItem.querySelector('.food-item--name').innerHTML = item.name;
    foodItem.querySelector('.food-item--desc').innerHTML = item.description;
    
    // Adiciona evento de click na tag 'a';
    foodItem.querySelector('.food-item--block').addEventListener('click', (e) => {

        // Previne a ação padrão (atualizar a página);
        e.preventDefault();

        // Exibe o Modal e define uma transição mais suave;
        c('.foodWindowArea').style.opacity = 0;
        c('.foodWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.foodWindowArea').style.opacity = 1;
        }, 200);
        document.querySelector('body').style.overflow = 'hidden';

        // Pega a chave do item clicado;
        let key = e.target.closest('.food-item').getAttribute('data-key');

        // Ao abrir o modal, preenche a variável 'modalKey' com o id do item;
        modalKey = key;

        // Preenche as informações do item no Modal;
        c('.foodBig img').src = foodJson[key].img;
        c('.foodInfo h1').innerHTML = foodJson[key].name;
        c('.foodInfo--desc').innerHTML = foodJson[key].description;
        c('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price[2].toFixed(2).toString().replace(".",",")}`;
        cs('.foodDefault').forEach((size) => {
            size.querySelector('span').innerHTML = `R$ ${foodJson[key].price[2].toFixed(2).toString().replace(".",",")}`;
        });

        // Exibe todos os itens da seção 'Opção';
        cs('.foodInfo--size').forEach((size) => {
            size.style.display = 'flex';
            c('.foodDefault').style.display = 'flex';
        });

        // Exibe os três tamanhos apenas para Pizzas e somente preço para o restante;
        if(foodJson[key].id <= 3) {
            c('.foodDefault').style.display = 'none';
        } else if (foodJson[key].id > 3) {
            cs('.foodSize').forEach((size) => {
                size.style.display = 'none';
            });
            c('.foodDefault').style.display = 'flex';
        };

        // Define a posição inicial do Radio Input;
        i('checkLarge').checked = true;

        // Preenche o valor das Pizzas e reseta a posição do Radio Input;        
        i('checkSmall').addEventListener('click', () => {
            i('checkSmall').checked = true;
            if(foodJson[key].sizes[0]) {
                c('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price[0].toFixed(2).toString().replace(".",",")}`;
            }
        });
        i('checkMedium').addEventListener('click', () => {
            i('checkMedium').checked = true;
            if(foodJson[key].sizes[1]) {
                c('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price[1].toFixed(2).toString().replace(".",",")}`;
            }
        });
        i('checkLarge').addEventListener('click', () => {
            i('checkLarge').checked = true;
            if(foodJson[key].sizes[2]) {
                c('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price[2].toFixed(2).toString().replace(".",",")}`;
            }
        });

        // Remove a class 'selected' do item;
        c('.foodSize.selected').classList.remove('selected');

        // Preenche o tamanho das Pizzas;
        cs('.foodSize').forEach((size, sizeIndex) => {

            // Adiciona a class 'selected' ao terceiro item (reseta a informação sempre que abrir o Modal);
            if(sizeIndex == 2) {
                size.classList.add('selected');
            };
            size.querySelector('span').innerHTML = foodJson[key].sizes[sizeIndex];
        });        

        // Reseta as observações no Text area;
        i('foodObs').value = '';

        // Reseta a quantidade de items sempre que abre o Modal;
        modalQt = 1;    
        c('.foodInfo--qt').innerHTML = modalQt;
    });
});

// Evento do botão de compartilhamento;
let compartilharRed = i('compartilharImgRed');
let compartilharWhite = i('compartilharImgWhite');

c('.main-area--links a:last-child').addEventListener('mouseover', () => {
    compartilharRed.style.display = 'none';
    compartilharWhite.style.display = 'flex';
});
c('.main-area--links a:last-child').addEventListener('mouseout', () => {
    compartilharRed.style.display = 'flex';
    compartilharWhite.style.display = 'none';
});

// Eventos do Modal:

// Fecha o Modal;
function closeModal() {
    c('.foodWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.foodWindowArea').style.display = 'none';
    }, 500);
    document.querySelector('body').style.overflow = 'scroll';
};
cs('.foodInfo--cancelButtonImg, .foodInfo--cancelButtonMobileImg').forEach((item) => {
    item.addEventListener('click', closeModal);
});

// Insere ação dos botões de quantidade;
c('.foodInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 2) {
        modalQt--;
        c('.foodInfo--qt').innerHTML = modalQt;
    } else if(modalQt = 2) {
        c('.foodInfo--qtmenos').style.color = "#999";  
        modalQt--;
        c('.foodInfo--qt').innerHTML = modalQt;              
    };
});
c('.foodInfo--qtmais').addEventListener('click', () => {
    c('.foodInfo--qtmenos').style.color = "#ea1d2c";
    modalQt++;
    c('.foodInfo--qt').innerHTML = modalQt;
});

// Insere ação de seleção dos tamanhos;
cs('.foodSize').forEach((size) => {
    size.addEventListener('click', () => {
        c('.foodSize.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

// Função de adicionar ao carrinho de compras;
c('.foodInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.foodSize.selected').getAttribute('data-key'));
    let foodObs = i('foodObs').value;

    // Cria um identificador;
    let identifier = foodJson[modalKey].id+'@'+size;

    // Verifica se já existe o identificador no carrinho e adiciona a nova quantidade da comida;
    let key = cart.findIndex((item) => item.identifier == identifier);

    if(key > -1) {
        cart[key].qt += modalQt; // Aumenta a quantidade da comida;
        cart[key].obs += ` Nova observação: ${foodObs},`; // Adiciona mais uma observação;
    } else {
        cart.push({
            identifier,
            id: foodJson[modalKey].id, // Insere o id da comida;
            size, // Insere o tamanho da comida;
            qt: modalQt, // Insere a quantidade da comida;
            obs: 'Observação: '+foodObs+',' // Insere a observação sobre o pedido;
        });
    }

    updateCart();
    closeModal();
});

c('.headerCart').addEventListener('click', () => {
    if(cart.length > 0) {
        c('aside').classList.add('show');
    }
});
i('cancelButton').addEventListener('click', () => {
    c('aside').classList.remove('show');
});

// Função pra abrir e fechar o carrinho de compras mobile;
c('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        c('aside').style.left = '0';
    }
});
c('.menu-closer').addEventListener('click', () => {
        c('aside').style.left = '100vw';
});

// Define as cores inicias dos botões de quantidade do carrinho de compras;
c('.cart--item-qtmenos').style.color = "#999";
c('.cart--item-qtmais').style.color = "#ea1d2c";

// Função pra atualizar o carrinho de compras;
function updateCart() {

    // Atualiza o número de itens no carrinho de compras mobile;
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        c('aside').classList.add('show');

        // Reseta a listagem dos itens do carrinho de compras;
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {

            // Acessa as informações da comida selecionada;
            let foodItem = foodJson.find((item) => item.id == cart[i].id);

            // Cálculo do subtotal;
            switch(cart[i].size) {
                case 0:
                    subtotal += foodItem.price[0] * cart[i].qt;
                    break;
                case 1: 
                subtotal += foodItem.price[1] * cart[i].qt;
                    break;
                case 2:
                    subtotal += foodItem.price[2] * cart[i].qt;
                    break;
            };

            // Clona o carrinho de compras;
            let cartItem = c('.models .cart--item').cloneNode(true);

            // Define o nome e tamanho das Pizzas;
            let foodSizeName;
            switch(cart[i].size) {
                case 0:
                    foodSizeName = 'P';
                    break;
                case 1: 
                    foodSizeName = 'M';
                    break;
                case 2:
                    foodSizeName = 'G';
                    break;
            };
            let foodName = `${foodItem.name} (${foodSizeName})`;

            // Preenche as informações em .cart-item; 
            cartItem.querySelector('img').src = foodItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = foodName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            // Insere ação dos botões de quantidade do carrinho de compras;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 2) {
                    cart[i].qt--;
                } else if(cart[i].qt == 2) {
                    c('.cart--item-qtmenos').style.color = "#999";
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                };
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                c('.cart--item-qtmenos').style.color = "#ea1d2c";
                cart[i].qt++;
                updateCart();
            });

            // Adiciona conteúdos a estrutura .cart-item;
            c('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        // Adiciona os valores no carrinho de compras;
        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
};