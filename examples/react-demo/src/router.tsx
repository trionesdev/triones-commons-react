import {createHashRouter, RouteObject} from "@trionesdev/auth-react/src";
import {SignInPage} from "./SignInPage";
import {DashboardPage} from "./DashboardPage";
import {SecurityPage} from "./SecurityPage";
import {PermissionPage} from "./PermissionPage.tsx";
import {RouterProvider} from "react-router";

export const routes: RouteObject[] = [
    {
        path: () => "/sign-in",
        element: <SignInPage/>,
        anonymous: true
    },
    {
        path: () => "/",
        element: <DashboardPage/>,
    },
    {
        path: () => "/security",
        element: <SecurityPage/>,
        permission: "security",
        unauthorized: <div>未授权</div>,
    },
    {
        path: () => '/authorization',
        element: <PermissionPage/>,
    }
]

export const AppRouter = () => {
    return <RouterProvider router={createHashRouter(routes)}/>;
};