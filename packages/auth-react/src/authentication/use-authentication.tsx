import {AuthenticationContext} from "./context";
import {useContext} from "react";

export const useAuthentication = (): {
    authenticationInfo?: { authenticationSynced: boolean; authenticated: boolean };
    actor?: any;
    setActor?: (actor: any) => void;
    onUnAuthenticated?: () => void;
    signOut?: () => void;
} => {
    const {authenticationInfo, actor, setActor, onUnAuthenticated, signOut} = useContext(AuthenticationContext);
    return {authenticationInfo, actor, setActor, onUnAuthenticated, signOut};
};
