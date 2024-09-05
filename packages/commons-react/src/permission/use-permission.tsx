import {useContext} from "react";
import {PermissionContext, PermissionContextProps} from "./context";

export const usePermission = (): PermissionContextProps => {
  return useContext(PermissionContext);
};
