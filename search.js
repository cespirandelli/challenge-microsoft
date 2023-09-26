// Bibliotecas
import { config } from 'dotenv';
import axios from 'axios';

// Configurando as variáveis de ambiente do dotenv
config();

//Declaração de variáveis
const url = process.env.SEARCH_ENDPOINT;
const apiKey = process.env.SEARCH_KEY;

// Função para pegar apenas os três itens com menor preço
export function obterTresMenoresPrecos(produtos) {
    // Função para ordenar os produtos por preço
    function ordenarPorPreco(a, b) {
      return parseFloat(a.Price) - parseFloat(b.Price);
    }
  
    // Ordenar os produtos por preço
    produtos.sort(ordenarPorPreco);
  
    // Retornar os três produtos com os preços mais baixos
    return produtos.slice(0, 3);
  }

export async function buscarProdutos(produto) {
  // Parâmetros da requisição
  const params = {
    'api-version': '2023-07-01-Preview',
    'search': produto,
  };

  // Configuração dos headers
  const headers = {
    'api-key': apiKey,
    'Content-Type': 'application/json',
  };


  // Requisição HTTP
  const result = axios.get(url, {
    params,
    headers,
  })
    .then((response) => {
      const data = response.data.value; 
      const result = obterTresMenoresPrecos(data); 
      return result;
    })
    .catch((error) => {
      console.error('Erro na requisição:', error);
    });

    return result;
}