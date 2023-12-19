import React, { useEffect, useState } from "react";
import bg from "../../../assets/images/loginBG.png";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../../api/authApi";
import { setLocalStorage } from "../../../utils/localStorage";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../../../consts/app";
import { useAppDispatch } from "../../../app/hooks";
import { updateUserId } from "../../../redux/globalSlice";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SubmitButton } from "../../../components/commons";
import { useHandleResponseError } from "../../../hooks/useHandleResponseError";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { showErrorModal } from "../../../components/modals/CommonModals";

interface InputFieldProps {
  email: string;
  password: string;
}

const validationSchema = yup.object().shape({
  password: yup.string().required("Password is required!"),
  email: yup
    .string()
    .email("Please enter a correctly formatted email address")
    .required("Email is required!"),
});

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFieldProps>({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "" },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setIsShowPassword((prev) => !prev);
  };

  const onSubmit = async (value: InputFieldProps) => {
    console.log(value);

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

    handleResponseError(error);
  };

  useEffect(() => {
    showErrorModal({
      onOk: () => {},
      content: "dasd",
      title: "Error",
      className: "modal--error",
    });
  }, []);

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2 className="welcome">Welcome!</h2>
        <div className="title">
          <h2>Sign in to</h2>
          <span>Ielts Tinder ?</span>
        </div>
        <div className="primary-input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required!",
            })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div className="primary-input">
          <label htmlFor="password">Password</label>
          <input
            type={isShowPassword ? "text" : "password"}
            id="password"
            autoComplete="off"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required!",
            })}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          {isShowPassword ? (
            <FaEye
              onClick={handleShowPasswordClick}
              className="primary-input__icon"
            />
          ) : (
            <FaEyeSlash
              onClick={handleShowPasswordClick}
              className="primary-input__icon"
            />
          )}
        </div>
        <SubmitButton isLoading={isLoading} />
        <p className="login-form__footer">
          Don't have an Account ?{" "}
          <Link className="link" to={"/register"}>
            Register
          </Link>
        </p>
      </form>
      <img src={bg} alt="background" />
    </div>
  );
};

export default Login;
