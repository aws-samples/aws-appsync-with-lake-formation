import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { useCompanyUpdate } from "../../Contexts/CompanyContext";

import "./navbar.css";

const Navbar = (_) => {
  const { loggedIn, signOut } = useAuth();
  const updateCompanies = useCompanyUpdate();
  const navigate = useNavigate();

  const onLogoutClicked = () => {
    updateCompanies([]);
    signOut();
    navigate("/");
  };

  return (
    <header>
      <div className="nav-wrapper">
        <ul className="navbar">
          {!loggedIn && (
            <li>
              <Link to={"/"}>Login</Link>
            </li>
          )}
          {/* <li>
            <Link to={"/trends"}>Home</Link>
          </li> */}
          <li>
            <Link to={"/companies"}>Companies</Link>
          </li>
          {loggedIn && (
            <li>
              <Link to={"/"} onClick={onLogoutClicked}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
