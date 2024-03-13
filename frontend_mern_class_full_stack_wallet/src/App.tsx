import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import "./global.css";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
