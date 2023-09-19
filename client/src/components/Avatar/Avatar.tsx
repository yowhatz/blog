import { FC, useState } from "react";

import cls from "./avatar.module.scss";

type AvatarSizesType = "small" | "big";

interface AvatarProps {
  avatar: string;
  username: string;
  size: AvatarSizesType;
}

const Avatar: FC<AvatarProps> = ({
  avatar = "",
  username = "",
  size = "small",
}) => {
  const sizeClasses: Record<AvatarSizesType, string> = {
    small: cls.small,
    big: cls.big,
  };

  return (
    <div className={`${cls.avatar} ${sizeClasses[size]}`}>
      {avatar ? (
        <img src={avatar} alt="avatar" />
      ) : (
        <div>{username.slice(0, 1)}</div>
      )}
    </div>
  );
};

export default Avatar;
