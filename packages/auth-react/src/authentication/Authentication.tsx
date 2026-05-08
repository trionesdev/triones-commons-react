import React, {FC, useEffect} from "react";
import {useAuthentication} from "./use-authentication";

type AuthenticationProps = {
    children?: React.ReactNode;
};
export const Authentication: FC<AuthenticationProps> = ({children}) => {
    const {authenticationInfo, onUnAuthenticated} = useAuthentication();

    useEffect(() => {
        if (authenticationInfo?.authenticationSynced && !authenticationInfo?.authenticated) {
            onUnAuthenticated?.(); //未认证时候触发
        }
    }, [authenticationInfo?.authenticated, authenticationInfo?.authenticationSynced, onUnAuthenticated]);

    return (authenticationInfo?.authenticationSynced && authenticationInfo?.authenticated) ? <>{children}</> : null;
};
