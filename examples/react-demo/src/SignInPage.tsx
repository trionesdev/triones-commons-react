import {useAuth, useNavigate} from "@trionesdev/commons-react";

export const SignInPage = () => {
    const navigate = useNavigate()
    const {setActor} = useAuth();
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