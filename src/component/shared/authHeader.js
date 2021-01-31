export default function authHeader (){
    const user = JSON.parse(localStorage.getItem('user'));

    if (user)
    {
        return {'Authorization' : user.token,'Content-Type':'Application/json'}
    }
    return {}
}
