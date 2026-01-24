import AuthError from "../components/AuthError";
import { guestRoutes } from "./GuestRoutes";
import { protectedRoutes } from "./ProtectedRoutes";
import { publicRoutes } from "./PublicRoutes";



export const allRoutes = [
    ...publicRoutes,
    ...guestRoutes,
    ...protectedRoutes,
    {
        path: "*",
        element: <AuthError />
    }
]