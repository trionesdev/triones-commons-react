import React, {FC, useEffect, useState} from "react";
import _ from "lodash";
import {PermissionContext} from "./context";
import {PolicyResponse} from "./types";
import {useAuth} from "../authentication";

type PermissionProviderProps = {
    children?: React.ReactNode;
    /**
     * 权限请求，返回一个PolicyResponse
     * @param params
     */
    policyRequest?: (params?: any) => Promise<PolicyResponse>;
    /**
     * 权限转换，默认为拼接成字符串，例如参数是["a"]，则返回"a"，参数为["a","b"],则返回"a::b"，当配置customAuthenticate 时，该参数无效
     * @param policy
     */
    permissionTransform?: (policy: any | any[]) => any;
    /**
     * 自定义鉴权
     * @param policy 需要的权限
     * @param policies 当前用户拥有的权限策略
     */
    customAuthenticate?: (policy: any | any[], policies: any[]) => boolean;
    unauthorized?: React.ReactElement | React.ReactNode; //未授权时的内容
    onUnauthorized?: () => void; //未授权时的回调
};
export const PermissionProvider: FC<PermissionProviderProps> = ({
                                                                    children,
                                                                    policyRequest,
                                                                    permissionTransform = (permission) => {
                                                                        return _.concat([], permission).join("::");
                                                                    },
                                                                    customAuthenticate,
                                                                    unauthorized,
                                                                    onUnauthorized
                                                                }) => {
    const {authSynced, authenticated} = useAuth();
    const [policySynced, setPolicySynced] = useState(false);
    const [master, setMaster] = useState(false);
    const [permissions, setPermissions] = useState<any[]>([]);

    /**
     * 鉴权,如果有自定义鉴权 customAuthenticate，则使用自定义鉴权，否则使用默认鉴权
     * @param permissionFilter
     */
    const handleAuthenticate = (permissionFilter: any | any[]) => {
        if (!policySynced) {
            return false;
        }
        if (customAuthenticate) {
            return customAuthenticate(permissionFilter, permissions);
        } else {
            let permissionFiler = permissionTransform(permissionFilter);
            return _.some(permissions, (permission: any) => {
                return permission === permissionFiler;
            });
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
