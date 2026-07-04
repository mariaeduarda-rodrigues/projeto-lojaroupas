const API_URL = '/api';

document.addEventListener('DOMContentLoaded', () => {
    carregarCategorias();
    carregarProdutos();
});

async function carregarCategorias() {
    try {
        const resposta = await fetch(`${API_URL}/categorias`);
        const dados = await resposta.json();

        const nav = document.getElementById('nav-categorias');

        if (!nav) return;

        if (!dados.categorias || dados.categorias.length === 0) {
            return;
        }

        dados.categorias.forEach(categoria => {
            const botao = document.createElement('button');
            botao.classList.add('btn-categoria');
            botao.textContent = categoria.nome;
            botao.dataset.id = categoria.id;

            botao.addEventListener('click', () => {
                document.querySelectorAll('.btn-categoria').forEach(b => {
                    b.classList.remove('ativo');
                });

                botao.classList.add('ativo');
                carregarProdutosPorCategoria(categoria.id);
            });

            nav.appendChild(botao);
        });

        const botaoTodas = document.querySelector('[data-id="todas"]');

        if (botaoTodas) {
            botaoTodas.addEventListener('click', () => {
                document.querySelectorAll('.btn-categoria').forEach(b => {
                    b.classList.remove('ativo');
                });

                botaoTodas.classList.add('ativo');
                carregarProdutos();
            });
        }

    } catch (erro) {
        console.error('Erro ao carregar categorias:', erro);
    }
}

async function carregarProdutos() {
    try {
        const resposta = await fetch(`${API_URL}/produtos`);
        const dados = await resposta.json();

        renderizarProdutos(dados.produtos);

    } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
    }
}

async function carregarProdutosPorCategoria(idCategoria) {
    try {
        const resposta = await fetch(`${API_URL}/produtos/categoria/${idCategoria}`);
        const dados = await resposta.json();

        renderizarProdutos(dados.produtos);

    } catch (erro) {
        console.error('Erro ao carregar produtos da categoria:', erro);
    }
}

async function carregarDetalhesProduto(id) {
    try {
        const resposta = await fetch(`${API_URL}/produtos/${id}`);
        const dados = await resposta.json();

        renderizarDetalhes(dados.produto);

    } catch (erro) {
        console.error('Erro ao carregar detalhes do produto:', erro);
    }
}

function renderizarProdutos(produtos) {
    const container = document.querySelector('.grid-produtos');

    if (!container) return;

    container.innerHTML = '';

    if (!produtos || produtos.length === 0) {
        container.innerHTML = '<p class="carregando">Nenhum produto encontrado.</p>';
        return;
    }

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card-produto');

        card.innerHTML = `
            <img src="${produto.imagem || 'img/sem-imagem.png'}" alt="${produto.nome}">
            <div class="info">
                <span class="categoria-tag">${produto.categoria}</span>
                <h3>${produto.nome}</h3>
                <p class="preco">R$ ${Number(produto.preco || 0).toFixed(2)}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            carregarDetalhesProduto(produto.id);
        });

        container.appendChild(card);
    });
}

function renderizarDetalhes(produto) {
    const container = document.getElementById('conteudo-detalhes');

    if (!container) return;

    container.innerHTML = `
        <div class="detalhe-produto">
            <img src="${produto.imagem || 'img/sem-imagem.png'}" alt="${produto.nome}">
            <div>
                <h3>${produto.nome}</h3>
                <p>${produto.descricao || ''}</p>

                <ul>
                    <li><strong>Categoria:</strong> ${produto.categoria}</li>
                    <li><strong>Tipo:</strong> ${produto.tipo || '-'}</li>
                    <li><strong>Material:</strong> ${produto.material || '-'}</li>
                    <li><strong>Cor:</strong> ${produto.cor || '-'}</li>
                    <li><strong>Tamanhos disponíveis:</strong> ${produto.tamanhos || '-'}</li>
                    <li><strong>Estoque:</strong> ${produto.estoque || 0} unidades</li>
                    <li><strong>Preço:</strong> R$ ${Number(produto.preco || 0).toFixed(2)}</li>
                </ul>
            </div>
        </div>
    `;

    container.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}