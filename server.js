const express = require('express');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Serve os arquivos da pasta "public" (HTML, CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// ROTA 1: lista todas as categorias
app.get('/api/categorias', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nome FROM CATEGORIA ORDER BY nome');
        res.json({ sucesso: true, categorias: result.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ sucesso: false, mensagem: error.message });
    }
});

// ROTA 2: lista todos os produtos (com JOIN na categoria)
app.get('/api/produtos', async (req, res) => {
    try {
        const query = `
            SELECT p.id, p.nome, p.tipo, p.material, p.descricao, p.tamanhos,
                   p.cor, p.preco, p.estoque, p.imagem,
                   c.id AS categoria_id, c.nome AS categoria
            FROM PRODUTO p
            JOIN CATEGORIA c ON p.categoria_id = c.id
            ORDER BY p.id
        `;
        const result = await pool.query(query);
        res.json({ sucesso: true, produtos: result.rows, quantidade: result.rows.length });
    } catch (error) {
        console.log(error);
        res.status(500).json({ sucesso: false, mensagem: error.message });
    }
});

// ROTA 3: lista produtos de uma categoria específica
app.get('/api/produtos/categoria/:id', async (req, res) => {
    try {
        const query = `
            SELECT p.id, p.nome, p.tipo, p.preco, p.imagem, c.nome AS categoria
            FROM PRODUTO p
            JOIN CATEGORIA c ON p.categoria_id = c.id
            WHERE c.id = $1
            ORDER BY p.nome
        `;
        const result = await pool.query(query, [req.params.id]);
        res.json({ sucesso: true, produtos: result.rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ sucesso: false, mensagem: error.message });
    }
});

// ROTA 4: detalhes de um produto específico
app.get('/api/produtos/:id', async (req, res) => {
    try {
        const query = `
            SELECT p.id, p.nome, p.tipo, p.material, p.descricao, p.tamanhos,
                   p.cor, p.preco, p.estoque, p.imagem, c.nome AS categoria
            FROM PRODUTO p
            JOIN CATEGORIA c ON p.categoria_id = c.id
            WHERE p.id = $1
        `;
        const result = await pool.query(query, [req.params.id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado' });
        }
        res.json({ sucesso: true, produto: result.rows[0] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ sucesso: false, mensagem: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});