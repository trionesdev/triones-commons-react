import React, {useCallback, useEffect, useMemo, useState} from "react";
import {AuthenticationContext} from "./context";

type AuthProviderProps<TActor = unknown> = {
    children: React.ReactNode;
    /**
     * 认证请求, 可以根据token去获取当前用户信息，如果没有token可以直接返回null
     */
    actorRequest?: () => Promise<TActor | null>;
    onUnAuthenticated?: () => void;
    onSignOut?: () => void;
};

export const AuthenticationProvider = <TActor = unknown,>({
                                                            children,
                                                            actorRequest,
                                                            onUnAuthenticated,
                                                            onSignOut
                                                        }: AuthProviderProps<TActor>) => {
    const [authenticationInfo, setAuthenticationInfo] = useState<{ authenticationSynced: boolean; authenticated: boolean }>({
        authenticationSynced: false,
        authenticated: false
    })
    const [actor, setActor] = useState<TActor | null>(null);

    useEffect(() => {
        let cancelled = false;
        if (!actorRequest) {
            setAuthenticationInfo({ authenticationSynced: true, authenticated: false });
            setActor(null);
            return;
        }

        setAuthenticationInfo({ authenticationSynced: false, authenticated: false });
        actorRequest()
            .then((res) => {
                if (cancelled) return;
                setAuthenticationInfo({ authenticationSynced: true, authenticated: Boolean(res) });
                setActor(res || null);
            })
            .catch(() => {
                if (cancelled) return;
                setAuthenticationInfo({ authenticationSynced: true, authenticated: false });
                setActor(null);
            });

        return () => {
            cancelled = true;
        };
    }, [actorRequest]);

    const handleSetActor = useCallback((nextActor: TActor | null) => {
        setAuthenticationInfo({ authenticationSynced: true, authenticated: Boolean(nextActor) });
        setActor(nextActor);
    }, []);

    const handleSignOut = useCallback(() => {
        setAuthenticationInfo({ authenticationSynced: false, authenticated: false });
        setActor(null);
        if (onSignOut) {
            onSignOut();
        }
    }, [onSignOut]);

    const contextValue = useMemo(() => ({
        authenticationInfo,
        actor,
        setActor: handleSetActor,
        onUnAuthenticated,
        signOut: handleSignOut
    }), [authenticationInfo, actor, handleSetActor, onUnAuthenticated, handleSignOut]);

    return (
        <AuthenticationContext.Provider
            value={contextValue}>
            {children}
        </AuthenticationContext.Provider>
    );
};
