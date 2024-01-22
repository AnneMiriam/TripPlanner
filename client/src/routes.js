import Home from "./pages/Home";
import Trips from "./pages/Trips";
import User from "./pages/User";
import UserProfile from "./pages/UserProfile";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  }, 
  {
    path: "/user",
    element: <User />,
    errorElement: <ErrorPage />
  },
  {
    path: "/trips",
    element: <Trips />,
    errorElement: <ErrorPage />
  },
  {
    path: "/profile/:id",
    element: <UserProfile />,
    errorElement: <ErrorPage />
  }
];

export default routes;