const cards = document.querySelector(".cards");
const input = document.querySelector("#search");
const backButton = document.querySelector("#back-products");
function createCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");
  const front = createFront(product);
  card.appendChild(front);
  const back = createBack(product);
  const btnView = front.querySelector(".btn-view");
  const btnBuy = back.querySelector(".btn-buy");
  const btnBack = back.querySelector(".btn-back");
  btnView.addEventListener("click", () => {
    front.style.display = "none";
    back.style.display = "flex";
  });
  btnBuy.addEventListener("click", () => {
    window.open("https://www.youtube.com/");
  });
  btnBack.addEventListener("click", () => {
    front.style.display = "flex";
    back.style.display = "none";
  });
  card.appendChild(back);
  cards.appendChild(card);
}
// function createFront(product) {
//   const front = document.createElement("div");
//   front.classList.add("front-div");
//   const title = createTitle(product);
//   const image = createImage(product);
//   const price = createPrice(product);
//   const btnView = createButton("View More", "btn-view");
//   front.appendChild(title);
//   front.appendChild(image);
//   front.appendChild(price);
//   front.appendChild(btnView);
//   btnView.addEventListener("click", () => {
//     front.style.display = "none";
//   });
//   return front;
// }
function createFront(product) {
  const front = document.createElement("div");
  front.classList.add("front-div");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const image = createImage(product);

  imageContainer.appendChild(image);

  front.appendChild(createTitle(product));
  front.appendChild(imageContainer);
  front.appendChild(createPrice(product));
  front.appendChild(createButton("View More", "btn-view"));

  return front;
}
function createBack(product) {
  const back = document.createElement("div");
  const btnBuy = createButton("Buy now", "btn-buy");
  const btnBack = createButton("Go back", "btn-back");
  const title = createTitle(product);
  const ul = createSpecs(product);
  back.classList.add("back-div");
  back.appendChild(title);
  back.appendChild(ul);
  back.appendChild(btnBack);
  back.appendChild(btnBuy);
  return back;
}
function createButton(text, classname) {
  const button = document.createElement("button");
  button.classList.add("buttons");
  button.classList.add(classname);
  button.textContent = text;
  return button;
}

function createTitle(product) {
  const title = document.createElement("h2");
  title.classList.add("title");
  title.textContent = product.name;
  return title;
}
function createImage(product) {
  const image = document.createElement("img");
  image.classList.add("product-image");
  image.src = product.image;
  image.alt = product.name;
  return image;
}

function createPrice(product) {
  const price = document.createElement("span");
  price.classList.add("price");
  price.textContent = product.price;
  return price;
}
function createListItem(spec) {
  const li = document.createElement("li");
  li.classList.add("list-item");
  li.textContent = spec;
  return li;
}
function createSpecs(product) {
  const ul = document.createElement("ul");
  const specs = product.specs;
  ul.classList.add("list");
  specs.forEach((spec) => {
    const li = createListItem(spec);
    ul.appendChild(li);
  });
  return ul;
}
function renderCards(listaProductos) {
  console.log("Antes:", cards.children.length);

  cards.innerHTML = "";

  console.log("Después de borrar:", cards.children.length);

  listaProductos.forEach(createCard);

  console.log("Después de crear:", cards.children.length);
}
function searchProduct() {
  const searchedProduct = input.value.toLowerCase();

  const filtrados = productos.filter((p) => {
    return p.name.toLowerCase().includes(searchedProduct);
  });
  if (filtrados.length === 0) {
    alert("No se encontró ningún producto.");
    return;
  }
  renderCards(filtrados);
  backButton.style.display = "block";
}

renderCards(productos);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchProduct();
    input.value = "";
  }
});
backButton.addEventListener("click", () => {
  renderCards(productos);

  backButton.style.display = "none";

  input.value = "";
});
