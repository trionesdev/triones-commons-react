import {createContext} from "react";

export type AuthenticationInfo = {
    authenticationSynced: boolean;
    authenticated: boolean;
};

export interface AuthenticationContextProps {
    authenticationInfo?: AuthenticationInfo;
    /**
     * 当前用户信息
     */
    actor?: any;
    setActor?: (actor: any) => void;
    /**
     * 未认证时的回调
     */
    onUnAuthenticated?: () => void;
    signOut?: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({

});
