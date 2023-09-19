import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthData } from "src/redux/selectors/getAuthData";

import cls from "./Header.module.scss";
import { useAppDispatch } from "src/redux/store";

import { Avatar, Button } from "src/components";
import { logout } from "src/redux/actions/authAction";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const authData = useSelector(getAuthData);

  const onOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={cls.header}>
      <div className="container">
        <div className={cls.header_wrapper}>
          <Link to="/" className={cls.header_logo}></Link>

          {authData ? (
            <div className={cls.header_data}>
              <Button to="/addArticle" family="inter">
                Добавить пост
              </Button>

              <div onClick={onOpen} className={cls.header_dropdown}>
                <Avatar
                  avatar={authData.avatar}
                  username={authData.username}
                  size={"small"}
                />

                {isOpen && (
                  <ul className={cls.menu}>
                    <li className={cls.menu_item}>
                      <Link to={"/profile"}>Профиль</Link>
                    </li>
                    <li onClick={handleLogout} className={cls.menu_item}>
                      Выход
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className={cls.header_right}>
              <Button to="/login" family="inter">
                Войти
              </Button>

              <Button to="/register" paint="outline" family="inter">
                Регистрация
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
