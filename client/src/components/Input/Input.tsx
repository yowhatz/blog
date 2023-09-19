import { FC, InputHTMLAttributes, useState } from "react";

import cls from "./Input.module.scss";
import Text from "../Text/Text";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  error?: string;
  textarea?: boolean;
}

const Input: FC<InputProps> = ({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  error = "",
  textarea,
}) => {
  const [show, setShow] = useState(false);

  const onShow = () => {
    setShow(!show);
  };

  return (
    <div className={cls.field}>
      {textarea ? (
        <textarea
          className={cls.input}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
          cols={30}
          rows={10}
        ></textarea>
      ) : (
        <input
          className={cls.input}
          type={type === "password" && show ? "text" : type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}

      {type === "password" && (
        <button type="button" className={cls.show_btn} onClick={onShow}>
          {show ? "Скрыть" : "Показать"}
        </button>
      )}

      {error ? (
        <Text as="span" color="red" fs={12} fw={400} className={cls.error}>
          {error}
        </Text>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
