import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import clsx from 'clsx';

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-based)
}

interface QuizProps {
  title?: string;
  questions: Question[];
}

export default function Quiz({ title = "Knowledge Check", questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerState, setAnswerState] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const handleOptionSelect = (index: number) => {
    if (answerState !== 'idle') return; // Prevent changing after submission

    setSelectedOption(index);
    const isCorrect = index === questions[currentQuestion].correctAnswer;
    setAnswerState(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setScore(score + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#3b82f6', '#10b981']
      });
    }
  };

  const handleNext = () => {
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
      setSelectedOption(null);
      setAnswerState('idle');
    } else {
      setShowResult(true);
      const percentage = ((score) / questions.length) * 100; // score is updated in handleOptionSelect
      if (percentage >= 70) {
        triggerBigConfetti();
      }
    }
  };

  const triggerBigConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#8b5cf6', '#10b981']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#8b5cf6', '#10b981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswerState('idle');
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    let colorClass = "";

    if (percentage >= 90) {
      message = "Outstanding! You're a Physical AI Master! 🏆";
      colorClass = "text-emerald-500";
    } else if (percentage >= 70) {
      message = "Great job! You have a solid understanding. 👏";
      colorClass = "text-blue-500";
    } else {
      message = "Keep learning! Review the material and try again. 📚";
      colorClass = "text-orange-500";
    }

    return (
      <div className="glass-panel rounded-2xl p-8 text-center animate-fade-in my-8">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <div className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          {percentage}%
        </div>
        <p className={`text-xl font-medium mb-8 ${colorClass}`}>{message}</p>
        <p className="text-gray-500 mb-8">
          You scored {score} out of {questions.length} correct.
        </p>
        <button
          onClick={resetQuiz}
          className="button button--primary button--lg rounded-full px-8"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 my-8 shadow-2xl border border-white/20 dark:border-gray-700 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold m-0 text-primary">{title}</h3>
        <div className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          Question {currentQuestion + 1} / {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h4 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed">
        {question.question}
      </h4>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => {
          let btnClass = "border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/20";
          
          if (answerState !== 'idle') {
            if (index === question.correctAnswer) {
              btnClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400";
            } else if (index === selectedOption) {
              btnClass = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
            } else {
              btnClass = "opacity-50 cursor-not-allowed border-gray-200";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              disabled={answerState !== 'idle'}
              className={clsx(
                "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center group",
                btnClass
              )}
            >
              <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-bold transition-colors",
                 answerState === 'idle' 
                   ? "bg-gray-100 dark:bg-gray-800 text-gray-500 group-hover:bg-primary group-hover:text-white"
                   : index === question.correctAnswer
                     ? "bg-emerald-500 text-white"
                     : index === selectedOption
                       ? "bg-red-500 text-white"
                       : "bg-gray-100 text-gray-400"
              )}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="font-medium text-lg">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {answerState !== 'idle' && (
        <div className="flex justify-end animate-fade-in">
          <button
            onClick={handleNext}
            className="button button--primary button--lg rounded-full px-8 flex items-center"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            <span className="ml-2">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
