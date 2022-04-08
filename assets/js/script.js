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
        let key = e.target.closest('.food-item').getAttribute('data-key');

        c('.foodBig img').src = foodJson[key].img;
        c('.foodInfo h1').innerHTML = foodJson[key].name;
        c('.foodInfo--desc').innerHTML = foodJson[key].description;
        c('.foodInfo--actualPrice').innerHTML = `R$ ${foodJson[key].price.toFixed(2).toString().replace(".",",")}`

        c('.foodWindowArea').style.opacity = 0;
        c('.foodWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.foodWindowArea').style.opacity = 1;
        }, 200);
    });
    
    c('.food-area').append(foodItem);    
});