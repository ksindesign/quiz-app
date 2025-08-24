import './App.css';
import { useQuizData } from './hooks/useQuizData';
import Quiz from './components/Quiz';

function App() {
  const { quizData, loading, error } = useQuizData();

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div>Error loading quiz: {error}</div>;
  }

  return (
    <div className='app-container'>
      <h1>{quizData?.quizTitle}</h1>
      <Quiz />
    </div>
  );
}

export default App;
