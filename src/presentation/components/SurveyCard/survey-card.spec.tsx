import React from 'react';
import faker from '@faker-js/faker';
import {render, RenderAPI} from '@testing-library/react-native';
import SurveyCard from '.';

type Data = {
  title: string;
  date: string;
};

const makeSut = (data: Data): RenderAPI => {
  return render(<SurveyCard data={data} />);
};

describe('SurveyCardComponent', () => {
  test('should render with correct values', () => {
    const data = {
      title: faker.random.words(),
      date: `${faker.date.recent()}`,
    };
    const sut = makeSut(data);
    expect(sut.getByTestId('survey-card-title').children[0]).toBe(data.title);
  });
});
