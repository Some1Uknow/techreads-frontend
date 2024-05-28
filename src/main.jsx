import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import LoginForm from "./Pages/LoginForm.jsx";
import RegisterForm from "./Pages/RegisterForm.jsx";
import { UserContextProvider } from "./Provider.jsx";
import CreatePage from "./Pages/CreatePage.jsx";
import BlogPage from "./Pages/BlogPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import EditPage from "./Pages/EditPage.jsx";
import BlogList from "./components/BlogList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/create",
    element: <CreatePage />,
  },
  {
    path: "/blogpost/:id",
    element: <BlogPage />,
  },
  {
    path: "/profile/:id",
    element: <ProfilePage />,
  },
  {
    path: "/edit/:id",
    element: <CreatePage />,
  },
  {
    path: "/editprofile/:id",
    element: <EditPage />,
  },
  {
    path: "/blogs",
    element: <BlogList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
