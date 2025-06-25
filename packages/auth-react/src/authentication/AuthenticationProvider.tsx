import React, {FC, useMemo, useState} from "react";
import {AuthenticationContext} from "./context";

type AuthProviderProps = {
    children: React.ReactElement;
    /**
     * 认证请求, 可以根据token去获取当前用户信息，如果没有token可以直接返回null
     */
    authenticationRequest?: () => Promise<any>;
    onUnAuthenticated?: () => void;
    onSignOut?: () => void;
};

export const AuthenticationProvider: FC<AuthProviderProps> = ({children, authenticationRequest, onUnAuthenticated, onSignOut}) => {
    const [authenticationSynced, setAuthenticatedSynced] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [actor, setActor] = useState<any>();

    useMemo(() => {
        if (authenticationRequest) {
            authenticationRequest()
                .then((res) => {
                    setAuthenticated(!!res);
                    setActor(res || null);
                })
                .catch(() => {
                    setAuthenticated(false);
                    setActor(null);
                })
                .finally(() => {
                    setAuthenticatedSynced(true);
                });
        } else {
            setAuthenticatedSynced(true);
            setAuthenticated(false);
        }
    }, [authenticationRequest]);


    const handleSetActor = (actor: any) => {
        setAuthenticated(!!actor)
        setAuthenticatedSynced(true)
        setActor(actor);
    };

    const handleSignOut = () => {
        if (onSignOut) {
            onSignOut()
        } else {
            setAuthenticatedSynced(false)
            setAuthenticated(false)
            setActor(null)
        }
    }

    return (
        <AuthenticationContext.Provider
            value={{
                authenticationSynced,
                authenticated,
                actor,
                setActor: handleSetActor,
                onUnAuthenticated,
                signOut: handleSignOut
            }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
