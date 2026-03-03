const btn = document.getElementById('theme-toggle');
const html = document.documentElement;

btn.addEventListener('click', () =>{
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('data-theme', newTheme);
});

const api = `https://api.escuelajs.co/api/v1`;

async function buscarDados(idCategoria = "") {
    try{
        const urlFinal = idCategoria ? `${api}/products/?categoryId=${idCategoria}` : `${api}/products`;
        const result = await fetch(`${urlFinal}`);
        const dados = await result.json();

        exibirProdutos(dados)
    }catch (error){
        throw new Error("Erro na busca");
    }
};

async function buscarCategorias() {
    try{
        const result = await fetch(`${api}/categories`);
        const dados = await result.json();
        const categoryFilter = document.getElementById('category-filter');

        dados.forEach(categoria => {
            const option = `
            <option value="${categoria.id}">${categoria.name}</option>;
            `
            categoryFilter.innerHTML += option;
        });
    }catch (error){
        throw new Error("Erro na busca das categorias");
    }
    
}

function exibirProdutos(dados) {
    const container = document.getElementById('products-list');
    container.innerHTML = "";

    dados.forEach(prod => {
        const card = `
        <article class="card">
          <div class="card-img-wrapper">
            <img src="${prod.images[0]}" alt="${prod.title}" class="card-img">
          </div>
          <div class="card-content">
            <span class="card-category">${prod.category.name}</span>
            <h3 class="card-title">${prod.title}</h3>
            <div class="card-footer">
              <span class="card-price">R$ ${prod.price}</span>
              <a href="#" class="btn-primary btn-small">Ver Detalhes</a>
            </div>
          </div>
        </article>
        `;
        container.innerHTML += card;
    });
}

function filterProducts(id) {
    buscarDados(id);
}

buscarCategorias();
buscarDados();