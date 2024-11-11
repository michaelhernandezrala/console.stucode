import Article from "./pages/Article.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";

export default [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/users/:userId/articles/:articleId",
    element: <Article />,
    errorElement: <Home />,
  },
  { path: "/", element: <Home /> },
];
