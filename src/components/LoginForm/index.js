import { useState } from "react";

import Input from "../Input";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit && onSubmit({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          label="Email"
          value={email}
          type="text"
          name="email"
          placeholder="Enter email"
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
          placeholder="Enter password"
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
