// Importando Bibliotecas
import { buscarProdutos } from "./search.js";
import { chat } from "./openai.js";

// Execução

const prompt = "Quero comprar carne";

const produto = await chat(prompt)
console.log(produto)

buscarProdutos(produto).catch((err) => {
    console.error("The sample encountered an error:", err);
  });