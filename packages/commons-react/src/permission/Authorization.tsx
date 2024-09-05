import React, {FC} from "react";
import {usePermission} from "./use-permission";

type AuthorizationProps = {
    children?: React.ReactNode;
    policy?: string | string[]; //鉴权需要的策略
    authenticate?: (policies?: any[]) => boolean; //自定义鉴权
    unauthorized?: React.ReactElement | React.ReactNode; //未授权时的内容
    onUnauthorized?: () => void; //未授权时的回调
};
export const Authorization: FC<AuthorizationProps> = ({
                                                          children,
                                                          policy = [],
                                                          authenticate,
                                                          unauthorized,
                                                          onUnauthorized
                                                      }) => {
    const permission = usePermission();

    if (!permission.policySynced) {
        return null
    } else {
        let authorized: boolean
        if (authenticate) {
            authorized = authenticate?.(permission.policies)
        } else {
            authorized = permission.authenticate?.(policy) || false
        }
        if (authorized) {
            return <>{children}</>
        } else {
            if (onUnauthorized) {
                onUnauthorized()
            } else if (permission.onUnauthorized) {
                permission.onUnauthorized()
            }
            return unauthorized ?? permission.unauthorized ?? null
        }
    }
};
