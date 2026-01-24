import { Children } from "react";
import Dashboard from "../components/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Projects from "../components/Projects";


export const protectedRoutes = [
    {
        element: <ProtectedRoute />,
        children: [
            { path:"/dashboard", element: <Dashboard /> },
            { path: "/projects", element: <Projects /> }
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