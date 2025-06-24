import {createContext} from "react";

export interface AuthContextProps {
    /**
     * 认证是否同步
     */
    authSynced?: boolean;
    /**
     * 是否已认证
     */
    authenticated?: boolean;
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

export const AuthContext = createContext<AuthContextProps>({});
