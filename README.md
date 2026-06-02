# 🛒 ProSport — E-commerce de Artigos Esportivos

Loja virtual de artigos esportivos desenvolvida com **HTML, CSS e JavaScript puro** (sem frameworks). O projeto simula a vitrine de uma loja de esportes, com catálogo de produtos, busca, filtros por categoria, ordenação e um **carrinho de compras totalmente funcional**.

> Projeto desenvolvido como peça de portfólio para a área de desenvolvimento Front-end.

## 🔗 Demo

> Adicione aqui o link do deploy (ex.: GitHub Pages, Vercel ou Netlify).
> Ex.: `https://seu-usuario.github.io/prosport`

## 📸 Preview

> Tire um print da tela e adicione aqui: `![Preview](assets/preview.png)`

## ✨ Funcionalidades

- **Catálogo de produtos** renderizado dinamicamente via JavaScript
- **Busca em tempo real** por nome ou categoria
- **Filtro por categoria** (menu superior e círculos de categoria)
- **Ordenação** por relevância, preço (crescente/decrescente) e nome
- **Carrinho de compras** lateral (drawer) com:
  - adicionar / remover itens
  - aumentar e diminuir quantidade
  - cálculo automático do total
  - contador de itens no ícone
- **Feedback visual** com notificações (toast)
- **Layout responsivo** (desktop, tablet e mobile)
- Estados de UI tratados (carrinho vazio, busca sem resultados)

## 🛠️ Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Flexbox, Grid, animações)
- JavaScript (ES6+) — manipulação de DOM, eventos e estado
- Google Fonts (Archivo + Barlow Condensed)

## 📂 Estrutura do projeto

```
prosport/
├── index.html          # estrutura da página
├── css/
│   └── style.css       # estilos e tema
├── js/
│   ├── products.js     # "banco de dados" de produtos (simulado)
│   └── app.js          # lógica: render, filtro, busca, carrinho
└── README.md
```

## 🚀 Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/prosport.git
   ```
2. Entre na pasta:
   ```bash
   cd prosport
   ```
3. Abra o `index.html` no navegador (ou use a extensão **Live Server** do VS Code).

## 💡 Decisões técnicas

- **JavaScript puro (vanilla)** para demonstrar domínio dos fundamentos da web, sem depender de frameworks.
- **Separação de responsabilidades**: dados (`products.js`) isolados da lógica (`app.js`), facilitando uma futura troca por uma API real.
- **Renderização baseada em estado**: um objeto `state` central guarda filtro, busca, ordenação e carrinho; qualquer mudança re-renderiza a interface — padrão inspirado em frameworks modernos.
- **Delegação de eventos** para lidar com elementos criados dinamicamente.

## 🔭 Próximos passos

- Persistir o carrinho (ex.: salvar entre sessões)
- Consumir uma **API real** de produtos
- Página de detalhes do produto
- Reescrever em **React** como evolução do projeto

---

Desenvolvido por **[Seu Nome]** • 2026
