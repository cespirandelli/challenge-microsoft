require('dotenv').config();
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureApiKey = process.env.AZURE_OPENAI_KEY;
const azureDeployment = process.env.AZURE_DEPLOYMENT_ID;

const messages = [
  { role: "system", content: "Você deve identificar na mensagem recebida o nome de produto ou comida e responder apenas isso. \
                              Input Example: Quero comprar um litro de leite muito gostoso \
                              Output Example: Leite" },
  { role: "user", content: "Quero comprar arroz branco e fino" },
];

async function main() {
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = azureDeployment;
  const result = await client.getChatCompletions(deploymentId, messages);

  for (const choice of result.choices) {
    console.log(choice.message.content);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };