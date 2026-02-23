import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";
import LoginPage from "./route-components/LoginPage"
import SignupPage from "./route-components/SignupPage"
import SignupSuccessPage from "./route-components/SignupSuccessPage"
import HomePage from "./route-components/HomePage"
import "./styles/index.css"
import "./styles/input.css"

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
    // check login status inside the loader
    loader: async () => {
      const loggedInUser = localStorage.getItem("loggedInUser")
      if (!loggedInUser) {
        return redirect("/login")
      }
    }
  },
  {
    path: "/signup",
    Component: SignupPage
  },
  {
    path: "/signupSuccess",
    Component: SignupSuccessPage
  },
  {
    path: "/login",
    Component: LoginPage
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
