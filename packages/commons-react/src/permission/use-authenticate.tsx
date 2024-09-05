import {usePermission} from "./use-permission";

export const useAuthenticate = () => {
    const {authenticate} = usePermission();
    return authenticate;
};
