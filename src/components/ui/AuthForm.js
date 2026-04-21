import React from "react";
import { FaEye } from "react-icons/fa";
import ButtonUI from "./Button"; // 👈 your existing ButtonUI
import Input from "./Input";

const AuthFormUI = ({
  title,
  fields = [],
  showPassword,
  showConfirmPassword,
  onTogglePassword,
  onToggleConfirmPassword,
  onChange,
  onSubmit,
  footerText,
  footerAction,
  footerLinkText,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          {title}
        </h1>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">

          {Array.isArray(fields) &&
            fields.map((field, index) => (
              <div key={index} className="relative">

                <Input
                  label={field.label}
                  type={
                    field.type !== "password"
                      ? field.type
                      : field.name === "confirmPassword"
                        ? (showConfirmPassword ? "text" : "password")
                        : (showPassword ? "text" : "password")
                  }
                  name={field.name}
                  value={field.value}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  minLength={field.minLength}
                  required
                />

                {/* Password toggle */}
                {field.type === "password" && (
                  <FaEye
                    className="absolute right-3 top-9 text-gray-400 cursor-pointer"
                    onMouseDown={() =>
                      field.name === "confirmPassword"
                        ? onToggleConfirmPassword(true)
                        : onTogglePassword(true)
                    }
                    onMouseUp={() =>
                      field.name === "confirmPassword"
                        ? onToggleConfirmPassword(false)
                        : onTogglePassword(false)
                    }
                    onMouseLeave={() => {
                      onTogglePassword(false);
                      onToggleConfirmPassword(false);
                    }}
                  />
                )}

              </div>
            ))}

          {/* Submit (NOW USING YOUR BUTTONUI) */}
          <ButtonUI type="submit" className="w-full">
            {title}
          </ButtonUI>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {footerText}{" "}
          <span
            onClick={footerAction}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            {footerLinkText}
          </span>
        </p>

      </div>
    </div>
  );
};

export default AuthFormUI;