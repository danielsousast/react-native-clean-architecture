export type SurveyResultModel = {
  id: string;
  question: string;
  answers: SurveyResultAnswer[];
  date: Date;
};

export type SurveyResultAnswer = {
  image?: string;
  answer: string;
  count: number;
  percent: string;
  isCurrentAccountAnswer: boolean;
};
