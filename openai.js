import { config } from 'dotenv';
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

config();

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const azureApiKey = process.env.AZURE_OPENAI_KEY;
const azureDeployment = process.env.AZURE_DEPLOYMENT_ID;

const messages = [
  { role: "system", content: "Você deve identificar na mensagem recebida o nome de produto ou comida e responder apenas isso. \
                              Input Example: Quero comprar um litro de leite muito gostoso \
                              Output Example: Leite" },
  { role: "user", content: "Quero comprar arroz branco e fino" },
];

export async function chat() {
  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = azureDeployment;
  const result = await client.getChatCompletions(deploymentId, messages);

  for (const choice of result.choices) {
    console.log(choice.message.content);
  }
}