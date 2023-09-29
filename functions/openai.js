const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

const endpoint = "https://teste-challenge.openai.azure.com/"
const azureApiKey = "b5e2b36f2df647a1b6ff96611b052725"
const azureDeployment = "teste-challenge"

module.exports.chat = async function chat(prompt) {

  const messages = [
    { role: "system", content: "Você deve identificar na mensagem recebida o nome de produto ou comida e responder apenas isso. \
                                Input Example: Quero comprar um litro de leite muito gostoso \
                                Output Example: Leite" },
    { role: "user", content: prompt },
  ];

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = azureDeployment;
  let result;
  try {
    result = await client.getChatCompletions(deploymentId, messages);
  } catch {
    console.log("error")
  }

  const response = result.choices[0].message.content;

  return response;
}