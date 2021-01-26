import React from 'react'

function Profile() {
    return (
        <div>
            Profile - {localStorage.getItem('auth_token')}
        </div>
    )
}

export default Profile
