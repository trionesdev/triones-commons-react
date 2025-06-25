import {trionesCreateBrowserRouter, trionesCreateHashRouter} from "./hooks";
import {RouteItem as RouteType, TrionesRouteObject} from "./RouteObject";



export type {
    //---
    RouteType, TrionesRouteObject as RouteObject
};
export {
    //---
    trionesCreateBrowserRouter as createBrowserRouter,
    trionesCreateHashRouter as createHashRouter,
};


