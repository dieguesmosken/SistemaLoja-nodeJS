import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import express from 'express';
import fs from 'fs'; // <-- aqui importa o fs completo
const router = express.Router();


//rota de avaliações
router.get("/avaliacoes", (req, res) => {
    const avaliacoesPath = path.join(__dirname, '..', 'public', 'json',  'avaliacoes.json');
    const avaliacoes = JSON.parse(fs.readFileSync(avaliacoesPath, 'utf8'));
    console.log('CAMINHO DO JSON:', avaliacoesPath);


    // verifica se o array de avaliações está vazio
    if (avaliacoes.length === 0) {
        return res.render('avaliacoes', {
            avaliacoes : avaliacoes,
            title: "Avaliações",
            message: "Nenhuma avaliação encontrada."
        });
    }
    // verifica se o array de avaliações tem mais de 10 itens
    if (avaliacoes.length > 10) {
        avaliacoes = avaliacoes.slice(0, 10); // pega os 10 primeiros itens
    }

    

    res.render('avaliacoes', {
        // Enviando o array de objetos para página
        avaliacoes : avaliacoes,
        title: "Avaliações",
    })
})

export default router;