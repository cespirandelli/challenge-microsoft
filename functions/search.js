const axios = require("axios")

//Declaração de variáveis
const url = "https://challenge-search.search.windows.net/indexes/challenge-index/docs"
const apiKey = "JcAJ7htkmiYFqEtS0nPvw04AWyWkyq4xvV7au7tJGEAzSeDdqw9d"

// Função para pegar apenas os três itens com menor preço
function obterTresMenoresPrecos(produtos) {
  // Função para ordenar os produtos por preço
  function ordenarPorPreco(a, b) {
    return parseFloat(a.Price) - parseFloat(b.Price);
  }

  // Ordenar os produtos por preço
  produtos.sort(ordenarPorPreco);

  // Retornar os três produtos com os preços mais baixos
  return produtos.slice(0, 3);
}

async function buscarProdutos(produto) {
  // Parâmetros da requisição
  const params = {
    "api-version": "2023-07-01-Preview",
    search: produto,
  };

  // Configuração dos headers
  const headers = {
    "api-key": apiKey,
    "Content-Type": "application/json",
  };

  // Requisição HTTP
  const result = axios
    .get(url, {
      params,
      headers,
    })
    .then((response) => {
      console.log({ response });
      const data = response.data.value;
      console.log({ data });
      const result = obterTresMenoresPrecos(data);
      return result;
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
    });

  return result;
}

module.exports = {
  obterTresMenoresPrecos ,
  buscarProdutos
}
