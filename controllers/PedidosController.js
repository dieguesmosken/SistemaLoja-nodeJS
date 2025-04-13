import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import express from 'express';
import fs from 'fs'; // <-- aqui importa o fs completo
const router = express.Router();

// ROTA PEDIDOS
router.get("/pedidos", (req, res) => {
    // passando o caminho do arquivo json
    const pedidosPath = path.join(__dirname,'..', 'public', 'json', 'pedidos.json');
    
    // Lendo o arquivo json e convertendo para objeto javascript
    const pedidos = JSON.parse(fs.readFileSync(pedidosPath, 'utf8'));

    // Contagem dos pedidos por status
    const statusCount = {
        Pago: pedidos.filter(p => p.status_pagamento === 'Pago').length,
        Pendente: pedidos.filter(p => p.status_pagamento === 'Pendente').length,
        Falha: pedidos.filter(p => p.status_pagamento === 'Falha').length,
        Enviado: pedidos.filter(p => p.status_envio === 'Enviado').length,
        Entregue: pedidos.filter(p => p.status_envio === 'Entregue').length
    };

    // Enviando os pedidos e a contagem para a página
    res.render('pedidos', {
        pedidos: pedidos,
        statusCount: statusCount,
        title: "Pedidos",
    })
});

export default router;
