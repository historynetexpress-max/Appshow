export interface QuizState {
  currentCategory: string | null;
  currentQuestionIndex: number;
  selectedAnswers: { [questionId: number]: number };
  timeRemaining: number;
  isQuizActive: boolean;
  isQuizCompleted: boolean;
  score: number;
}

export type QuizAction =
  | { type: 'START_QUIZ'; payload: { categoryId: string; timeLimit: number } }
  | { type: 'SELECT_ANSWER'; payload: { questionId: number; answerIndex: number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'UPDATE_TIMER' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' };

export const initialQuizState: QuizState = {
  currentCategory: null,
  currentQuestionIndex: 0,
  selectedAnswers: {},
  timeRemaining: 0,
  isQuizActive: false,
  isQuizCompleted: false,
  score: 0,
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...initialQuizState,
        currentCategory: action.payload.categoryId,
        timeRemaining: action.payload.timeLimit * 60,
        isQuizActive: true,
      };
    case 'SELECT_ANSWER':
      return {
        ...state,
        selectedAnswers: {
          ...state.selectedAnswers,
          [action.payload.questionId]: action.payload.answerIndex,
        },
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timeRemaining: Math.max(0, state.timeRemaining - 1),
      };
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        isQuizActive: false,
        isQuizCompleted: true,
      };
    case 'RESET_QUIZ':
      return initialQuizState;
    default:
      return state;
  }
}
