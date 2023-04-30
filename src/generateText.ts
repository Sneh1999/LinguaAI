import { LLMChain, PromptTemplate } from "langchain";
import { OpenAI } from "langchain/llms";

export enum TONE {
  FORMAL = "formal",
  INFORMAL = "informal",
  OPTIMISTIC = "optimistic",
  WORRIED = "worried",
  FRIENDLY = "friendly",
  CURIOUS = "curious",
  ASSERTIVE = "assertive",
  ENCOURAGING = "encouraging",
  SUPRISED = "suprised",
  COOPERATIVE = "cooperative",
}

const basePromptPrefix =
  "Improve english for the following text and make its tone {tone}: {text}";

export default async function generateText(text: string, tone: TONE) {
  try {
    const model = new OpenAI({
      temperature: 0.9,
      openAIApiKey: process.env.OPEN_API_KEY,
    });
    const prompt = new PromptTemplate({
      template: basePromptPrefix,
      inputVariables: ["tone", "text"],
    });
    const chain = new LLMChain({ llm: model, prompt: prompt });
    const chainRes = await chain.call({ tone: tone, text: text });
    const generatedText = {
      text: chainRes.text,
    };
    return generatedText;
  } catch (e) {
    console.error(e);
  }
}
