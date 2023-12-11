import React from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { loginTC } from "./auth-reducer";
import { Navigate } from "react-router-dom";
import "./Login.scss";

type ErrorType = {
  email?: string;
  password?: string;
};

export type LoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    validate: (values) => {
      const errors: ErrorType = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    onSubmit: (values) => {
      dispatch(loginTC(values));
      formik.resetForm();
    },
  });

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login-form">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-label">
          <p>
            To log in get registered{" "}
            <a href="https://social-network.samuraijs.com/" target="_blank">
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>Email: free@samuraijs.com</p>
          <p>Password: free</p>
        </div>
        <div className="form-group">
          <input
            type="text"
            className={`text-field ${formik.errors.email ? "error" : ""}`}
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
          <input
            type="password"
            className={`text-field ${formik.errors.password ? "error" : ""}`}
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password && <div className="error-message">{formik.errors.password}</div>}
          <label className="form-control-label">
            <input
              type="checkbox"
              className="checkbox"
              {...formik.getFieldProps("rememberMe")}
              checked={formik.values.rememberMe}
            />
            Remember me
          </label>
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
