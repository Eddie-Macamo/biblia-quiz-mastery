
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Quiz from '@/components/Quiz';
import Dashboard from '@/components/Dashboard';
import { ChartBar, BookOpen } from 'lucide-react';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-bible-50 to-blue-50 dark:from-bible-900 dark:to-slate-900">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-xl font-semibold">Desafio Bíblico</h1>
        </div>
        <Button
          variant="outline"
          className="flex items-center"
          onClick={() => setShowDashboard(!showDashboard)}
        >
          <ChartBar className="h-4 w-4 mr-2" />
          {showDashboard ? 'Voltar ao Quiz' : 'Dashboard'}
        </Button>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {showDashboard ? (
            <Dashboard onClose={() => setShowDashboard(false)} />
          ) : (
            <Quiz />
          )}
        </div>
      </main>

      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>© 2025 Desafio Bíblico - Teste seu conhecimento das escrituras</p>
      </footer>
    </div>
  );
};

export default Index;
