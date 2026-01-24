import { Children } from "react";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";
import LendingPage from "../components/LendingPage";
import PublicOnlyRoute from "../components/PublicOnlyRoute";



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