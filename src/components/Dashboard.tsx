import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart, Clock, Star } from 'lucide-react';
import { useQuiz } from '@/contexts/QuizContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart as Chart } from '@/components/ui/chart/index';

interface QuizHistoryItem {
  id: string;
  date: string;
  difficulty: string;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentMs: number;
  username: string;
}

const Dashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { state } = useQuiz();
  const [quizHistory, setQuizHistory] = React.useState<QuizHistoryItem[]>([]);
  
  React.useEffect(() => {
    const history = JSON.parse(localStorage.getItem('bibleQuiz_history') || '[]');
    setQuizHistory(history);
  }, []);
  
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}min ${seconds}s`;
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-bible-100 text-bible-800';
      case 'medium':
        return 'bg-bible-200 text-bible-800';
      case 'hard':
        return 'bg-bible-300 text-bible-800';
      default:
        return 'bg-muted text-foreground';
    }
  };

  // Statistics
  const totalGames = quizHistory.length;
  const averageScore = totalGames > 0 
    ? quizHistory.reduce((acc, item) => acc + (item.correctAnswers / item.totalQuestions) * 100, 0) / totalGames
    : 0;
  const averageTime = totalGames > 0
    ? quizHistory.reduce((acc, item) => acc + item.timeSpentMs, 0) / totalGames
    : 0;

  // Chart data
  const gamesByDifficulty = {
    easy: quizHistory.filter(item => item.difficulty === 'easy').length,
    medium: quizHistory.filter(item => item.difficulty === 'medium').length,
    hard: quizHistory.filter(item => item.difficulty === 'hard').length,
  };

  const chartData = [
    {
      name: 'Fácil',
      Jogos: gamesByDifficulty.easy,
    },
    {
      name: 'Médio',
      Jogos: gamesByDifficulty.medium,
    },
    {
      name: 'Difícil',
      Jogos: gamesByDifficulty.hard,
    },
  ];

  // Progress over time
  const lastGames = [...quizHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  const progressData = lastGames.reverse().map(item => ({
    name: new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    Pontuação: Math.round((item.correctAnswers / item.totalQuestions) * 100),
  }));

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard de Desempenho</h1>
        <Button variant="outline" onClick={onClose}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </div>

      <Tabs defaultValue="stats">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
          <TabsTrigger value="games">Jogos Recentes</TabsTrigger>
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                  Total de Jogos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalGames}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                  Pontuação Média
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  Tempo Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatTime(averageTime)}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Jogos por Nível</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Fácil:</span>
                    <span className="font-bold">{gamesByDifficulty.easy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Médio:</span>
                    <span className="font-bold">{gamesByDifficulty.medium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difícil:</span>
                    <span className="font-bold">{gamesByDifficulty.hard}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Melhores Pontuações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...quizHistory]
                    .sort((a, b) => (b.correctAnswers / b.totalQuestions) - (a.correctAnswers / a.totalQuestions))
                    .slice(0, 3)
                    .map((item, index) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="font-bold mr-2">{index + 1}.</span>
                          <span>{item.username} - </span>
                          <span className={`text-xs px-2 py-0.5 rounded ml-1 ${getDifficultyColor(item.difficulty)}`}>
                            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                          </span>
                        </div>
                        <span className="font-bold">
                          {Math.round((item.correctAnswers / item.totalQuestions) * 100)}%
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="games">
          <div className="space-y-4">
            {quizHistory.length === 0 ? (
              <p className="text-center py-12 text-muted-foreground">
                Nenhum histórico de jogos encontrado. Complete um quiz para ver seu histórico aqui.
              </p>
            ) : (
              [...quizHistory]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((item) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap justify-between items-center gap-4">
                        <div>
                          <div className="font-bold">{item.username}</div>
                          <div className="text-sm text-muted-foreground">
                            {getFormattedDate(item.date)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded ${getDifficultyColor(item.difficulty)}`}>
                            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                          </span>
                          <div className="text-sm">
                            {item.correctAnswers}/{item.totalQuestions} acertos ({Math.round((item.correctAnswers / item.totalQuestions) * 100)}%)
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Tempo: {formatTime(item.timeSpentMs)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="charts">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Jogos por Dificuldade</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {quizHistory.length > 0 ? (
                  <Chart
                    data={chartData}
                    xAxisKey="name"
                    categories={["Jogos"]}
                    colors={["#6366F1"]}
                    yAxisWidth={30}
                    showAnimation
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Sem dados para exibir
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Progresso Recente</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                {progressData.length > 0 ? (
                  <Chart
                    data={progressData}
                    xAxisKey="name"
                    categories={["Pontuação"]}
                    colors={["#F59E0B"]}
                    yAxisWidth={40}
                    showAnimation
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Sem dados para exibir
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
