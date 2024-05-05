import { useRoutes, BrowserRouter } from 'react-router-dom'
import {ShoppingCartProvider} from '../../Context/ShoppingCartContext'
import Home from '../Home/Home'
import MyAccount from '../MyAccount/MyAccount'
import MyOrder from '../MyOrder/MyOrder'
import MyOrders from '../MyOrders/MyOrders'
import SignIn from '../SignIn/SignIn'
import NotFound from '../NotFound/NotFound'
import Navbar from '../../Components/Navbar/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu/CheckoutSideMenu'
import SignUp from '../SignUp/SignUp'
import RequireAuth from '../RequireAuth'

function AppRoutes() {
    const routes = useRoutes([
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jewelery",
        element: <Home />,
      },
      {
        path: "/electronics",
        element: <Home />,
      },
      {
        path: "/men-clothing",
        element: <Home />,
      },
      {
        path: "/women-clothing",
        element: <Home />,
      },
      {
        path: "/my-account",
        element: (
          <RequireAuth>
            <MyAccount />
          </RequireAuth>
        ),
      },
      {
        path: "/my-order",
        element: <MyOrder />,
      },
      {
        path: "/my-orders/:id",
        element: <MyOrder />,
      },
      {
        path: "/my-orders/last",
        element: <MyOrder />,
      },
      {
        path: "/my-orders",
        element: (
          <RequireAuth>
            <MyOrders />
          </RequireAuth>
        ),
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]);

    return routes;
}

function  App() {

  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes/>
        <Navbar/>
        <CheckoutSideMenu/>
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App
