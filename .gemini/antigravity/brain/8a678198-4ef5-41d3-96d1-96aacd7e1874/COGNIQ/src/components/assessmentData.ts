export const QUESTIONS = [
  {
    id: 1,
    concept: 'Factorization',
    text: 'What is the factored form of x² - 9?',
    options: ['(x-3)(x+3)', '(x-9)(x+1)', '(x-3)²', '(x+3)²'],
    correctAnswer: 0
  },
  {
    id: 2,
    concept: 'Discriminant',
    text: 'For the equation ax² + bx + c = 0, what does a negative discriminant indicate?',
    options: ['Two distinct real roots', 'One repeated real root', 'No real roots', 'Infinite roots'],
    correctAnswer: 2
  },
  {
    id: 3,
    concept: 'Word Problems',
    text: 'A train travels 120 miles in 2 hours. What is its average speed?',
    options: ['50 mph', '60 mph', '70 mph', '240 mph'],
    correctAnswer: 1
  },
  {
    id: 4,
    concept: 'Graph Interpretation',
    text: 'Which of the following equations represents a line passing through the origin?',
    options: ['y = 2x + 1', 'y = x² - 1', 'y = -3x', 'y = 4'],
    correctAnswer: 2
  },
  {
    id: 5,
    concept: 'Polynomials',
    text: 'What is the degree of the polynomial 4x³ + 2x² - x + 5?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2
  }
];

export interface AnswerRecord {
  questionId: number;
  concept: string;
  isCorrect: boolean;
}
