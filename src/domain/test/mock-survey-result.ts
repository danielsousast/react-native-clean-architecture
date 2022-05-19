import faker from '@faker-js/faker';
import {SurveyResultModel} from '../models';

export const mockSurveyResult = (): SurveyResultModel => ({
  id: faker.random.words(),
  question: faker.random.words(10),
  answers: [
    {
      answer: faker.random.words(4),
      image: faker.internet.url(),
      count: 4,
      percent: `60`,
      isCurrentAccountAnswer: true,
    },
    {
      answer: faker.random.words(5),
      image: faker.internet.url(),
      count: 5,
      percent: `50`,
      isCurrentAccountAnswer: false,
    },
  ],
  date: faker.date.recent(),
});
