// Alternative approach: Utility service functions
export const fetchQuizData = async () => {
  try {
    const response = await fetch('/src/questionBank.json');
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return { data: null, error: error.message };
  }
};

// You could also create specific functions for different data needs
export const fetchQuizTitle = async () => {
  const { data, error } = await fetchQuizData();
  return { title: data?.quizTitle, error };
};

export const fetchQuizQuestions = async () => {
  const { data, error } = await fetchQuizData();
  return { questions: data?.questions, error };
};
