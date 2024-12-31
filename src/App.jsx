import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import Signin from "./Pages/Signin/Signin";
import { useSelector } from "react-redux";
import { authSelector } from "./redux/auth/authSlice";
import CartComponent from "./Pages/Cart/Cart";
import OrdersPage from "./Pages/Order/Order";
const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector(authSelector);
  if (!currentUser) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/cart",
          element: (
            <PrivateRoute>
              <CartComponent />
            </PrivateRoute>
          ),
        },
        {
          path: "/order",
          element: (
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
