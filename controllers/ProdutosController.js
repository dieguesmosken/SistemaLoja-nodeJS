import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import express from 'express';
import fs from 'fs'; // <-- aqui importa o fs completo
const router = express.Router();


// ROTA PRODUTOS
router.get("/produtos/:produto?", (req, res) => {
    // passando o caminho do arquivo json
    const produtosPath = path.join(__dirname,'..', 'public', 'json', 'produtos.json');
    // Lendo o arquivo json e convertendo para objeto javascript
    const produtos = JSON.parse(fs.readFileSync(produtosPath, 'utf8'));

    res.render('produtos', {
        // Enviando o array de objetos para página
        produtos : produtos,
        title: "Produtos",
    })
})

// ROTA PRODUTOS DETALHES
router.get("/produtos/detalhes/:id", (req, res) => {
    // passando o caminho do arquivo json
    const produtosPath = path.join(__dirname,'..', 'public', 'json', 'produtos.json');
    // Lendo o arquivo json e convertendo para objeto javascript
    const produtos = JSON.parse(fs.readFileSync(produtosPath, 'utf8'));
    const produto = produtos.find(p => p.id == req.params.id);

    res.render('produtos_detalhes', {
        // Enviando o array de objetos para página
        produto : produto,
        title: "Produtos",
    })
})

export default router;