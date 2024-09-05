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
    permissionRequest?: (params?: any) => Promise<PolicyResponse>;
    /**
     * 权限转换，默认为拼接成字符串，例如参数是["a"]，则返回"a"，参数为["a","b"],则返回"a::b"，当配置customAuthenticate 时，该参数无效
     * @param policy
     */
    policyTransform?: (policy: any | any[]) => any;
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
                                                                    permissionRequest,
                                                                    policyTransform = (policy) => {
                                                                        return _.concat([], policy).join("::");
                                                                    },
                                                                    customAuthenticate,
                                                                    unauthorized,
                                                                    onUnauthorized
                                                                }) => {
    const {authSynced, authenticated} = useAuth();
    const [policySynced, setPolicySynced] = useState(false);
    const [master, setMaster] = useState(false);
    const [policies, setPolicies] = useState<any[]>([]);

    /**
     * 鉴权,如果有自定义鉴权 customAuthenticate，则使用自定义鉴权，否则使用默认鉴权
     * @param policyFilter
     */
    const handleAuthenticate = (policyFilter: any | any[]) => {
        if (!policySynced) {
            return false;
        }
        if (customAuthenticate) {
            return customAuthenticate(policyFilter, policies);
        } else {
            let policyFiler = policyTransform(policyFilter);
            return _.some(policies, (policy: any) => {
                return policy === policyFiler;
            });
        }

    };

    useEffect(() => {
        if (authSynced && authenticated) {
            if (permissionRequest) {
                permissionRequest?.()
                    .then((res: PolicyResponse) => {
                        setMaster?.(res.master || false);
                        setPolicies?.(res.policies || []);
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
                policies,
                setPolicies,
                unauthorized,
                onUnauthorized
            }}>
            {children}
        </PermissionContext.Provider>
    );
};
