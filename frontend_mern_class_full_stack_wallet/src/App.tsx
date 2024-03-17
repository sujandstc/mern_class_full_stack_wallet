import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import "./global.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
    },

    {
      path: "/forgot-pw",
      element: <ForgotPassword />,
    },

    {
      path: "/reset-pw",
      element: <ResetPassword />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
