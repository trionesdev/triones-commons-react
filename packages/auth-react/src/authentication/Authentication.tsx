import React, {FC, useEffect} from "react";
import {useAuthentication} from "./use-authentication";

type AuthenticationProps = {
    children?: React.ReactElement;
};
export const Authentication: FC<AuthenticationProps> = ({children}) => {
    const {authenticationSynced, authenticated, onUnAuthenticated} = useAuthentication();

    useEffect(() => {
        if (authenticationSynced && !authenticated) {
            onUnAuthenticated?.(); //未认证时候触发
        }
        return () => {
        };
    }, [authenticationSynced, authenticated]);

    return authenticationSynced && authenticated ? <>{children}</> : null;
};
