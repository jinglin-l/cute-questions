'use client';

import React, { useState, useEffect } from 'react';
import { Shuffle, ArrowLeft, Info, Facebook, Instagram, Twitter, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Card } from '../../data/cards';
import { cards } from '../../data/cards';

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
  const [cardsViewed, setCardsViewed] = useState(0);
  const [seenCards, setSeenCards] = useState<Set<number>>(new Set());
  const [questionHistory, setQuestionHistory] = useState<number[]>([]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setShuffledCards([...cards].sort(() => Math.random() - 0.5));
  }, []);

  const totalQuestions = cards.length;
  const progress = (cardsViewed / totalQuestions) * 100;

  const goToNextRandomQuestion = () => {
    setCardsViewed(prev => Math.min(prev + 1, totalQuestions));
    setSeenCards(prev => new Set(prev).add(currentQuestionIndex));
    setQuestionHistory(prev => [...prev, currentQuestionIndex]);

    const unseenCards = shuffledCards.filter((_, index) => !seenCards.has(index));
    
    if (unseenCards.length === 0) {
      // All cards have been seen, reshuffle
      const newShuffledCards = [...cards].sort(() => Math.random() - 0.5);
      setShuffledCards(newShuffledCards);
      setSeenCards(new Set());
      setCurrentQuestionIndex(0);
    } else {
      const nextIndex = Math.floor(Math.random() * unseenCards.length);
      const nextCardIndex = shuffledCards.indexOf(unseenCards[nextIndex]);
      setCurrentQuestionIndex(nextCardIndex);
    }
  };

  const goToPreviousQuestion = () => {
    if (questionHistory.length > 0) {
      const prevIndex = questionHistory.pop();
      setQuestionHistory([...questionHistory]);
      setCurrentQuestionIndex(prevIndex!);
      setCardsViewed(prev => Math.max(prev - 1, 0));
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) return null;

  if (shuffledCards.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8f4e9] dark:bg-gray-900 flex flex-col items-center justify-between p-8 text-gray-700 dark:text-gray-200">
      {/* Top section */}
      <div className="w-full flex justify-between items-center">
        <Info className="text-gray-500 dark:text-gray-400" />
        <h1 className="text-2xl font-semibold">CUTE QUESTIONS</h1>
        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-80 h-112 flex flex-col justify-between" style={{ aspectRatio: '2.5 / 3.5' }}>
          <p className="text-2xl text-center flex-grow flex items-center justify-center">
            {shuffledCards[currentQuestionIndex].question}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-right">@cute_questions_</p>
        </div>
        <div className="flex space-x-4 mt-4">
          <button 
            onClick={goToPreviousQuestion}
            className="bg-gray-500 text-white px-4 py-2 rounded-full flex items-center"
            disabled={questionHistory.length === 0}
          >
            <ArrowLeft className="mr-2" />
            Last Question
          </button>
          <button 
            onClick={goToNextRandomQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
          >
            <Shuffle className="mr-2" />
            Next Question
          </button>
        </div>
      </div>

      {/* Bottom section */}
      <div className="w-full">
        <div className="text-center mb-4">
          <p className="text-gray-600 dark:text-gray-400">LEVEL 3 - 7 / 40</p>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          {cardsViewed} / {totalQuestions} questions
        </p>
        <div className="flex justify-center space-x-4">
          <span className="text-gray-500 dark:text-gray-400"><Info /></span>
          <span className="text-gray-500 dark:text-gray-400"><Facebook /></span>
          <span className="text-gray-500 dark:text-gray-400"><Instagram /></span>
          <span className="text-gray-500 dark:text-gray-400"><Twitter /></span>
        </div>
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">v1.0.0 © Cute Questions Game</p>
        </div>
      </div>
    </div>
  );
}