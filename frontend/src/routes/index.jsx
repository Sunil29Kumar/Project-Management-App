import { guestRoutes } from "./GuestRoutes";
import { protectedRoutes } from "./ProtectedRoutes";
import { publicRoutes } from "./PublicRoutes";
import AuthError from "../components/auth/AuthError";



export const allRoutes = [
    ...publicRoutes,
    ...guestRoutes,
    ...protectedRoutes,
    {
        path: "*",
        element: <AuthError />
    }
]