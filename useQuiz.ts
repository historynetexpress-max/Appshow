import { useReducer, useEffect, useCallback } from 'react';
import { quizReducer, initialQuizState } from '@/types/quiz';

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (state.isQuizActive && state.timeRemaining > 0) {
      interval = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
    } else if (state.isQuizActive && state.timeRemaining === 0) {
      dispatch({ type: 'COMPLETE_QUIZ' });
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isQuizActive, state.timeRemaining]);

  const startQuiz = useCallback((categoryId: string, timeLimit: number) => {
    dispatch({ type: 'START_QUIZ', payload: { categoryId, timeLimit } });
  }, []);

  const selectAnswer = useCallback((questionId: number, answerIndex: number) => {
    dispatch({ type: 'SELECT_ANSWER', payload: { questionId, answerIndex } });
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const previousQuestion = useCallback(() => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  }, []);

  const completeQuiz = useCallback(() => {
    dispatch({ type: 'COMPLETE_QUIZ' });
  }, []);

  const resetQuiz = useCallback(() => {
    dispatch({ type: 'RESET_QUIZ' });
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    state,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    resetQuiz,
    formatTime,
  };
}
