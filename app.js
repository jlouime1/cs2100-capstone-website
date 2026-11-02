// JavaScript source code

console.log("TECH & THINGS JavaScript connected!");

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