import { Children } from "react";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Projects from "../pages/Projects";
import ProfileSettings from "../pages/ProfileSettings";


export const protectedRoutes = [
    {
        path:"/",
        element: <ProtectedRoute />,
        children: [
            { path:"dashboard", element: <Dashboard /> },
            { path: "projects", element: <Projects /> },
            { path: "settings", element: <ProfileSettings /> }
        ]
    }

]








/// nested routes example 


// export const protectedRoutes = [
//     {
//         element: <ProtectedRoute />, 
//         children: [
//             { path: "/dashboard", element: <Dashboard /> },
//             { path: "/projects", element: <ProjectsList /> },
            
//             // Nested Project Routes
//             {
//                 path: "/projects/:projectId",
//                 element: <ProjectLayout />, // Isme project-specific tabs honge (Board, List, Settings)
//                 children: [
//                     { index: true, element: <ProjectOverview /> },
//                     { path: "board", element: <KanbanBoard /> },
//                     { path: "tasks", element: <ProjectTasks /> },
//                     { path: "settings", element: <ProjectSettings /> },
//                 ]
//             },

//             { path: "/tasks", element: <MyTasks /> },
//             { path: "/team", element: <TeamManagement /> },
//             { path: "/settings", element: <UserSettings /> },
//         ]
//     }
// ];