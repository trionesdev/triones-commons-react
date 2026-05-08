import {createContext} from "react";

export interface AuthenticationContextProps<TActor = unknown> {
    authenticationInfo?: { authenticationSynced: boolean; authenticated: boolean };
    /**
     * 当前用户信息
     */
    actor?: TActor | null;
    setActor?: (actor: TActor | null) => void;
    /**
     * 未认证时的回调
     */
    onUnAuthenticated?: () => void;
    signOut?: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps<any>>({

});
