import { useState, useEffect } from 'react';
import { useQuizData } from '../hooks/useQuizData';
import Results from './Results';

const Quiz = () => {
  const { quizData, loading, error } = useQuizData();
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Initialize user answers when quiz data is loaded
  useEffect(() => {
    if (quizData?.questions) {
      setUserAnswers(new Array(quizData.questions.length).fill(null));
    }
  }, [quizData]);

  const questionBank = quizData?.questions || [];

  const selectedAnswer = userAnswers[currentQuestion]; // null, option

  function handleSelectOption(option) {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = option;
    setUserAnswers(newUserAnswers);
  }

  function goToPrev() {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  }

  function goToNext() {
    if (currentQuestion === questionBank.length - 1) {
      setIsQuizFinished(true);
    } else {
      // On last question, advancing will trigger the result view
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function restartQuiz() {
    setUserAnswers(new Array(questionBank.length).fill(null));
    setCurrentQuestion(0);
    setIsQuizFinished(false);
  }

  // Show loading state while fetching questions
  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>Error loading questions: {error}</div>;
  }

  if (isQuizFinished) {
    return (
      <Results
        userAnswers={userAnswers}
        questionBank={questionBank}
        restartQuiz={restartQuiz}
      />
    );
  }

  // Get current question data
  const currentQuestionData = questionBank[currentQuestion];
  const optionsArray = Object.values(currentQuestionData.options);

  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <p className='question'>{currentQuestionData.question}</p>
      {optionsArray.map((option) => (
        <button
          key={option}
          className={'option' + (selectedAnswer === option ? ' selected' : '')}
          onClick={() => {
            handleSelectOption(option);
          }}
        >
          {option}
        </button>
      ))}

      <div className='nav-buttons'>
        <button onClick={goToPrev} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={goToNext}>
          {currentQuestion === questionBank.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
