import { Input, InputProps } from "antd";

import style from "styles/TextField.module.css";

interface TextFieldProps extends InputProps {
  label?: string;
}

const TextField = ({ label, ...props }: TextFieldProps) => {
  return (
    <>
      {label && <div className={style.label}>{label}</div>}
      <Input className={style.input} {...props} />
    </>
  );
};

export default TextField;
