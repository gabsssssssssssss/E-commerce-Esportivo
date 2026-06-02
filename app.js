// ===== Estado da aplicação =====
const state = {
  filter: "all",      // categoria ativa
  search: "",         // texto da busca
  sort: "relevance",  // ordenação
  cart: [],           // [{ id, qty }]
};

// ===== Helpers =====
const $ = (sel) => document.querySelector(sel);
const formatBRL = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ===== Renderização da vitrine =====
function getVisibleProducts() {
  let list = [...PRODUCTS];

  // filtro por categoria
  if (state.filter === "Outlet") {
    list = list.filter((p) => p.outlet);
  } else if (state.filter !== "all") {
    list = list.filter((p) => p.category === state.filter);
  }

  // busca por texto
  if (state.search.trim()) {
    const term = state.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }

  // ordenação
  switch (state.sort) {
    case "price-asc":  list.sort((a, b) => a.price - b.price); break;
    case "price-desc": list.sort((a, b) => b.price - a.price); break;
    case "name":       list.sort((a, b) => a.name.localeCompare(b.name)); break;
  }

  return list;
}

function renderProducts() {
  const grid = $("#product-grid");
  const empty = $("#empty-msg");
  const products = getVisibleProducts();

  // título dinâmico
  const titles = { all: "Destaques", Outlet: "Outlet — Ofertas" };
  $("#grid-title").textContent = titles[state.filter] || state.filter;

  if (products.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  grid.innerHTML = products
    .map((p) => {
      const installment = (p.price / 10).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      });
      const badge = p.badge
        ? `<span class="card__badge ${p.outlet ? "card__badge--outlet" : ""}">${p.badge}</span>`
        : "";
      const oldPrice = p.oldPrice
        ? `<span class="card__price-old">${formatBRL(p.oldPrice)}</span>`
        : "";
      return `
        <article class="card">
          <div class="card__media">${badge}${p.emoji}</div>
          <div class="card__body">
            <span class="card__cat">${p.category}</span>
            <h3 class="card__name">${p.name}</h3>
            ${oldPrice}
            <span class="card__price">${formatBRL(p.price)}</span>
            <span class="card__installments">10x de R$ ${installment} sem juros</span>
            <button class="card__btn" data-add="${p.id}">Adicionar ao carrinho</button>
          </div>
        </article>`;
    })
    .join("");
}

// ===== Carrinho =====
function addToCart(id) {
  const item = state.cart.find((i) => i.id === id);
  if (item) item.qty += 1;
  else state.cart.push({ id, qty: 1 });
  updateCart();
  const product = PRODUCTS.find((p) => p.id === id);
  showToast(`${product.name} adicionado! 🛒`);
}

function changeQty(id, delta) {
  const item = state.cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) state.cart = state.cart.filter((i) => i.id !== id);
  updateCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter((i) => i.id !== id);
  updateCart();
}

function cartTotal() {
  return state.cart.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    return sum + product.price * item.qty;
  }, 0);
}

function updateCart() {
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  $("#cart-count").textContent = count;
  $("#cart-total").textContent = formatBRL(cartTotal());

  const body = $("#cart-items");
  if (state.cart.length === 0) {
    body.innerHTML = `<p class="cart-empty">Seu carrinho está vazio. 🛒<br>Que tal escolher um produto?</p>`;
    return;
  }

  body.innerHTML = state.cart
    .map((item) => {
      const p = PRODUCTS.find((prod) => prod.id === item.id);
      return `
        <div class="cart-item">
          <div class="cart-item__media">${p.emoji}</div>
          <div class="cart-item__info">
            <div class="cart-item__name">${p.name}</div>
            <div class="cart-item__price">${formatBRL(p.price)}</div>
            <div class="cart-item__qty">
              <button class="qty-btn" data-dec="${p.id}">−</button>
              <span>${item.qty}</span>
              <button class="qty-btn" data-inc="${p.id}">+</button>
            </div>
          </div>
          <button class="cart-item__remove" data-remove="${p.id}">Remover</button>
        </div>`;
    })
    .join("");
}

// ===== Drawer do carrinho =====
function openCart() {
  $("#cart-drawer").classList.add("is-open");
  $("#cart-overlay").classList.add("is-open");
}
function closeCart() {
  $("#cart-drawer").classList.remove("is-open");
  $("#cart-overlay").classList.remove("is-open");
}

// ===== Toast =====
let toastTimer;
function showToast(msg) {
  const toast = $("#toast");
  toast.textContent = msg;
  toast.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-show"), 2200);
}

// ===== Eventos =====
function setActiveNav() {
  document.querySelectorAll(".nav__link").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.filter === state.filter);
  });
}

function bindEvents() {
  // filtro pelo menu e pelos círculos de categoria
  document.querySelectorAll("[data-filter]").forEach((el) => {
    el.addEventListener("click", () => {
      state.filter = el.dataset.filter;
      setActiveNav();
      renderProducts();
      $("#produtos").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // busca
  $("#search-input").addEventListener("input", (e) => {
    state.search = e.target.value;
    renderProducts();
  });
  $("#search-btn").addEventListener("click", () => renderProducts());

  // ordenação
  $("#sort-select").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderProducts();
  });

  // delegação de cliques (adicionar, qty, remover)
  document.body.addEventListener("click", (e) => {
    const t = e.target;
    if (t.dataset.add)    addToCart(Number(t.dataset.add));
    if (t.dataset.inc)    changeQty(Number(t.dataset.inc), 1);
    if (t.dataset.dec)    changeQty(Number(t.dataset.dec), -1);
    if (t.dataset.remove) removeFromCart(Number(t.dataset.remove));
  });

  // abrir/fechar carrinho
  $("#cart-btn").addEventListener("click", openCart);
  $("#cart-close").addEventListener("click", closeCart);
  $("#cart-overlay").addEventListener("click", closeCart);

  // checkout (simulado)
  $("#checkout-btn").addEventListener("click", () => {
    if (state.cart.length === 0) {
      showToast("Seu carrinho está vazio 🙈");
      return;
    }
    showToast(`Pedido de ${formatBRL(cartTotal())} finalizado! ✅`);
    state.cart = [];
    updateCart();
    closeCart();
  });
}

// ===== Inicialização =====
document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  setActiveNav();
  renderProducts();
  updateCart();
});
