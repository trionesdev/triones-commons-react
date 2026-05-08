import {AuthenticationContext, AuthenticationContextProps} from "./context";
import {useContext} from "react";

export const useAuthentication = <TActor = unknown>() => {
    const {authenticationInfo, actor, setActor, onUnAuthenticated, signOut} =
        useContext(AuthenticationContext) as AuthenticationContextProps<TActor>;
    return {authenticationInfo, actor, setActor, onUnAuthenticated, signOut};
};
