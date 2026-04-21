import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../apiComponents/api-signIn';
import { useAuth } from './auth-context';
import AuthFormUI from '../ui/AuthForm';

const Sign_In = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn(form.email, form.password);

    if (result.success) {
      await refreshAuth();
      navigate('/dashboard');
    } else {
      alert(result.message);
    }
  };

  return (
    <AuthFormUI
      title="Sign In"
      fields={[
        {
          label: "Email",
          name: "email",
          type: "email",
          value: form.email,
          placeholder: "Enter email"
        },
        {
          label: "Password",
          name: "password",
          type: "password",
          value: form.password,
          placeholder: "Enter password",
          minLength: 6
        }
      ]}
      showPassword={showPassword}
      showConfirmPassword={false}
      onTogglePassword={setShowPassword}
      onToggleConfirmPassword={() => {}}
      onChange={handleChange}
      onSubmit={handleSubmit}
      footerText="Don’t have an account?"
      footerAction={() => navigate('/sign-up')}
      footerLinkText="Create"
    />
  );
};

export default Sign_In;