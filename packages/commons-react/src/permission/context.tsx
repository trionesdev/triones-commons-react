import React, {createContext} from "react";

export interface PermissionContextProps {
  policySynced?: boolean; //策略是否同步
  master?: boolean; //super管理员
  setMaster?: (value: boolean) => void;
  authenticate?: (permission: string | string[]) => boolean; //鉴权
  permissions?: any[];
  setPermissions?: (permissions?: any[]) => void;
  unauthorized?: React.ReactElement | React.ReactNode; //未授权时的内容
  onUnauthorized?: () => void; //未授权时的回调
}

export const PermissionContext = createContext<PermissionContextProps>({});
