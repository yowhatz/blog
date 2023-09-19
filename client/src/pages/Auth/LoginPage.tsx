import { useState, ChangeEvent, FormEvent } from "react";
import { useAppDispatch } from "src/redux/store";
import { login } from "src/redux/actions/authAction";
import { useSelector } from "react-redux";

import cls from "./auth.module.scss";

import { Button, Card, Form, Input, Text } from "src/components";

import { AuthStateUserData } from "src/utils/typescript";
import { validAuthData } from "src/utils/valid";
import { getAuthData } from "src/redux/selectors/getAuthData";
import { getAuthError } from "src/redux/selectors/getAuthError";

const LoginPage = () => {
  const [userData, setUserData] = useState<AuthStateUserData>({
    username: "",
    password: "",
    cf_password: "",
  });
  const [errors, setErrors] = useState<AuthStateUserData>({
    username: "",
    password: "",
    cf_password: "",
  });

  const dispatch = useAppDispatch();
  const authError = useSelector(getAuthError);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: any = validAuthData(userData);

    if (errors.status !== 200) {
      return setErrors(errors);
    }

    delete userData.cf_password;

    dispatch(login(userData));
  };

  return (
    <div className={cls.auth}>
      <Card className={cls.auth_card}>
        <Text as="h1">Вход</Text>
        {authError ? (
          <Text as={"span"} color={"red"} fs={12} fw={400}>
            {authError}
          </Text>
        ) : (
          ""
        )}
        <Form onSubmit={onSubmit} className={cls.auth_form}>
          <Input
            placeholder="Имя пользователя"
            name="username"
            onChange={handleChange}
            value={userData.username}
            error={errors.username}
          />
          <Input
            type="password"
            placeholder="Пароль"
            name="password"
            onChange={handleChange}
            value={userData.password}
            error={errors.password}
          />
          <Button type="submit">Вход</Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
