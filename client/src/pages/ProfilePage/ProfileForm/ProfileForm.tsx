import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { User } from "src/redux/types/authTypes";
import cls from "./ProfileForm.module.scss";
import { Avatar, Button, Form, Input, Text, Card } from "src/components";
import { UpdateProfileStateData } from "src/utils/typescript";
import { useAppDispatch } from "src/redux/store";
import { updateProfile } from "src/redux/actions/authAction";

interface ProfileFormProps {
  user: User | null;
}

const ProfileForm: FC<ProfileFormProps> = ({ user }) => {
  const [avatar, setAvatar] = useState<any>();
  const [userData, setUserData] = useState<UpdateProfileStateData>({
    username: "",
    email: "",
    website: "",
    story: "",
  });

  const dispatch = useAppDispatch();

  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setAvatar(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(updateProfile(userData, avatar, user));
  };

  const clearAvatar = () => {
    setAvatar("");
  };

  return (
    <Card padding={15}>
      <Text as={"h2"} fs={24}>
        Изменить профиль
      </Text>

      <Form onSubmit={onSubmit} className={cls.form}>
        <label htmlFor="file" className={cls.label}>
          <Avatar
            avatar={avatar ? URL.createObjectURL(avatar) : user?.avatar || ""}
            username={user?.username || ""}
            size={"big"}
          />
          <input type="file" id={"file"} onChange={handleAvatarChange} />
          <button type="button" className={cls.clear} onClick={clearAvatar}>
            &times;
          </button>
        </label>
        <Input
          placeholder={"Имя пользователя"}
          name={"username"}
          onChange={handleChange}
          value={userData.username}
        />
        <Input
          placeholder={"Почта"}
          name={"email"}
          onChange={handleChange}
          value={userData.email}
        />
        <Input
          placeholder={"Сайт"}
          name={"website"}
          onChange={handleChange}
          value={userData.website}
        />
        <Input
          placeholder={"Описание"}
          textarea
          name={"story"}
          value={userData.story}
          onChange={handleChange}
        />

        <Button type={"submit"} max>
          Сохранить
        </Button>
      </Form>
    </Card>
  );
};

export default ProfileForm;
