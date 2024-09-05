import {AuthContext} from "./context";
import {useContext} from "react";

export const useAuth = (): {
    authSynced?: boolean;
    authenticated?: boolean;
    actor?: any;
    setActor?: (actor: any) => void;
    onUnAuthenticated?: () => void;
} => {
    const {authSynced, authenticated, actor, setActor, onUnAuthenticated} = useContext(AuthContext);
    return {authSynced, authenticated, actor, setActor, onUnAuthenticated};
};
