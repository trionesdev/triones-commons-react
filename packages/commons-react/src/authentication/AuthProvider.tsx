import React, {FC, useMemo, useState} from "react";
import {AuthContext} from "./context";

type AuthProviderProps = {
    children: React.ReactElement;
    /**
     * 认证请求, 可以根据token去获取当前用户信息，如果没有token可以直接返回null
     */
    authRequest?: () => Promise<any>;
    onUnAuthenticated?: () => void;
};

export const AuthProvider: FC<AuthProviderProps> = ({children, authRequest, onUnAuthenticated}) => {
    const [authSynced, setAuthSynced] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [actor, setActor] = useState<any>();

    useMemo(() => {
        if (authRequest) {
            authRequest()
                .then((res) => {
                    setAuthenticated(!!res);
                    setActor(res || null);
                })
                .catch((err) => {
                    setAuthenticated(false);
                    setActor(null);
                })
                .finally(() => {
                    setAuthSynced(true);
                });
        } else {
            setAuthSynced(true);
            setAuthenticated(false);
        }
    }, [authRequest]);


    const handleSetActor = (actor: any) => {
        setAuthenticated(!!actor)
        setAuthSynced(true)
        setActor(actor);
    };


    return (
        <AuthContext.Provider
            value={{
                authSynced,
                authenticated,
                actor,
                setActor: handleSetActor,
                onUnAuthenticated,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
