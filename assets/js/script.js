const i = (el) => document.getElementById(el);
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

foodJson.forEach((item, index) => {
    let foodItem = c('.models .food-item').cloneNode(true);

    foodItem.setAttribute('data-key', index);
    foodItem.querySelector('.food-item--img img').src = item.img;
    foodItem.querySelector('.food-item--price')
    foodItem.querySelector('.food-item--price').innerHTML = `R$ ${item.price.toFixed(2).toString().replace(".",",")}`;
    foodItem.querySelector('.food-item--name').innerHTML = item.name;
    foodItem.querySelector('.food-item--desc').innerHTML = item.description;
    foodItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('body').style.overflow = 'hidden';
        let key = e.target.closest('.food-item').getAttribute('data-key');        

        c('.foodBig img').src = foodJson[key].img;
        c('.foodInfo h1').innerHTML = foodJson[key].name;
        c('.foodInfo--desc').innerHTML = foodJson[key].description;
        c('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price.toFixed(2).toString().replace(".",",")}`;

        if(foodJson[key].id <= 3) {
            c('.foodDefault').style.display = 'none';
        } else if (foodJson[key].id > 3) {
            cs('.foodSize').forEach((size) => {
                size.style.display = 'none';
            });
            c('.foodDefault').style.display = 'flex';
        };

        c('.foodSize.selected').classList.remove('selected');
        cs('.foodSize').forEach((size, sizeIndex) => {
            if(sizeIndex == 2) {
                size.classList.add('selected');
            };
            size.querySelector('span').innerHTML = foodJson[key].sizes[sizeIndex];
            size.querySelector('span').style.fontSize = "14px";
        });
        cs('.foodDefault').forEach((size) => {
            size.querySelector('span').innerHTML = `R$ ${foodJson[key].price.toFixed(2).toString().replace(".",",")}`;
            size.querySelector('span').style.fontSize = "16px";
        });

        c('.foodWindowArea').style.opacity = 0;
        c('.foodWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.foodWindowArea').style.opacity = 1;
        }, 200);
    });
    
    c('.food-area').append(foodItem);    
});

function markCheck(caller) {
    let checks = document.querySelectorAll('input[type="checkbox"]');    
    for(let i = 0; i < checks.length; i++) {
      checks[i].checked = checks[i] == caller;
    }
};