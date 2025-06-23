let title = document.getElementById("product-name");
let price = document.getElementById("product-price");
let taxes = document.getElementById("product-taxes");
let adds = document.getElementById("product-adds");
let discount = document.getElementById("product-discount");
let count = document.getElementById("product-count");
let totalPrice = document.getElementById("product-total");
let category = document.getElementById("product-category");
let addBtn = document.getElementById("add-product-btn");
let productList = document.getElementById("product-list");
let searchInput = document.getElementById("search-input");
let searchTitleBtn = document.getElementById("search-title-btn");
let searchCategoryBtn = document.getElementById("search-category-btn");
let allProducts = [];

addBtn.addEventListener("click", function () {
  let product = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    adds: adds.value,
    discount: discount.value,
    count: count.value,
    category: category.value,
    id: allProducts.length + 1,
  };

  if (
    product.title === "" ||
    product.price === "" ||
    product.taxes === "" ||
    product.adds === "" ||
    product.discount === "" ||
    product.count === "" ||
    product.category === ""
  ) {
    alert("Please fill in all the fields");
    return;
  }

  for (let index = 0; index < product.count; index++) {
    allProducts.push(product);
  }

  localStorage.setItem("products", JSON.stringify(allProducts));
  renderProducts();

  title.value = "";
  price.value = "";
  taxes.value = "";
  adds.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
});

[price, taxes, adds, discount].forEach(function (input) {
  input.addEventListener("input", function () {
    getTotal({
      price: price.value,
      taxes: taxes.value,
      adds: adds.value,
      discount: discount.value,
    });
  });
});

function getTotal(product) {
  if (product.price === "" || product.price == 0) {
    totalPrice.textContent = "0";
    totalPrice.style.backgroundColor = "red";
    return;
  }
  let total =
    +product.price + +product.taxes + +product.adds - +product.discount;
  totalPrice.textContent = total;
  totalPrice.style.backgroundColor = "green";
}

function renderProducts() {
  let products = localStorage.getItem("products");
  if (products) {
    allProducts = JSON.parse(products);
  }
  productList.innerHTML = "";
  allProducts.forEach(function (product, index) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>${product.taxes}</td>
      <td>${product.adds}</td>
      <td>${product.discount}</td>
      <td>${product.count}</td>
      <td>${product.category}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button onclick="deleteProduct(${index})" class="delete-btn">Delete</button>
      </td>
    `;
    productList.appendChild(tr);
  });
}

function deleteProduct(index) {
  allProducts.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(allProducts));
  renderProducts();
}
renderProducts();
