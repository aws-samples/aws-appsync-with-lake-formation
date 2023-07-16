import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

import Loader from "../../Components/BackdropLoader/Loader";

import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const loginFormSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    login(email, password)
      .then((isNewPasswordRequired) => {
        if (!isNewPasswordRequired) {
          navigate("/companies");
        } else {
          // navigate to new password required page!
          navigate("/reset-password");
        }
      })
      .catch((err) => {
        setError("Invalid username or password.");
        console.log(err);
      });
  };

  return (
    <div className="login-page-container">
      {loading && <Loader open={loading} />}
      <div className="form-container">
        <h1 className="sign-in-heading">Sign In</h1>
        {error && (
          <div className="error-container">
            <h5 className="error-heading">{error}</h5>
          </div>
        )}
        {searchParams.get("requireLogin") && (
          <div className="error-container">
            <h5 className="error-heading">Please Login first.</h5>
          </div>
        )}
        <form className="input-form">
          <div className="form-input-wrapper">
            <label>Username</label>
            <input
              className="login-form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <div className="form-input-wrapper">
            <label>Password</label>
            <input
              className="login-form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-button" onClick={loginFormSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
