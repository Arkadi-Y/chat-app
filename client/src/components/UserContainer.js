import React from 'react'

const UserContainer = ({users}) => {

    return (
        users?(<>{users.map((user,i)=><div key={i}>{user.name}</div>)}
            </>):(
            <div>none connected</div>)
    )
}

export default UserContainer
