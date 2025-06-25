import {useAuthentication,  } from "@trionesdev/auth-react/src";
import {useNavigate} from "react-router";

export const SignInPage = () => {
    const navigate = useNavigate()
    const {setActor} = useAuthentication();
    return <div>
        <h1 style={{
            textAlign: "center"
        }}>登录页</h1>
        <div style={{textAlign: "center"}}>
            <button onClick={() => {
                setActor?.({"id": "1", "username": "admin"})
                navigate("/")
            }}>进入
            </button>
        </div>
    </div>
}