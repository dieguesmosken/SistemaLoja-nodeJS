const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
    });

app.get('/clientes', (req, res) => {
    res.render('clientes');
    });
app.get('/produtos', (req, res) => {
    res.render('produtos');
    });
app.get('/pedidos', (req, res) => {
    res.render('pedidos');
    });

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    });