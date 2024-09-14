import {DataRouteObject} from "react-router-dom";
import React from "react";

export type RouteItem = {
    /**
     * 路由名称
     */
    label?: string;
    id?: string;
    /**
     * 路由，可以支持根据参数生成路由
     * @param params
     */
    path?: (...params: any[]) => string;
    /**
     * 是否允许匿名访问
     */
    anonymous?: boolean;
    /**
     * 权限
     */
    permission?: string | string[];
    /**
     * 未授权时的内容
     */
    unauthorized?: React.ReactElement | React.ReactNode; //未授权时的内容
    /**
     * 未授权时的回调
     */
    onUnauthorized?: () => void; //未授权时的回调
};

export type TrionesRouteObject = Omit<DataRouteObject, "id" | "path" | "children"> &
    RouteItem & {
    children?: TrionesRouteObject[];
};
