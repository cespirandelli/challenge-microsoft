// Bibliotecas
const axios = require('axios');
require('dotenv').config();

//Declaração de variáveis
const url = process.env.SEARCH_ENDPOINT;
const apiKey = process.env.SEARCH_KEY;

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

// Parâmetros da requisição
const params = {
  'api-version': '2023-07-01-Preview',
  'search': 'arroz',
};

// Configuração dos headers
const headers = {
  'api-key': apiKey,
  'Content-Type': 'application/json',
};


// Requisição HTTP
axios.get(url, {
  params,
  headers,
})
  .then((response) => {
    const data = response.data.value; 
    console.log('Resposta da requisição:', obterTresMenoresPrecos(data));
  })
  .catch((error) => {
    console.error('Erro na requisição:', error);
  });