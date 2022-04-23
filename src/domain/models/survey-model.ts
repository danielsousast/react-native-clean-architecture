export type SurveyModel = {
  id: string;
  question: string;
  answers: [
    {
      iamge?: string;
      answer: string;
    },
  ];
  date: Date;
  disAnswer: boolean;
};
