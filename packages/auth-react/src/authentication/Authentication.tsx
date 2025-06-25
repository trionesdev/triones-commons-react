import React, {FC, useEffect} from "react";
import {useAuthentication} from "./use-authentication";

type AuthenticationProps = {
    children?: React.ReactElement;
};
export const Authentication: FC<AuthenticationProps> = ({children}) => {
    const {authSynced, authenticated, onUnAuthenticated} = useAuthentication();

    useEffect(() => {
        if (authSynced && !authenticated) {
            onUnAuthenticated?.(); //未认证时候触发
        }
        return () => {
        };
    }, [authSynced, authenticated]);

    return authSynced && authenticated ? <>{children}</> : null;
};
