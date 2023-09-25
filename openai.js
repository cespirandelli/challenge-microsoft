//Blibiotecas
require('dotenv').config();

//Declaração de variáveis
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureApiKey = process.env.AZURE_OPENAI_KEY;
const azureDeployment = process.env.AZURE_DEPLOYMENT_ID;

// Configuração do ChatGPT
const messages = [
  { role: "system", content: "You are an assistent that help people find information." },
  { role: "user", content: "Qual é o preço da carne?" },
];

async function main() {
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = azureDeployment;
  const result = client.listChatCompletions(deploymentId, messages);

  //PRECISO COLOCAR O RETORNO DO RESULTADO DO CHATGPT
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
  });