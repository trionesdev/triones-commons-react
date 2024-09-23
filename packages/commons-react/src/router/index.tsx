import {trionesCreateBrowserRouter, trionesCreateHashRouter} from "./hooks";
import {RouteItem,TrionesRouteObject} from "./RouteObject";

export type {RouteItem,TrionesRouteObject as RouteObject};
export {
    trionesCreateBrowserRouter as createBrowserRouter,
    trionesCreateHashRouter as createHashRouter,
};

export {
    Link,
    NavLink,
    useSearchParams,
    useSubmit,
    useFormAction,
    useFetcher,
    useFetchers,
} from "react-router-dom"

export type {
    unstable_DataStrategyFunction,
    unstable_DataStrategyFunctionArgs,
    unstable_DataStrategyMatch,
    FormEncType,
    FormMethod,
    GetScrollRestorationKeyFunction,
    ParamKeyValuePair,
    SubmitOptions,
    URLSearchParamsInit,
    V7_FormMethod,
} from "react-router-dom"

export type {
    ActionFunction,
    ActionFunctionArgs,
    AwaitProps,
    Blocker,
    BlockerFunction,
    DataRouteMatch,
    DataRouteObject,
    ErrorResponse,
    Fetcher,
    FutureConfig,
    Hash,
    IndexRouteObject,
    IndexRouteProps,
    JsonFunction,
    LazyRouteFunction,
    LayoutRouteProps,
    LoaderFunction,
    LoaderFunctionArgs,
    Location,
    MemoryRouterProps,
    NavigateFunction,
    NavigateOptions,
    NavigateProps,
    Navigation,
    Navigator,
    NonIndexRouteObject,
    OutletProps,
    Params,
    ParamParseKey,
    Path,
    PathMatch,
    Pathname,
    PathParam,
    PathPattern,
    PathRouteProps,
    RedirectFunction,
    RelativeRoutingType,
    RouteMatch,
    RouteProps,
    RouterProps,
    RouterProviderProps,
    RoutesProps,
    Search,
    ShouldRevalidateFunction,
    ShouldRevalidateFunctionArgs,
    To,
    UIMatch,
    unstable_HandlerResult,
    unstable_PatchRoutesOnNavigationFunction,
} from "react-router-dom"

export type {
    AbortedDeferredError,
    Await,
    MemoryRouter,
    Navigate,
    NavigationType,
    Outlet,
    Route,
    Router,
    Routes,
    createMemoryRouter,
    createPath,
    createRoutesFromChildren,
    createRoutesFromElements,
    defer,
    isRouteErrorResponse,
    generatePath,
    json,
    matchPath,
    matchRoutes,
    parsePath,
    redirect,
    redirectDocument,
    replace,
    renderMatches,
    resolvePath,
    useActionData,
    useAsyncError,
    useAsyncValue,
    useBlocker,
    useHref,
    useInRouterContext,
    useLoaderData,
    useLocation,
    useMatch,
    useMatches,
    useNavigate,
    useNavigation,
    useNavigationType,
    useOutlet,
    useOutletContext,
    useParams,
    useResolvedPath,
    useRevalidator,
    useRouteError,
    useRouteLoaderData,
    useRoutes,
} from "react-router-dom"