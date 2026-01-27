import React, {FC, useEffect, useState} from "react";

import {AuthorizationContext} from "./context";
import {AuthorizationResponse, Mode} from "./types";
import {useAuthentication} from "../authentication";
import {every, includes, isArray, isEqual, some} from "lodash-es";

type PermissionProviderProps = {
    children?: React.ReactNode;
    /**
     * 权限请求，返回一个PolicyResponse
     * @param params
     */
    authorizationRequest?: (params?: any) => Promise<AuthorizationResponse>;
    /**
     * 权限格式转换，适配前端k-v模式，当配置customAuthenticate 时，该参数无效
     * @param policy
     */
    permissionTransform?: (policy: any | any[]) => any;
    /**
     * 自定义鉴权
     * @param permission 需要的权限
     * @param permissions 当前用户拥有的权限策略
     */
    customAuthenticate?: (permission: any | any[], permissions: any[], mode: Mode) => boolean;
    unauthorized?: React.ReactElement | React.ReactNode; //未授权时的内容
    onUnauthorized?: () => void; //未授权时的回调
};
export const AuthorizationProvider: FC<PermissionProviderProps> = ({
                                                                       children,
                                                                       authorizationRequest,
                                                                       permissionTransform = (permission) => {
                                                                           return permission;
                                                                       },
                                                                       customAuthenticate,
                                                                       unauthorized,
                                                                       onUnauthorized
                                                                   }) => {
    const {authenticationInfo} = useAuthentication(); //鉴权是否同步
    const [authorizationSynced, setAuthorizationSynced] = useState(false); //策略是否同步
    const [master, setMaster] = useState(false);
    const [permissions, setPermissions] = useState<any[] | undefined>([]); //全部权限

    /**
     * 鉴权,如果有自定义鉴权 customAuthenticate，则使用自定义鉴权，否则使用默认鉴权
     * @param permissionFilter
     * @param mode
     */
    const handleAuthenticate = (permissionFilter: any | any[], mode: Mode = 'and') => {

        if (!authorizationSynced) {
            return false;
        }
        if (master){
            return true;
        }
        if (customAuthenticate) {
            return customAuthenticate(permissionFilter, permissions || [], mode);
        } else {
            let permissionFiler = permissionTransform(permissionFilter);

            if (isArray(permissionFilter)) {
                if (mode == 'and') {
                    return every(permissionFilter, item => {
                        return some(permissions, (permission: any) => {
                            return isEqual(permission, item);
                        })
                    });
                } else if (mode == 'or') {
                    return some(permissionFilter, item => {
                        return includes(permissions, item)
                    });
                }
            } else {
                return some(permissions, (permission: any) => {
                    return isEqual(permission, permissionFiler);
                });
            }
            return false;
        }

    };

    const handleHasAll = (permissionFilter: any | any[]) => {
        return handleAuthenticate(permissionFilter, 'and');
    }
    const handleHasAny = (permissionFilter: any | any[]) => {
        return handleAuthenticate(permissionFilter, 'or');
    }

    useEffect(() => {
        if (authenticationInfo?.authenticationSynced && authenticationInfo?.authenticated  ) {
            if (authorizationRequest) {
                authorizationRequest?.()
                    .then((res: AuthorizationResponse) => {
                        setMaster?.(res.master || false);
                        setPermissions?.(res.permissions || []);
                    })
                    .finally(() => {
                        setAuthorizationSynced(true);
                    });
            } else {
                setAuthorizationSynced(true);
            }
        }else {
            setMaster( false)
            setPermissions( []);
        }
    }, [authenticationInfo]);

    return (
        <AuthorizationContext.Provider
            value={{
                authorizationSynced,
                master,
                setMaster,
                authenticate: handleAuthenticate,
                permissions,
                setPermissions,
                unauthorized,
                onUnauthorized,
                hasAll: handleHasAll,
                hasAny: handleHasAny
            }}>
            {children}
        </AuthorizationContext.Provider>
    );
};
