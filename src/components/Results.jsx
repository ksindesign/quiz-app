const Results = ({ userAnswers, questionBank, restartQuiz }) => {
  function getScore() {
    let finalScore = 0;

    userAnswers.forEach((answer, index) => {
      const question = questionBank[index];
      // Find the key (a, b, c, d) that corresponds to the user's answer
      const correctAnswerKey = question.answer;
      const correctAnswer = question.options[correctAnswerKey];

      if (answer === correctAnswer) {
        finalScore++;
      }
    });

    return finalScore;
  }

  const score = getScore();

  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>
        Your Score: {score}/{questionBank.length}
      </p>
      <button className='restart-button' onClick={restartQuiz}>
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
