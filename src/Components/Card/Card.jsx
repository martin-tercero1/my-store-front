import { useContext } from "react";
import {ShoppingCartContext} from "../../Context/ShoppingCartContext";
import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";

function Card(data) {
  const context = useContext(ShoppingCartContext);

  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
  }

  const addProductToCart = (event, productData) => {
    event.stopPropagation();
    context.openCheckoutSideMenu();
    context.closeProductDetail();
    context.setCartProducts([...context.cartProducts, productData]);
    context.setCount(context.count + 1);
  }

  const renderIcon = (id) => {
    const isProductInCard = context.cartProducts.some(product => product.id === id);

    return isProductInCard ? (
      <div className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full mt-2 mr-2 p-1">
        <CheckIcon className="w-6 h-6 text-white" />
      </div>
    ) : (
      <div
        onClick={(event) => addProductToCart(event, data.data)}
        className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full mt-2 mr-2 p-1"
      >
        <PlusIcon className="w-6 h-6 text-black" />
      </div>
    );
  }

  return (
    <div
      onClick={() => showProduct(data.data)}
      className="bg-white cursor-pointer lg:w-56 w-44 h-60 rounded-lg shadow-md"
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs ml-2 mb-2 px-3 py-0.5">
          {data.data.category}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={data.data.image}
          alt={data.data.name}
        />

        {renderIcon(data.data.id)}

      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light truncate">{data.data.title}</span>
        <span className="text-lg font-bold">{`$${data.data.price}`}</span>
      </p>
    </div>
  );
}

export default Card