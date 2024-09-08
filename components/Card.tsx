import React from 'react';
import { Card as CardType } from '../data/cards';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
      <p className="text-lg font-semibold">{card.question}</p>
    </div>
  );
};

export default Card;