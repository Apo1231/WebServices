import { useParams } from "react-router-dom";

function UserFindOne(){
    const { id } = useParams();
    return (
        <div>
            <h1>User Find One</h1>
            <p>User ID: {id}</p>
        </div>
    )
}

export default UserFindOne;