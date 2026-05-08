import React, {useEffect, useState} from "react";
import {AuthenticationContext} from "./context";

type AuthProviderProps<TActor = unknown> = {
    children: React.ReactElement;
    /**
     * 认证请求, 可以根据token去获取当前用户信息，如果没有token可以直接返回null
     */
    authenticationRequest?: () => Promise<TActor | null>;
    onUnAuthenticated?: () => void;
    onSignOut?: () => void;
};

export const AuthenticationProvider = <TActor = unknown,>({
                                                            children,
                                                            authenticationRequest,
                                                            onUnAuthenticated,
                                                            onSignOut
                                                        }: AuthProviderProps<TActor>) => {
    const [authenticationInfo, setAuthenticationInfo] = useState<{ authenticationSynced: boolean; authenticated: boolean }>({
        authenticationSynced: false,
        authenticated: false
    })
    const [actor, setActor] = useState<TActor | null>(null);

    useEffect(() => {
        if (authenticationRequest) {
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

    const handleSetActor = (nextActor: TActor | null) => {
        setAuthenticationInfo({ authenticationSynced: true, authenticated: Boolean(nextActor) });
        setActor(nextActor);
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
