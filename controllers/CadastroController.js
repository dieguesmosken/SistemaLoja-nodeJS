import express from 'express';

const router = express.Router();

// ROTA CADASTRO
router.get("/cadastro", (req, res) => {
    res.render('cadastro/cadastro', {
        title: "Cadastro",
    })
})
// ROTA CADASTRO usuário
router.post("/cadastro", (req, res) => {
    const { nome, email, senha } = req.body;
    console.log(nome, email, senha);
    res.redirect('/clientes');
})

export default router;