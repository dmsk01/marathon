import { useState, useEffect } from "react";

import Input from "../Input";

const LoginForm = ({ onSubmit, isOpenModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setSignIn] = useState(true);

  const handleResetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleChangeUrlToFetch = (event) => {
    event.preventDefault();
    setSignIn((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit && onSubmit({ email, password, isSignIn });
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button>{isSignIn ? "Signin" : "Signup"}</button>
        <button onClick={handleChangeUrlToFetch}>{isSignIn ? "Register" : "Login"}</button>
      </div>
    </form>
  );
};

export default LoginForm;
