import React, {FC} from "react";
import {useAuthorization} from "./use-authorization";
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
    const authorization = useAuthorization();

    if (!authorization.authorizationSynced) {
        return null
    } else {
        let authorized: boolean
        if (authenticate) {
            authorized = authenticate?.(authorization.permissions)
        } else {
            authorized = authorization.authenticate?.(value!,  mode) || false
        }
        if (authorized) {
            return <>{children}</>
        } else {
            if (onUnauthorized) {
                onUnauthorized()
            } else if (authorization.onUnauthorized) {
                authorization.onUnauthorized()
            }
            if (unauthorized) {
                return <>{unauthorized}</>
            } else {
                if (authorization.unauthorized) {
                    return null
                } else {
                    return <>{authorization.unauthorized}</>
                }
            }
        }
    }

};
