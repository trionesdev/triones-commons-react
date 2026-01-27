import {createContext} from "react";

export interface AuthenticationContextProps {
    authenticationInfo?: { authenticationSynced: boolean; authenticated: boolean };
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
