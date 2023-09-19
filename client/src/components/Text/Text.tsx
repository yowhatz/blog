import { FC, JSX, ReactNode } from "react";

import cls from "./Text.module.scss";

type AsTypes = "h1" | "h2" | "span" | "p";
type FsType = 24 | 16 | 15 | 12;
type FwType = 700 | 500 | 400;
type ColorType = "red" | "gray" | "black";

interface TextProps {
  children: ReactNode;
  as?: AsTypes;
  fs?: FsType;
  fw?: FwType;
  color?: ColorType;
  className?: string;
}

const Text: FC<TextProps> = ({
  children,
  as = "p",
  fs = 24,
  fw = 700,
  color = "black",
  className = "",
}) => {
  const fsClasses: Record<FsType, string> = {
    24: cls.fs_24,
    16: cls.fs_16,
    15: cls.fs_15,
    12: cls.fs_12,
  };

  const fwClasses: Record<FwType, string> = {
    700: cls.fw_700,
    500: cls.fw_500,
    400: cls.fw_400,
  };

  const colorClasses: Record<ColorType, string> = {
    red: cls.red,
    gray: cls.gray,
    black: cls.black,
  };

  const getTag: Record<AsTypes, JSX.Element> = {
    h1: (
      <h1
        className={`${fsClasses[fs]} ${fwClasses[fw]} ${className} ${colorClasses[color]}`}
      >
        {children}
      </h1>
    ),
    h2: (
      <h2
        className={`${fsClasses[fs]} ${fwClasses[fw]} ${className} ${colorClasses[color]}`}
      >
        {children}
      </h2>
    ),
    span: (
      <span
        className={`${fsClasses[fs]} ${fwClasses[fw]} ${className} ${colorClasses[color]}`}
      >
        {children}
      </span>
    ),
    p: (
      <p
        className={`${fsClasses[fs]} ${fwClasses[fw]} ${className} ${colorClasses[color]}`}
      >
        {children}
      </p>
    ),
  };

  return getTag[as];
};

export default Text;
