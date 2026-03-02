import { Outlet } from "react-router-dom";


function Users(){
    return (
        <div>
            <h1>Users</h1>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Users;