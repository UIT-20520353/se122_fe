import React, { useState } from "react";
import bg from "../../../assets/images/loginBG.png";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/authApi";
import { setLocalStorage } from "../../../utils/localStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../../../consts/app";
import { Button, Form, Input } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { updateUserId } from "../../../redux/globalSlice";

interface InputFieldProps {
  email: string;
  password: string;
}

const initialInputField: InputFieldProps = {
  email: "",
  password: "",
};

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (value: InputFieldProps) => {
    setIsLoading(true);
    const { ok, body, error } = await authApi.login({
      email: value.email,
      password: value.password,
    });
    setIsLoading(false);

    if (ok && body) {
      setLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, body.accessToken);
      dispatch(updateUserId(body.id));
      navigate("/");
      return;
    }

    console.error(error);
  };

  return (
    <div className="login-page">
      <Form
        name="login"
        className="login-form"
        layout={"vertical"}
        size={"large"}
        form={form}
        onFinish={onSubmit}
        autoComplete={"off"}
        initialValues={initialInputField}
      >
        <h2>Welcome!</h2>
        <Form.Item label={"Email"} name={"email"} style={{ margin: 0 }}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name={"password"}
          style={{
            margin: 0,
          }}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType={"submit"}
            className="submit-button"
            style={{
              fontWeight: 600,
              color: "#ffffff",
              borderColor: "transparent",
            }}
            loading={isLoading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
      <img src={bg} alt="background" />
    </div>
  );
};

export default Login;
