console.clear();

const id = location.search.split('?')[1];

if (document.cookie.indexOf(',counter=') >= 0) {
    const counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

function dynamicContentDetails(productData) {
    const productContainer = document.getElementById('containerProduct');
    // If no product is found, display an error message
    if (!productData) {
        productContainer.innerHTML = '<h1>Product Not Found</h1>';
        return;
    }

    const htmlContent = `
        <div id="containerD">
            <div id="imageSection">
                <img id="imgDetails" src="${productData.preview}" alt="${productData.name}">
            </div>
            <div id="productDetails">
                <h1>${productData.name}</h1>
                <h4>${productData.brand}</h4>
                <div id="details">
                    <h3>Rs ${productData.price}</h3>
                    <h3>Description</h3>
                    <p>${productData.description}</p>
                </div>
                <div id="productPreview">
                    <h3>Product Preview</h3>
                    ${productData.photos.map(photoUrl => `
                        <img class="previewImg" src="${photoUrl}" alt="Product preview">
                    `).join('')}
                </div>
                <div id="button">
                    <button id="addToCartBtn">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    productContainer.innerHTML = htmlContent;

    const mainImage = document.getElementById('imgDetails');
    const previewImages = document.querySelectorAll('.previewImg');

    previewImages.forEach(image => {
        // Set the first preview image as active by default
        if(image.src === mainImage.src) {
            image.style.border = '2px solid #8A2BE2';
        }

        image.addEventListener('click', (event) => {
            mainImage.src = event.target.src;
            // Reset border on all previews
            previewImages.forEach(img => img.style.border = 'none');
            // Set active border on the clicked image
            event.target.style.border = '2px solid #8A2BE2';
        });
    });

    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.addEventListener('click', () => {
        let order = id + " ";
        let counter = 1;
        if (document.cookie.indexOf(',counter=') >= 0) {
            order = id + " " + document.cookie.split(',')[0].split('=')[1];
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
        }
        document.cookie = "orderId=" + order + ",counter=" + counter;
        document.getElementById("badge").innerHTML = counter;
    });
}

// BACKEND CALL
const httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let allProducts = JSON.parse(this.responseText);

        // Add the same local products from content.js
        let localProducts = [
            {
              "id": "101", "name": "Men's Polo T-Shirt", "brand": "Rare Rabbit", "price": 999, "isAccessory": false,
              "description": "A classic polo t-shirt from Rare Rabbit, made with premium cotton for a comfortable fit.",
              "photos": [ "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQsZLu84PomPDo0rRF3R_pnInqX_D2KHdbkNsw5sIXZB-Bg1tutsVfb-YW54MTHuCYavzxsNPTvmqeSdcgDly5BBVEzkCLUXDXwHJRInf40Dz7BGduTSATgSQ", "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQsZLu84PomPDo0rRF3R_pnInqX_D2KHdbkNsw5sIXZB-Bg1tutsVfb-YW54MTHuCYavzxsNPTvmqeSdcgDly5BBVEzkCLUXDXwHJRInf40Dz7BGduTSATgSQ" ],
              "preview": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQsZLu84PomPDo0rRF3R_pnInqX_D2KHdbkNsw5sIXZB-Bg1tutsVfb-YW54MTHuCYavzxsNPTvmqeSdcgDly5BBVEzkCLUXDXwHJRInf40Dz7BGduTSATgSQ"
            },
            {
              "id": "102", "name": "Nike Air Max 90", "brand": "Nike", "price": 8999, "isAccessory": true,
              "description": "The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole and classic design lines.",
              "photos": [ "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ8NYg8Fbk24sdU4Ux8izBA2mXfWYVQxr0MoBDtfGhbjKG4JPKEs6sw368pvoZRB2B70P3OKwTVHl27y58kH8IKtN6s3hXdng8xWobnh3NTFUOQryn4sNYZy3s", "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQrcKoTCPu0vQ456vmmCyRp_3m9TH4_ZqyzkEhvnw-tw4dxqI18GDXuvuvpoikoI5DtOiMDxihamE4ALwTQvPuUx-yFnwBAeIJBhTdhRC4jFlqeMBxRLw" ],
              "preview": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ8NYg8Fbk24sdU4Ux8izBA2mXfWYVQxr0MoBDtfGhbjKG4JPKEs6sw368pvoZRB2B70P3OKwTVHl27y58kH8IKtN6s3hXdng8xWobnh3NTFUOQryn4sNYZy3s"
            },
            {
              "id": "103", "name": "Floral A-Line Dress", "brand": "Zara", "price": 2499, "isAccessory": false,
              "description": "A beautiful floral print dress, perfect for summer outings. Features a comfortable A-line silhouette and lightweight fabric.",
              "photos": [ "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQCROh952A3QDOs_LJY-ouvNM_sND_jqyTm0Xx2LmTCkttdtnqkaKkKnDgoMjpYF-Lj6F-3z0eBYLeE6tZG2JFq4YGGRV-8dQwOcnDcFGySFvVncIgMj0T_Hw", "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRVZj3iLjnLqIAi-l5iHModuMJ8qeDopDDcWtNqX5w1zW-GkXo6EU9qvVByOmNq1clbknxMt6a-Xr-PbBaKAnUsAGJGVYnzeo15fSToy2lsSOHSAWo0WQ" ],
              "preview": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQCROh952A3QDOs_LJY-ouvNM_sND_jqyTm0Xx2LmTCkttdtnqkaKkKnDgoMjpYF-Lj6F-3z0eBYLeE6tZG2JFq4YGGRV-8dQwOcnDcFGySFvVncIgMj0T_Hw"
            },
            {
              "id": "104", "name": "Slim Fit Denim Jeans", "brand": "Levi's", "price": 2999, "isAccessory": false,
              "description": "Classic slim fit jeans from Levi's, made with durable denim for a timeless look and comfortable feel.",
              "photos": [ "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSh74fld0SaoHzSxt8XfIuFPHW8ptq5xUNcl3ONKEGszaoWPsP1vyhh35xnrp3Imr16xOHxUtC_YqsVJsRgYDhSb_-L2AZsc071SHBYog", "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQI8_YJmpf-B4bez0P2fZTHIZRTmKA1ODwPfxokvGazRHrFC8R4E_YXJFMtl1NTVoUD3HYRcsZ-xRVef1EDCn92YrYdN_MFeD1wIzwVb3ES4u9OjHzV21cEFQ" ],
              "preview": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQI8_YJmpf-B4bez0P2fZTHIZRTmKA1ODwPfxokvGazRHrFC8R4E_YXJFMtl1NTVoUD3HYRcsZ-xRVef1EDCn92YrYdN_MFeD1wIzwVb3ES4u9OjHzV21cEFQ"
            },
            {
              "id": "105", "name": "Classic Leather Belt", "brand": "Tommy Hilfiger", "price": 1499, "isAccessory": true,
              "description": "A genuine leather belt with a classic metal buckle. A versatile and essential accessory for any wardrobe.",
              "photos": [ "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTSeLQY7CVMD6BIZaUaHsvvIxJ2Q2P5Nu6vGTUHlF0q-gpR0zB7dN1WAKfhFvgv-2wvOnE9s4iN6k9rEo7QKzmP10c2u9lbM6WrbyCc8sg", "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR_FWsD0zgrlooKWUe_VOwVmjve1WYK8zLKnn7dvEIlWdJtbhIER1UdKiJ0esA-JQ32OKY8bwBahw3xe5srCDholSILwTg948zPFECx6zMpdNux6Nk5kHM5" ],
              "preview": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTSeLQY7CVMD6BIZaUaHsvvIxJ2Q2P5Nu6vGTUHlF0q-gpR0zB7dN1WAKfhFvgv-2wvOnE9s4iN6k9rEo7QKzmP10c2u9lbM6WrbyCc8sg"
            },
            {
              "id": "106", "name": "Aviator Sunglasses", "brand": "Ray-Ban", "price": 7599, "isAccessory": true,
              "description": "Iconic Ray-Ban Aviator sunglasses with a gold frame and green classic G-15 lenses for superior clarity.",
              "photos": [ "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSJIprsdR1HIQxOWOA8DQrTi2h_JHfJXAAZlE_elqTbsRPwgSksSAEu20m7wd_dWQwIQ4AMKrnPcmjcfm-leK-UT6olBbv1QlcfK7FrTiWk639iszXMzdVuKaQV", "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRDYyyqCihE9G1Xyd_AAu-vx-qqrgzf2OUKJCrpVkeMeLwv9594ZHOQPcFh6Ks11byMYCfM5PNVt-qaKyxBXxucvzL4cKt1LCigoLTSNMIYVX0Oi-WVTos" ],
              "preview": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSJIprsdR1HIQxOWOA8DQrTi2h_JHfJXAAZlE_elqTbsRPwgSksSAEu20m7wd_dWQwIQ4AMKrnPcmjcfm-leK-UT6olBbv1QlcfK7FrTiWk639iszXMzdVuKaQV"
            }
        ];
        allProducts.push(...localProducts);

        // Find the correct product from the complete list using the ID from the URL
        const productData = allProducts.find(product => product.id == id);
        
        // Render the page with the found product data
        dynamicContentDetails(productData);

    } else if (this.readyState === 4) {
        console.log('API call failed! Status: ' + this.status);
    }
};

// Now, we fetch ALL products instead of just one
httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
httpRequest.send();