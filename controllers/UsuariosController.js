import express from 'express';

const router = express.Router();




// ROTA perfil com usuario Mock
router.get("/perfil", (req, res) => {
    const usuario = {

        nome: "Teuzin",
        email: "matheus@badwolf3d.com.br",
        img: "https://avatars.githubusercontent.com/u/69434680?s=400",
        senha: "123456",
        endereco: "Rua 1",
        cidade: "São Paulo",
        estado: "SP",
        cep: "12345-678",
        telefone: "11999999999",
        cpf: "123.456.789-00",
        rg: "12.345.678-9",
        data_nascimento: "01/01/2000",
        sexo: "Masculino",
        tipo_usuario: "admin",
        status: "ativo"
    }
    res.render('perfil', {
        usuarios: usuario,
        title: "Perfil Usuario",
    })

    
})

export default router;