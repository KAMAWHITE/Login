import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Categories from "./Components/Categories";
import Brands from "./Components/Brands";
import Cars from "./Components/Cars";
import Cities from "./Components/Cities";
import Locations from "./Components/Locations";
import Models from "./Components/Models";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Login />
            }
        ]
    },
    {
        path: '/home',
        element: <Home />,
        children: [
            {
                path: 'categories',
                element: <Categories />
            },
            {
                path: 'brands',
                element: <Brands />
            },
            {
                path: 'cars',
                element: <Cars />
            },
            {
                path: 'cities',
                element: <Cities />
            },
            {
                path: 'locations',
                element: <Locations />
            },
            {
                path: 'models',
                element: <Models />
            }
        ]
    }

])
