import {AuthenticationContext} from "./context";
import {useContext} from "react";

export const useAuthentication = (): {
    authenticationSynced?: boolean;
    authenticated?: boolean;
    actor?: any;
    setActor?: (actor: any) => void;
    onUnAuthenticated?: () => void;
    signOut?: () => void;
} => {
    const {authenticationSynced, authenticated, actor, setActor, onUnAuthenticated, signOut} = useContext(AuthenticationContext);
    return {authenticationSynced, authenticated, actor, setActor, onUnAuthenticated, signOut};
};
