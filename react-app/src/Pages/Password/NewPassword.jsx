import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Contexts/AuthContext";

import Loader from "../../Components/BackdropLoader/Loader";

import "./new-password.css";

function NewPassword() {
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [error, setError] = useState();
  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();
  const { loading, newPasswordHandler } = useAuth();

  const onNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const onConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const passwordUpdateFormSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return setError("Passwords do not match!");
    }
    newPasswordHandler(newPassword)
      .then(() => {
        console.log("Success");
        navigate("/companies");
      })
      .catch(() => {
        console.log("Failed!");
        setError("There was some problem setting the new password.");
      });
  };

  const onCancelClicked = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const determineDisable = () => {
    if (newPassword && confirmNewPassword) {
      setDisable(false);
      return;
    }
    setDisable(true);
  };

  useEffect(() => {
    determineDisable();
  }, [newPassword, confirmNewPassword]);

  return (
    <div className="login-page-container">
      {loading && <Loader open={loading} />}
      <div className="form-container">
        <h1 className="sign-in-heading">Reset your Password</h1>
        {error && (
          <div className="error-container">
            <h5 className="error-heading">{error}</h5>
          </div>
        )}
        <form className="input-form">
          <div className="form-input-wrapper">
            <label>New Password</label>
            <input
              className="login-form-input"
              type="password"
              value={newPassword}
              onChange={onNewPasswordChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="form-input-wrapper">
            <label>Confirm New Password</label>
            <input
              className="login-form-input"
              type="password"
              value={confirmNewPassword}
              onChange={onConfirmNewPasswordChange}
              required
            />
          </div>
          <div className="reset-password__button-container">
            <button
              className="login-button"
              onClick={passwordUpdateFormSubmit}
              disabled={disable}
            >
              Update
            </button>
            <button className="login-button" onClick={onCancelClicked}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
