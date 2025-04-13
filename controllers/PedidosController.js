import express from 'express';
import { Pedido } from '../models/Pedido.js';

const router = express.Router();

// ROTA PEDIDOS
app.get("/pedidos", (req, res) => {
    // passando o caminho do arquivo json
    const pedidosPath = path.join(__dirname, 'public', 'json', 'pedidos.json');
    // Lendo o arquivo json e convertendo para objeto javascript
    const pedidos = JSON.parse(fs.readFileSync(pedidosPath, 'utf8'));

    res.render('pedidos', {
        // Enviando o array de objetos para página
        pedidos : pedidos,
        title: "Pedidos",
    })
})



export default router;