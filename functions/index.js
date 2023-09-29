const { buscarProdutos }= require("./search");
const { chat } = require("./openai");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const port =  3000; // Escolha a porta que desejar

exports.receber = onRequest( 
  {
    cors: true
  }
  ,async(request, response) => {
  const prompt = request.body.text; // O JSON da requisição estará disponível em req.body
  logger.log({ prompt });
  const produto = await chat(prompt);
  logger.log({ produto });

  try {
    const result = await buscarProdutos(produto);
    logger.log({ result });
    response.json(result);
  } catch (err) {
    logger.error("An error occurred while searching for products:", err);
    response.status(500).send("Erro ao buscar produtos");
  }
});
