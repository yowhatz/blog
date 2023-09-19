import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Link } from "react-router-dom";

import cls from "./Button.module.scss";

type PaintType = "outline" | "default";
type FamilyType = "ubuntu" | "inter";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  to?: string;
  paint?: PaintType;
  family?: FamilyType;
  max?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  to,
  paint = "default",
  family = "ubuntu",
  max,
}) => {
  const paintClasses: Record<PaintType, string> = {
    outline: cls.outline,
    default: cls.btn,
  };

  const familyClasses: Record<FamilyType, string> = {
    ubuntu: cls.ubuntu,
    inter: cls.inter,
  };

  return (
    <>
      {to ? (
        <Link
          className={`${cls.btn} ${paintClasses[paint]} ${
            familyClasses[family]
          } ${max ? cls.max : ""}`}
          to={to}
        >
          {children}
        </Link>
      ) : (
        <button
          className={`${cls.btn} ${paintClasses[paint]} ${max ? cls.max : ""}`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
