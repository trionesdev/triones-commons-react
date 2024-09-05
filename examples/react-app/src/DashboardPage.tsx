import {Link, useAuth} from "@trionesdev/commons-react";


export const DashboardPage = () => {
    const {actor} = useAuth()
    return <div>
        <h1>Dashboard</h1>
        <div>当前用户：{actor.username}</div>
        <Link to={"/security"}>Security</Link>
    </div>
}