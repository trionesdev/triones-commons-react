import {trionesCreateBrowserRouter, trionesCreateHashRouter} from "./hooks";
import {RouteItem, TrionesRouteObject} from "./route-object";
import {RouterProvider, Outlet,Link, useNavigate} from "react-router-dom"

export type {RouteItem, TrionesRouteObject as RouteObject};
export {
    trionesCreateBrowserRouter as createBrowserRouter,
    trionesCreateHashRouter as createHashRouter,
    RouterProvider,
    Outlet,
    Link,
    useNavigate
};
