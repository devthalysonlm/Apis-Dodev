import express from 'express';
const app = express();
const port = 3000;
// Configuração do middleware para aceitar JSON
app.use(express.json());
// Rota inicial
app.get('/', (req, res) => {
    res.send('Bem-vindo ao Gerenciador de Carros!');
});
// Definindo a estrutura de Carro
class Carro {
    constructor(marca, modelo, categoria, ano, quilometragem, valor) {
        this.marca = marca;
        this.modelo = modelo;
        this.categoria = categoria;
        this.ano = ano;
        this.quilometragem = quilometragem;
        this.valor = valor;
    }
}
// Lista de carros
let carros = [
    new Carro('Marca A', 'Modelo A', 'SUV', 2020, 20000, 50000),
    new Carro('Marca B', 'Modelo B', 'Sedan', 2018, 10000, 60000),
];
// Rota para listar todos os carros
app.get('/carros', (req, res) => {
    res.json(carros);
});
// Rota para pegar um carro específico por ID
app.get('/carros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const carro = carros.find((c) => c.ano === id);
    if (!carro) {
        return res.status(404).json({ mensagem: 'Carro não encontrado' });
    }
    res.json(carro);
});
// Rota para adicionar um novo carro
app.post('/carros', (req, res) => {
    const { marca, modelo, categoria, ano, quilometragem, valor } = req.body;
    const novoCarro = new Carro(marca, modelo, categoria, ano, quilometragem, valor);
    carros.push(novoCarro);
    res.status(201).json(novoCarro);
});
// Rota para atualizar um carro
app.put('/carros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { marca, modelo, categoria, ano, quilometragem, valor } = req.body;
    const carro = carros.find((c) => c.ano === id);
    if (!carro) {
        return res.status(404).json({ mensagem: 'Carro não encontrado' });
    }
    carro.marca = marca || carro.marca;
    carro.modelo = modelo || carro.modelo;
    carro.categoria = categoria || carro.categoria;
    carro.ano = ano || carro.ano;
    carro.quilometragem = quilometragem || carro.quilometragem;
    carro.valor = valor || carro.valor;
    res.json(carro);
});
// Rota para deletar um carro
app.delete('/carros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = carros.findIndex((c) => c.ano === id);
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Carro não encontrado' });
    }
    carros.splice(index, 1);
    res.status(204).send();
});
// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
