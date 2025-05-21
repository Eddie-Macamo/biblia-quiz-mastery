
import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import DifficultySelector from './DifficultySelector';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';

const Quiz: React.FC = () => {
  const { state } = useQuiz();

  switch (state.status) {
    case 'idle':
      return <DifficultySelector />;
    case 'active':
      return <QuizQuestion />;
    case 'completed':
      return <QuizResult />;
    default:
      return <DifficultySelector />;
  }
};

export default Quiz;
