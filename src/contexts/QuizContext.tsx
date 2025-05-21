
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { questionsData } from '@/data/questions';

// Types
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: Difficulty;
  reference: string;
}

export interface Answer {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
  timeSpent: number;
}

interface QuizState {
  difficulty: Difficulty | null;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Answer[];
  gameStartTime: number | null;
  gameEndTime: number | null;
  status: 'idle' | 'active' | 'completed';
  username: string;
}

type Action =
  | { type: 'SET_DIFFICULTY'; payload: Difficulty }
  | { type: 'NEXT_QUESTION' }
  | { type: 'ANSWER_QUESTION'; payload: Answer }
  | { type: 'RESET_QUIZ' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'SET_USERNAME'; payload: string };

const initialState: QuizState = {
  difficulty: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  gameStartTime: null,
  gameEndTime: null,
  status: 'idle',
  username: localStorage.getItem('bibleQuiz_username') || '',
};

// Helper functions
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Reducer
const quizReducer = (state: QuizState, action: Action): QuizState => {
  switch (action.type) {
    case 'SET_DIFFICULTY': {
      // Filter questions based on difficulty and get 10 random questions
      const filteredQuestions = questionsData
        .filter(q => q.difficulty === action.payload)
        .slice(0, 100); // Get first 100 as a pool
      const selectedQuestions = shuffleArray(filteredQuestions).slice(0, 10); // Pick 10 random questions
      
      return {
        ...state,
        difficulty: action.payload,
        questions: selectedQuestions,
        currentQuestionIndex: 0,
        answers: [],
        gameStartTime: Date.now(),
        gameEndTime: null,
        status: 'active',
      };
    }
    case 'NEXT_QUESTION':
      if (state.currentQuestionIndex < state.questions.length - 1) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
        };
      }
      return {
        ...state,
        status: 'completed',
        gameEndTime: Date.now(),
      };
    case 'ANSWER_QUESTION':
      return {
        ...state,
        answers: [...state.answers, action.payload],
      };
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        status: 'completed',
        gameEndTime: Date.now(),
      };
    case 'RESET_QUIZ':
      return {
        ...initialState,
        username: state.username,
      };
    case 'SET_USERNAME':
      localStorage.setItem('bibleQuiz_username', action.payload);
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

// Context
interface QuizContextProps {
  state: QuizState;
  setDifficulty: (difficulty: Difficulty) => void;
  answerQuestion: (selectedOption: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  completeQuiz: () => void;
  setUsername: (username: string) => void;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Load quiz history from localStorage
  useEffect(() => {
    const saveQuizToHistory = () => {
      if (state.status === 'completed' && state.answers.length > 0) {
        const quizHistory = JSON.parse(localStorage.getItem('bibleQuiz_history') || '[]');
        
        const quizResult = {
          id: `quiz_${Date.now()}`,
          date: new Date().toISOString(),
          difficulty: state.difficulty,
          totalQuestions: state.questions.length,
          correctAnswers: state.answers.filter(a => a.isCorrect).length,
          timeSpentMs: (state.gameEndTime || Date.now()) - (state.gameStartTime || Date.now()),
          username: state.username || 'Jogador Anônimo',
        };
        
        quizHistory.push(quizResult);
        localStorage.setItem('bibleQuiz_history', JSON.stringify(quizHistory));
      }
    };

    saveQuizToHistory();
  }, [state.status]);

  const setDifficulty = (difficulty: Difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  };

  const answerQuestion = (selectedOption: number) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const timeSpent = Date.now() - (state.gameStartTime || 0);
    
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        questionId: currentQuestion.id,
        selectedOption,
        isCorrect,
        timeSpent,
      },
    });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const resetQuiz = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  const completeQuiz = () => {
    dispatch({ type: 'COMPLETE_QUIZ' });
  };

  const setUsername = (username: string) => {
    dispatch({ type: 'SET_USERNAME', payload: username });
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        setDifficulty,
        answerQuestion,
        nextQuestion,
        resetQuiz,
        completeQuiz,
        setUsername,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
