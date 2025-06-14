import React, {FC, useEffect, useState} from "react";
import _ from "lodash";
import {PermissionContext} from "./context";
import {Mode, PolicyResponse} from "./types";
import {useAuth} from "../authentication";

type PermissionProviderProps = {
    children?: React.ReactNode;
    /**
     * 权限请求，返回一个PolicyResponse
     * @param params
     */
    policyRequest?: (params?: any) => Promise<PolicyResponse>;
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
export const PermissionProvider: FC<PermissionProviderProps> = ({
                                                                    children,
                                                                    policyRequest,
                                                                    permissionTransform = (permission) => {
                                                                        return permission;
                                                                    },
                                                                    customAuthenticate,
                                                                    unauthorized,
                                                                    onUnauthorized
                                                                }) => {
    const {authSynced, authenticated} = useAuth(); //鉴权是否同步
    const [policySynced, setPolicySynced] = useState(false); //策略是否同步
    const [master, setMaster] = useState(false);
    const [permissions, setPermissions] = useState<any[] | undefined>([]); //全部权限

    /**
     * 鉴权,如果有自定义鉴权 customAuthenticate，则使用自定义鉴权，否则使用默认鉴权
     * @param permissionFilter
     * @param mode
     */
    const handleAuthenticate = (permissionFilter: any | any[], mode: Mode = 'and') => {

        if (!policySynced) {
            return false;
        }
        if (customAuthenticate) {
            return customAuthenticate(permissionFilter, permissions || [], mode);
        } else {
            let permissionFiler = permissionTransform(permissionFilter);

            if (_.isArray(permissionFilter)) {
                if (mode == 'and') {
                    return _.every(permissionFilter, item => {
                        return _.some(permissions, (permission: any) => {
                            return _.isEqual(permission, item);
                        })
                    });
                } else if (mode == 'or') {
                    return _.some(permissionFilter, item => {
                        return _.includes(permissions, item)
                    });
                }
            } else {
                return _.some(permissions, (permission: any) => {
                    return _.isEqual(permission, permissionFiler);
                });
            }
            return false;
        }

    };

    useEffect(() => {
        if (authSynced && authenticated) {
            if (policyRequest) {
                policyRequest?.()
                    .then((res: PolicyResponse) => {
                        setMaster?.(res.master || false);
                        setPermissions?.(res.permissions || []);
                    })
                    .finally(() => {
                        setPolicySynced(true);
                    });
            } else {
                setPolicySynced(true);
            }
        }
    }, [authSynced, authenticated]);

    return (
        <PermissionContext.Provider
            value={{
                policySynced,
                master,
                setMaster,
                authenticate: handleAuthenticate,
                permissions,
                setPermissions,
                unauthorized,
                onUnauthorized
            }}>
            {children}
        </PermissionContext.Provider>
    );
};
