import faker from '@faker-js/faker';
import {SurveyModel} from '../models';

export const mockSurveyList = (): SurveyModel[] => {
  return [mockSurvey(), mockSurvey(), mockSurvey()];
};

const mockSurvey = (): SurveyModel => ({
  id: faker.random.words(),
  question: faker.random.words(10),
  answers: [
    {
      answer: faker.random.words(4),
      image: faker.internet.url(),
    },
    {
      answer: faker.random.words(5),
      image: faker.internet.url(),
    },
  ],
  disAnswer: false,
  date: faker.date.recent(),
});
