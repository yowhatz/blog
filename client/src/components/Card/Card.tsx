import { FC, ReactNode } from "react";

import cls from "./Card.module.scss";

type PaddingTypes = 15 | 20 | 30;

interface CardProps {
  children: ReactNode;
  padding?: PaddingTypes;
  className?: string;
}

const Card: FC<CardProps> = ({ children, padding = 30, className = "" }) => {
  const paddingClasses: Record<PaddingTypes, string> = {
    15: cls.padding_15,
    20: cls.padding_20,
    30: cls.padding_30,
  };

  return (
    <div className={`${cls.card} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
