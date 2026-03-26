const API_URL = "https://www.course-api.com/javascript-store-products";

function fetchProductsThen() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        console.log(product.fields.name);
      });
    })
    .catch((error) => {
      console.error("fetchProductsThen error:", error);
    });
}

async function fetchProductsAsync() {
  try {
    const response = await fetch(API_URL);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    displayFallbackProducts();
  }
}

function displayProducts(products) {
  const container = document.querySelector("#product-container");
  container.innerHTML = "";

  products.slice(0, 5).forEach((product) => {
    const { name, price, image } = product.fields;
    const formattedPrice = `$${(price / 100).toFixed(2)}`;
    renderCard(container, name, formattedPrice, image[0].url);
  });
}

function displayFallbackProducts() {
  const fallback = [
    {
      name: "High Back Chair",
      price: "$109.95",
      image: "https://dl.airtable.com/.attachments/530c07c5571cc2f68eb359f943d35cdd/9eff3b02/chair-3.png"
    },
    {
      name: "Accent Chair",
      price: "$129.99",
      image: "https://dl.airtable.com/.attachments/b8bb6f253b0571a92f9a481b5ee7a24e/bd94f3cd/chair-1.png"
    },
    {
      name: "Wooden Chair",
      price: "$89.95",
      image: "https://dl.airtable.com/.attachments/56f990f07e4e2743a4b5bfcc6f7b84e6/7e82fe1e/chair-2.png"
    },
    {
      name: "Classic Sofa",
      price: "$299.99",
      image: "https://dl.airtable.com/.attachments/5020be05eb28bfea0a84439252d53cfb/8df4d7a8/sofa-1.png"
    },
    {
      name: "Modern Sofa",
      price: "$349.95",
      image: "https://dl.airtable.com/.attachments/c0af5f2a3e50f4e9c97c2926ce34aec3/0ea0b9fd/sofa-2.png"
    }
  ];

  const container = document.querySelector("#product-container");
  container.innerHTML = "";

  fallback.forEach(({ name, price, image }) => {
    renderCard(container, name, price, image);
  });
}

function renderCard(container, name, price, imageUrl) {
  const card = document.createElement("article");
  card.classList.add("product-card");
  card.innerHTML = `
    <div class="img-wrap">
      <img src="${imageUrl}" alt="${name}" loading="lazy" />
    </div>
    <div class="card-body">
      <h2 class="product-name">${name}</h2>
      <p class="product-price">${price}</p>
    </div>
  `;
  container.appendChild(card);
}

function handleError(error) {
  console.error(`An error occurred: ${error.message}`);
}

fetchProductsThen();
fetchProductsAsync();