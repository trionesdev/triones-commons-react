import React from "react";

export type  Mode = 'and' | 'or'
export type PolicyResponse = {
    master?: boolean;
    permissions?: any[];
};

export interface PermissionContextProps {
    policySynced?: boolean; //策略是否同步
    master?: boolean; //super管理员
    setMaster?: (value: boolean) => void;
    authenticate?: (permission: any | any[],mode:Mode) => boolean; //鉴权
    permissions?: any[];
    setPermissions?: (permissions?: any[]) => void;
    unauthorized?: React.ReactElement | React.ReactNode; //未授权时的内容
    onUnauthorized?: () => void; //未授权时的回调
}


export type UsePermissionProps= PermissionContextProps & {
    hasAll: (value: any | any[]) => boolean;
    hasAny: (value: any | any[]) => boolean;
}