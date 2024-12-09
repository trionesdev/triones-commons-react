import {createContext} from "react";

export interface AppConfigContextProps {
    subApp?: boolean
    multiTenant?: boolean;
    selfHost?: boolean;

    [key: string]: any;
}

export const AppConfigContext = createContext<AppConfigContextProps>({});