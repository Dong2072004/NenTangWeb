const products = [
{id:1,name:"iPhone 16",price:25990000,category:"phone",image:"https://placehold.co/200",rating:4.8,inStock:true},
{id:2,name:"Samsung S25",price:21990000,category:"phone",image:"https://placehold.co/200",rating:4.6,inStock:true},
{id:3,name:"Xiaomi 15",price:14990000,category:"phone",image:"https://placehold.co/200",rating:4.4,inStock:true},

{id:4,name:"MacBook Air M4",price:31990000,category:"laptop",image:"https://placehold.co/200",rating:4.9,inStock:true},
{id:5,name:"Dell XPS",price:28990000,category:"laptop",image:"https://placehold.co/200",rating:4.7,inStock:true},
{id:6,name:"Asus Vivobook",price:17990000,category:"laptop",image:"https://placehold.co/200",rating:4.2,inStock:true},

{id:7,name:"iPad Air",price:16990000,category:"tablet",image:"https://placehold.co/200",rating:4.6,inStock:true},
{id:8,name:"Galaxy Tab",price:13990000,category:"tablet",image:"https://placehold.co/200",rating:4.3,inStock:true},
{id:9,name:"Xiaomi Pad",price:9990000,category:"tablet",image:"https://placehold.co/200",rating:4.1,inStock:true},

{id:10,name:"AirPods Pro",price:5990000,category:"accessory",image:"https://placehold.co/200",rating:4.8,inStock:true},
{id:11,name:"Galaxy Buds",price:3990000,category:"accessory",image:"https://placehold.co/200",rating:4.4,inStock:true},
{id:12,name:"Logitech MX",price:2490000,category:"accessory",image:"https://placehold.co/200",rating:4.7,inStock:true}
];

let currentProducts=[...products];
let cartCount=0;

const app=document.createElement("div");
document.body.appendChild(app);

app.innerHTML=`
<div class="cart">🛒 <span class="badge">0</span></div>

<div class="controls">
<input id="search" placeholder="Search...">

<select id="sort">
<option value="">Sort</option>
<option value="asc">Price ↑</option>
<option value="desc">Price ↓</option>
<option value="name">Name A-Z</option>
<option value="rating">Rating</option>
</select>

<button data-cat="all">All</button>
<button data-cat="phone">Phone</button>
<button data-cat="laptop">Laptop</button>
<button data-cat="tablet">Tablet</button>
<button data-cat="accessory">Accessory</button>

<button id="theme">Dark Mode</button>
</div>

<div class="products" id="products"></div>
`;

const container=document.getElementById("products");

function renderProducts(data){

    container.innerHTML="";

    data.forEach(product=>{

        const card=document.createElement("div");
        card.className="card";

        card.innerHTML=`
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>${product.price.toLocaleString()} VNĐ</p>
        <p>⭐ ${product.rating}</p>
        <button class="add-cart">Thêm giỏ</button>
        `;

        card.addEventListener("click",e=>{

            if(e.target.classList.contains("add-cart")){
                e.stopPropagation();
                cartCount++;
                document.querySelector(".badge").textContent=cartCount;
                return;
            }

            showModal(product);

        });

        container.appendChild(card);

    });
}

function filterByCategory(category){

    if(category==="all"){
        currentProducts=[...products];
    }else{
        currentProducts=products.filter(
            p=>p.category===category
        );
    }

    renderProducts(currentProducts);
}

function searchProducts(keyword){

    const result=currentProducts.filter(
        p=>p.name.toLowerCase().includes(keyword.toLowerCase())
    );

    renderProducts(result);
}

function sortProducts(type){

    const data=[...currentProducts];

    switch(type){

        case "asc":
            data.sort((a,b)=>a.price-b.price);
            break;

        case "desc":
            data.sort((a,b)=>b.price-a.price);
            break;

        case "name":
            data.sort((a,b)=>a.name.localeCompare(b.name));
            break;

        case "rating":
            data.sort((a,b)=>b.rating-a.rating);
            break;
    }

    renderProducts(data);
}

function showModal(product){

    const modal=document.createElement("div");
    modal.className="modal";

    modal.innerHTML=`
    <div class="modal-content">
        <h2>${product.name}</h2>
        <p>Price: ${product.price.toLocaleString()} VNĐ</p>
        <p>Rating: ${product.rating}</p>
        <button id="closeModal">Close</button>
    </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click",()=>{
        modal.remove();
    });
}

document.getElementById("search")
.addEventListener("input",e=>{
    searchProducts(e.target.value);
});

document.querySelectorAll("[data-cat]")
.forEach(btn=>{
    btn.addEventListener("click",()=>{
        filterByCategory(btn.dataset.cat);
    });
});

document.getElementById("sort")
.addEventListener("change",e=>{
    sortProducts(e.target.value);
});

document.getElementById("theme")
.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
});

renderProducts(products);