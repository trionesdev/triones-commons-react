import {TrionesRouteObject} from "./RouteObject";
import {createBrowserRouter, createHashRouter, RouteObject} from "react-router";
import {Authorization} from "../permission";
import {Authentication} from "../authentication";

export const routesConvert = (routes: TrionesRouteObject[]): RouteObject[] => {
    return routes.map((route: any) => {
        if (typeof route.path == "function") {
            route.path = route.path();
        }
        if (route.permission) {
            if (route.element) {
                route.element = <Authorization value={route.permission} unauthorized={route.unauthorized}
                                               onUnauthorized={route.onUnauthorized}>{route.element}</Authorization>;
            }
            if (route.Component) {
                let Component = route.Component;
                route.Component = () => (
                    <Authorization value={route.permission} unauthorized={route.unauthorized}
                                   onUnauthorized={route.onUnauthorized}>
                        <Component/>
                    </Authorization>
                );
            }
        }

        if (!route.anonymous) {
            if (route.element) {
                route.element = <Authentication>{route.element}</Authentication>;
            }
            if (route.Component) {
                let Component = route.Component;
                route.Component = () => (
                    <Authentication>
                        <Component/>
                    </Authentication>
                );
            }
        }

        if (route.children) {
            route.children = routesConvert(route.children);
        }
        return route as RouteObject;
    });
};

export const trionesCreateBrowserRouter = (routes: TrionesRouteObject[]) => {
    return createBrowserRouter(routesConvert(routes));
};

export const trionesCreateHashRouter = (routes: TrionesRouteObject[]) => {
    return createHashRouter(routesConvert(routes));
};
