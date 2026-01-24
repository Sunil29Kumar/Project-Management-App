
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { allRoutes } from "./routes/index.jsx"

const router = createBrowserRouter(allRoutes);

function App() {

  return <RouterProvider router={router} />
}

export default App
