import { Children } from "react";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";
import LendingPage from "../pages/Home/LendingPage";
import PublicOnlyRoute from "../components/auth/PublicOnlyRoute";



export const publicRoutes = [
    {
        path: "/",
        element: <LendingPage />
    },

    {
        element: <PublicOnlyRoute />,
        children: [
            { path: "/login", element: <LoginForm /> },
            { path: "/register", element: <RegisterForm /> }
        ]
    }
];