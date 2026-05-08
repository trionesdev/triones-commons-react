import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import {AuthenticationContext, AuthenticationInfo} from "./context";

type AuthProviderProps = {
    children: React.ReactNode;
    /**
     * 认证请求, 可以根据token去获取当前用户信息，如果没有token可以直接返回null
     */
    actorRequest?: () => Promise<any>;
    onUnAuthenticated?: () => void;
    onSignOut?: () => void;
};

export const AuthenticationProvider: FC<AuthProviderProps> = ({
                                                                  children,
                                                                  actorRequest,
                                                                  onUnAuthenticated,
                                                                  onSignOut
                                                              }) => {
    const [authenticationInfo, setAuthenticationInfo] = useState<AuthenticationInfo>({
        authenticationSynced: false,
        authenticated: false
    });
    const [actor, setActor] = useState<any>();

    useEffect(() => {
        if (!actorRequest) {
            setAuthenticationInfo({
                authenticationSynced: true,
                authenticated: false
            });
            setActor(null);
            return;
        }

        let cancelled = false;
        setAuthenticationInfo((prev) => ({...prev, authenticationSynced: false}));

        actorRequest()
            .then((res) => {
                if (cancelled) {
                    return;
                }
                setAuthenticationInfo({ authenticationSynced: true, authenticated: Boolean(res) });
                setActor(res || null);
            })
            .catch(() => {
                if (cancelled) {
                    return;
                }
                setAuthenticationInfo({ authenticationSynced: true, authenticated: false });
                setActor(null);
            });

        return () => {
            cancelled = true;
        };
    }, [actorRequest]);

    const handleSetActor = useCallback((actor: any) => {
        setAuthenticationInfo({ authenticationSynced: true, authenticated: Boolean(actor) });
        setActor(actor);
    }, []);

    const handleSignOut = useCallback(() => {
        setAuthenticationInfo({ authenticationSynced: false, authenticated: false });
        setActor(null);
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
