import { useState, useEffect } from "react";

import Input from "../Input";

const LoginForm = ({ onSubmit, isOpenModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleResetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit && onSubmit({ email, password });
    handleResetForm();
  };

  useEffect(() => {
    handleResetForm();
  }, [isOpenModal]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          label="Email"
          value={email}
          type="text"
          name="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div>
        <Input
          label="Password"
          value={password}
          type="password"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
