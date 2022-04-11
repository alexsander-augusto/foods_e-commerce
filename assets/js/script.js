let modalQt = 1;

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
    foodItem.querySelector('.food-item--price').innerHTML = `R$ ${item.price.toFixed(2).toString().replace(".",",")}`;
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

        // Preenche as informações do item no Modal;
        c('.foodBig img').src = foodJson[key].img;
        c('.foodInfo h1').innerHTML = foodJson[key].name;
        c('.foodInfo--desc').innerHTML = foodJson[key].description;
        c('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price.toFixed(2).toString().replace(".",",")}`;
        cs('.foodDefault').forEach((size) => {
            size.querySelector('span').innerHTML = `R$ ${foodJson[key].price.toFixed(2).toString().replace(".",",")}`;
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

        // Reseta a quantidade de items sempre que abre o Modal;
        modalQt = 1;    
        c('.foodInfo--qt').innerHTML = modalQt;
    });
});

// Eventos do Modal:

// Fechar o Modal;
function closeModal() {
    c('.foodWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.foodWindowArea').style.display = 'none';
    }, 500);
    document.querySelector('body').style.overflow = 'scroll';
};
cs('.foodInfo--cancelButton, .foodInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

// Insere ação dos botões de quantidade;
c('.foodInfo--qtmenos').addEventListener('click', () => {
    if(modalQt > 1) {
        modalQt--;
        c('.foodInfo--qt').innerHTML = modalQt;
    };
});
c('.foodInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    c('.foodInfo--qt').innerHTML = modalQt;
});

// Insere ação de click dos tamanhos;
cs('.foodSize').forEach((size, sizeIndex) => {
    size.addEventListener('click', () => {
        c('.foodSize.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

// Define a Checkbox que será ativa ao clicar;
function markCheck(caller) {
    let checks = document.querySelectorAll('input[type="checkbox"]');    
    for(let i = 0; i < checks.length; i++) {
      checks[i].checked = checks[i] == caller;
    }
};