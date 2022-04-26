export type SurveyModel = {
  id: string;
  question: string;
  answers: SurveyAnswer[];
  date: Date;
  disAnswer: boolean;
};

export type SurveyAnswer = {
  image?: string;
  answer: string;
};
