'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const LandingPage = () => {
  const [text, setText] = useState('');
  const fullText = "There is no shortage of interesting, kind, thoughtful, intricate people to meaningfully connect with.";

  useEffect(() => {
    let start = 0;
    const end = fullText.length;
    const interval = 30; // Increased interval for slower animation
    
    const timer = setInterval(() => {
      const nextEnd = start + Math.floor(Math.random() * 3) + 1; // Reveal 1-3 characters at a time
      setText(fullText.slice(0, nextEnd));
      start = nextEnd;

      if (start >= end) {
        clearInterval(timer);
        setText(fullText);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-4">
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 h-32">{text}</h1>
      </div>
      <Link href="/cards" className="bg-white text-purple-600 px-8 py-3 rounded-full text-xl font-semibold hover:bg-opacity-90 transition duration-300">
        Start
      </Link>
    </div>
  );
};

export default LandingPage;