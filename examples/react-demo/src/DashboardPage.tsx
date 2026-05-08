import {useAuthentication} from "@trionesdev/auth-react";
import {Link} from "react-router";


export const DashboardPage = () => {
    const {actor, setActor, signOut} = useAuthentication<{ username: string }>()

    return <div>
        <h1>Dashboard</h1>
        <div>当前用户：{actor?.username}</div>
        <div>
            <Link to={"/security"}>Security</Link>
        </div>
        <div>
            <Link to={"/authorization"}>Permission</Link>
        </div>
        <button onClick={() => {
            setActor?.({"username": "test"})
        }}>设置用户
        </button>
        <button onClick={() => {
            signOut?.()
        }}>退出
        </button>
    </div>
}
