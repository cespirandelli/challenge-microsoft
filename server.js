import { buscarProdutos } from "./search.js";
import { chat } from "./openai.js";
import express from 'express';

const app = express();
const port = 3000; // Escolha a porta que desejar

app.use(express.json()); // Middleware para analisar o corpo da requisição como JSON

// Rota para receber a requisição JSON
app.post('/receber-json', async (req, res) => {
  const prompt = req.body.text; // O JSON da requisição estará disponível em req.body
  
  // const prompt = "Quero comprar carne";
  const produto = await chat(prompt);
  console.log(produto);

  try {
    const result = await buscarProdutos(produto);

    console.log('Recebeu JSON:', req.body);
    
    console.log("Resposta que será enviada:", result);

    res.send(result);
  } catch (err) {
    console.error("An error occurred while searching for products:", err);
    res.status(500).send("Erro ao buscar produtos");
  };
});

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});