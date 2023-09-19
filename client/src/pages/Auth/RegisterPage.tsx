import { useState, ChangeEvent, FormEvent } from "react";

import cls from "./auth.module.scss";

import { Button, Card, Form, Input, Text } from "src/components";

import { AuthStateUserData } from "src/utils/typescript";
import { validAuthData } from "src/utils/valid";
import axios from "axios";
import { useSelector } from "react-redux";
import { getAuthError } from "src/redux/selectors/getAuthError";
import { useAppDispatch } from "src/redux/store";
import { register } from "src/redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
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
  const navigate = useNavigate();

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

    dispatch(register(userData, navigate));
  };

  return (
    <div className={cls.auth}>
      <Card className={cls.auth_card}>
        <Text as="h1">Регистрация</Text>

        {authError ? (
          <Text as={"span"} color={"red"} fs={12} fw={400}>
            {authError}
          </Text>
        ) : (
          ""
        )}

        <Form className={cls.auth_form} onSubmit={onSubmit}>
          <Input
            placeholder="Имя пользователя"
            name="username"
            onChange={handleChange}
            value={userData.username}
            error={errors.username}
          />

          <Input
            placeholder="Пароль"
            type="password"
            name="password"
            onChange={handleChange}
            value={userData.password}
            error={errors.password}
          />

          <Input
            placeholder="Подтвердите пароль"
            type="password"
            name="cf_password"
            onChange={handleChange}
            value={userData.cf_password}
            error={errors.cf_password ? errors.cf_password : ""}
          />

          <Button max type="submit">
            Регистрация
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
