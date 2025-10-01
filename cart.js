console.clear();

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

let cartContainer = document.getElementById('cartContainer');
let boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

function dynamicCartSection(ob,itemCounter)
{
    let boxDiv = document.createElement('div');
    boxDiv.id = 'box';
    boxContainerDiv.appendChild(boxDiv);

    let boxImg = document.createElement('img');
    boxImg.src = ob.preview;
    boxDiv.appendChild(boxImg);

    let boxh3 = document.createElement('h3');
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter);
    boxh3.appendChild(h3Text);
    boxDiv.appendChild(boxh3);

    let boxh4 = document.createElement('h4');
    let h4Text = document.createTextNode('Amount: Rs ' + ob.price);
    boxh4.appendChild(h4Text);
    boxDiv.appendChild(boxh4);

    cartContainer.appendChild(boxContainerDiv);
    cartContainer.appendChild(totalContainerDiv);
}

let totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';
let totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);
let totalh2 = document.createElement('h2');
let h2Text = document.createTextNode('Total Amount');
totalh2.appendChild(h2Text);
totalDiv.appendChild(totalh2);

function amountUpdate(amount)
{
    let totalh4 = document.createElement('h4');
    let totalh4Text = document.createTextNode('Amount: Rs ' + amount);
    totalh4.appendChild(totalh4Text);
    totalDiv.appendChild(totalh4);
    totalDiv.appendChild(buttonDiv);
}

let buttonDiv = document.createElement('div');
buttonDiv.id = 'button';
let buttonTag = document.createElement('button');
buttonTag.innerHTML = 'Place Order';
buttonDiv.appendChild(buttonTag);

buttonTag.onclick = function()
{
    location.assign('/orderPlaced.html');
}

let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function()
{
    if(this.readyState === 4)
    {
        if(this.status == 200)
        {
            let contentTitle = JSON.parse(this.responseText);
            
            let localProducts = [
              { "id": "101", "name": "Men's Polo T-Shirt", "price": 999, "preview": "img/polotshirt.jpg" },
              { "id": "102", "name": "Nike Air Max 90", "price": 8999, "preview": "img/Nike air max.jpg" },
              { "id": "103", "name": "Floral A-Line Dress", "price": 2499, "preview": "img/floral aline dress.jpg" },
              { "id": "104", "name": "Slim Fit Denim Jeans", "price": 2999, "preview": "img/slimfit denim jeans.jpg" },
              { "id": "105", "name": "Classic Leather Belt", "price": 1499, "preview": "img/classic leather belt.jpg" },
              { "id": "106", "name": "Aviator Sunglasses", "price": 7599, "preview": "img/Aviator Sunglasses.jpg" }
            ];
            contentTitle.push(...localProducts);

            if (!document.cookie || document.cookie.indexOf('orderId=') === -1) {
                document.getElementById("totalItem").innerHTML = 'Total Items: 0';
                amountUpdate(0);
                return;
            }

            let counter = document.cookie.indexOf(',counter=')>=0 ? Number(document.cookie.split(',')[1].split('=')[1]) : 0;
            document.getElementById("totalItem").innerHTML = 'Total Items: ' + counter;

            let itemIDs = document.cookie.split(',')[0].split('=')[1].split(" ");
            
            let itemCounts = {};
            for(let id of itemIDs){
                if (id) {
                    itemCounts[id] = (itemCounts[id] || 0) + 1;
                }
            }

            let totalAmount = 0;
            for(let id in itemCounts) {
                let product = contentTitle.find(p => p.id == id);
                if(product) {
                    dynamicCartSection(product, itemCounts[id]);
                    totalAmount += Number(product.price) * itemCounts[id];
                }
            }
            amountUpdate(totalAmount);
        }
        else { console.log('call failed!'); }
    }
}
httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
httpRequest.send();