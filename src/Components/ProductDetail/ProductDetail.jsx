import { useContext } from "react";
import { useAuth } from "../../Pages/useAuth";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

function ProductDetail() {
  const context = useContext(ShoppingCartContext);
    const { authed } = useAuth();
    const localAuthParsed = JSON.parse(localStorage.getItem("authed"));
    const isUserAuthed = authed || localAuthParsed;

  const addProductToCart = () => {
    context.closeProductDetail();
    context.openCheckoutSideMenu();
    context.setCartProducts([...context.cartProducts, context.productToShow]);
    context.setCount(context.count + 1);
  };
  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "flex" : "hidden"
      } overflow-y-scroll w-screen lg:w-[360px] z-20 lg:h-[calc(100vh_-_68px)] h-full flex flex-col fixed top-0 lg:top-[68px] right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Details</h2>
        <div>
          <XMarkIcon
            onClick={context.closeProductDetail}
            className="h-6 w-6 text-black cursor-pointer"
          />
        </div>
      </div>

      <figure className="px-6">
        <img
          className="w-full h-full rounded-lg"
          src={context.productToShow.image}
          alt={context.productToShow.title}
        />
      </figure>
      <p className="flex flex-col p-6">
        <span className="font-medium text-2xl mb-2">
          {`$${context.productToShow.price}`}
        </span>
        <span className="font-medium text-xl">
          {context.productToShow.title}
        </span>
        <span className="font-medium text-md">
          {context.productToShow.description}
        </span>
      </p>

      <div className="px-6 mb-4">
        <button
          type="button"
          className="w-full bg-black py-3 text-white rounded-lg disabled:opacity-50"
          onClick={isUserAuthed ? addProductToCart : null}
          disabled={!isUserAuthed}
        >
          Add to cart
        </button>
      </div>
    </aside>
  );
}

export default ProductDetail