import Home from "./page/Home.js";
import Login from "./page/Login.js";
import Register from "./page/Register.js";

export default [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/", element: <Home /> },
];
