import { Injectable } from '@nestjs/common';
import * as environmentQuestions from './data/questions_environment.json';

@Injectable()
export class EnvironmentQuestionsService {
  questions = environmentQuestions;

  #getFiveQuestions(): any {

    const mixArray = (array: any[]): any[] => {
      const newArray = [...array];
      const mixedArray: any[] = [];

      while(mixedArray.length < 5 && newArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * newArray.length); //Génère un index aléatoire entre 0 et newArray.length
        let randomElement = newArray[randomIndex];

        randomElement.answers.forEach(answer => {
          answer.selected = false
        })

        if(!mixedArray.includes(randomElement)) {
          mixedArray.push(randomElement)
        }

        newArray.splice(randomIndex, 1);
      }

      return mixedArray;
    }

    const mixedFiveQuestions = mixArray([...this.questions])

    return mixedFiveQuestions
  }

  getQuestions(): any {
    return this.#getFiveQuestions();
  }
}
