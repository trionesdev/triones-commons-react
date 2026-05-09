import {useContext} from "react";
import {AuthenticationContext, AuthenticationContextValue} from "./context";

// export const useAuthentication = (): AuthenticationContextValue => {
//     const {authenticationInfo, actor, setActor, onUnAuthenticated, signOut} = useContext(AuthenticationContext);
//     return {authenticationInfo, actor, setActor, onUnAuthenticated, signOut};
// };

export function useAuthentication<T = any>():AuthenticationContextValue<T>{
    const ctx = useContext(AuthenticationContext)  ;
    if (ctx === null) {
        throw new Error("useAuthentication 必须在 AuthenticationProvider 内使用");
    }
    return ctx as AuthenticationContextValue<T>;
}