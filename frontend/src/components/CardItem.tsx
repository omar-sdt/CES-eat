import React from 'react';
import { Button } from './ui/button';

interface CardItemProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}

const CardItem: React.FC<CardItemProps> = ({
  imageSrc,
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div className="flex items-center my-6 p-2 bg-white rounded-lg">
      {/* Image à gauche */}
      <img
        src={imageSrc}
        className="w-32 h-auto rounded-full mr-4"
        alt={title}
      />

      {/* Texte à droite */}
      <div className="flex flex-col justify-center items-start">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <Button onClick={onClick}>
          {buttonText}
        </Button>

      </div>
    </div>
  );
};

export default CardItem;