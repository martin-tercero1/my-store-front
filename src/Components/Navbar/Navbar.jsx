import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../Pages/useAuth";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

function Navbar() {
  // 1. The elements of the nav bar will change the visibility based on whether the user is logged in or not
  // 2. The sign in page will change based on whether or not the user is logged in
  const { authed, logout } = useAuth();
  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const localAuthParsed = JSON.parse(localStorage.getItem('authed'));
  const isUserAuthed = authed || localAuthParsed;

  const localUserDataParsed = JSON.parse(localStorage.getItem("user"));
  const userData = context.userData || localUserDataParsed;

  const handleShoppingCart = () => {
    context.openCheckoutSideMenu();
  }

  const handleLogout = () => {
    logout().then(() => {
      context.setUserData(null);
      navigate("/");
    });
  };

  const activeStyle = "underline underline-offset-4";
  return (
    <nav className="w-screen py-5 px-8 text-sm font-light flex justify-between items-center fixed top-0 z-10 flex-wrap bg-white">
      <ul className="flex flex-wrap items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Shopi</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jewelery"
            onClick={() => context.setSearchByCategory("jewelery")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Jewelery
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => context.setSearchByCategory("electronics")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/men-clothing"
            onClick={() => context.setSearchByCategory("men")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            {"Men's Clothing"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/women-clothing"
            onClick={() => context.setSearchByCategory("women")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            {"Women's clothing"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="others/"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex flex-wrap items-center gap-3">
        {!isUserAuthed && (
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Sign In
            </NavLink>
          </li>
        )}
        {isUserAuthed && (
          <>
            <li className="text-black/60">{userData?.email}</li>
            <li>
              <NavLink
                to="/my-orders"
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-account"
                className={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }
              >
                My Account
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                onClick={handleLogout}
              >
                Sign Out
              </NavLink>
            </li>
            <li className="flex items-center" onClick={handleShoppingCart}>
              <ShoppingBagIcon className="w-6 h-6 text-black cursor-pointer" />
              <span>{context.count}</span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar