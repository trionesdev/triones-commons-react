import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import {AuthenticationContext, AuthenticationInfo} from "./context";

type AuthProviderProps<T = any> = {
    children: React.ReactNode;
    /**
     * 认证请求, 可以根据token去获取当前用户信息，如果没有token可以直接返回null
     */
    actorRequest?: () => Promise<T>;
    onUnAuthenticated?: () => void;
    onSignOut?: () => void;
};

export function AuthenticationProvider<T = any>({
                                                        children,
                                                        actorRequest,
                                                        onUnAuthenticated,
                                                        onSignOut
                                                    }: AuthProviderProps<T>) {
    const [authenticationInfo, setAuthenticationInfo] = useState<AuthenticationInfo>({
        authenticationSynced: false,
        authenticated: false
    });
    const [actor, setActor] = useState<T | undefined>();

    useEffect(() => {
        if (!actorRequest) {
            setAuthenticationInfo({
                authenticationSynced: true,
                authenticated: false
            });
            setActor(undefined);
            return;
        }

        let cancelled = false;
        setAuthenticationInfo((prev) => ({...prev, authenticationSynced: false}));

        actorRequest()
            .then((res) => {
                if (cancelled) {
                    return;
                }
                setAuthenticationInfo({authenticationSynced: true, authenticated: Boolean(res)});
                setActor(res || undefined);
            })
            .catch(() => {
                if (cancelled) {
                    return;
                }
                setAuthenticationInfo({authenticationSynced: true, authenticated: false});
                setActor(undefined);
            });

        return () => {
            cancelled = true;
        };
    }, [actorRequest]);

    const handleSetActor = useCallback((actor: T) => {
        setAuthenticationInfo({authenticationSynced: true, authenticated: Boolean(actor)});
        setActor(actor);
    }, []);

    const handleSignOut = useCallback(() => {
        setAuthenticationInfo({authenticationSynced: false, authenticated: false});
        setActor(undefined);
        onSignOut?.();
    }, [onSignOut]);

    const contextValue = useMemo(() => ({
        authenticationInfo,
        actor,
        setActor: handleSetActor,
        onUnAuthenticated,
        signOut: handleSignOut
    }), [actor, authenticationInfo, handleSetActor, handleSignOut, onUnAuthenticated]);

    return (
        <AuthenticationContext.Provider
            value={contextValue}>
            {children}
        </AuthenticationContext.Provider>
    );
};
