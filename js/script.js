document.addEventListener("DOMContentLoaded", () => {
  const typeSelect = document.getElementById("productType");
  const fields = document.getElementById("dynamic-fields");
  const form = document.getElementById("product_form");

  if (typeSelect) {
    typeSelect.addEventListener("change", function () {
      const type = this.value;
      fields.innerHTML = "";

      if (type === "DVD") {
        fields.innerHTML = `
          <label>Size (MB): <input id="size" required></label>
          <p>Please provide size in MB</p>
        `;
      }

      if (type === "Book") {
        fields.innerHTML = `
          <label>Weight (KG): <input id="weight" required></label>
          <p>Please provide weight in KG</p>
        `;
      }

      if (type === "Furniture") {
        fields.innerHTML = `
          <label>Height (CM): <input id="height" required></label>
          <label>Width (CM): <input id="width" required></label>
          <label>Length (CM): <input id="length" required></label>
          <p>Please provide dimensions in HxWxL format</p>
        `;
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const sku = document.getElementById("sku").value;
      const name = document.getElementById("name").value;
      const price = document.getElementById("price").value;
      const type = document.getElementById("productType").value;

      let special = "";

      if (type === "DVD") {
        special = `Size: ${document.getElementById("size").value} MB`;
      }

      if (type === "Book") {
        special = `Weight: ${document.getElementById("weight").value} KG`;
      }

      if (type === "Furniture") {
        const h = document.getElementById("height").value;
        const w = document.getElementById("width").value;
        const l = document.getElementById("length").value;
        special = `Dimension: ${h}x${w}x${l}`;
      }

      const product = { sku, name, price, special };
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
      window.location.href = "index.html";
    });
  }

  const productList = document.getElementById("product-list");

  if (productList) {
    const products = JSON.parse(localStorage.getItem("products") || "[]");

    products.forEach((p, index) => {
      const card = document.createElement("div");
      card.innerHTML = `
        <input type="checkbox" class="delete-checkbox" data-index="${index}">
        <p>${p.sku}</p>
        <p>${p.name}</p>
        <p>${p.price} $</p>
        <p>${p.special}</p>
      `;
      productList.appendChild(card);
    });

    const deleteBtn = document.getElementById("delete-product-btn");

    deleteBtn.addEventListener("click", () => {
      const checkboxes = document.querySelectorAll(".delete-checkbox");
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      const remaining = [];

      checkboxes.forEach((cb, index) => {
        if (!cb.checked) {
          remaining.push(products[index]);
        }
      });

      localStorage.setItem("products", JSON.stringify(remaining));
      location.reload();
    });
  }
});