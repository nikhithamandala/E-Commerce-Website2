console.clear();

let contentTitle;

function renderProduct(ob, container) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  boxLink.href = "/contentDetails.html?" + ob.id;

  let imgTag = document.createElement("img");
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h2");
  let h2Text = document.createTextNode("rs " + ob.price);
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  container.appendChild(boxDiv);
}

let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");

let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
  if (this.readyState === 4) {
    if (this.status === 200) {
      contentTitle = JSON.parse(this.responseText);
      
      let localProducts = [
        {
          "id": "101", "name": "Men's Polo T-Shirt", "brand": "Rare Rabbit", "price": 999, "isAccessory": false,
          "description": "A classic polo t-shirt from Rare Rabbit, made with premium cotton for a comfortable fit.",
          "photos": [ "img/polotshirt.jpg", "img/polotshirt.jpg" ],
          "preview": "img/polotshirt.jpg"
        },
        {
          "id": "102", "name": "Nike Air Max 90", "brand": "Nike", "price": 8999, "isAccessory": true,
          "description": "The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole and classic design lines.",
          "photos": [ "img/Nike air max.jpg", "img/Nike air max.jpg" ],
          "preview": "img/Nike air max.jpg"
        },
        {
          "id": "103", "name": "Floral A-Line Dress", "brand": "Zara", "price": 2499, "isAccessory": false,
          "description": "A beautiful floral print dress, perfect for summer outings. Features a comfortable A-line silhouette and lightweight fabric.",
          "photos": [ "img/floral aline dress.jpg", "img/floral aline dress.jpg" ],
          "preview": "img/floral aline dress.jpg"
        },
        {
          "id": "104", "name": "Slim Fit Denim Jeans", "brand": "Levi's", "price": 2999, "isAccessory": false,
          "description": "Classic slim fit jeans from Levi's, made with durable denim for a timeless look and comfortable feel.",
          "photos": [ "img/slimfit denim jeans.jpg", "img/slimfit denim jeans.jpg" ],
          "preview": "img/slimfit denim jeans.jpg"
        },
        {
          "id": "105", "name": "Classic Leather Belt", "brand": "Tommy Hilfiger", "price": 1499, "isAccessory": true,
          "description": "A genuine leather belt with a classic metal buckle. A versatile and essential accessory for any wardrobe.",
          "photos": [ "img/classic leather belt.jpg", "img/classic leather belt.jpg" ],
          "preview": "img/classic leather belt.jpg"
        },
        {
          "id": "106", "name": "Aviator Sunglasses", "brand": "Ray-Ban", "price": 7599, "isAccessory": true,
          "description": "Iconic Ray-Ban Aviator sunglasses with a gold frame and green classic G-15 lenses for superior clarity.",
          "photos": [ "img/Aviator Sunglasses.jpg", "img/Aviator Sunglasses.jpg" ],
          "preview": "img/Aviator Sunglasses.jpg"
        }
      ];

      contentTitle.push(...localProducts);
      
      if (document.cookie.indexOf(",counter=") >= 0) {
        let counter = document.cookie.split(",")[1].split("=")[1];
        document.getElementById("badge").innerHTML = counter;
      }
      for (let i = 0; i < contentTitle.length; i++) {
        if (contentTitle[i].isAccessory) {
          renderProduct(contentTitle[i], containerAccessories);
        } else {
          renderProduct(contentTitle[i], containerClothing);
        }
      }
    } else {
      console.log("call failed! Status: " + this.status);
    }
  }
};
httpRequest.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/product", true);
httpRequest.send();