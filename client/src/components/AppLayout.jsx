import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../constants";

function AppLayout() {
  const loggedIn = localStorage.getItem(TOKEN_KEY);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/users"); // Redirect to login page after logout
  };

  return (
    <div className="app-layout">
      <header>
        <img
          src={
            "https://seeklogo.com/images/A/aol-instant-messenger-logo-B8326AC377-seeklogo.com.png"
          }
          alt="Logo"
          style={{ width: "150px" }}
        />
        {loggedIn ? (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink className="header-button" to="users">Login</NavLink>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
