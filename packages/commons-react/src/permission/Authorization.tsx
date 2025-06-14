import React, {FC} from "react";
import {usePermission} from "./use-permission";
import {Mode} from "./types";

type AuthorizationProps = {
    children?: React.ReactNode;
    value?: string | string[]; //鉴权需要的权限
    authenticate?: (permission?: string | string[]) => boolean; //自定义鉴权
    /**
     * 未授权时的内容
     */
    unauthorized?: React.ReactNode | React.ReactElement;
    onUnauthorized?: () => void; //未授权时的回调
    /**
     * mode:鉴权模式，and:必须同时拥有权限，or:只要拥有其中一个权限即可
     */
    mode?: Mode
};
export const Authorization: FC<AuthorizationProps> = ({
                                                          children,
                                                          value,
                                                          authenticate,
                                                          unauthorized,
                                                          onUnauthorized,
                                                          mode = 'and'
                                                      }) => {
    const permissionHooks = usePermission();

    if (!permissionHooks.policySynced) {
        return null
    } else {
        let authorized: boolean
        if (authenticate) {
            authorized = authenticate?.(permissionHooks.permissions)
        } else {
            authorized = permissionHooks.authenticate?.(value!,  mode) || false
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
