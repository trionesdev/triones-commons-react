import React, {FC, useEffect, useState} from "react";
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

export const AuthenticationProvider: FC<AuthProviderProps> = ({
                                                                  children,
                                                                  authenticationRequest,
                                                                  onUnAuthenticated,
                                                                  onSignOut
                                                              }) => {
    const [authenticationInfo, setAuthenticationInfo] = useState<{ authenticationSynced: boolean; authenticated: boolean }>({
        authenticationSynced: false,
        authenticated: false
    })
    const [actor, setActor] = useState<any>();

    useEffect(() => {
        if (authenticationRequest) {
            debugger
            if (authenticationInfo.authenticationSynced) {
                setAuthenticationInfo({ ...authenticationInfo, authenticationSynced: false });
            }
            authenticationRequest()
                .then((res) => {
                    setAuthenticationInfo({ authenticationSynced: true, authenticated: Boolean(res) });
                    setActor(res || null);
                })
                .catch(() => {
                    setAuthenticationInfo({ authenticationSynced: true, authenticated: false });
                    setActor(null);
                }) ;
        } else {
            setAuthenticationInfo({
                authenticationSynced: true,
                authenticated: false
            })
        }
    }, [authenticationRequest]);

    const handleSetActor = (actor: any) => {
        setAuthenticationInfo({ authenticationSynced: true, authenticated: Boolean(actor) });
        setActor(actor);
    };

    const handleSignOut = () => {
        setAuthenticationInfo({ authenticationSynced: false, authenticated: false });
        setActor(null)
        if (onSignOut) {
            onSignOut()
        }
    }

    return (
        <AuthenticationContext.Provider
            value={{
                authenticationInfo,
                actor,
                setActor: handleSetActor,
                onUnAuthenticated,
                signOut: handleSignOut
            }}>
            {children}
        </AuthenticationContext.Provider>
    );
};
