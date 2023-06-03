import { Injectable } from '@nestjs/common';
import * as environmentQuestions from './data/questions_environment.json';


interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

interface Answer {
  id: number;
  answer: string;
  isCorrect: boolean;
}

@Injectable()
export class EnvironmentQuestionsService {
  questions = environmentQuestions;

  #getFiveQuestions(): Question[] {

    const mixArray = (array: any[]): any[] => {
      const newArray = [...array];
      const mixedArray: any[] = [];

      while(mixedArray.length < 5 && newArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * newArray.length); //Génère un index aléatoire entre 0 et newArray.length
        let randomElement = newArray[randomIndex];

        randomElement.answers.forEach(answer => {
          answer.selected = false
        })

        let answersWithoutIsCorrect = randomElement.answers.map(answer => {
          const {isCorrect, ...selectedAnswer} = answer;
          return selectedAnswer
        })

        let randomElementWithoutIsCorrect = {...randomElement, answers: answersWithoutIsCorrect}

        if(!mixedArray.includes(randomElementWithoutIsCorrect)) {
          mixedArray.push(randomElementWithoutIsCorrect)
        }

        newArray.splice(randomIndex, 1);
      }

      return mixedArray;
    }

    const mixedFiveQuestions = mixArray([...this.questions])

    return mixedFiveQuestions
  }

  getFiveQuestions(): Question[] {
    return this.#getFiveQuestions();
  }

  getAllQuestions(): Question[] {
    return this.questions;
  }
}
