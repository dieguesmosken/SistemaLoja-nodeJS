const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware para passar o currentpath para todas as rotas
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

app.use((req, res, next) => {
    res.locals.title = "Teuzin.com.br";
    next();
  });
  

//rota inicial
app.get("/", (req, res) => {
    const avaliacoesPath = path.join(__dirname, 'public', 'json', 'avaliacoes.json');
    const avaliacoes = JSON.parse(fs.readFileSync(avaliacoesPath, 'utf8'));
    const produtosPath = path.join(__dirname, 'public', 'json', 'produtos.json');
    const produtos = JSON.parse(fs.readFileSync(produtosPath, 'utf8'));
    const pedidosPath = path.join(__dirname, 'public', 'json', 'pedidos.json');
    const pedidos = JSON.parse(fs.readFileSync(pedidosPath, 'utf8'));
    const clientesPath = path.join(__dirname, 'public', 'json', 'clientes.json');
    const clientes = JSON.parse(fs.readFileSync(clientesPath, 'utf8'));
    res.render("index", {
        avaliacoes: avaliacoes,
        produtos: produtos,
        pedidos: pedidos,      
        clientes: clientes,
        title: "Painel do E-commerce" });
  });

// ROTA PRODUTOS
app.get("/produtos/:produto?", (req, res) => {
    // passando o caminho do arquivo json
    const produtosPath = path.join(__dirname, 'public', 'json', 'produtos.json');
    // Lendo o arquivo json e convertendo para objeto javascript
    const produtos = JSON.parse(fs.readFileSync(produtosPath, 'utf8'));

    res.render('produtos', {
        // Enviando o array de objetos para página
        produtos : produtos,
        title: "Produtos",
    })
})

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


// ROTA CLIENTES
app.get("/clientes", (req, res) => {
    // passando o caminho do arquivo json
    const clientesPath = path.join(__dirname, 'public', 'json', 'clientes.json');
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
app.get("/clientes/:cliente?", (req, res) => {
    let cliente = req.params.cliente
    // pega o nome do cliente por exemplo Igor Batista e mostra o cliente detalhado
    // passando o caminho do arquivo json
    const clientesPath = path.join(__dirname, 'public', 'json', 'clientes.json');
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

//rota de avaliações
app.get("/avaliacoes", (req, res) => {
    const avaliacoesPath = path.join(__dirname, 'public', 'json', 'avaliacoes.json');
    const avaliacoes = JSON.parse(fs.readFileSync(avaliacoesPath, 'utf8'));

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
//rota de erro 404
app.use((req, res) => {
    res.status(404).render('404', { title: "Página não encontrada" });
    
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    console.log('Acesse http://localhost:3000/ para visualizar o painel');
    });