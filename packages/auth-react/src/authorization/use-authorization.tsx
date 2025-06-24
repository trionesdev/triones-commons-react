import {useContext} from "react";
import {AuthorizationContext} from "./context";
import {UseAuthorizationProps} from "./types";

export const useAuthorization = (): UseAuthorizationProps => {
    const ctx = useContext(AuthorizationContext);
    const handleHasAll = (value: any | any[]) => {
        return ctx.authenticate?.(value, 'and') || false;
    }
    const handleHasAny = (value: any | any[]) => {
        return ctx.authenticate?.(value, 'or') || false;
    }
    return {...ctx, hasAll: handleHasAll, hasAny: handleHasAny};
};
