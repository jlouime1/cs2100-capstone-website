// JavaScript source code

console.log("TECH & THINGS JavaScript connected!");

const productContainer = document.querySelector(".product-container");

function displayProducts(products) {
    const fragment = document.createDocumentFragment();

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const title = document.createElement("h3");
        title.textContent = product.title;

        const description = document.createElement("p");
        description.textContent = product.description;

        card.appendChild(title);
        card.appendChild(description);

        fragment.appendChild(card);
    });

    productContainer.appendChild(fragment);
}

async function fetchProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");

        const data = await response.json();

        const products = data.products;

        console.log("Products retrieved:", products);

        const storeProducts = products.map(product => {
            return new Product(
                product.id,
                product.title,
                product.description,
                product.price, 
                product.category,
                product.thumbnail
            );
        });

        console.log("Store products:", storeProducts);

        displayProducts(storeProducts);

        const searchInput = document.querySelector("#searchInput");

        const productForm = document.querySelector("#productForm");

        productForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const searchTerm = searchInput.value;
            const minPrice = document.querySelector("#minPrice").value;
            const maxPrice = document.querySelector("#maxPrice").value;

            const formError = document.querySelector("#formError");

            if (searchTerm.trim() === "") {
                formError.textContent = "Please enter a product name.";
                return;
            }

            if (minPrice !== "" && Number(minPrice) < 0) {
                formError.textContent = "Minimum price cannot be negative.";
                return;
            }
            if (maxPrice !== "" && Number(maxPrice) < 0) {
                formError.textContent = "Maximum price cannot be negative.";
                return;
            }

            if (minPrice !== "" && maxPrice !== "" && Number(maxPrice) < Number(minPrice)) {
                formError.textContent = "Maximum price cannot be less than minimum price.";
                return;
            }

            formError.textContent = "";

            const filteredProducts = storeProducts.filter(product => {
                const matchesName = product.title.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesMinPrice = minPrice === "" || product.price >= Number(minPrice);

                const matchesMaxPrice = maxPrice === "" || product.price <= Number(maxPrice);

                return matchesName && matchesMinPrice && matchesMaxPrice;
            });

            productContainer.innerHTML = "";

            displayProducts(filteredProducts);
        });



        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase();

            const filteredProducts = storeProducts.filter(product => {
                return product.title.toLowerCase().includes(searchTerm);
            });

            productContainer.innerHTML = "";

            displayProducts(filteredProducts);
        });


    } catch (error) {
        console.error("Error retrieving products:", error);
    }
}

class Product {
    constructor(id, title, description, price, category, thumbnail) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
        this.thumbnail = thumbnail;
    }
}

fetchProducts();