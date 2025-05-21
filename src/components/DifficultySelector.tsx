
import React from 'react';
import { Book, BookOpen, Cross } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuiz, Difficulty } from '@/contexts/QuizContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const DifficultySelector: React.FC = () => {
  const { setDifficulty, state, setUsername } = useQuiz();
  const [localUsername, setLocalUsername] = React.useState(state.username || '');
  
  const handleDifficultySelect = (difficulty: Difficulty) => {
    if (localUsername.trim()) {
      setUsername(localUsername);
      setDifficulty(difficulty);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          Desafio Bíblico
        </h1>
        <p className="text-xl text-muted-foreground">
          Teste seu conhecimento bíblico em diferentes níveis de dificuldade
        </p>
      </div>

      <div className="mb-6">
        <Label htmlFor="username" className="text-lg">Seu nome</Label>
        <Input 
          id="username"
          placeholder="Digite seu nome"
          value={localUsername}
          onChange={(e) => setLocalUsername(e.target.value)}
          className="mt-1 text-lg"
        />
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-bible-200 hover:border-bible-400">
          <CardHeader className="bg-bible-100/50">
            <Book className="h-8 w-8 mb-2 text-bible-600" />
            <CardTitle>Fácil</CardTitle>
            <CardDescription>
              Perguntas básicas sobre histórias bíblicas populares
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              Recomendado para iniciantes ou para quem está começando a conhecer a Bíblia.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleDifficultySelect('easy')}
              className="w-full bg-bible-600 hover:bg-bible-700"
              disabled={!localUsername.trim()}
            >
              Começar
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-bible-300 hover:border-bible-500">
          <CardHeader className="bg-bible-200/50">
            <BookOpen className="h-8 w-8 mb-2 text-bible-700" />
            <CardTitle>Médio</CardTitle>
            <CardDescription>
              Perguntas que exigem conhecimento mais amplo das escrituras
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              Para quem já conhece bem as histórias principais e tem familiaridade com a Bíblia.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleDifficultySelect('medium')}
              className="w-full bg-bible-700 hover:bg-bible-800"
              disabled={!localUsername.trim()}
            >
              Começar
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-bible-400 hover:border-bible-600">
          <CardHeader className="bg-bible-300/50">
            <Cross className="h-8 w-8 mb-2 text-bible-800" />
            <CardTitle>Avançado</CardTitle>
            <CardDescription>
              Perguntas desafiadoras para verdadeiros conhecedores
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              Para estudiosos da Bíblia e aqueles que buscam testar conhecimentos profundos.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => handleDifficultySelect('hard')}
              className="w-full bg-bible-800 hover:bg-bible-900"
              disabled={!localUsername.trim()}
            >
              Começar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DifficultySelector;
