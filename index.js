import { buscarProdutos } from "./search.js";
import { chat } from "./openai.js";
import express from "express";
import cors from "cors";
// Bibliotecas
import { config } from "dotenv";
config();

const app = express();
const port = process.env.PORT || 3000; // Escolha a porta que desejar

app.use(cors());
app.use(express.json()); // Middleware para analisar o corpo da requisição como JSON

// Rota para receber a requisição JSON
app.post("/api/receber-json", async (req, res) => {
  const prompt = req.body.text; // O JSON da requisição estará disponível em req.body
  console.log({ prompt });
  const produto = await chat(prompt);
  console.log({ produto });

  try {
    const result = await buscarProdutos(produto);
    console.log({ result });
    res.json([
      {
        "@search.score": 8.069304,
        Codigo: "3",
        Product: "Arroz",
        Description: "ARROZ BRANCO TIPO JAPONES",
        Store: "Estacao dos Graos",
        Price: "2.19",
        Link: "https://www.estacaodosgraos.com.br/arroz-branco-tipo-japon-s.html&rct=j&q=&esrc=s&sa=U&ved=0ahUKEwi84YOpq4KBAxVLbDABHTn1BEQQ1SkI5QYoAA&usg=AOvVaw1Wc5yYW_6i1FoX6AWe76PT",
        Address:
          "R. Heitor Penteado, 1025 - Sumarezinho, Sao Paulo - SP, 05437-000, Brazil",
        Distance: "6.3 km",
      },
      {
        "@search.score": 5.7181764,
        Codigo: "15",
        Product: "Feijao",
        Description: "Feijao Azuki",
        Store: "Emporio Figueira Produtos Naturais",
        Price: "2.34",
        Link: "https://www.emporiofigueira.com.br/feij-o-azuki.html&rct=j&q=&esrc=s&sa=U&ved=0ahUKEwjnuMmqq4KBAxVASzABHRrABd4Q1SkIhQcoAA&usg=AOvVaw1dkygG1GjtMrkF4d8PtCiI",
        Address:
          "R. Javaes, 621 - Vila Eldizia, Santo Andre - SP, 09181-570, Brazil",
        Distance: "29.5 km",
      },
      {
        "@search.score": 5.6895,
        Codigo: "57",
        Product: "Farinha de trigo",
        Description: "Farinha De Trigo Nonita 1kg",
        Store: "Super Jose",
        Price: "3.69",
        Link: "https://www.google.com/shopping/product/11758056344724491892?q=Farinha+de+trigo+em+s%C3%A3o+paulo&prds=eto:8379885399294061797_0,pid:3407300410165452987&sa=X&ved=0ahUKEwi6tJmxq4KBAxVNQTABHYJVAnQQ8gII7wcoAA",
        Address:
          "Av. Vinicius de Moraes, 1273 - Parque Sao Bento, Sorocaba - SP, 18072-060, Brazil",
        Distance: "114 km",
      },
    ]);
  } catch (err) {
    console.error("An error occurred while searching for products:", err);
    res.status(500).send("Erro ao buscar produtos");
  }
});

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
