import { useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { HomePage } from '@/sections/HomePage';
import { QuizInterface } from '@/sections/QuizInterface';
import { QuizResults } from '@/sections/QuizResults';
import { AppBuilderPage } from '@/sections/AppBuilderPage';
import { AiChatBar } from '@/components/AiChatBar';
import { Toaster } from '@/components/ui/sonner';

type AppView = 'home' | 'quiz' | 'results' | 'app-builder';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  
  const { 
    state, 
    startQuiz, 
    selectAnswer, 
    nextQuestion, 
    previousQuestion,
    completeQuiz,
    resetQuiz,
    formatTime 
  } = useQuiz();

  const handleStartQuiz = (categoryId: string, timeLimit: number) => {
    startQuiz(categoryId, timeLimit);
    setCurrentView('quiz');
  };

  const handleCompleteQuiz = () => {
    completeQuiz();
    setCurrentView('results');
  };

  const handleExitQuiz = () => {
    resetQuiz();
    setCurrentView('home');
  };

  const handleGoHome = () => {
    resetQuiz();
    setCurrentView('home');
  };

  const handleGoToAppBuilder = () => {
    setCurrentView('app-builder');
  };

  // Render based on current view
  const renderContent = () => {
    switch (currentView) {
      case 'app-builder':
        return (
          <AppBuilderPage 
            onGoBack={handleGoHome}
          />
        );
      
      case 'results':
        return (
          <QuizResults
            quizState={state}
            onRestartQuiz={() => {
              resetQuiz();
              setCurrentView('home');
            }}
            onGoHome={handleGoHome}
            formatTime={formatTime}
          />
        );

      case 'quiz':
        return (
          <QuizInterface
            quizState={state}
            onSelectAnswer={selectAnswer}
            onNextQuestion={nextQuestion}
            onPreviousQuestion={previousQuestion}
            onCompleteQuiz={handleCompleteQuiz}
            onExitQuiz={handleExitQuiz}
            formatTime={formatTime}
          />
        );

      case 'home':
      default:
        return (
          <HomePage 
            onStartQuiz={handleStartQuiz}
            onGoToAppBuilder={handleGoToAppBuilder}
          />
        );
    }
  };

  return (
    <>
      {/* AI Chat Bar - Always visible */}
      <AiChatBar />
      
      {/* Main Content with top padding for AI bar */}
      <div className="pt-14">
        {renderContent()}
      </div>
      
      <Toaster position="top-center" />
    </>
  );
}

export default App;
