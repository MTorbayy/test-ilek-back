import { Injectable } from '@nestjs/common';
import * as mitigationQuestions from './data/questions_mitigation.json';
import { EnvironmentQuestionsService} from "./environmentQuestionsService";

@Injectable()
export class MitigationQuestionsService extends EnvironmentQuestionsService {
    questions = mitigationQuestions;
}