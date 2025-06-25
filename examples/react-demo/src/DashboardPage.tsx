import {  useAuthentication} from "@trionesdev/auth-react/src";
import {Link} from "react-router";


export const DashboardPage = () => {
    const {actor} = useAuthentication()
    return <div>
        <h1>Dashboard</h1>
        <div>当前用户：{actor.username}</div>
        <div>
            <Link to={"/security"}>Security</Link>
        </div>
        <div>
            <Link to={"/authorization"}>Permission</Link>
        </div>
    </div>
}