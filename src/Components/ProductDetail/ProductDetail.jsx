import { useContext } from "react";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

function ProductDetail() {
const context = useContext(ShoppingCartContext);
  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "flex" : "hidden"
      }  w-screen lg:w-[360px] z-20 lg:h-[calc(100vh_-_68px)] h-full flex flex-col fixed top-0 lg:top-[68px] right-0 border border-black rounded-lg bg-white`}
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
    </aside>
  );
}

export default ProductDetail