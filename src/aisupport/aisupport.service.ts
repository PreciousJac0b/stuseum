import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class AisupportService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY // CHECK JUST IN CASE
    });
  }

  async chat(prompt: string): Promise<string> {
    const response = await this.openai.responses.create({
      model: 'gpt-4o', // or 'gpt-4', 'gpt-3.5-turbo' depending on your use case
      instructions: 'You are a helpful assistant.',
      input: prompt,
    });

    return response.output_text;
  }

}
