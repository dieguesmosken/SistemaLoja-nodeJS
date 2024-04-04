const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
    });

// ROTA PRODUTOS
app.get("/produtos/:produto?", (req, res) => {
    let produto = req.params.produto
    // Array com os produtos
    let produtos = ['Computador', 'Celular', 'Tablet', 'Notebook']
    res.render('produtos', {
        // Enviando variáveis para página
        produto : produto,
        produtos : produtos
    })
})

// ROTA PEDIDOS
app.get("/pedidos", (req, res) => {
    // Array de objetos com os pedidos
    let pedidos = [
        {produto: "Celular", preco: 12000}, 
        {produto: "Computador", preco: 3000}, 
        {produto: "Tablet", preco: 2000}, 
        {produto: "Notebook", preco: 3800}
    ]
    res.render('pedidos', {
        // Enviando o array de objetos para página
        pedidos : pedidos
    })
})

// ROTA CLIENTES
app.get("/clientes", (req, res) => {
    // Array de objetos com os pedidos
    let clientes = [
        {nome: "João Pereira", cpf: "111.111.111-00", cidade: "Registro"}, 
        {nome: "Ana Souza", cpf: "222.222.222-00", cidade: "Juquiá"}, 
        {nome: "Caio César", cpf: "333.333.333-00", cidade: "Pariquera"}, 
        {nome: "Felipe Mendes", cpf: "444.444.444-00", cidade: "Miracatu"}
    ]
    res.render('clientes', {
        // Enviando o array de objetos para página
        clientes : clientes
    })
})


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    });