import React, {FC, useEffect, useRef} from "react";
import {useAuthentication} from "./use-authentication";

type AuthenticationProps = {
    children?: React.ReactNode;
};
export const Authentication: FC<AuthenticationProps> = ({children}) => {
    const {authenticationInfo, onUnAuthenticated} = useAuthentication();
    const {authenticationSynced, authenticated} = authenticationInfo || {};
    const prevAuthenticatedRef = useRef<boolean | undefined>(undefined);
    const onUnAuthenticatedRef = useRef(onUnAuthenticated);

    useEffect(() => {
        onUnAuthenticatedRef.current = onUnAuthenticated;
    }, [onUnAuthenticated]);

    useEffect(() => {
        const prevAuthenticated = prevAuthenticatedRef.current;
        // 只在认证状态从 true 切换为 false 时触发，避免重复回调
        if (authenticationSynced && prevAuthenticated === true && authenticated === false) {
            onUnAuthenticatedRef.current?.();
        }
        prevAuthenticatedRef.current = authenticated;
    }, [authenticationSynced, authenticated]);

    return (authenticationSynced && authenticated) ? <>{children}</> : null;
};
