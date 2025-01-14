import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

//configuração do middleware para aceitar JSON
app.use(express.json());

//rota inicial
app.get('/', (req: Request, res: Response) => {
    res.send('bem-vindo ao gerenciador de carros!')
});

//definindo a estrutura de carro
class Carro{
    marca: string;
    modelo: string;
    categoria: string;
    ano: number;
    quilometragem: number;
    valor: number;

    constructor(marca:string, modelo: string, categoria: string, ano: number, quilometragem: number, valor: number){
        this.marca = marca;
        this.modelo = modelo
        this.categoria = categoria
        this.ano = ano
        this.quilometragem = quilometragem
        this.valor = valor
    }
}

//definir uma lista de carros(em um banco de dados ou estrutura simples para o exercício)

let carros: Carro[] = [
    new Carro('Marca A', 'Modelo A', 'SUV', 2020, 20000, 50000),
    new Carro('Marca B', 'Modelo B', 'Sedan', 2018, 10000, 60000)
];


//rota para listar todos os carros
app.get('/carros', (req: Request, res: Response) => {
    res.json(carros);
});

//rota para pegar um carro específico por ID
app.get('/carros/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const carro = carros.find((c) => c.ano === id);
    if(!carro){
        return res.status(404).json({mensagem: 'Carro não encontrado'});
    }
    res.json(carro);
});

//rota para adicionar um carro
app.put('/carros/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
})
