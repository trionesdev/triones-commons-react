import {TrionesRouteObject} from "./context";
import {createBrowserRouter, createHashRouter, RouteObject} from "react-router-dom";
import {Authorization} from "../permission";
import {Authentication} from "../authentication";

export const routesConvert = (routes: TrionesRouteObject[]): RouteObject[] => {
    return routes.map((route: any) => {
        if (typeof route.path == "function") {
            route.path = route.path();
        }
        if (route.policy) {
            if (route.element) {
                route.element = <Authorization policy={route.policy} unauthorized={route.unauthorized}
                                               onUnauthorized={route.onUnauthorized}>{route.element}</Authorization>;
            }
            if (route.Component) {
                let Component = route.Component;
                route.Component = () => (
                    <Authorization policy={route.policy} unauthorized={route.unauthorized}
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
