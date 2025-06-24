import {createHashRouter, RouteObject, RouterProvider} from "@trionesdev/commons-react/src";
import {SignInPage} from "./SignInPage";
import {DashboardPage} from "./DashboardPage";
import {SecurityPage} from "./SecurityPage";
import {PermissionPage} from "./PermissionPage.tsx";

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