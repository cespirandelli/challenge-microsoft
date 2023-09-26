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

/*Nós temos as seguintes opções
 Carne Moida de Patinho, bandeja 500g no Sonda Supermercados por 17 reais e 49 centavos
 Carne Rosesol 1kg no Bistek Supermercados por 3 reais e 15 centavos
 Carne Rosesol 1kg no Bistek Supermercados por 3 reais e 15 centavos
 */