import { useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { useAuth } from "../useAuth";
import Layout from "../../Components/Layout/Layout";

function SignUp() {
  const context = useContext(ShoppingCartContext);
  const form = useRef(null);

  const { signup } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSignUp = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    signup(data).then(() => {
      context.setUserData(data);
      navigate(state?.path || "/");
    });
  }

  return (
    <Layout>
      <form
        ref={form}
        className="flex flex-col justify-center lg:w-96 w-dvw p-10"
      >
        <h2 className="self-center mb-2 text-2xl font-semibold">Welcome</h2>
        <label htmlFor="name">Your name:</label>

        <input
          className="border border-black rounded-lg p-3 outline outline-none font-bold mb-2"
          placeholder="Peter"
          type="name"
          name="name"
          id="name"
          required

        />

        <label htmlFor="email">Your email:</label>

        <input
          className="border border-black rounded-lg p-3 outline outline-none font-bold mb-2"
          placeholder="peter@mail.com"
          type="email"
          name="email"
          id="email"
          required

        />

        <label htmlFor="password">Your password:</label>

        <input
          className="border border-black rounded-lg p-3 outline outline-none font-bold mb-2"
          type="password"
          name="password"
          id="password"
          required
        />

        <button
          className="w-full bg-black rounded-lg text-white py-3 mt-3"
          type="submit"
          onClick={handleSignUp}
        >
          Create
        </button>
      </form>
    </Layout>
  );
}

export default SignUp