import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Amplify } from "aws-amplify";
import awsmobile from "./aws-exports";
import { useAuth } from "./Contexts/AuthContext";

import Login from "./Pages/Login/Login";
import NewPassword from "./Pages/Password/NewPassword";
import Table from "./Pages/Table/Table";

import RequireAuth from "./Components/Auth/RequireAuth";
import Navbar from "./Components/Navbar/Navbar";
import NotFound from "./Components/404/404";

Amplify.configure(awsmobile);

function App() {
  const { loggedIn } = useAuth();

  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Navigate to={"/companies"} /> : <Login />}
        />
        <Route element={<RequireAuth />}>
          <Route path="/companies" element={<Table />} />
        </Route>
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
