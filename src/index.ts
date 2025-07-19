import { PromptService } from "./services/PromptService";

async function main() {
  const prompt = new PromptService();
  await prompt.execute();
}

main();
