import { Controller, Get, Post, Body } from '@nestjs/common';
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
    return this.environmentQuestionsService.getFiveQuestions();
  }

  @Get('mitigation_questions')
  getMitigationQuestions(): any {
    return this.mitigationQuestionsService.getFiveQuestions();
  }


  @Post('check_questions')
  checkQuestions(@Body() {answersToCheck, questionnaire}: { answersToCheck: any[], questionnaire: string }): any {
    let score = 0;
    let questionsList = [];

    if(questionnaire === "environment") {
      questionsList = this.environmentQuestionsService.getAllQuestions();
    } else if(questionnaire === "mitigation") {
      questionsList = this.mitigationQuestionsService.getAllQuestions();
    }

    answersToCheck.forEach(answerToCheck => {
      const question = questionsList.find(q => q.id === answerToCheck.questionId);

      if (question) {
        question.answers.forEach(answer => {
          if(answerToCheck.answerId === answer.id) {
            answer.isCorrect && score++
          }
        })

      }

    });

    return score
  }
}
