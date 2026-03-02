const btn = document.getElementById('theme-toggle');
/* Pegamos o botao que recebe o dados */
const html = document.documentElement;
/* Pegamos uma constante do html ele faz esse document.documentElement dizendo que todos os elementos do corpo html irao mudar */ 

btn.addEventListener('click', () =>{
    /* Com o evento addEventListener escutamos o click que vai gerar uma ação */
    const currentTheme = html.getAttribute('data-theme');
    /* fazemos uma constante do tema atual, faz o html fazer um get verificando o tema que esta atualmente presente */
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    /* Um novo tema que vai ser igual meu tema atual que vai fazer uma verificação de qual tema esta */
    html.setAttribute('data-theme', newTheme);
    /* setamos o html com o novo tema */
    localStorage.setItem('data-theme', newTheme);
    /* deixamos guardados no localStorage o ultimo tema */ 
});

const api = 'https://api.escuelajs.co/api/v1';

async function buscaDados() {
    /* Criamos a função de buscar o dadaos na Api */
    try{
        const result = await fetch(`${api}/products`);
        /* salvamos o dados retirados no fetch em uma variavel */

        if(!result.ok) throw new Error("Erro ao verificar os dados");
        /* pequena verificação */

        const dadosApi = await result.json();
        /* com os dados salvos pegamos e salvamos em um objeto json */

        const dadosFormatados = dadosApi.slice(0,3);
        /* formatamos para receber os destaques */

        exibirDados(dadosFormatados);
        /* chamamos nossa função de exibir retornando como parametro os dados formatados */
    }catch (error){
        throw new Error("Erro na api")
    }
}

function exibirDados(dadosFormatados){
    /* criamos a função cmo os dados formatados de parametro */

    const container = document.getElementById('featured-list');
    /* pegamos pelo id o lugar aonde vamos formatar */

    container.innerHTML = " ";
    /* limpamos o espaço */
    
    dadosFormatados.forEach(produto => {
    /* faz ele percorrer pela lista */    
        const card = `
        <article class="placeholder-card">
            <div class="card-img-wrapper">
                <img src="${produto.images[0]}" alt="${produto.title}" class="card-img">
            </div>
            <div class="card-content">
                <span class="card-category">${produto.category.name}</span>
                <h3 class="card-title">${produto.title}></h3>
                <div class="card-footer">
                    <span class="card-price">${produto.price}</span>
                    <a href="#">Ver mais</a>
                </div>
            </div>
        </article>
        `;
        /* maior resumo, ele e a msm coisa do html, porem aonde tem coisa escrita no html colocamos a mudança com o produto. algo */

        container.innerHTML += card;
    });

}

buscaDados();
/* muitooo importante */
