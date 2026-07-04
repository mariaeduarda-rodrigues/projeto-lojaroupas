DROP TABLE IF EXISTS PRODUTO;
DROP TABLE IF EXISTS CATEGORIA;

CREATE TABLE CATEGORIA (
    id    SERIAL PRIMARY KEY,
    nome  VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE PRODUTO (
    id              SERIAL PRIMARY KEY,
    nome            VARCHAR(60) NOT NULL,
    tipo            VARCHAR(30),
    material        VARCHAR(60),
    descricao       TEXT,
    tamanhos        VARCHAR(30),
    cor             VARCHAR(30),
    preco           DECIMAL(7,2) NOT NULL,
    estoque         INT DEFAULT 0,
    imagem          VARCHAR(255),
    categoria_id    INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES CATEGORIA (id)
);

INSERT INTO CATEGORIA (nome) VALUES
('Vestidos'),
('Camisetas'),
('Calças'),
('Jaquetas'),
('Saias'),
('Shorts'),
('Blusas'),
('Casacos'),
('Acessórios'),
('Calçados');

INSERT INTO PRODUTO
(nome, tipo, material, descricao, tamanhos, cor, preco, estoque, imagem, categoria_id)
VALUES
('Vestido Floral Midi', 'Casual', 'Viscose', 'Vestido midi estampado, ideal para o dia a dia ou passeios de verão.', 'P, M, G', 'Floral', 129.90, 18, 'img/produtos/vestidomidifloral.jpg', 1),
('Vestido Longo Festa', 'Social', 'Cetim', 'Vestido longo elegante, perfeito para eventos e festas noturnas.', 'P, M, G, GG', 'Rosé', 249.90, 8, 'img/produtos/vestidolongofesta.jpg', 1),
('Camiseta Básica Algodão', 'Casual', 'Algodão', 'Camiseta unissex de algodão 100%, corte reto e confortável.', 'P, M, G, GG', 'Branca', 39.90, 50, 'img/produtos/camisetabasica.jpg', 2),
('Camiseta Estampada Vintage', 'Casual', 'Algodão', 'Camiseta com estampa retrô, modelagem unissex.', 'P, M, G', 'Preta', 49.90, 35, 'img/produtos/camisetavintage.jpg', 2),
('Calça Jeans Skinny', 'Casual', 'Jeans', 'Calça jeans skinny com elastano, modelagem cintura alta.', '36, 38, 40, 42', 'Azul', 159.90, 22, 'img/produtos/calcajeans.webp', 3),
('Calça Alfaiataria', 'Social', 'Poliéster', 'Calça de alfaiataria com caimento reto, ideal para o trabalho.', '36, 38, 40, 42, 44', 'Preta', 179.90, 14, 'img/produtos/calcaalfaiataria.webp', 3),
('Jaqueta Jeans Oversized', 'Casual', 'Jeans', 'Jaqueta jeans com modelagem oversized, item coringa do guarda-roupa.', 'P, M, G', 'Azul Claro', 189.90, 12, 'img/produtos/jaquetajeans.webp', 4),
('Jaqueta Corta-Vento', 'Esportivo', 'Nylon', 'Jaqueta leve, impermeável, ideal para atividades ao ar livre.', 'P, M, G, GG', 'Verde Militar', 169.90, 16, 'img/produtos/cortavento.webp', 4),
('Saia Plissada Midi', 'Casual', 'Poliéster', 'Saia plissada com caimento fluido, combina com vários looks.', 'P, M, G', 'Bege', 99.90, 20, 'img/produtos/saiaplissada.webp', 5),
('Short Jeans Cintura Alta', 'Casual', 'Jeans', 'Short jeans cintura alta com barra desfiada.', '36, 38, 40', 'Azul', 89.90, 28, 'img/produtos/shortjeans.webp', 6),
('Blusa de Tricot', 'Casual', 'Tricot', 'Blusa de tricot quentinha, perfeita para os dias mais frios.', 'P, M, G', 'Azul', 119.90, 17, 'img/produtos/blusatricot.jpg', 7),
('Tênis Casual Branco', 'Casual', 'Couro sintético', 'Tênis branco versátil, combina com praticamente qualquer look.', '34 ao 40', 'Branco', 199.90, 25, 'img/produtos/teniscasual.webp', 10);
