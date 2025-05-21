
import React from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Share2, ArrowLeft, BookOpen, Trophy, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const QuizResult: React.FC = () => {
  const { state, resetQuiz } = useQuiz();
  
  if (!state.gameEndTime || !state.gameStartTime) {
    return null;
  }

  const totalQuestions = state.questions.length;
  const correctAnswers = state.answers.filter(a => a.isCorrect).length;
  const percentageCorrect = (correctAnswers / totalQuestions) * 100;
  const totalTimeMs = state.gameEndTime - state.gameStartTime;
  const totalTimeSeconds = Math.floor(totalTimeMs / 1000);
  
  const minutes = Math.floor(totalTimeSeconds / 60);
  const seconds = totalTimeSeconds % 60;
  
  let achievement = '';
  
  if (percentageCorrect >= 90) {
    achievement = 'Mestre Bíblico';
  } else if (percentageCorrect >= 70) {
    achievement = 'Estudante Avançado';
  } else if (percentageCorrect >= 50) {
    achievement = 'Conhecedor da Palavra';
  } else {
    achievement = 'Aprendiz da Bíblia';
  }

  const handleShareResult = (platform: 'whatsapp' | 'facebook') => {
    const text = `📖 Desafio Bíblico: Consegui ${correctAnswers}/${totalQuestions} (${percentageCorrect.toFixed(0)}%) no nível ${state.difficulty?.toUpperCase()} em ${minutes}min e ${seconds}s! Tente você também!`;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const getDifficultyColor = () => {
    switch (state.difficulty) {
      case 'easy':
        return 'bg-bible-600 hover:bg-bible-700';
      case 'medium':
        return 'bg-bible-700 hover:bg-bible-800';
      case 'hard':
        return 'bg-bible-800 hover:bg-bible-900';
      default:
        return 'bg-primary hover:bg-primary/90';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <Card className="overflow-hidden border-2 border-primary/20">
        <CardHeader className="bg-primary/10 text-center">
          <div className="mx-auto mb-2">
            {percentageCorrect >= 70 ? (
              <Trophy className="h-16 w-16 text-gold-500" />
            ) : (
              <BookOpen className="h-16 w-16 text-primary" />
            )}
          </div>
          <CardTitle className="text-3xl">Resultados do Quiz</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <Badge variant="outline" className="text-lg py-1 px-3">
              {state.difficulty?.charAt(0).toUpperCase() + state.difficulty?.slice(1)}
            </Badge>
            <h2 className="text-2xl font-bold mt-2">{state.username}</h2>
            <div className="text-sm text-muted-foreground">
              {new Date(state.gameEndTime).toLocaleDateString()}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-accent/50 p-4 rounded-lg text-center">
              <Award className="h-8 w-8 mx-auto mb-2" />
              <div className="text-xl font-bold">{correctAnswers}/{totalQuestions}</div>
              <div className="text-sm">Respostas Corretas</div>
            </div>
            
            <div className="bg-accent/50 p-4 rounded-lg text-center">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <div className="text-xl font-bold">{minutes}min {seconds}s</div>
              <div className="text-sm">Tempo Total</div>
            </div>
            
            <div className="bg-accent/50 p-4 rounded-lg text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2" />
              <div className="text-xl font-bold">{achievement}</div>
              <div className="text-sm">Classificação</div>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Análise de Desempenho</h3>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${percentageCorrect}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>0%</span>
              <span>{percentageCorrect.toFixed(0)}%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 bg-muted/50">
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button 
              onClick={() => handleShareResult('whatsapp')}
              className="bg-emerald-600 hover:bg-emerald-700"
              variant="secondary"
            >
              <Share2 className="mr-2 h-4 w-4" /> Compartilhar (WhatsApp)
            </Button>
            <Button 
              onClick={() => handleShareResult('facebook')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              variant="secondary"
            >
              <Share2 className="mr-2 h-4 w-4" /> Compartilhar (Facebook)
            </Button>
          </div>
          
          <Button 
            onClick={resetQuiz} 
            className={`w-full ${getDifficultyColor()}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Jogar Novamente
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizResult;
