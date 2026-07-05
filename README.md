Mudei o conteúdo do READE.md para esse doc...
fica visível, assim que vc abre o projeto.
--------
ModaViva - Loja de Roupas 👗

Projeto avaliativo da disciplina Desenvolvimento Web 1 (DW1) - 2º Bimestre de 2026. Aplicação cliente/servidor que simula o catálogo de uma loja de roupas, com front-end em HTML/CSS/JavaScript e back-end em Node.js conectado a um banco de dados PostgreSQL.

Desenvolvido por: Maria Eduarda Rodrigues Ferreira

📌 Sobre o projeto

O site exibe o catálogo de produtos (roupas) de uma loja fictícia. O usuário pode:

Ver todos os produtos cadastrados no banco de dados; Filtrar os produtos por categoria (Vestidos, Camisetas, Calças, etc.) clicando nos botões do menu; Clicar em um produto para ver seus detalhes completos (material, cor, tamanhos, estoque, descrição).

Todos esses dados não estão fixos no HTML — eles são buscados em tempo real no servidor Node.js, que por sua vez consulta o banco de dados PostgreSQL e devolve as informações em formato JSON.

🛠️ Tecnologias utilizadas

CamadaTecnologiaFront-endHTML5, CSS3, JavaScript (Fetch API)Back-endNode.js + ExpressBanco de dadosPostgreSQLDriver de conexãopg (node-postgres)Variáveis de ambientedotenv

🔄 Fluxo de dados (cliente ↔ servidor)

[Navegador] [Servidor Node.js] [Banco PostgreSQL] index.html ---fetch---> server.js (Express) ---SQL---> Tabelas script.js <--JSON----- rotas /api/... <--rows--- CATEGORIA / PRODUTO

O navegador carrega index.html, que por sua vez carrega script.js. script.js faz chamadas fetch() para as rotas do servidor (ex: /api/produtos). O server.js recebe a requisição, executa uma consulta SELECT no PostgreSQL usando a biblioteca pg. O banco devolve as linhas (rows) para o servidor. O servidor monta um objeto JavaScript e responde ao navegador com res.json(...) — em formato JSON. O script.js recebe esse JSON e usa JavaScript puro (document.createElement, innerHTML) para desenhar os cards de produto na tela.

🗂️ Estrutura de pastas

projeto.loja/ ├── node_modules/ ├── public/ │ ├── index.html │ ├── style.css │ ├── script.js │ └── img/ │ ├── logo.png │ ├── banner.jpg │ └── produtos/ │ ├── vestidomidifloral.jpg │ ├── vestidolongofesta.jpg │ ├── camisetabasica.jpg │ ├── camisetavintage.jpg │ ├── calcajeans.webp │ ├── calcaalfaiataria.webp │ ├── jaquetajeans.webp │ ├── cortavento.webp │ ├── saiaplissada.webp │ ├── shortjeans.webp │ ├── blusatricot.jpg │ └── teniscasual.webp ├── package.json ├── package-lock.json ├── server.js ├── database.sql ├── README.md └── .gitignore

🧬 Modelagem do banco de dados

Duas tabelas relacionadas entre si por chave estrangeira:

CATEGORIA (1) ────< PRODUTO (N)

CATEGORIA: id, nome PRODUTO: id, nome, tipo, material, descricao, tamanhos, cor, preco, estoque, imagem, categoria_id (chave estrangeira para CATEGORIA.id)

Cada produto pertence a uma categoria, e uma categoria pode ter vários produtos (relacionamento 1:N).

O script completo de criação das tabelas e os INSERTs (mínimo de 10 registros em cada tabela) está no arquivo database.sql.

🌐 Rotas da API (back-end)

MétodoRotaDescriçãoGET/api/categoriasLista todas as categoriasGET/api/produtosLista todos os produtos (com o nome da categoria via JOIN)GET/api/produtos/categoria/:idLista os produtos de uma categoria específicaGET/api/produtos/:idRetorna os detalhes de um produto específico

Todas as rotas fazem apenas consultas (SELECT) ao banco e retornam os dados em JSON.

▶️ Como rodar o projeto localmente

Pré-requisitos
Node.js instalado PostgreSQL instalado (ou PGAdmin4 / DBeaver para gerenciar)

Clonar o repositório
bashgit clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git cd SEU_REPOSITORIO

Instalar as dependências
bashnpm install

Criar o banco de dados
No PGAdmin4, DBeaver ou pelo terminal psql, crie um banco de dados (ex: modaviva):

sqlCREATE DATABASE modaviva;

Depois, execute todo o conteúdo do arquivo database.sql dentro desse banco — isso vai criar as tabelas CATEGORIA e PRODUTO e já inserir os dados de exemplo.

Configurar as variáveis de ambiente
Crie um arquivo .env na raiz do projeto com:

DB_HOST=localhost DB_PORT=5432 DB_NAME=projeto_loja DB_USER=postgres DB_PASSWORD=123456 PORT=3001

Rodar o servidor
bashnpm start

Acessar o projeto
Abra o navegador em:

http://localhost:3001

📝 Observações

Este bimestre, o projeto realiza apenas consultas (SELECT) ao banco de dados. Operações de inserção, atualização e exclusão (INSERT/UPDATE/DELETE) serão implementadas no próximo bimestre. As imagens dos produtos, do logo e do banner ficam salvas localmente na pasta public/img/.

