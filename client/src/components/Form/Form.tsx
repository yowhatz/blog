import { FC, FormHTMLAttributes, ReactNode } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  className?: string;
}

const Form: FC<FormProps> = ({ children, className, onSubmit }) => {
  return (
    <form noValidate className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
