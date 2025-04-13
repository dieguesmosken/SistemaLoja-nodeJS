// Imports
import express from "express";
import fs from "fs";
import path from "path"; // <-- aqui importa o path completo

import { fileURLToPath } from "url";
import { dirname } from "path";

// Corrige __dirname e __filename pra funcionar com ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importando os Controllers (onde estão as rotas)
import ClientesController from "./controllers/ClientesController.js";
import PedidosController from "./controllers/PedidosController.js";
import ProdutosController from "./controllers/ProdutosController.js";
import AvaliacoesController from "./controllers/AvaliacoesController.js";

// Importando o ejs para renderização de templates
const app = express();

//conffigurando o ejs como template engine
app.set("view engine", "ejs");
// configurando a pasta public como pasta estática
app.use(express.static("public"));

//
app.use(express.urlencoded({ extended: true }));
// configurando o express para json
app.use(express.json());

// middleware para passar o currentpath para todas as rotas
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// configurando as rotas
app.use("/", ClientesController);
app.use("/", PedidosController);
app.use("/", ProdutosController);
app.use("/", AvaliacoesController);

// middleware para passar o title para todas as rotas
app.use((req, res, next) => {
  res.locals.title = "Teuzin.com.br";
  next();
});

//rota inicial
app.get("/", (req, res) => {
  const avaliacoesPath = path.join(
    __dirname,
    "public",
    "json",
    "avaliacoes.json"
  );
  const avaliacoes = JSON.parse(fs.readFileSync(avaliacoesPath, "utf8"));
  const produtosPath = path.join(__dirname, "public", "json", "produtos.json");
  const produtos = JSON.parse(fs.readFileSync(produtosPath, "utf8"));
  const pedidosPath = path.join(__dirname, "public", "json", "pedidos.json");
  const pedidos = JSON.parse(fs.readFileSync(pedidosPath, "utf8"));
  const clientesPath = path.join(__dirname, "public", "json", "clientes.json");
  const clientes = JSON.parse(fs.readFileSync(clientesPath, "utf8"));

  // Contagem dos pedidos por status
  const statusCount = {
    Pago: pedidos.filter((p) => p.status_pagamento === "Pago").length,
    Pendente: pedidos.filter((p) => p.status_pagamento === "Pendente").length,
    Falha: pedidos.filter((p) => p.status_pagamento === "Falha").length,
    Enviado: pedidos.filter((p) => p.status_envio === "Enviado").length,
    Entregue: pedidos.filter((p) => p.status_envio === "Entregue").length,
  };

  res.render("index", {
    avaliacoes: avaliacoes,
    produtos: produtos,
    pedidos: pedidos,
    clientes: clientes,
    statusCount: statusCount,
    title: "Painel do E-commerce",
  });
});
//rota de erro 404
app.use((req, res) => {
  res.status(404).render("404", { title: "Página não encontrada" });
});

// Roda o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
  console.log("Acesse http://localhost:3000/ para visualizar o painel");
});
