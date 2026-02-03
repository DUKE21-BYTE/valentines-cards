import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import BackButton from '../components/BackButton';
import { useValentine } from '../context/ValentineContext';
import '../styles/Quiz.css';
import confetti from 'canvas-confetti';

export default function Quiz() {
  const { data } = useValentine();
  const questions = data.questions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // ... existing logic ...

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff8fa3', '#fff0f3']
      });
    }

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 2000); 
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      <div style={{ alignSelf: 'flex-start' }}>
        <BackButton />
      </div>

      <div className="quiz-content">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="question-card"
            >
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="question-header">
                <span className="question-number">Question {currentQuestion + 1}/{questions.length}</span>
                <h2>{questions[currentQuestion].question}</h2>
              </div>

              {!showFeedback ? (
                <div className="options-grid">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="option-button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="feedback-section"
                >
                  <h3>
                    {selectedOption === questions[currentQuestion].correctAnswer 
                      ? "Correct! 🎉" 
                      : "Oops! 😅"}
                  </h3>
                  <p>{questions[currentQuestion].response}</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="result-card"
            >
              <Heart size={64} fill="#ff4d6d" className="result-icon" />
              <h2>Quiz Complete!</h2>
              <p className="score-text">You got {score} out of {questions.length} correct!</p>
              <p className="final-message">
                {score === questions.length 
                  ? "Wow! You know me perfectly! I love you! ❤️" 
                  : "Not bad! Did I change my mind about something? 😉"}
              </p>
              <div className="result-actions">
                <button onClick={restartQuiz} className="restart-btn">Try Again</button>
                <Link to="/letter" className="next-btn">Read My Letter →</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
