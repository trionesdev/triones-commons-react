import {useContext} from "react";
import {AuthenticationContext, AuthenticationContextProps} from "./context";

export const useAuthentication = (): AuthenticationContextProps => {
    const {authenticationInfo, actor, setActor, onUnAuthenticated, signOut} = useContext(AuthenticationContext);
    return {authenticationInfo, actor, setActor, onUnAuthenticated, signOut};
};
