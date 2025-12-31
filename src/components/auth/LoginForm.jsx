import React, { useContext } from "react";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (user) => {
    // api call and response set
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        user
      );
      if (response.status === 200) {
        const { user, token } = response.data;
        if (token) {
          const authToken = token?.token;
          const refreshToken = token?.refreshToken;

          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `User with email ${user.email} is not found`,
      });
      console.error(error.response?.data || error.message);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      >
        {/* Email */}
        <Field label="Email" error={errors.email}>
          <input
            {...register("email", { required: "Email is required" })}
            className="auth-input"
            name="email"
            type="email"
            id="email"
            label="Email"
          />
        </Field>

        {/* Password */}
        <Field label="Password" error={errors.password}>
          <input
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters",
              },
            })}
            className="auth-input"
            name="password"
            type="password"
            id="password"
          />
        </Field>

        {/* Submit */}
        <Field>
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Login
          </button>
        </Field>
      </form>
      <p className="py-2 text-red-500 text-base font-semibold">
        {errors?.root?.random?.message}
      </p>
    </div>
  );
}

export default LoginForm;
