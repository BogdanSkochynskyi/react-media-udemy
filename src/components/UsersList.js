import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addUser, fetchUsers} from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

function UsersList() {
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [isLoadingUsersError, setIsLoadingUsersError] = useState(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isCreatingUserError, setIsCreatingUserError] = useState(null);


    const dispatch = useDispatch();
    const {data} = useSelector((state) => {
        return state.users;
    })

    useEffect(()=> {
        setIsLoadingUsers(true);
        dispatch(fetchUsers())
            .unwrap()
            .then(() => {
                //If success
            })
            .catch((error) => {
                //If error
                setIsLoadingUsersError(error)
            })
            .finally(() => {
                setIsLoadingUsers(false)
            });
    },[dispatch])

    const handleUserAdd = () =>{
        setIsCreatingUser(true);
        dispatch(addUser())
            .unwrap()
            .then()
            .catch(error => setIsCreatingUserError(error))
            .finally(() => setIsCreatingUser(false));
    }

    if (isLoadingUsers) {
        return <div>
            <Skeleton times={6} className="h-10 w-full"/>
        </div>
    }

    if(isLoadingUsersError) {
        return <div>Error fetching data...</div>
    }

    const renderedUsers = data.map((user) => {
        return <div key={user.id} className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-centered cursor-pointer">
                {user.name}
            </div>

        </div>
    })

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button onClick={handleUserAdd}>
                    + Add user
                </Button>
            </div>
            {renderedUsers}
        </div>
    )
}

export default UsersList;