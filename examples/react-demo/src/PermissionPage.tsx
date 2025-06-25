import {Authorization} from "@trionesdev/auth-react/src";

export const PermissionPage = () => {
    return <div>
        <Authorization value={['create']}>
            <button>create</button>
        </Authorization>
        <Authorization value={['update']}>
            <button>update</button>
        </Authorization>
        <Authorization value={['create', 'update']}>
            <button>create && update true</button>
        </Authorization>
        <Authorization value={['create', 'update']} mode={`or`}>
            <button>create || update true</button>
        </Authorization>
        <Authorization value={['create','delete']}>
            <button>create && delete false</button>
        </Authorization>
        <Authorization value={['delete']} mode={`or`}>
            <button>delete false</button>
        </Authorization>
    </div>
}