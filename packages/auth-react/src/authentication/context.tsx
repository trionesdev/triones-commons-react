import {createContext} from "react";

export type AuthenticationInfo = {
    authenticationSynced: boolean;
    authenticated: boolean;
};

export interface AuthenticationContextValue<TActor = any> {
    authenticationInfo?: AuthenticationInfo;
    /**
     * 当前用户信息
     */
    actor?: TActor;
    setActor?: (actor: TActor) => void;
    /**
     * 未认证时的回调
     */
    onUnAuthenticated?: () => void;
    signOut?: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextValue<any>>({});
