
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";
import LendingPage from "../pages/Home/LendingPage";
import PublicOnlyRoute from "../components/auth/PublicOnlyRoute";
import InvitationResponse from "../pages/InvitationResponse";



export const publicRoutes = [
    {
        path: "/",
        element: <LendingPage />
    },
    {
        path:"/accept-invite",
        element:<InvitationResponse />
    },

    {
        element: <PublicOnlyRoute />,
        children: [
            { path: "/login", element: <LoginForm /> },
            { path: "/register", element: <RegisterForm /> }
        ]
    }
];