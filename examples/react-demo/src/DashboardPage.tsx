import {Link, useAuth} from "@trionesdev/commons-react/src";


export const DashboardPage = () => {
    const {actor} = useAuth()
    return <div>
        <h1>Dashboard</h1>
        <div>当前用户：{actor.username}</div>
        <div>
            <Link to={"/security"}>Security</Link>
        </div>
        <div>
            <Link to={"/permission"}>Permission</Link>
        </div>
    </div>
}