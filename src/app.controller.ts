import { Controller, Get } from '@nestjs/common';
import { EnvironmentQuestionsService } from './environmentQuestionsService';
import { MitigationQuestionsService } from "./mitigationQuestionsService";

@Controller()
export class AppController {
  constructor(
    private readonly environmentQuestionsService: EnvironmentQuestionsService,
    private readonly mitigationQuestionsService: MitigationQuestionsService,
  ) {}

  @Get('environment_questions')
  getEnvironmentQuestions(): any {
    return this.environmentQuestionsService.getQuestions();
  }

  @Get('mitigation_questions')
  getMitigationQuestions(): any {
    return this.mitigationQuestionsService.getQuestions();
  }
}
