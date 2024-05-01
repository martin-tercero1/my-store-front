import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import OrderCard from "../OrderCard/OrderCard";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { totalPrice } from "../../utils";

function CheckoutSideMenu() {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(product => product.id != id);
    context.setCartProducts(filteredProducts);
    context.setCount(context.count - 1);
  }

  const handleCheckout = () => {
    const orderToAdd = {
      date: Date(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }

    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.setCount(0);
    context.closeCheckoutSideMenu();
    context.setSearchByTitle(null);
  }

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } w-screen z-30 lg:w-[360px] lg:h-[calc(100vh_-_68px)] h-full flex flex-col fixed top-0 lg:top-[68px] right-0 border border-black rounded-lg bg-white`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <XMarkIcon
            onClick={context.closeCheckoutSideMenu}
            className="h-6 w-6 text-black cursor-pointer"
          />
        </div>
      </div>

      <div className="px-6 overflow-y-scroll flex-1">
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            id={product.id}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <div className="px-6 mb-4">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total:</span>
          <span className="font-medium text-xl">
            ${totalPrice(context.cartProducts)}
          </span>
        </p>

        <Link to="/my-orders/last">
          <button
            className="w-full bg-black py-3 text-white rounded-lg"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
}

export default CheckoutSideMenu;
