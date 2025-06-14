import {useContext} from "react";
import {PermissionContext} from "./context";
import {UsePermissionProps} from "./types";

export const usePermission = (): UsePermissionProps => {
    const ctx = useContext(PermissionContext);
    const handleHasAll = (value: any | any[]) => {
        return ctx.authenticate?.(value, 'and') || false;
    }
    const handleHasAny = (value: any | any[]) => {
        return ctx.authenticate?.(value, 'or') || false;
    }
    return {...ctx, hasAll: handleHasAll, hasAny: handleHasAny};
};
