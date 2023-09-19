import React, { FC } from "react";

import cls from "./ProfileData.module.scss";
import { User } from "src/redux/types/authTypes";
import Card from "../../../components/Card/Card";
import { Text } from "src/components";

interface ProfileDataProps {
  user: User | null;
}

const ProfileData: FC<ProfileDataProps> = ({ user }) => {
  return (
    <Card padding={15}>
      <Text as={"h2"} fs={24}>
        Профиль
      </Text>

      <div className={cls.info}>
        <Text as={"p"} fs={16} fw={500}>
          Имя пользователя: {user?.username}
        </Text>

        <Text as={"p"} fs={16} fw={500}>
          Почта: {user?.email}
        </Text>

        <Text as={"p"} fs={16} fw={500}>
          Сайт: {user?.website}
        </Text>

        <Text as={"p"} fs={16} fw={500}>
          Описание: {user?.story}
        </Text>
      </div>
    </Card>
  );
};

export default ProfileData;
