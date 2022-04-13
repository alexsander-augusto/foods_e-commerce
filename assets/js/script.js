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

    // Adiciona conteúdos a estrutura .food-item;
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
    foodItem.querySelector('a').addEventListener('click', (e) => {

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
            if(foodJson[key].id = 1) {
                c('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price[0].toFixed(2).toString().replace(".",",")}`;
            }
        });
        i('checkMedium').addEventListener('click', () => {
            i('checkMedium').checked = true;
            if(foodJson[key].id = 2) {
                c('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price[1].toFixed(2).toString().replace(".",",")}`;
            }
        });
        i('checkLarge').addEventListener('click', () => {
            i('checkLarge').checked = true;
            if(foodJson[key].id = 3) {
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

// Função pra atualizar o carrinho de compras;
function updateCart() {
    if(cart.length > 0) {
        c('aside').classList.add('show');

        // Reseta a listagem dos itens do carrinho de compras;
        c('.cart').innerHTML = '';

        for(let i in cart) {

            // Acessa as informações da comida selecionada;
            let foodItem = foodJson.find((item) => item.id == cart[i].id);

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

            // Adiciona conteúdos a estrutura .cart-item;
            c('.cart').append(cartItem);
        }

    } else {
        c('aside').classList.remove('show');
    }
};