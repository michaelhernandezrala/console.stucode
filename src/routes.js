import Article from "./pages/Article.js";
import Articles from "./pages/Articles.js";
import Favorites from "./pages/Favorites.js";
import Home from "./pages/Home.js";
import Layout from "./pages/Layout.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import User from "./pages/User.js";
import Users from "./pages/Users.js";
import ProtectedRoute from "./ProtectedRoute.js";

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
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
        element: (
          <ProtectedRoute>
            <Article />,
          </ProtectedRoute>
        ),
        errorElement: <Home />,
      },
      {
        path: "/users/:userId/articles",
        element: (
          <ProtectedRoute>
            <Articles />,
          </ProtectedRoute>
        ),
        errorElement: <Home />,
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
        errorElement: <Home />,
      },
      {
        path: "/users/:userId",
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
        errorElement: <Home />,
      },
      {
        path: "/users/:userId/favorites",
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
        errorElement: <Home />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        errorElement: <Login />,
      },
    ],
  },
];
