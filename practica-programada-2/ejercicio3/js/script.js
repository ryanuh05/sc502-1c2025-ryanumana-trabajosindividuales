document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');

    let products = [];

    // Cargar productos en el DOM
    function renderProducts(filter = "Todos") {
        productList.innerHTML = ''; // Limpia el listado

        products.forEach((product, index) => {
            if (filter === "Todos" || product.category === filter) {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-4 mb-3';
                productCard.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Precio: $${product.price}</p>
                            <p class="card-text"><strong>Categoría:</strong> ${product.category}</p>
                        </div>
                        <div class="card-footer text-center">
                            <button class="btn btn-danger btn-sm" onclick="removeProduct(${index})">Eliminar</button>
                        </div>
                    </div>
                `;
                productList.appendChild(productCard);
            }
        });
    }

    // Agregar producto
    productForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('product-name').value.trim();
        const price = parseFloat(document.getElementById('product-price').value);
        const category = document.getElementById('product-category').value;

        if (name && !isNaN(price) && category) {
            products.push({ name, price, category });
            productForm.reset();
            renderProducts(categoryFilter.value);
        } else {
            alert("Todos los campos son obligatorios.");
        }
    });

    // Eliminar producto
    window.removeProduct = function (index) {
        products.splice(index, 1);
        renderProducts(categoryFilter.value);
    };

    // Filtrar productos por categoría
    categoryFilter.addEventListener('change', function () {
        renderProducts(categoryFilter.value);
    });

    // Render inicial
    renderProducts();
});
