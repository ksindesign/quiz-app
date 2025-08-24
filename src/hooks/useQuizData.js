import { useState, useEffect } from 'react';

export const useQuizData = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/src/questionBank.json');
        const data = await response.json();
        setQuizData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching quiz data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  return { quizData, loading, error };
};
