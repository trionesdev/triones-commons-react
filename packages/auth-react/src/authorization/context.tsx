import {createContext} from "react";
import {UseAuthorizationProps} from "./types";


export const AuthorizationContext = createContext<UseAuthorizationProps>({});
