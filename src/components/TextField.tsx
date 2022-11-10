import { Input, InputProps } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

interface TextFieldProps extends InputProps {
  label?: string;
}

const TextField = ({ label }: TextFieldProps) => {
  return (
    <>
      {label && <Title level={5}>{label}</Title>}
      <Input placeholder="Basic usage" />
    </>
  );
};

export default TextField;
