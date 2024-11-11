import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserProvider } from "./components/contexts/UserContext.js";
import routes from "./routes.js";

const router = createBrowserRouter(routes);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />;
    </UserProvider>
  );
}

export default App;
