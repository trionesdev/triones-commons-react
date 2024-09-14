import React, {FC} from "react";
import {usePermission} from "./use-permission";

type AuthorizationProps = {
    children?: React.ReactNode;
    permission?: string | string[]; //鉴权需要的权限
    authenticate?: (permission?: string | string[]) => boolean; //自定义鉴权
    unauthorized?: React.ReactNode | React.ReactElement; //未授权时的内容
    onUnauthorized?: () => void; //未授权时的回调
};
export const Authorization: FC<AuthorizationProps> = ({
                                                          children,
                                                          permission,
                                                          authenticate,
                                                          unauthorized,
                                                          onUnauthorized
                                                      }) => {
    const permissionHooks = usePermission();

    if (!permissionHooks.policySynced) {
        return null
    } else {
        let authorized: boolean
        if (authenticate) {
            authorized = authenticate?.(permissionHooks.permissions)
        } else {
            authorized = permissionHooks.authenticate?.(permission!) || false
        }
        if (authorized) {
            return <>{children}</>
        } else {
            if (onUnauthorized) {
                onUnauthorized()
            } else if (permissionHooks.onUnauthorized) {
                permissionHooks.onUnauthorized()
            }
            if (unauthorized) {
                return <>{unauthorized}</>
            } else {
                if (permissionHooks.unauthorized) {
                    return null
                } else {
                    return <>{permissionHooks.unauthorized}</>
                }
            }
        }
    }

};
