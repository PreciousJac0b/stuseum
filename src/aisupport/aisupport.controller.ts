import { Body, Controller, Post } from '@nestjs/common';
import { AisupportService } from './aisupport.service';

@Controller('aisupport')
export class AisupportController {
  constructor (private readonly aisupportService: AisupportService) {}

  @Post()
  async chat(@Body('prompt') prompt: string) {
    const response = await this.aisupportService.chat(prompt)
    return { response }
  }
}
