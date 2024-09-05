import {DataRouteObject} from "react-router-dom";
import React from "react";

export type RouteItem = {
    label?: string;
    id?: string;
    path?: (...params: any[]) => string;
    anonymous?: boolean;
    policy?: string | string[];
    unauthorized?: React.ReactElement | React.ReactNode; //未授权时的内容
    onUnauthorized?: () => void; //未授权时的回调
};

export type TrionesRouteObject = Omit<DataRouteObject, "id" | "path" | "children"> &
    RouteItem & {
    children?: TrionesRouteObject[];
};
