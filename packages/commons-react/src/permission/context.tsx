import React, {createContext} from "react";

export interface PermissionContextProps {
  policySynced?: boolean; //策略是否同步
  master?: boolean; //super管理员
  setMaster?: (value: boolean) => void;
  authenticate?: (policy: string | any[]) => boolean; //鉴权
  policies?: any[];
  setPolicies?: (policies: any[]) => void;
  unauthorized?: React.ReactElement | React.ReactNode; //未授权时的内容
  onUnauthorized?: () => void; //未授权时的回调
}

export const PermissionContext = createContext<PermissionContextProps>({});
