import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { useAuth } from "../useAuth";
  
function MyAccount() {
  const context = useContext(ShoppingCartContext);
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const form = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (event) => {
    event.preventDefault();
    setIsEditing((prevValue) => !prevValue);
  }

  const editChanges = () => {
  const formData = new FormData(form.current);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  signup(data).then(() => {
    context.setUserData(data);
    navigate('/');
  });
  }

  return (
    <Layout>
      <form
        ref={form}
        className="flex flex-col justify-center lg:w-96 w-dvw p-10"
      >
        <h2 className="self-center mb-2 text-2xl font-semibold">My Account</h2>

        {isEditing ? (
          <>
            <label className="flex" htmlFor="name">
              Name:{" "}
              <input
                className="outline outline-none font-bold"
                type="name"
                name="name"
                id="name"
                defaultValue={context.userData?.name}
              />
            </label>
            <label className="flex" htmlFor="email">
              Email:{" "}
              <input
                className="outline outline-none font-bold"
                type="email"
                name="email"
                id="email"
                defaultValue={context.userData?.email}
              />
            </label>
            <label className="flex" htmlFor="password">
              Password:{" "}
              <input
                className="outline outline-none font-bold"
                type="password"
                name="password"
                id="password"
                defaultValue={context.userData?.password}
                required
              />
            </label>

            <button
              onClick={editChanges}
              className="w-full border border-black rounded-lg py-3 mt-3"
            >
              Edit
            </button>
          </>
        ) : (
          <>
            <p>Name: {context.userData?.name}</p>
            <p>Email: {context.userData?.email}</p>
            <button
              onClick={() => {
                handleEdit(event);
              }}
              className="w-full border border-black rounded-lg py-3 mt-3"
            >
              Edit
            </button>
          </>
        )}
      </form>
    </Layout>
  );
}

export default MyAccount