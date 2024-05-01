import { ChevronRightIcon } from "@heroicons/react/24/solid";
import moment from "moment";

function OrdersCard(props) {
  const { totalPrice, totalProducts } = props;
  const formmattedDate = moment().format("MMMM Do, YYYY");

  return (
    <div className="flex justify-between items-center mb-3 border border-black w-80 rounded-lg p-4">
      <div className="flex justify-between w-full">
        <div className="flex flex-col">
          <span className="font-light">{formmattedDate}</span>
          <span className="font-light">{totalProducts} articles</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium text-2xl">{`$${totalPrice}`}</span>
          <ChevronRightIcon className="h-6 w-6 text-black cursor pointer"/>
        </div>
      </div>
    </div>
  );
}

export default OrdersCard;
