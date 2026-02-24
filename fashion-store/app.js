const BASE_URL = "https://api.escuelajs.co/api/v1";

document.addEventListener('DOMContentLoaded', () =>{

    const eIndex = document.querySelector('#featured-list');

    if(eIndex){
        getFeaturedProducts();
    }
});

async function getFeaturedProducts() {
 
    const featuredList = document.getElementById('featured-list');

    try{
        const response = await fetch(`${BASE_URL}/products`);

        if(!response.ok)throw new Error('Erro ao pegar os dados da API');

        const products = await response.json();

        const onlyThree = products.slice(0, 3);

        featuredList.innerHTML = "";

        onlyThree.forEach(product => {
            const card = `
                <article class="card">
                    <div class="card-img-wrapper">
                        <img src="${product.images[0]}" alt="${product.title}" class="card-img">
                    </div>
                    <div class="card-content">
                        <span class="card-category">${product.category.name}</span>
                        <h3 class="card-title">${product.title}</h3>
                        <div class="card-footer">
                            <span class="card-price">${product.price}</span>
                            <a href="detail.html?id=${product.id}" class=btn-primary btn-small">Ver detalhes</a>
                        </div>
                    </div>
                </article>
            `;
            featuredList.innerHTML += card;
        });
    }catch(error){
        console.error('Erro:', error);
        featuredList.innerHTML = '<p> class="error"> Não foi possível se conectar ao Banco de Dados.</p> ';
    }

}

function toggleTheme(){
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
}