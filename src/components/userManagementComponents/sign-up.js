import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../apiComponents/api-signUp";
import AuthFormUI from '../ui/AuthForm';

const Sign_Up = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellphone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await registerUser(
        form.firstName,
        form.lastName,
        form.email,
        form.cellphone,
        form.password,
        form.confirmPassword
      );

      alert("Registration successful!");
      navigate('/sign-in');
    } catch (error) {
      console.error(error);
      alert("There was an issue with your sign-up.");
    }
  };

  return (
    <AuthFormUI
      title="Sign Up"
      fields={[
        { label: "First Name", name: "firstName", type: "text", value: form.firstName, placeholder: "Enter first name" },
        { label: "Last Name", name: "lastName", type: "text", value: form.lastName, placeholder: "Enter last name" },
        { label: "Email", name: "email", type: "email", value: form.email, placeholder: "Email" },
        { label: "Cellphone", name: "cellphone", type: "text", value: form.cellphone, placeholder: "Cellphone" },
        { label: "Password", name: "password", type: "password", value: form.password, placeholder: "Password", minLength: 6 },
        { label: "Confirm Password", name: "confirmPassword", type: "password", value: form.confirmPassword, placeholder: "Confirm password", minLength: 6 },
      ]}
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      onTogglePassword={setShowPassword}
      onToggleConfirmPassword={setShowConfirmPassword}
      onChange={handleChange}
      onSubmit={handleSubmit}
      footerText="Already have an account?"
      footerAction={() => navigate('/sign-in')}
      footerLinkText="Login"
    />
  );
};

export default Sign_Up;