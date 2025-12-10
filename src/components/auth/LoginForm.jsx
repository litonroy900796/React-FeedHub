import React from "react";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    console.log(data);
    navigate("/");
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
    </div>
  );
}

export default LoginForm;
