import { createContext, useContext, useState } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import cognitoUserPool from "../UserPool";
import { useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [sessionCognitoUser, setSessionCognitoUser] = useState();
  const [sessionUserAttributes, setSessionUserAttributes] = useState();
  const [user, setUser] = useState();
  const [loading, setIsLoading] = useState();
  const [loggedIn, setIsLoggedIn] = useState();

  const login = async (username, password) => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: cognitoUserPool,
      });
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });
      setSessionCognitoUser(cognitoUser);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (data) => {
          const { accessToken, idToken, refreshToken } = data;
          localStorage.setItem("accessToken", accessToken.jwtToken);
          localStorage.setItem("idToken", idToken.jwtToken);
          localStorage.setItem("refreshToken", refreshToken.jwtToken);
          localStorage.setItem("username", username);
          localStorage.setItem("sid", accessToken.payload.sub);
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(username);
          resolve();
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          setIsLoading(false);
          setUser(username);
          setSessionUserAttributes(userAttributes);
          resolve({ message: "NEW_PASSWORD_REQUIRED" });
        },
        onFailure: (error) => {
          setIsLoading(false);
          reject(error);
        },
      });
    });
  };

  const newPasswordHandler = (newPassword) => {
    return new Promise((resolve, reject) => {
      sessionCognitoUser.completeNewPasswordChallenge(
        newPassword,
        sessionUserAttributes,
        {
          onSuccess: (data) => {
            const { accessToken, idToken, refreshToken } = data;
            localStorage.setItem("accessToken", accessToken.jwtToken);
            localStorage.setItem("idToken", idToken.jwtToken);
            localStorage.setItem("refreshToken", refreshToken.jwtToken);
            localStorage.setItem("username", user);
            localStorage.setItem("sid", accessToken.payload.sub);
            setIsLoggedIn(true);
            setIsLoading(false);
            resolve();
          },
          onFailure: (err) => {
            console.log("Complete New Password Challenge Failed!");
            console.log(err);
            reject();
          },
        }
      );
    });
  };

  const signOut = () => {
    const currentUser = cognitoUserPool.getCurrentUser();
    currentUser.signOut();
    localStorage.clear();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
      setUser(localStorage.getItem("username"));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loggedIn,
        login,
        newPasswordHandler,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
