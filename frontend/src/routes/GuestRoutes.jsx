import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsOfService from "../components/TermsOfService";


export const guestRoutes = [
    {
        path: "/terms-of-service",
        element: <TermsOfService />
    },
    {
        path: "/privacy-policy",
        element: <PrivacyPolicy />
    }
]

