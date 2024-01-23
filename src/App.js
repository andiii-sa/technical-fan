import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./assets/style/main.css";
import Dashboard from "./pages/dashboard";
import Detail from "./pages/detail";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/detail/:id",
      element: <Detail />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
