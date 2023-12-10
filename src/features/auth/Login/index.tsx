import React from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { loginTC } from "features/auth/auth.reducer";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";

import { selectIsLoggedIn } from "features/auth/auth.selectors";

export const Login = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const formik = useFormik({
    validate: (values) => {
      if (!values.email) {
        return {
          email: "Email is required",
        };
      }
      if (!values.password) {
        return {
          password: "Password is required",
        };
      }
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
      dispatch(loginTC(values));
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
              To log in get registered{' '}
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
                className={`text-field ${formik.errors.email ? 'error' : ''}`}
                placeholder="Email"
                {...formik.getFieldProps('email')}
            />
            {formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
            <input
                type="password"
                className={`text-field ${formik.errors.password ? 'error' : ''}`}
                placeholder="Password"
                {...formik.getFieldProps('password')}
            />
            {formik.errors.password && <div className="error-message">{formik.errors.password}</div>}
            <label className="form-control-label">
              <input
                  type="checkbox"
                  className="checkbox"
                  {...formik.getFieldProps('rememberMe')}
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
