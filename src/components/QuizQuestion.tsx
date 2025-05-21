
import React, { useState, useEffect } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const QuizQuestion: React.FC = () => {
  const { state, answerQuestion, nextQuestion } = useQuiz();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const totalQuestions = state.questions.length;
  const progress = ((state.currentQuestionIndex + 1) / totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  // Reset when question changes
  useEffect(() => {
    setSelectedOption(null);
    setAnswered(false);
    setStartTime(Date.now());
    setSecondsElapsed(0);
  }, [currentQuestion]);

  const handleOptionSelect = (index: number) => {
    if (answered) return;
    
    setSelectedOption(index);
    setAnswered(true);
    answerQuestion(index);
  };

  const handleNextQuestion = () => {
    nextQuestion();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getOptionClass = (index: number) => {
    if (!answered) return 'option-button';
    
    if (index === currentQuestion.correctAnswer) {
      return 'option-button correct';
    }
    
    if (index === selectedOption && selectedOption !== currentQuestion.correctAnswer) {
      return 'option-button wrong';
    }
    
    return 'option-button';
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 animate-slide-up">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">
          Pergunta {state.currentQuestionIndex + 1} de {totalQuestions}
        </div>
        <div className="text-sm font-medium">
          Tempo: {formatTime(secondsElapsed)}
        </div>
      </div>
      
      <Progress value={progress} className="mb-6" />
      
      <Card className="quiz-card">
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`w-full justify-start text-left h-auto py-4 px-6 text-base ${getOptionClass(index)}`}
              onClick={() => handleOptionSelect(index)}
              disabled={answered}
            >
              {answered && index === currentQuestion.correctAnswer && (
                <CheckCircle className="mr-2 h-5 w-5 text-emerald-500" />
              )}
              {answered && index === selectedOption && selectedOption !== currentQuestion.correctAnswer && (
                <XCircle className="mr-2 h-5 w-5 text-rose-500" />
              )}
              {option}
            </Button>
          ))}
        </CardContent>
        
        {answered && (
          <CardFooter className="flex flex-col">
            <div className="text-sm font-medium mb-4 w-full">
              {selectedOption === currentQuestion.correctAnswer ? (
                <div className="p-2 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" /> Correto! 
                  {currentQuestion.reference && (
                    <span className="ml-2 text-xs opacity-80">Referência: {currentQuestion.reference}</span>
                  )}
                </div>
              ) : (
                <div className="p-2 bg-rose-500/20 text-rose-700 dark:text-rose-300 rounded-md flex items-center">
                  <XCircle className="h-5 w-5 mr-2" /> Incorreto! A resposta correta é: {currentQuestion.options[currentQuestion.correctAnswer]}
                  {currentQuestion.reference && (
                    <span className="ml-2 text-xs opacity-80">Referência: {currentQuestion.reference}</span>
                  )}
                </div>
              )}
            </div>
            <Button 
              onClick={handleNextQuestion}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {state.currentQuestionIndex === totalQuestions - 1 ? 'Ver resultados' : 'Próxima pergunta'} 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
      
      <div className="mt-6 flex justify-between items-center text-sm">
        <div>
          <span className="font-medium">Acertos:</span> {state.answers.filter(a => a.isCorrect).length}
        </div>
        <div>
          <span className="font-medium">Erros:</span> {state.answers.filter(a => !a.isCorrect).length}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
