import React, {FC, useEffect} from "react";
import {useAuth} from "./use-auth";

type AuthenticatedProps = {
    children?: React.ReactElement;
};
export const Authentication: FC<AuthenticatedProps> = ({children}) => {
    const {authSynced, authenticated, onUnAuthenticated} = useAuth();

    useEffect(() => {
        if (authSynced && !authenticated) {
            onUnAuthenticated?.(); //未认证时候触发
        }
        return () => {
        };
    }, [authSynced, authenticated]);

    return authSynced && authenticated ? <>{children}</> : null;
};
