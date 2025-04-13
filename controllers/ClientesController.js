import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import express from 'express';
import fs from 'fs'; // <-- aqui importa o fs completo
const router = express.Router();


// ROTA CLIENTES
router.get("/clientes", (req, res) => {
    // passando o caminho do arquivo json
    const clientesPath = path.join(__dirname,'..', 'public', 'json', 'clientes.json');
    // Lendo o arquivo json e convertendo para objeto javascript
    const clientes = JSON.parse(fs.readFileSync(clientesPath, 'utf8'));
    console.log(clientes)
    res.render('clientes', {
        // Enviando o array de objetos para página
        clientes : clientes,
        title: "Clientes",
    })
})

//rota clientes detalhados
router.get("/clientes/:cliente?", (req, res) => {
    let cliente = req.params.cliente
    // pega o nome do cliente por exemplo Igor Batista e mostra o cliente detalhado
    // passando o caminho do arquivo json
    const clientesPath = path.join(__dirname,'..', 'public', 'json', 'clientes.json');
    // Lendo o arquivo json e convertendo para objeto javascript
    const clientes = JSON.parse(fs.readFileSync(clientesPath, 'utf8'));
    // procura o cliente no array de clientes
    cliente = clientes.find(c => c.nome.toLowerCase() === cliente.toLowerCase())
    // se o cliente não for encontrado, redireciona para a rota de clientes
    if (!cliente) {
        return res.redirect('/clientes');
    }
    // se o cliente for encontrado, envia o cliente para a página de detalhes como um objeto unico
    res.render('clientes', {
        clientes: [cliente], // cliente já tem todas as propriedades
        title: "Clientes " + cliente.nome
      });
      

})


export default router;