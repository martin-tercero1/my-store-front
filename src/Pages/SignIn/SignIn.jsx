import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { useAuth } from '../useAuth';
import Layout from "../../Components/Layout/Layout"

function SignIn() {
  const navigate = useNavigate();
  const context = useContext(ShoppingCartContext);
  const { state } = useLocation();

  const { login } = useAuth();

  const localUserData =  localStorage.getItem('user');
  const localUserDataParsed = JSON.parse(localUserData);
  
  const userData = context.userData || localUserDataParsed;
  const isUserDataInLocal = userData ? true : false;

  const handleLogin = () => {
    login().then(() => {
      context.setUserData(userData);
      navigate(state?.path || "/");
    });
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <Layout>
      <form className="flex flex-col justify-center lg:w-96 w-dvw p-10">
        <h2 className="self-center mb-2 text-2xl font-semibold">Welcome</h2>
        <label htmlFor="email">
          Email:{" "}
          <input
            className="outline outline-none font-bold disabled:bg-transparent"
            type="email"
            name="email"
            id="email"
            disabled={!isUserDataInLocal}
            defaultValue={userData?.email}
          />
        </label>

        <label htmlFor="password">
          Password:{" "}
          <input
            className="outline outline-none font-bold disabled:bg-transparent"
            type="password"
            name="password"
            id="password"
            disabled={!isUserDataInLocal}
            defaultValue={userData?.password}
          />
        </label>

        <button
          disabled={!isUserDataInLocal}
          onClick={handleLogin}
          className="w-full bg-black rounded-lg text-white py-3 mt-3 disabled:opacity-50"
        >
          Log in
        </button>
        <a
          className="self-center text-black underline underline-offset-4 my-4"
          href=""
        >
          Forgot my password
        </a>
        <button
          onClick={handleSignUp}
          className="w-full border border-black rounded-lg py-3 "
        >
          Sign up
        </button>
      </form>
    </Layout>
  );
}

export default SignIn