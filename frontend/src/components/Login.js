import React, { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    e.target.name === "Email" ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({ email, password });
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            name="Email"
            type="email"
            className="auth__input"
            id="email"
            placeholder="Email"
            minLength="6"
            maxLength="40"
            required
            value={email || ""}
            onChange={handleChange}
          />
          <input
            name="Password"
            type="password"
            className="auth__input"
            id="password"
            placeholder="Пароль"
            minLength="6"
            maxLength="40"
            required
            value={password || ""}
            onChange={handleChange}
          />
        </fieldset>
        <button className="auth__submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
