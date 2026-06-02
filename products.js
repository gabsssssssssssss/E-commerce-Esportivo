// Catálogo de produtos (dados simulados — em um projeto real viriam de uma API)
const PRODUCTS = [
  { id: 1,  name: "Tênis de Corrida AirRun Pro",      category: "Corrida",    price: 399.90, oldPrice: 549.90, emoji: "👟", badge: "-27%" },
  { id: 2,  name: "Camisa Seleção Brasil Torcedor",   category: "Futebol",    price: 279.90, oldPrice: null,   emoji: "👕", badge: null },
  { id: 3,  name: "Bola de Futebol Campo Oficial",    category: "Futebol",    price: 149.90, oldPrice: 199.90, emoji: "⚽", badge: "-25%" },
  { id: 4,  name: "Tênis Basquete SkyJump High",      category: "Basquete",   price: 599.90, oldPrice: null,   emoji: "👟", badge: "Novo" },
  { id: 5,  name: "Bola de Basquete Indoor/Outdoor",  category: "Basquete",   price: 189.90, oldPrice: 229.90, emoji: "🏀", badge: "-17%" },
  { id: 6,  name: "Camiseta Dry-Fit Treino Masc.",    category: "Roupas",     price: 89.90,  oldPrice: 119.90, emoji: "👕", badge: "-25%" },
  { id: 7,  name: "Shorts Esportivo Performance",     category: "Roupas",     price: 79.90,  oldPrice: null,   emoji: "🩳", badge: null },
  { id: 8,  name: "Mochila Esportiva 30L",            category: "Acessórios", price: 159.90, oldPrice: 199.90, emoji: "🎒", badge: "-20%" },
  { id: 9,  name: "Garrafa Térmica 1L Squeeze",       category: "Acessórios", price: 49.90,  oldPrice: null,   emoji: "🥤", badge: null },
  { id: 10, name: "Tênis Casual UrbanStep",           category: "Calçados",   price: 329.90, oldPrice: 459.90, emoji: "👟", badge: "Outlet", outlet: true },
  { id: 11, name: "Meião Profissional (par)",         category: "Futebol",    price: 39.90,  oldPrice: 59.90,  emoji: "🧦", badge: "Outlet", outlet: true },
  { id: 12, name: "Jaqueta Corta-Vento Run",          category: "Corrida",    price: 249.90, oldPrice: null,   emoji: "🧥", badge: "Novo" },
  { id: 13, name: "Luvas de Goleiro Grip Max",        category: "Futebol",    price: 129.90, oldPrice: 169.90, emoji: "🧤", badge: "-24%" },
  { id: 14, name: "Tênis Trail Mountain Grip",        category: "Calçados",   price: 449.90, oldPrice: 599.90, emoji: "👟", badge: "-25%" },
  { id: 15, name: "Boné Esportivo Ajustável",         category: "Acessórios", price: 69.90,  oldPrice: null,   emoji: "🧢", badge: null },
  { id: 16, name: "Regata Treino Feminina",           category: "Roupas",     price: 59.90,  oldPrice: 89.90,  emoji: "🎽", badge: "Outlet", outlet: true },
];
